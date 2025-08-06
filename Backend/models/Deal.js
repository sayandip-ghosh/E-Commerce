const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a deal name'],
    trim: true,
    maxlength: [100, 'Deal name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  originalPrice: {
    type: Number,
    required: [true, 'Please provide original price']
  },
  discountedPrice: {
    type: Number,
    required: [true, 'Please provide discounted price']
  },
  discountPercentage: {
    type: Number,
    required: [true, 'Please provide discount percentage'],
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot exceed 100%']
  },
  images: [{
    type: String,
    required: [true, 'Please provide at least one image']
  }],
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['electronics', 'clothing', 'home', 'sports', 'books', 'beauty', 'food', 'other']
  },
  specs: {
    type: String,
    maxlength: [500, 'Specifications cannot be more than 500 characters']
  },
  features: [{
    type: String,
    maxlength: [100, 'Feature cannot be more than 100 characters']
  }],
  specifications: {
    type: Map,
    of: String
  },
  colors: [{
    type: String,
    trim: true
  }],
  sizes: [{
    type: String,
    trim: true
  }],
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: [0, 'Stock cannot be negative']
  },
  soldCount: {
    type: Number,
    default: 0,
    min: [0, 'Sold count cannot be negative']
  },
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
  startDate: {
    type: Date,
    required: [true, 'Please provide start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide end date']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  relatedDeals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deal'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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

// Virtual for time left
dealSchema.virtual('timeLeft').get(function() {
  const now = new Date();
  const end = new Date(this.endDate);
  const diff = end - now;
  
  if (diff <= 0) {
    return 'Expired';
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
});

// Virtual for savings amount
dealSchema.virtual('savings').get(function() {
  return this.originalPrice - this.discountedPrice;
});

// Virtual for savings percentage
dealSchema.virtual('savingsPercentage').get(function() {
  return Math.round(((this.originalPrice - this.discountedPrice) / this.originalPrice) * 100);
});

// Index for better query performance
dealSchema.index({ isActive: 1, endDate: 1 });
dealSchema.index({ category: 1, isActive: 1 });
dealSchema.index({ isFeatured: 1, isActive: 1 });

// Ensure virtuals are included in JSON output
dealSchema.set('toJSON', { virtuals: true });
dealSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Deal', dealSchema); 