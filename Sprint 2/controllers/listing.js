const NGO = require('../models/ngoModel');

// Search and filter NGOs
exports.searchNGOs = async (req, res) => {
    const { verified, name, categories } = req.query;

    const filters = {};

    // Filter by verification status
    if (verified) {
        filters.verified = verified === 'true';
    }

    // Filter by name (case-insensitive)
    if (name) {
        filters.name = new RegExp(name, 'i');
    }

    // Filter by categories (array of categories to match)
    if (categories) {
        const categoryArray = categories.split(','); // If multiple categories are passed as comma-separated values
        filters.categories = { $in: categoryArray }; // Search for NGOs with any of these categories
    }

    try {
        const ngos = await NGO.find(filters);
        res.status(200).json(ngos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
