const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  deal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deal'
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide quantity'],
    min: [1, 'Quantity must be at least 1']
  },
  selectedColor: {
    type: String,
    trim: true
  },
  selectedSize: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please provide price']
  },
  originalPrice: {
    type: Number
  }
}, {
  timestamps: true
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema],
  subtotal: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  shipping: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
  coupon: {
    code: String,
    discount: Number,
    type: {
      type: String,
      enum: ['percentage', 'fixed'],
      default: 'percentage'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Calculate totals before saving
cartSchema.pre('save', function(next) {
  this.calculateTotals();
  next();
});

// Method to calculate cart totals
cartSchema.methods.calculateTotals = function() {
  let subtotal = 0;
  
  this.items.forEach(item => {
    subtotal += item.price * item.quantity;
  });
  
  this.subtotal = subtotal;
  
  // Calculate tax (example: 8.5%)
  this.tax = subtotal * 0.085;
  
  // Calculate shipping (free if subtotal > $50)
  this.shipping = subtotal > 50 ? 0 : 5.99;
  
  // Apply coupon discount
  let discount = 0;
  if (this.coupon && this.coupon.code) {
    if (this.coupon.type === 'percentage') {
      discount = subtotal * (this.coupon.discount / 100);
    } else {
      discount = this.coupon.discount;
    }
  }
  
  this.discount = discount;
  
  // Calculate total
  this.total = subtotal + this.tax + this.shipping - this.discount;
};

// Method to add item to cart
cartSchema.methods.addItem = function(itemData) {
  const existingItemIndex = this.items.findIndex(item => 
    item.product.toString() === itemData.product.toString() &&
    item.selectedColor === itemData.selectedColor &&
    item.selectedSize === itemData.selectedSize
  );
  
  if (existingItemIndex > -1) {
    this.items[existingItemIndex].quantity += itemData.quantity;
  } else {
    this.items.push(itemData);
  }
  
  this.calculateTotals();
  return this.save();
};

// Method to remove item from cart
cartSchema.methods.removeItem = function(itemId) {
  this.items = this.items.filter(item => item._id.toString() !== itemId.toString());
  this.calculateTotals();
  return this.save();
};

// Method to update item quantity
cartSchema.methods.updateQuantity = function(itemId, quantity) {
  const item = this.items.id(itemId);
  if (item) {
    item.quantity = quantity;
    this.calculateTotals();
    return this.save();
  }
  throw new Error('Item not found in cart');
};

// Method to clear cart
cartSchema.methods.clearCart = function() {
  this.items = [];
  this.calculateTotals();
  return this.save();
};

// Index for better query performance
cartSchema.index({ user: 1, isActive: 1 });

module.exports = mongoose.model('Cart', cartSchema); 