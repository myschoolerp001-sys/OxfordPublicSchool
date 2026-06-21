const Teacher = require('../models/Teacher');
const { uploadBuffer } = require('../config/cloudinary');

const uploadTeacherPhoto = async (req) => {
    if (!req.file) return null;
    const result = await uploadBuffer(req.file.buffer, 'oxford-school/teachers');
    return result.secure_url;
};

exports.getAllTeachers = async (req, res) => {
    try {
        const items = await Teacher.find().sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getTeacherById = async (req, res) => {
    try {
        const item = await Teacher.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Teacher not found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.createTeacher = async (req, res) => {
    try {
        const photoUrl = await uploadTeacherPhoto(req);
        const item = await Teacher.create({
            ...req.body,
            photoUrl: photoUrl || req.body.photoUrl
        });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateTeacher = async (req, res) => {
    try {
        const photoUrl = await uploadTeacherPhoto(req);
        const updated = await Teacher.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                ...(photoUrl ? { photoUrl } : {})
            },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Teacher not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const deleted = await Teacher.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Teacher not found' });
        res.status(200).json({ message: 'Teacher removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
