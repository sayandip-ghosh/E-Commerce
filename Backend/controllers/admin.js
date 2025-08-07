const Product = require('../models/Product');
const User = require('../models/User');
const { uploadProductImages, deleteProductImage } = require('../middleware/imageUpload');

// Dashboard Statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const featuredProducts = await Product.countDocuments({ isFeatured: true });
    const newArrivals = await Product.countDocuments({ isNewArrival: true });
    const bestSellers = await Product.countDocuments({ isBestSeller: true });
    
    // Get recent products
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name price images createdAt');

    // Get recent users
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email createdAt');

    res.json({
      success: true,
      data: {
        stats: {
          totalProducts,
          totalUsers,
          featuredProducts,
          newArrivals,
          bestSellers
        },
        recentProducts,
        recentUsers
      }
    });
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics'
    });
  }
};

// Product Management
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      compareAtPrice,
      brand,
      category,
      features,
      specifications,
      stock,
      isFeatured,
      isNewArrival,
      isBestSeller,
      seo
    } = req.body;

    // Handle image uploads
    let productImages = [];
    if (req.files && req.files.length > 0) {
      productImages = await uploadProductImages(req.files);
    }

    const product = new Product({
      name,
      description,
      price,
      compareAtPrice,
      brand,
      category,
      features,
      specifications,
      stock,
      isFeatured,
      isNewArrival,
      isBestSeller,
      seo,
      images: productImages,
      createdBy: req.user._id
    });

    await product.save();

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating product'
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    
    // Handle image uploads if any
    if (req.files && req.files.length > 0) {
      const newImages = await uploadProductImages(req.files);
      
      // If replacing images, delete old ones first
      if (updateData.replaceImages) {
        const oldProduct = await Product.findById(id);
        await Promise.all(oldProduct.images.map(image => deleteProductImage(image.url)));
        updateData.images = newImages;
      } else {
        // Append new images to existing ones
        const oldProduct = await Product.findById(id);
        updateData.images = [...oldProduct.images, ...newImages];
      }
    }

    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product'
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Delete product images from storage
    await Promise.all(product.images.map(image => deleteProductImage(image.url)));

    // Delete product from database
    await product.remove();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product'
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = '-createdAt',
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      inStock
    } = req.query;

    const query = {};

    // Apply filters
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (inStock === 'true') query.stock = { $gt: 0 };

    const products = await Product.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('category', 'name');

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      data: {
        products,
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
};

// User Management
exports.getUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = '-createdAt',
      search,
      role
    } = req.query;

    const query = {};

    // Apply filters
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (role) query.role = role;

    const users = await User.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select('-password');

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: {
        users,
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users'
    });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id)
      .select('-password')
      .populate('orders');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user details'
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Don't allow password updates through this route
    delete updateData.password;

    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user'
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.remove();

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user'
    });
  }
};
