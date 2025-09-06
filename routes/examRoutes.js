const express = require('express');
const examController = require('../controllers/examController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', examController.getAllExams);
router.get('/:id', examController.getExamById);
router.post('/', auth, examController.createExam);
router.put('/:id', auth, examController.updateExam);
router.delete('/:id', auth, examController.deleteExam);

module.exports = router;