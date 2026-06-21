const express = require('express');
const { getSchoolProfile, updateSchoolProfile } = require('../controllers/schoolProfileController');
const { protect } = require('../middlewares/authMiddleware'); // Middleware import kiya

const router = express.Router();

// GET - Public Route
router.get('/', getSchoolProfile);

// POST - Secure Route (ispar protect middleware laga diya)
router.post('/', protect, updateSchoolProfile);

module.exports = router;