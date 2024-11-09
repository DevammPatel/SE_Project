const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');

// Route to search and filter NGOs
router.get('/search', listingController.searchNGOs);

module.exports = router;
