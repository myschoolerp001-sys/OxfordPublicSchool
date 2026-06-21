const express = require('express');
const { registerAdmin, loginAdmin } = require('../controllers/authController');

const router = express.Router();

// Signup API Route: POST /api/auth/signup
router.post('/signup', registerAdmin);

// Login API Route: POST /api/auth/login
router.post('/login', loginAdmin);

module.exports = router;