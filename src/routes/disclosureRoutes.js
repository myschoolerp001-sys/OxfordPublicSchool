const express = require('express');
const {
    getAllDisclosures,
    getDisclosureById,
    createDisclosure,
    updateDisclosure,
    deleteDisclosure
} = require('../controllers/disclosureController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getAllDisclosures);
router.get('/:id', getDisclosureById);
router.post('/', protect, createDisclosure);
router.put('/:id', protect, updateDisclosure);
router.delete('/:id', protect, deleteDisclosure);

module.exports = router;
