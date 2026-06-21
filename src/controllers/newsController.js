const News = require('../models/News');

exports.getAllNews = async (req, res) => {
    try {
        const items = await News.find().sort({ date: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getNewsById = async (req, res) => {
    try {
        const item = await News.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'News item not found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.createNews = async (req, res) => {
    try {
        const item = await News.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateNews = async (req, res) => {
    try {
        const updated = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'News item not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteNews = async (req, res) => {
    try {
        const deleted = await News.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'News item not found' });
        res.status(200).json({ message: 'News item removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
