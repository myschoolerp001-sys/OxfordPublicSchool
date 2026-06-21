const mongoose = require('mongoose');

const schoolProfileSchema = new mongoose.Schema({
    schoolName: {
        type: String,
        required: true,
        default: 'Oxford Public School'
    },
    email: {
        type: String,
        required: true
    },
    primaryPhone: {
        type: String,
        required: true
    },
    alternatePhone: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    // Working Hours Field Add Kiya Hai 👇
    workingHours: {
        mondayToFriday: { type: String, default: '8:00 AM - 2:00 PM' },
        saturday: { type: String, default: '8:00 AM - 12:00 PM' },
        sunday: { type: String, default: 'Closed' }
    },
    socialLinks: {
        facebook: { type: String, default: '' },
        instagram: { type: String, default: '' },
        twitter: { type: String, default: '' },
        youtube: { type: String, default: '' }
    },
    logoUrl: {
        type: String,
        default: ''
    },
    aboutText: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('SchoolProfile', schoolProfileSchema);