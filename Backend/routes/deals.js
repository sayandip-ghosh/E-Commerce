const express = require('express');
const { body, query } = require('express-validator');
const { protect, admin, optionalAuth } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validate');
const Deal = require('../models/Deal');
const Review = require('../models/Review');

const router = express.Router();

// @route   GET /api/deals
// @desc    Get all deals with filtering and pagination
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('category').optional().isString().withMessage('Category must be a string'),
  query('search').optional().isString().withMessage('Search must be a string'),
  query('sort').optional().isIn(['price', 'discount', 'rating', 'newest', 'oldest']).withMessage('Invalid sort option'),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('Min price must be a positive number'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Max price must be a positive number'),
  handleValidationErrors
], async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      search,
      sort = 'newest',
      minPrice,
      maxPrice
    } = req.query;

    // Build query
    const query = { isActive: true, endDate: { $gt: new Date() } };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { specs: { $regex: search, $options: 'i' } }
      ];
    }

    if (minPrice || maxPrice) {
      query.discountedPrice = {};
      if (minPrice) query.discountedPrice.$gte = parseFloat(minPrice);
      if (maxPrice) query.discountedPrice.$lte = parseFloat(maxPrice);
    }

    // Build sort
    let sortOption = {};
    switch (sort) {
      case 'price':
        sortOption = { discountedPrice: 1 };
        break;
      case 'discount':
        sortOption = { discountPercentage: -1 };
        break;
      case 'rating':
        sortOption = { rating: -1 };
        break;
      case 'oldest':
        sortOption = { createdAt: 1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    // Execute query
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const deals = await Deal.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'name');

    const total = await Deal.countDocuments(query);

    res.json({
      success: true,
      data: deals,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get deals error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting deals'
    });
  }
});

// @route   GET /api/deals/featured
// @desc    Get featured deals
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const deals = await Deal.find({
      isActive: true,
      isFeatured: true,
      endDate: { $gt: new Date() }
    })
    .sort({ createdAt: -1 })
    .limit(8)
    .populate('createdBy', 'name');

    res.json({
      success: true,
      data: deals
    });
  } catch (error) {
    console.error('Get featured deals error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting featured deals'
    });
  }
});

// @route   GET /api/deals/:id
// @desc    Get single deal by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('relatedDeals');

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: 'Deal not found'
      });
    }

    // Increment views
    deal.views += 1;
    await deal.save();

    // Get reviews for this deal
    const reviews = await Review.find({
      deal: req.params.id,
      isActive: true
    })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 })
    .limit(10);

    res.json({
      success: true,
      data: {
        ...deal.toObject(),
        reviews
      }
    });
  } catch (error) {
    console.error('Get deal error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting deal'
    });
  }
});

// @route   POST /api/deals
// @desc    Create a new deal
// @access  Private (Admin)
router.post('/', [
  protect,
  admin,
  body('name')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('originalPrice')
    .isFloat({ min: 0 })
    .withMessage('Original price must be a positive number'),
  body('discountedPrice')
    .isFloat({ min: 0 })
    .withMessage('Discounted price must be a positive number'),
  body('discountPercentage')
    .isInt({ min: 0, max: 100 })
    .withMessage('Discount percentage must be between 0 and 100'),
  body('category')
    .isIn(['electronics', 'clothing', 'home', 'sports', 'books', 'beauty', 'food', 'other'])
    .withMessage('Invalid category'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  body('startDate')
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  body('endDate')
    .isISO8601()
    .withMessage('End date must be a valid date'),
  body('images')
    .isArray({ min: 1 })
    .withMessage('At least one image is required'),
  handleValidationErrors
], async (req, res) => {
  try {
    const dealData = {
      ...req.body,
      createdBy: req.user.id
    };

    const deal = await Deal.create(dealData);

    res.status(201).json({
      success: true,
      data: deal
    });
  } catch (error) {
    console.error('Create deal error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating deal'
    });
  }
});

// @route   PUT /api/deals/:id
// @desc    Update a deal
// @access  Private (Admin)
router.put('/:id', [
  protect,
  admin,
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters'),
  body('originalPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Original price must be a positive number'),
  body('discountedPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Discounted price must be a positive number'),
  handleValidationErrors
], async (req, res) => {
  try {
    const deal = await Deal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: 'Deal not found'
      });
    }

    res.json({
      success: true,
      data: deal
    });
  } catch (error) {
    console.error('Update deal error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating deal'
    });
  }
});

// @route   DELETE /api/deals/:id
// @desc    Delete a deal
// @access  Private (Admin)
router.delete('/:id', [protect, admin], async (req, res) => {
  try {
    const deal = await Deal.findByIdAndDelete(req.params.id);

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: 'Deal not found'
      });
    }

    res.json({
      success: true,
      message: 'Deal deleted successfully'
    });
  } catch (error) {
    console.error('Delete deal error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting deal'
    });
  }
});

// @route   POST /api/deals/:id/reviews
// @desc    Add a review to a deal
// @access  Private
router.post('/:id/reviews', [
  protect,
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('comment')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Comment must be between 10 and 1000 characters'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { rating, title, comment } = req.body;

    // Check if deal exists
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({
        success: false,
        message: 'Deal not found'
      });
    }

    // Check if user already reviewed this deal
    const existingReview = await Review.findOne({
      user: req.user.id,
      deal: req.params.id
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this deal'
      });
    }

    // Create review
    const review = await Review.create({
      user: req.user.id,
      deal: req.params.id,
      rating,
      title,
      comment
    });

    await review.populate('user', 'name avatar');

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error adding review'
    });
  }
});

// @route   GET /api/deals/:id/reviews
// @desc    Get reviews for a deal
// @access  Public
router.get('/:id/reviews', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const reviews = await Review.find({
      deal: req.params.id,
      isActive: true
    })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

    const total = await Review.countDocuments({
      deal: req.params.id,
      isActive: true
    });

    res.json({
      success: true,
      data: reviews,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting reviews'
    });
  }
});

module.exports = router; 