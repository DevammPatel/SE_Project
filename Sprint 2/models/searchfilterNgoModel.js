const mongoose = require('mongoose');

// Define the schema for an NGO
const ngoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    documents: [
        {
            type: String // URLs or identifiers of documents
        }
    ],
    verified: {
        type: Boolean,
        default: false // NGO starts as unverified
    },
    rejected: {
        type: Boolean,
        default: false // Flag to track rejected NGOs
    },
    statusUpdates: [
        {
            message: String,
            date: { type: Date, default: Date.now }
        }
    ],
    categories: [
        {
            type: String, // Category names like "women safety", "child development"
            enum: ['women safety', 'child development', 'child education', 'environment', 'healthcare', 'disaster relief', 'animal welfare'], // Add more as needed
            required: true
        }
    ]
});

// Export the NGO model
module.exports = mongoose.model('NGO', ngoSchema);
