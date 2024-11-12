// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.put('/update/:ngoId', profileController.updateNGOProfile);

module.exports = router;
