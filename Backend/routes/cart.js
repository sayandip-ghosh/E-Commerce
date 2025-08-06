const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validate');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Deal = require('../models/Deal');

const router = express.Router();

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id, isActive: true })
      .populate('items.product', 'name price images stock')
      .populate('items.deal', 'name discountedPrice images stock');

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: []
      });
    }

    res.json({
      success: true,
      data: cart
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting cart'
    });
  }
});

// @route   POST /api/cart/add
// @desc    Add item to cart
// @access  Private
router.post('/add', [
  protect,
  body('productId').optional().isMongoId().withMessage('Valid product ID is required'),
  body('dealId').optional().isMongoId().withMessage('Valid deal ID is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('selectedColor').optional().isString().withMessage('Color must be a string'),
  body('selectedSize').optional().isString().withMessage('Size must be a string'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { productId, dealId, quantity, selectedColor, selectedSize } = req.body;

    // Validate that either productId or dealId is provided, but not both
    if (!productId && !dealId) {
      return res.status(400).json({
        success: false,
        message: 'Either productId or dealId is required'
      });
    }

    if (productId && dealId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot add both product and deal to cart'
      });
    }

    // Get product or deal details
    let itemDetails;
    let price;
    let originalPrice;

    if (productId) {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock'
        });
      }
      itemDetails = {
        product: productId,
        name: product.name,
        price: product.price,
        originalPrice: product.compareAtPrice || product.price,
        image: product.images[0]
      };
      price = product.price;
      originalPrice = product.compareAtPrice || product.price;
    } else {
      const deal = await Deal.findById(dealId);
      if (!deal) {
        return res.status(404).json({
          success: false,
          message: 'Deal not found'
        });
      }
      if (deal.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock'
        });
      }
      if (new Date() > deal.endDate) {
        return res.status(400).json({
          success: false,
          message: 'Deal has expired'
        });
      }
      itemDetails = {
        deal: dealId,
        name: deal.name,
        price: deal.discountedPrice,
        originalPrice: deal.originalPrice,
        image: deal.images[0]
      };
      price = deal.discountedPrice;
      originalPrice = deal.originalPrice;
    }

    // Get or create cart
    let cart = await Cart.findOne({ user: req.user.id, isActive: true });
    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: []
      });
    }

    // Add item to cart
    const itemData = {
      ...itemDetails,
      quantity,
      selectedColor,
      selectedSize,
      price,
      originalPrice
    };

    await cart.addItem(itemData);

    res.json({
      success: true,
      data: cart
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error adding to cart'
    });
  }
});

// @route   PUT /api/cart/update/:itemId
// @desc    Update cart item quantity
// @access  Private
router.put('/update/:itemId', [
  protect,
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id, isActive: true });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    await cart.updateQuantity(itemId, quantity);

    res.json({
      success: true,
      data: cart
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating cart'
    });
  }
});

// @route   DELETE /api/cart/remove/:itemId
// @desc    Remove item from cart
// @access  Private
router.delete('/remove/:itemId', protect, async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id, isActive: true });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    await cart.removeItem(itemId);

    res.json({
      success: true,
      data: cart
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error removing from cart'
    });
  }
});

// @route   DELETE /api/cart/clear
// @desc    Clear cart
// @access  Private
router.delete('/clear', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id, isActive: true });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    await cart.clearCart();

    res.json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error clearing cart'
    });
  }
});

// @route   POST /api/cart/apply-coupon
// @desc    Apply coupon to cart
// @access  Private
router.post('/apply-coupon', [
  protect,
  body('code').notEmpty().withMessage('Coupon code is required'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { code } = req.body;

    const cart = await Cart.findOne({ user: req.user.id, isActive: true });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    // Mock coupon validation (replace with actual coupon logic)
    const validCoupons = {
      'SAVE10': { discount: 10, type: 'percentage' },
      'SAVE20': { discount: 20, type: 'percentage' },
      'FREESHIP': { discount: 5.99, type: 'fixed' }
    };

    const coupon = validCoupons[code];
    if (!coupon) {
      return res.status(400).json({
        success: false,
        message: 'Invalid coupon code'
      });
    }

    cart.coupon = {
      code,
      discount: coupon.discount,
      type: coupon.type
    };

    await cart.save();

    res.json({
      success: true,
      data: cart
    });
  } catch (error) {
    console.error('Apply coupon error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error applying coupon'
    });
  }
});

// @route   DELETE /api/cart/remove-coupon
// @desc    Remove coupon from cart
// @access  Private
router.delete('/remove-coupon', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id, isActive: true });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.coupon = null;
    await cart.save();

    res.json({
      success: true,
      data: cart
    });
  } catch (error) {
    console.error('Remove coupon error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error removing coupon'
    });
  }
});

module.exports = router; 