# E-Commerce Backend API

A comprehensive Node.js/Express backend for an e-commerce application with deals, products, users, orders, and admin functionality.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Deals Management**: Time-limited deals with discounts and countdown timers
- **Product Management**: Full CRUD operations for products
- **Shopping Cart**: Add, update, remove items with coupon support
- **Order Processing**: Complete order lifecycle management
- **Reviews & Ratings**: Product and deal reviews with ratings
- **Admin Dashboard**: Analytics and management tools
- **Security**: Rate limiting, input validation, CORS protection

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## 🛠️ Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create .env file with your configuration
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 🗄️ Database Models

### User
- Authentication fields (email, password)
- Profile information (name, phone, address)
- Role-based access (user/admin)
- Favorites and wishlist

### Deal
- Time-limited offers with countdown
- Discount percentages and pricing
- Multiple images and specifications
- Category and tagging system

### Product
- Regular products (non-deal items)
- Pricing with compare-at-price
- Inventory management
- SEO optimization

### Cart
- Shopping cart with items
- Automatic total calculations
- Coupon support
- Tax and shipping calculations

### Order
- Complete order processing
- Multiple payment methods
- Order status tracking
- Shipping and billing addresses

### Review
- Product and deal reviews
- Rating system (1-5 stars)
- User verification
- Admin moderation

## 🔌 API Endpoints

### Authentication
```
POST /api/auth/register     - Register new user
POST /api/auth/login        - Login user
GET  /api/auth/me          - Get current user
PUT  /api/auth/update-profile - Update profile
PUT  /api/auth/change-password - Change password
POST /api/auth/logout       - Logout user
POST /api/auth/forgot-password - Forgot password
```

### Deals
```
GET    /api/deals          - Get all deals (with filtering)
GET    /api/deals/featured - Get featured deals
GET    /api/deals/:id      - Get single deal
POST   /api/deals          - Create deal (Admin)
PUT    /api/deals/:id      - Update deal (Admin)
DELETE /api/deals/:id      - Delete deal (Admin)
POST   /api/deals/:id/reviews - Add review to deal
GET    /api/deals/:id/reviews - Get deal reviews
```

### Products
```
GET    /api/products       - Get all products (with filtering)
GET    /api/products/featured - Get featured products
GET    /api/products/new   - Get new products
GET    /api/products/bestsellers - Get bestsellers
GET    /api/products/:id   - Get single product
POST   /api/products       - Create product (Admin)
PUT    /api/products/:id   - Update product (Admin)
DELETE /api/products/:id   - Delete product (Admin)
POST   /api/products/:id/reviews - Add review to product
GET    /api/products/:id/reviews - Get product reviews
```

### Cart
```
GET    /api/cart           - Get user's cart
POST   /api/cart/add       - Add item to cart
PUT    /api/cart/update/:itemId - Update item quantity
DELETE /api/cart/remove/:itemId - Remove item from cart
DELETE /api/cart/clear     - Clear cart
POST   /api/cart/apply-coupon - Apply coupon
DELETE /api/cart/remove-coupon - Remove coupon
```

### Orders
```
GET    /api/orders         - Get user's orders
POST   /api/orders         - Create new order
GET    /api/orders/:id     - Get single order
PUT    /api/orders/:id/status - Update order status (Admin)
GET    /api/orders/admin/all - Get all orders (Admin)
```

### Categories
```
GET    /api/categories     - Get all categories
POST   /api/categories     - Create category (Admin)
```

### Reviews
```
GET    /api/reviews        - Get reviews with filtering
DELETE /api/reviews/:id    - Delete review (Admin)
```

### Admin
```
GET    /api/admin/dashboard - Get dashboard stats
GET    /api/admin/stats    - Get detailed statistics
```

### Users
```
GET    /api/users/profile  - Get user profile
GET    /api/users/admin/all - Get all users (Admin)
```

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📊 Example API Usage

### Register a new user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get all deals
```bash
curl -X GET "http://localhost:5000/api/deals?page=1&limit=12&category=electronics"
```

### Add item to cart
```bash
curl -X POST http://localhost:5000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "dealId": "deal-id-here",
    "quantity": 2,
    "selectedColor": "Black",
    "selectedSize": "Large"
  }'
```

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Input Validation**: express-validator for request validation
- **Rate Limiting**: Prevents abuse with request limits
- **CORS Protection**: Configured for frontend integration
- **Helmet**: Security headers for Express
- **Role-based Access**: Admin and user role management

## 📈 Performance Features

- **Database Indexing**: Optimized queries with MongoDB indexes
- **Pagination**: Efficient data loading with page limits
- **Population**: Automatic related data loading
- **Virtual Fields**: Computed fields for deals (time left, savings)
- **Aggregation**: Complex analytics queries

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run with coverage
npm run test:coverage
```

## 🚀 Deployment

### Environment Variables
```bash
# Production
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://your-production-db
JWT_SECRET=your-production-secret
FRONTEND_URL=https://your-frontend-domain.com
```

### PM2 (Recommended)
```bash
npm install -g pm2
pm2 start server.js --name "ecommerce-api"
pm2 save
pm2 startup
```

### Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository. 