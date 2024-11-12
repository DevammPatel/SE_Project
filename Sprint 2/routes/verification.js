const express = require('express');
const router = express.Router();
const verificationController = require('../controllers/verificationController');

// Fetch NGO details for verification
router.get('/:ngoId', verificationController.getNGODetailsForVerification);

// Approve or disapprove NGO
router.post('/:ngoId/verify', verificationController.verifyNGO);

module.exports = router;
