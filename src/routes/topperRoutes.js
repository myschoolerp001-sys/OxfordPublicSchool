const express = require('express');
const {
    getAllToppers,
    getTopperById,
    createTopper,
    updateTopper,
    deleteTopper
} = require('../controllers/topperController');
const { protect } = require('../middlewares/authMiddleware');
const { uploadSingle } = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.get('/', getAllToppers);
router.get('/:id', getTopperById);
router.post('/', protect, uploadSingle('photo'), createTopper);
router.put('/:id', protect, uploadSingle('photo'), updateTopper);
router.delete('/:id', protect, deleteTopper);

module.exports = router;
