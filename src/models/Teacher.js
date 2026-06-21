const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        default: '' // Agar photo nahi hai toh default blank rahega
    },
    subject: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        default: 'Fresher'
    }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);