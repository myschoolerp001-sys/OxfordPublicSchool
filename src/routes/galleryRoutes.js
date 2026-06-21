const express = require('express');
const {
    getAllGallery,
    getGalleryById,
    createGallery,
    updateGallery,
    deleteGallery
} = require('../controllers/galleryController');
const { protect } = require('../middlewares/authMiddleware');
const { uploadSingle } = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.get('/', getAllGallery);
router.get('/:id', getGalleryById);
router.post('/', protect, uploadSingle('image'), createGallery);
router.put('/:id', protect, uploadSingle('image'), updateGallery);
router.delete('/:id', protect, deleteGallery);

module.exports = router;
