const NGO = require('../models/ngoModel');
const VerifiedNGO = require('../models/verifiedNGOModel'); // Import the new Verified NGO model

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
            // Move NGO details to the Verified NGO collection
            const verifiedNGO = new VerifiedNGO({
                name: ngo.name,
                documents: ngo.documents,
                statusUpdates: ngo.statusUpdates,
                verifiedDate: new Date()
            });

            await verifiedNGO.save(); // Save the verified NGO details

            // Remove the NGO from the original NGO collection after approval
            await NGO.findByIdAndDelete(ngoId);

            res.status(200).json({ message: 'NGO successfully approved and moved to Verified NGOs', verifiedNGO });
        } else if (status === 'disapproved') {
            // Flag the NGO as rejected and add a status update
            ngo.verified = false;
            ngo.statusUpdates.push({ message: 'NGO disapproved', date: new Date() });
            ngo.rejected = true; // Mark the NGO as rejected

            await ngo.save(); // Save the rejected status

            res.status(200).json({ message: 'NGO disapproved', ngo });
        } else {
            return res.status(400).json({ message: 'Invalid status' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
