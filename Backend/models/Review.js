const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  deal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deal'
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  title: {
    type: String,
    required: [true, 'Please provide a review title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  comment: {
    type: String,
    required: [true, 'Please provide a review comment'],
    trim: true,
    maxlength: [1000, 'Comment cannot be more than 1000 characters']
  },
  images: [{
    type: String
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isHelpful: {
    type: Number,
    default: 0
  },
  helpfulVotes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    vote: {
      type: Number,
      enum: [1, -1] // 1 for helpful, -1 for not helpful
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  adminResponse: {
    comment: String,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: Date
  }
}, {
  timestamps: true
});

// Ensure either product or deal is provided, but not both
reviewSchema.pre('save', function(next) {
  if (!this.product && !this.deal) {
    return next(new Error('Review must be associated with either a product or deal'));
  }
  if (this.product && this.deal) {
    return next(new Error('Review cannot be associated with both product and deal'));
  }
  next();
});

// Update product/deal rating when review is saved
reviewSchema.post('save', async function() {
  await this.constructor.updateAverageRating(this.product || this.deal);
});

// Update product/deal rating when review is removed
reviewSchema.post('remove', async function() {
  await this.constructor.updateAverageRating(this.product || this.deal);
});

// Static method to update average rating
reviewSchema.statics.updateAverageRating = async function(itemId) {
  const stats = await this.aggregate([
    {
      $match: {
        $or: [
          { product: itemId },
          { deal: itemId }
        ],
        isActive: true
      }
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        numReviews: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    const averageRating = Math.round(stats[0].averageRating * 10) / 10;
    const numReviews = stats[0].numReviews;

    // Update product or deal
    const Product = mongoose.model('Product');
    const Deal = mongoose.model('Deal');

    await Product.findByIdAndUpdate(itemId, {
      rating: averageRating,
      reviewCount: numReviews
    });

    await Deal.findByIdAndUpdate(itemId, {
      rating: averageRating,
      reviewCount: numReviews
    });
  }
};

// Index for better query performance
reviewSchema.index({ product: 1, isActive: 1 });
reviewSchema.index({ deal: 1, isActive: 1 });
reviewSchema.index({ user: 1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Review', reviewSchema); 