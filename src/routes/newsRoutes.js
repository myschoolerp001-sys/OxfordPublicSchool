const express = require('express');
const {
    getPublicNews,
    getAdminNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews
} = require('../controllers/newsController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public route - Bina token ke chalega
router.get('/public', getPublicNews);

// Admin route - Token chahiye aur pagination query params lega
router.get('/admin', protect, getAdminNews); 

router.get('/:id', getNewsById);
router.post('/', protect, createNews);
router.put('/:id', protect, updateNews);
router.delete('/:id', protect, deleteNews);

module.exports = router;