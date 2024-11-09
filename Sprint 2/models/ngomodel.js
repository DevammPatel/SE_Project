const mongoose = require('mongoose');

// Define the schema for an NGO
const ngoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // The name field is required
    },
    documents: [
        {
            type: String // This could be a URL or identifier of the document
        }
    ],
    verified: {
        type: Boolean,
        default: false // NGOs are unverified by default
    },
    statusUpdates: [
        {
            message: String,  // Status update message
            date: { type: Date, default: Date.now } // Timestamp for each update
        }
    ]
});

// Export the NGO model, which can now be used to interact with the "ngos" collection in MongoDB
module.exports = mongoose.model('NGO', ngoSchema);
