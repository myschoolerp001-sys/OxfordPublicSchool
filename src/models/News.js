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
    date: {
        type: Date,
        default: Date.now // Default aaj ki date le lega
    },
    isActive: {
        type: Boolean,
        default: true // False karne par website par dikhna band ho jayega
    }
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);