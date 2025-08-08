const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const adminController = require('../controllers/admin');
const multer = require('multer');

// Configure multer for handling file uploads
const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Apply admin authentication to all routes
router.use(protect, admin);

// Dashboard Routes
router.get('/dashboard/stats', adminController.getDashboardStats);

// Product Routes
router.get('/products', adminController.getProducts);
router.post('/products', upload.array('images', 4), adminController.createProduct);
router.put('/products/:id', upload.array('images', 4), adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);

// User Management Routes
router.get('/users', adminController.getUsers);
router.get('/users/:id', adminController.getUserDetails);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;