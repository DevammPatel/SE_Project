// controllers/profileController.js
const NGO = require('../models/ngoModel');

// Update NGO profile
exports.updateNGOProfile = async (req, res) => {
    const { ngoId } = req.params;
    const updateData = req.body;

    try {
        const ngo = await NGO.findByIdAndUpdate(ngoId, updateData, { new: true });
        if (!ngo) {
            return res.status(404).json({ message: 'NGO not found' });
        }

        res.status(200).json({ message: 'NGO profile updated successfully', ngo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
