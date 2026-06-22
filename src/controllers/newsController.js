const News = require('../models/News');

exports.getAllNews = async (req, res) => {
    try {
        const currentDate = new Date(); // Aaj ki date aur time

        // Filter condition: 
        // 1. isActive true hona chahiye
        // 2. startDate past mein ya abhi ki honi chahiye ($lte)
        // 3. endDate future ki honi chahiye ($gte) YA phir endDate ho hi na
        const filter = {
            isActive: true,
            startDate: { $lte: currentDate },
            $or: [
                { endDate: { $gte: currentDate } },
                { endDate: null },
                { endDate: { $exists: false } }
            ]
        };

        // Agar aap admin dashboard bana rahe hain aur wahan SAB news dikhani hai, 
        // toh aap is filter ko hata kar seedha find() use kar sakte hain 
        // ya req.query ke hisaab se condition change kar sakte hain.

        const items = await News.find(filter).sort({ startDate: -1 });
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
        // req.body me title, desc ke sath ab startDate aur endDate bhi bhej sakte hain
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