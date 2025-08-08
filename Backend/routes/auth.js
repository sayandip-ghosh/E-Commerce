const express = require('express');
const { body } = require('express-validator');
const { protect, admin } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validate');
const {
  registerUser,
  loginUser,
  registerAdmin,
  loginAdmin,
  getProfile,
  logout
} = require('../controllers/auth');

const router = express.Router();

// User Authentication Routes
router.post('/register', [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  handleValidationErrors
], registerUser);

router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors
], loginUser);

// Admin Authentication Routes
// First admin registration (no auth required)
router.post('/admin/setup', [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  // handleValidationErrors
], registerAdmin);

// Additional admin registration (auth required)
router.post('/admin/register', [
  protect,
  admin,
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  handleValidationErrors
], registerAdmin);

router.post('/admin/login', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors
], loginAdmin);

// Shared Routes
router.get('/profile', protect, getProfile);
router.post('/logout', protect, logout);

module.exports = router;
