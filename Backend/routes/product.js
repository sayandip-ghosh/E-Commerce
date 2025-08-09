const express = require('express');
const { body } = require('express-validator');
const { protect, admin } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validate');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
  toggleFeature
} = require('../controllers/product');

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/new-arrivals', getNewArrivals);
router.get('/best-sellers', getBestSellers);
router.get('/:id', getProduct);

// Admin protected routes - Create Product
router.post('/', [
  protect,
  admin,
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Product title is required and must be less than 100 characters'),
  body('description').trim().isLength({ min: 1, max: 2000 }).withMessage('Description is required and must be less than 2000 characters'),
  body('brand').trim().isLength({ min: 1 }).withMessage('Brand is required'),
  body('mrp').isFloat({ min: 0.01 }).withMessage('MRP must be a positive number'),
  body('discount').optional().isFloat({ min: 0, max: 100 }).withMessage('Discount must be between 0 and 100'),
  body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
  body('features').isArray({ min: 1 }).withMessage('Features must be an array with at least one item'),
  body('images').optional().isArray().withMessage('Images must be an array'),
  handleValidationErrors
], createProduct);

// Admin protected routes - Update Product
router.put('/:id', [
  protect,
  admin,
  body('title').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Product title must be less than 100 characters'),
  body('description').optional().trim().isLength({ min: 1, max: 2000 }).withMessage('Description must be between 1 and 2000 characters'),
  body('brand').optional().trim().isLength({ min: 1 }).withMessage('Brand cannot be empty'),
  body('mrp').optional().isNumeric().isFloat({ min: 0 }).withMessage('MRP must be a positive number'),
  body('discount').optional().isNumeric().isFloat({ min: 0, max: 100 }).withMessage('Discount must be between 0 and 100'),
  body('rating').optional().isNumeric().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
  body('features').optional().isArray({ min: 1 }).withMessage('At least one feature is required'),
  body('features.*').optional().trim().notEmpty().withMessage('Feature cannot be empty'),
  body('images').optional().isArray().withMessage('Images must be an array'),
  handleValidationErrors
], updateProduct);

// Admin protected routes - Delete and Feature Toggle
router.delete('/:id', protect, admin, deleteProduct);
router.patch('/:id/feature', protect, admin, toggleFeature);

module.exports = router;
