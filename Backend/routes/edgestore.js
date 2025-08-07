const express = require('express');
const router = express.Router();
const { edgeStoreHandler } = require('../config/edgestore');

// EdgeStore routes
router.all('*', edgeStoreHandler);

module.exports = router;
