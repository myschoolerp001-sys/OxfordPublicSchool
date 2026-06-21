const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Token banane ka function
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// ==========================================
// 1. SIGNUP API (School Admin Register karna)
// ==========================================
exports.registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingAdmin = await Admin.findOne();
        if (existingAdmin) {
            return res.status(400).json({ message: 'Only one admin account is allowed.' });
        }

        const admin = await Admin.create({
            name,
            email,
            password
        });

        if (admin) {
            res.status(201).json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                token: generateToken(admin._id)
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error during signup', error: error.message });
    }
};

// ==========================================
// 2. LOGIN API (School Admin Login karna)
// ==========================================
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Database mein admin dhoondo
        const admin = await Admin.findOne({ email });

        // Agar admin mil gaya aur password match ho gaya
        if (admin && (await admin.matchPassword(password))) {
            res.json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                token: generateToken(admin._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
};