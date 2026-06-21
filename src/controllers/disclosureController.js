const Disclosure = require('../models/Disclosure');

exports.getAllDisclosures = async (req, res) => {
    try {
        const disclosures = await Disclosure.find().sort({ createdAt: -1 });
        res.status(200).json(disclosures);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getDisclosureById = async (req, res) => {
    try {
        const disclosure = await Disclosure.findById(req.params.id);
        if (!disclosure) return res.status(404).json({ message: 'Disclosure not found' });
        res.status(200).json(disclosure);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.createDisclosure = async (req, res) => {
    try {
        const disclosure = await Disclosure.create(req.body);
        res.status(201).json(disclosure);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateDisclosure = async (req, res) => {
    try {
        const updated = await Disclosure.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Disclosure not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteDisclosure = async (req, res) => {
    try {
        const deleted = await Disclosure.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Disclosure not found' });
        res.status(200).json({ message: 'Disclosure removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
