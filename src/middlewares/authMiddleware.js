const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Token nikalna (Bearer <token> format se)
            token = req.headers.authorization.split(' ')[1];

            // Token verify karna
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Admin ka data request object mein daal dena (password hata kar)
            req.admin = await Admin.findById(decoded.id).select('-password');

            next(); // Agar sab sahi hai toh next function (controller) ko chalne do
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

module.exports = { protect };