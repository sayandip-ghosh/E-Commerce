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

// Admin protected routes
router.post('/', [
  protect,
  admin,
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Product name is required and must be less than 100 characters'),
  body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').isMongoId().withMessage('Valid category ID is required'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  handleValidationErrors
], createProduct);

router.put('/:id', [
  protect,
  admin,
  body('name').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Product name must be less than 100 characters'),
  body('description').optional().trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  handleValidationErrors
], updateProduct);

router.delete('/:id', protect, admin, deleteProduct);
router.patch('/:id/feature', protect, admin, toggleFeature);

module.exports = router;
