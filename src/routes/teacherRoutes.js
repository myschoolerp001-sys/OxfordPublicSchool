const express = require('express');
const {
    getAllTeachers,
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher
} = require('../controllers/teacherController');
const { protect } = require('../middlewares/authMiddleware');
const { uploadSingle } = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.get('/', getAllTeachers);
router.get('/:id', getTeacherById);
router.post('/', protect, uploadSingle('photo'), createTeacher);
router.put('/:id', protect, uploadSingle('photo'), updateTeacher);
router.delete('/:id', protect, deleteTeacher);

module.exports = router;
