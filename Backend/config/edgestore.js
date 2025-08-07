// Ensure environment variables are loaded
require('dotenv').config();

const { initEdgeStore } = require('@edgestore/server');
const { createEdgeStoreExpressHandler } = require('@edgestore/server/adapters/express');

// Debug environment variables
console.log('🔧 EdgeStore Config Debug:');
console.log('ACCESS_KEY:', process.env.EDGE_STORE_ACCESS_KEY ? 'SET' : 'NOT SET');
console.log('SECRET_KEY:', process.env.EDGE_STORE_SECRET_KEY ? 'SET' : 'NOT SET');

const es = initEdgeStore.create();

// This is the main router for the EdgeStore buckets
const edgeStoreRouter = es.router({
  // Product images bucket with validation
  productImages: es.imageBucket({
    maxSize: 1024 * 1024 * 10, // 10MB
    accept: ['image/jpeg', 'image/png', 'image/webp'],
    beforeUpload: ({ ctx, input, fileInfo }) => {
      return true; // allow upload
    },
    beforeDelete: ({ ctx, input }) => {
      return true; // allow delete
    }
  }),
});

// Create the Express handler
let edgeStoreHandler;
try {
  edgeStoreHandler = createEdgeStoreExpressHandler({
    router: edgeStoreRouter,
  });
  console.log('✅ EdgeStore handler created successfully');
} catch (error) {
  console.error('❌ EdgeStore handler creation failed:', error.message);
  // Create a dummy handler for development
  edgeStoreHandler = (req, res) => {
    res.status(503).json({
      error: 'EdgeStore service unavailable',
      message: 'Please check your EdgeStore configuration'
    });
  };
}

module.exports = {
  edgeStoreHandler,
  edgeStoreRouter
};
