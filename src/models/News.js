const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now // Default aaj aur abhi ka time le lega
    },
    endDate: {
        type: Date,
        required: false // Expiry date (optional)
    },
    isActive: {
        type: Boolean,
        default: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);