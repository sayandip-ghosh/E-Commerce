const Product = require('../models/Product');

// @desc    Get all products with filtering, sorting, and pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      brand,
      minPrice,
      maxPrice,
      rating,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search,
      featured,
      newArrival,
      bestSeller
    } = req.query;

    // Build query object
    const queryObj = { isActive: true };

    if (category) queryObj.category = category;
    if (brand) queryObj.brand = new RegExp(brand, 'i');
    if (rating) queryObj.rating = { $gte: rating };
    if (featured === 'true') queryObj.isFeatured = true;
    if (newArrival === 'true') queryObj.isNewArrival = true;
    if (bestSeller === 'true') queryObj.isBestSeller = true;

    // Price range filter
    if (minPrice || maxPrice) {
      queryObj.price = {};
      if (minPrice) queryObj.price.$gte = minPrice;
      if (maxPrice) queryObj.price.$lte = maxPrice;
    }

    // Search functionality
    if (search) {
      queryObj.$text = { $search: search };
    }

    // Build sort object
    const sortObj = {};
    sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const products = await Product.find(queryObj)
      .populate('category', 'name')
      .populate('createdBy', 'name email')
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(queryObj);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalProducts: total,
          hasNextPage: page < Math.ceil(total / limit),
          hasPrevPage: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting products'
    });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name description')
      .populate('createdBy', 'name email');

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Increment view count
    product.views += 1;
    await product.save();

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Get product error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error getting product'
    });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin only)
const createProduct = async (req, res) => {
  try {
    // Add the admin who created the product
    req.body.createdBy = req.user.id;

    const product = await Product.create(req.body);

    const populatedProduct = await Product.findById(product._id)
      .populate('category', 'name')
      .populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: populatedProduct
    });

  } catch (error) {
    console.error('Create product error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error creating product'
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin only)
const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('category', 'name').populate('createdBy', 'name email');

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });

  } catch (error) {
    console.error('Update product error:', error);
    
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error updating product'
    });
  }
};

// @desc    Delete product (soft delete)
// @route   DELETE /api/products/:id
// @access  Private (Admin only)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Soft delete - set isActive to false
    product.isActive = false;
    await product.save();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Delete product error:', error);
    
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error deleting product'
    });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ 
      isActive: true, 
      isFeatured: true 
    })
      .populate('category', 'name')
      .sort('-createdAt')
      .limit(8);

    res.json({
      success: true,
      data: products
    });

  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting featured products'
    });
  }
};

// @desc    Get new arrival products
// @route   GET /api/products/new-arrivals
// @access  Public
const getNewArrivals = async (req, res) => {
  try {
    const products = await Product.find({ 
      isActive: true, 
      isNewArrival: true 
    })
      .populate('category', 'name')
      .sort('-createdAt')
      .limit(8);

    res.json({
      success: true,
      data: products
    });

  } catch (error) {
    console.error('Get new arrivals error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting new arrivals'
    });
  }
};

// @desc    Get best seller products
// @route   GET /api/products/best-sellers
// @access  Public
const getBestSellers = async (req, res) => {
  try {
    const products = await Product.find({ 
      isActive: true, 
      isBestSeller: true 
    })
      .populate('category', 'name')
      .sort('-soldCount')
      .limit(8);

    res.json({
      success: true,
      data: products
    });

  } catch (error) {
    console.error('Get best sellers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting best sellers'
    });
  }
};

// @desc    Toggle product feature status
// @route   PATCH /api/products/:id/feature
// @access  Private (Admin only)
const toggleFeature = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product.isFeatured = !product.isFeatured;
    await product.save();

    res.json({
      success: true,
      message: `Product ${product.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      data: { isFeatured: product.isFeatured }
    });

  } catch (error) {
    console.error('Toggle feature error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error toggling feature status'
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
  toggleFeature
};
