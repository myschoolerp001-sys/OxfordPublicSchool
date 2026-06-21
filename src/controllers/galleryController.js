const Gallery = require('../models/Gallery');
const { uploadBuffer } = require('../config/cloudinary');

const uploadGalleryImage = async (req) => {
    if (!req.file) return null;
    const result = await uploadBuffer(req.file.buffer, 'oxford-school/gallery');
    return result.secure_url;
};

exports.getAllGallery = async (req, res) => {
    try {
        const items = await Gallery.find().sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getGalleryById = async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Gallery item not found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.createGallery = async (req, res) => {
    try {
        const imageUrl = await uploadGalleryImage(req);
        const item = await Gallery.create({
            ...req.body,
            imageUrl: imageUrl || req.body.imageUrl
        });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateGallery = async (req, res) => {
    try {
        const imageUrl = await uploadGalleryImage(req);
        const updated = await Gallery.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                ...(imageUrl ? { imageUrl } : {})
            },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Gallery item not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteGallery = async (req, res) => {
    try {
        const deleted = await Gallery.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Gallery item not found' });
        res.status(200).json({ message: 'Gallery item removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
