const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);

      if (!req.user) {
        return res.status(401).json({ 
          success: false, 
          message: 'Not authorized, user not found' 
        });
      }

      if (!req.user.isActive) {
        return res.status(401).json({ 
          success: false, 
          message: 'Account is deactivated' 
        });
      }

      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized, invalid token' 
      });
    }
  } else {
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized, no token provided' 
    });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Admin privileges required' 
    });
  }
};

const user = (req, res, next) => {
  if (req.user && req.user.role === 'user') {
    next();
  } else {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. User privileges required' 
    });
  }
};

module.exports = {
  protect,
  admin,
  user
};
