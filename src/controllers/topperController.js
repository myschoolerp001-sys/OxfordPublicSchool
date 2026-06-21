const Topper = require('../models/Topper');
const { uploadBuffer } = require('../config/cloudinary');

const uploadTopperPhoto = async (req) => {
    if (!req.file) return null;
    const result = await uploadBuffer(req.file.buffer, 'oxford-school/toppers');
    return result.secure_url;
};

exports.getAllToppers = async (req, res) => {
    try {
        const items = await Topper.find().sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getTopperById = async (req, res) => {
    try {
        const item = await Topper.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Topper not found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.createTopper = async (req, res) => {
    try {
        const photoUrl = await uploadTopperPhoto(req);
        const item = await Topper.create({
            ...req.body,
            photoUrl: photoUrl || req.body.photoUrl
        });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateTopper = async (req, res) => {
    try {
        const photoUrl = await uploadTopperPhoto(req);
        const updated = await Topper.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                ...(photoUrl ? { photoUrl } : {})
            },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Topper not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteTopper = async (req, res) => {
    try {
        const deleted = await Topper.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Topper not found' });
        res.status(200).json({ message: 'Topper removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
