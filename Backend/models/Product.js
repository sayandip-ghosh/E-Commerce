const mongoose = require('mongoose');

// Image schema for multiple product images
const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  isPrimary: {
    type: Boolean,
    default: false
  }
});

const productSchema = new mongoose.Schema({
  // Changed from 'name' to 'title' to match frontend
  title: {
    type: String,
    required: [true, 'Please provide a product title'],
    trim: true,
    maxlength: [100, 'Product title cannot be more than 100 characters'],
    unique: true // Make title unique as requested
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  // Changed from 'price' to 'mrp' to match frontend
  mrp: {
    type: Number,
    required: [true, 'Please provide an MRP'],
    min: [0, 'MRP cannot be negative']
  },
  // Calculated from discount percentage
  compareAtPrice: {
    type: Number,
    min: [0, 'Compare at price cannot be negative']
  },
  // Changed from 'discountPercentage' to 'discount' to match frontend
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot exceed 100%']
  },
  // Store image URLs directly from frontend
  images: [{
    type: String,
    trim: true
  }],
  brand: {
    type: String,
    required: [true, 'Please provide a brand'],
    trim: true
  },
  // Maps to 'features' array in frontend
  features: [{
    type: String,
    trim: true,
    maxlength: [200, 'Feature cannot be more than 200 characters']
  }],
  // Optional fields for future use
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  specs: {
    type: String,
    maxlength: [1000, 'Specifications cannot be more than 1000 characters']
  },
  specifications: {
    type: Map,
    of: String
  },
  colors: [{
    name: String,
    code: String,
    available: {
      type: Boolean,
      default: true
    }
  }],
  sizes: [{
    name: String,
    available: {
      type: Boolean,
      default: true
    }
  }],
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  soldCount: {
    type: Number,
    default: 0,
    min: [0, 'Sold count cannot be negative']
  },
  // Maps directly to 'rating' in frontend
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5']
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: [0, 'Review count cannot be negative']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isNewArrival: {
    type: Boolean,
    default: false
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  weight: {
    type: Number,
    min: [0, 'Weight cannot be negative']
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  shipping: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    freeShipping: {
      type: Boolean,
      default: false
    },
    shippingCost: {
      type: Number,
      default: 0
    }
  },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  views: {
    type: Number,
    default: 0
  },
  clicks: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Virtual for calculated sale price based on discount
productSchema.virtual('salePrice').get(function () {
  if (this.discount > 0) {
    return this.mrp - (this.mrp * this.discount / 100);
  }
  return this.mrp;
});

// Virtual for savings amount
productSchema.virtual('savings').get(function () {
  if (this.discount > 0) {
    return this.mrp * this.discount / 100;
  }
  return 0;
});

// Pre-save middleware to validate features
productSchema.pre('save', function(next) {
  // Ensure at least one non-empty feature
  const validFeatures = this.features.filter(feature => feature && feature.trim());
  if (validFeatures.length === 0) {
    return next(new Error('At least one feature is required'));
  }
  
  // Update features to only include valid ones
  this.features = validFeatures;
  
  // Calculate compareAtPrice if discount exists
  if (this.discount > 0) {
    this.compareAtPrice = this.mrp;
  }
  
  next();
});

// Drop existing indexes and recreate clean ones
productSchema.pre('init', function() {
  // This will help ensure clean indexes
  this.constructor.collection.dropIndexes().catch(() => {
    // Ignore errors if indexes don't exist
  });
});

// Index for better query performance
productSchema.index({ title: 1 }, { unique: true }); // Unique index on title only
productSchema.index({ isActive: 1, category: 1 });
productSchema.index({ isFeatured: 1, isActive: 1 });
productSchema.index({ isNewArrival: 1, isActive: 1 });
productSchema.index({ isBestSeller: 1, isActive: 1 });
productSchema.index({ title: 'text', description: 'text', brand: 'text' });
productSchema.index({ brand: 1 });
productSchema.index({ mrp: 1 });
productSchema.index({ rating: -1 });

// Ensure virtuals are included in JSON output
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);