const express = require('express');
const { protect, admin } = require('../middleware/auth');
const User = require('../models/User');
const Product = require('../models/Product');
const Deal = require('../models/Deal');
const Order = require('../models/Order');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(admin);

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard stats
// @access  Private (Admin)
router.get('/dashboard', async (req, res) => {
  try {
    // Get counts
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    const dealCount = await Deal.countDocuments();
    const orderCount = await Order.countDocuments();

    // Get recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');

    // Get revenue stats
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $in: ['delivered', 'shipped'] } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    // Get top selling products
    const topProducts = await Product.find()
      .sort({ soldCount: -1 })
      .limit(5)
      .select('name soldCount price');

    res.json({
      success: true,
      data: {
        stats: {
          users: userCount,
          products: productCount,
          deals: dealCount,
          orders: orderCount,
          revenue: totalRevenue[0]?.total || 0
        },
        recentOrders,
        topProducts
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/stats
// @desc    Get detailed statistics
// @access  Private (Admin)
router.get('/stats', async (req, res) => {
  try {
    // Monthly revenue
    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          },
          status: { $in: ['delivered', 'shipped'] }
        }
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          revenue: { $sum: '$total' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Category distribution
    const categoryStats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        monthlyRevenue,
        categoryStats
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router; 