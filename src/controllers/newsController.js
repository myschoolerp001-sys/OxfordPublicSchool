const News = require('../models/News');

// 1. PUBLIC API: Sirf active aur valid dates wali news
exports.getPublicNews = async (req, res) => {
    try {
        const currentDate = new Date(); // Aaj ki date aur time

        const filter = {
            isActive: true,
            startDate: { $lte: currentDate }, // Start date past ya present mein honi chahiye
            $or: [
                { endDate: { $gte: currentDate } }, // End date future mein honi chahiye
                { endDate: null },
                { endDate: { $exists: false } }
            ]
        };

        const items = await News.find(filter).sort({ startDate: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// 2. ADMIN API: Sabhi news with Pagination (Table view ke liye)
exports.getAdminNews = async (req, res) => {
    try {
        // Pagination logic
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const items = await News.find().sort({ startDate: -1 }).skip(skip).limit(limit);
        const totalItems = await News.countDocuments();

        res.status(200).json({
            data: items,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit),
            totalItems: totalItems
        });
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