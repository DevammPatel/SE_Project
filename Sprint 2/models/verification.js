// controllers/verificationController.js
// controllers/verificationController.js
const NGO = require('../models/ngoModel');

// Fetch NGO details for verification review
exports.getNGODetailsForVerification = async (req, res) => {
    const { ngoId } = req.params;

    try {
        const ngo = await NGO.findById(ngoId);
        if (!ngo) {
            return res.status(404).json({ message: 'NGO not found' });
        }

        // Return NGO details for review
        res.status(200).json(ngo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Approve or disapprove NGO after review
exports.verifyNGO = async (req, res) => {
    const { ngoId } = req.params;
    const { status } = req.body; // status should be 'approved' or 'disapproved'

    try {
        const ngo = await NGO.findById(ngoId);
        if (!ngo) {
            return res.status(404).json({ message: 'NGO not found' });
        }

        if (status === 'approved') {
            ngo.verified = true;
            ngo.statusUpdates.push({ message: 'NGO approved', date: new Date() });
        } else if (status === 'disapproved') {
            ngo.verified = false;
            ngo.statusUpdates.push({ message: 'NGO disapproved', date: new Date() });
        } else {
            return res.status(400).json({ message: 'Invalid status' });
        }

        await ngo.save();

        res.status(200).json({ message: `NGO ${status} successfully`, ngo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
