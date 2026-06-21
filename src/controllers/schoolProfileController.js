const SchoolProfile = require('../models/SchoolProfile');

// ==========================================
// 1. GET API (Public) - Website ke liye
// ==========================================
exports.getSchoolProfile = async (req, res) => {
    try {
        // FindOne use kar rahe hain kyunki ek hi profile hogi
        const profile = await SchoolProfile.findOne();
        
        if (!profile) {
            return res.status(404).json({ message: 'School profile not found' });
        }

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ==========================================
// 2. POST/PUT API (Secure) - Admin ke liye
// ==========================================
exports.updateSchoolProfile = async (req, res) => {
    try {
        // findOneAndUpdate mein 'upsert: true' ka matlab hai ki 
        // agar data nahi mila toh naya bana do, mila toh update kar do.
        const updatedProfile = await SchoolProfile.findOneAndUpdate(
            {}, // Empty filter kyunki hume pehla hi record update karna hai
            req.body, // Naya data jo Postman/Frontend se aayega
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(200).json({
            message: 'School profile updated successfully',
            profile: updatedProfile
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating profile', error: error.message });
    }
};