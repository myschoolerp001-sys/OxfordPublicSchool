const mongoose = require('mongoose');

const topperSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true // e.g., "12th Science", "10th"
    },
    passingYear: {
        type: String,
        required: true // e.g., "2023", "2024"
    },
    percentage: {
        type: String,
        required: true // e.g., "98.5%"
    },
    photoUrl: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Topper', topperSchema);