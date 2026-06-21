const mongoose = require('mongoose');

const disclosureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true // Document ka naam (e.g., "Fire Safety Certificate")
    },
    documentUrl: {
        type: String,
        required: true // PDF ya image ka link
    }
}, { timestamps: true });

module.exports = mongoose.model('Disclosure', disclosureSchema);