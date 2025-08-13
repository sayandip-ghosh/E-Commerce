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

    // Price range filter using mrp field
    if (minPrice || maxPrice) {
      queryObj.mrp = {};
      if (minPrice) queryObj.mrp.$gte = minPrice;
      if (maxPrice) queryObj.mrp.$lte = maxPrice;
    }

    // Search functionality using title field
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

    // Transform products data to match frontend expectations
    const transformedProducts = products.map(product => ({
      ...product.toObject(),
      id: product._id,
      name: product.title,
      price: `₹${product.salePrice.toFixed(0)}`,
      originalPrice: `₹${product.mrp.toFixed(0)}`,
      discount: `${product.discount}%`,
      category: product.category?.name || 'General'
    }));

    res.json({
      success: true,
      data: {
        products: transformedProducts,
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

    // Transform product data to match frontend expectations
    const transformedProduct = {
      ...product.toObject(),
      id: product._id,
      name: product.title,
      price: `₹${product.salePrice.toFixed(0)}`,
      originalPrice: `₹${product.mrp.toFixed(0)}`,
      discount: `${product.discount}%`,
      category: product.category?.name || 'General',
      reviews: [] // TODO: Implement reviews system
    };

    res.json({
      success: true,
      data: transformedProduct
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
    console.log('Request body:', req.body); // Debug log
    console.log('User from request:', req.user); // Debug log

    // Extract and validate frontend form data
    const {
      title,
      description,
      brand,
      mrp,
      discount = 0,
      rating = 0,
      features,
      images
    } = req.body;

    // Validate required fields
    if (!title || !description || !brand || !mrp) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, description, brand, and mrp'
      });
    }

    // Ensure user exists
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
    }

    // Filter out empty features and images
    const validFeatures = features ? features.filter(feature => feature.trim()) : [];
    const validImages = images ? images.filter(image => image.trim()) : [];

    // Ensure at least one feature
    if (validFeatures.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one feature is required'
      });
    }

    // Check if title already exists
    const existingProduct = await Product.findOne({ title: title.trim() });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'A product with this title already exists'
      });
    }

    // Create product data object
    const productData = {
      title: title.trim(),
      description: description.trim(),
      brand: brand.trim(),
      mrp: parseFloat(mrp),
      discount: parseFloat(discount) || 0,
      rating: parseFloat(rating) || 0,
      features: validFeatures,
      images: validImages,
      createdBy: req.user.id
    };

    console.log('Creating product with data:', productData); // Debug log

    const product = await Product.create(productData);

    const populatedProduct = await Product.findById(product._id)
      .populate('category', 'name')
      .populate('createdBy', 'name email');

    // Transform product data to match frontend expectations
    const transformedProduct = {
      ...populatedProduct.toObject(),
      id: populatedProduct._id,
      name: populatedProduct.title,
      price: `₹${populatedProduct.salePrice.toFixed(0)}`,
      originalPrice: `₹${populatedProduct.mrp.toFixed(0)}`,
      discount: `${populatedProduct.discount}%`,
      category: populatedProduct.category?.name || 'General'
    };

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: transformedProduct
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

    // Handle duplicate key errors for title
    if (error.code === 11000) {
      if (error.keyPattern && error.keyPattern.title) {
        return res.status(400).json({
          success: false,
          message: 'A product with this title already exists'
        });
      }
      // Handle other potential duplicate keys
      const field = Object.keys(error.keyPattern || {})[0] || 'field';
      return res.status(400).json({
        success: false,
        message: `A product with this ${field} already exists`
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error creating product',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
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

    // Extract and validate frontend form data
    const {
      title,
      description,
      brand,
      mrp,
      discount,
      rating,
      features,
      images
    } = req.body;

    // Filter out empty features and images
    const validFeatures = features ? features.filter(feature => feature.trim()) : [];
    const validImages = images ? images.filter(image => image.trim()) : [];

    // Update product data
    const updateData = {
      ...(title && { title: title.trim() }),
      ...(description && { description: description.trim() }),
      ...(brand && { brand: brand.trim() }),
      ...(mrp && { mrp: parseFloat(mrp) }),
      ...(discount !== undefined && { discount: parseFloat(discount) }),
      ...(rating !== undefined && { rating: parseFloat(rating) }),
      ...(features && { features: validFeatures }),
      ...(images && { images: validImages })
    };

    product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).populate('category', 'name').populate('createdBy', 'name email');

    // Transform product data to match frontend expectations
    const transformedProduct = {
      ...product.toObject(),
      id: product._id,
      name: product.title,
      price: `₹${product.salePrice.toFixed(0)}`,
      originalPrice: `₹${product.mrp.toFixed(0)}`,
      discount: `${product.discount}%`,
      category: product.category?.name || 'General'
    };

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: transformedProduct
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

    // Transform products data to match frontend expectations
    const transformedProducts = products.map(product => ({
      ...product.toObject(),
      id: product._id,
      name: product.title,
      price: `₹${product.salePrice.toFixed(0)}`,
      originalPrice: `₹${product.mrp.toFixed(0)}`,
      discount: `${product.discount}%`,
      category: product.category?.name || 'General'
    }));

    res.json({
      success: true,
      data: transformedProducts
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

    // Transform products data to match frontend expectations
    const transformedProducts = products.map(product => ({
      ...product.toObject(),
      id: product._id,
      name: product.title,
      price: `₹${product.salePrice.toFixed(0)}`,
      originalPrice: `₹${product.mrp.toFixed(0)}`,
      discount: `${product.discount}%`,
      category: product.category?.name || 'General'
    }));

    res.json({
      success: true,
      data: transformedProducts
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

    // Transform products data to match frontend expectations
    const transformedProducts = products.map(product => ({
      ...product.toObject(),
      id: product._id,
      name: product.title,
      price: `₹${product.salePrice.toFixed(0)}`,
      originalPrice: `₹${product.mrp.toFixed(0)}`,
      discount: `${product.discount}%`,
      category: product.category?.name || 'General'
    }));

    res.json({
      success: true,
      data: transformedProducts
    });

  } catch (error) {
    console.error('Get best sellers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting best sellers'
    });
  }
};

// @desc    Get deals (products with discounts)
// @route   GET /api/products/deals
// @access  Public
const getDeals = async (req, res) => {
  try {
    const products = await Product.find({ 
      isActive: true, 
      discount: { $gt: 0 } 
    })
      .populate('category', 'name')
      .sort('-discount')
      .limit(8);

    // Transform products data to match frontend expectations
    const transformedProducts = products.map(product => ({
      ...product.toObject(),
      id: product._id,
      name: product.title,
      price: `₹${product.salePrice.toFixed(0)}`,
      originalPrice: `₹${product.mrp.toFixed(0)}`,
      discount: `${product.discount}%`,
      category: product.category?.name || 'General'
    }));

    res.json({
      success: true,
      data: transformedProducts
    });

  } catch (error) {
    console.error('Get deals error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting deals'
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
  getDeals,
  toggleFeature
};
