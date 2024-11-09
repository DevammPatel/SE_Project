const mongoose = require('mongoose');

// Define the schema for a Verified NGO
const verifiedNGOSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    documents: [
        {
            type: String // URLs or identifiers of verified documents
        }
    ],
    statusUpdates: [
        {
            message: String,
            date: { type: Date, default: Date.now }
        }
    ],
    verifiedDate: {
        type: Date,
        default: Date.now // When the NGO was verified
    }
});

// Export the Verified NGO model
module.exports = mongoose.model('VerifiedNGO', verifiedNGOSchema);
