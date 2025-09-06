const Exam = require('../models/Exam');

const examController = {
    async getAllExams(req, res) {
        try {
            const exams = await Exam.getAll();
            res.json(exams);
        } catch (error) {
            console.error('Get exams error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getExamById(req, res) {
        try {
            const { id } = req.params;
            const exam = await Exam.findById(id);
            
            if (!exam) {
                return res.status(404).json({ error: 'Exam not found' });
            }

            res.json(exam);
        } catch (error) {
            console.error('Get exam error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async createExam(req, res) {
        try {
            const examData = req.body;
            const exam = await Exam.create(examData);
            res.status(201).json(exam);
        } catch (error) {
            console.error('Create exam error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async updateExam(req, res) {
        try {
            const { id } = req.params;
            const examData = req.body;
            
            const updated = await Exam.update(id, examData);
            if (!updated) {
                return res.status(404).json({ error: 'Exam not found' });
            }

            res.json({ message: 'Exam updated successfully' });
        } catch (error) {
            console.error('Update exam error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async deleteExam(req, res) {
        try {
            const { id } = req.params;
            
            const deleted = await Exam.delete(id);
            if (!deleted) {
                return res.status(404).json({ error: 'Exam not found' });
            }

            res.json({ message: 'Exam deleted successfully' });
        } catch (error) {
            console.error('Delete exam error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = examController;