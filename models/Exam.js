const db = require('../config/database');

class Exam {
    static async getAll() {
        return new Promise((resolve, reject) => {
            db.all(
                "SELECT id, title, summary, image FROM exams ORDER BY created_at DESC",
                [],
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                }
            );
        });
    }

    static async findById(id) {
        return new Promise((resolve, reject) => {
            db.get(
                "SELECT * FROM exams WHERE id = ?",
                [id],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                }
            );
        });
    }

    static async create(examData) {
        const { title, summary, image, content } = examData;
        
        return new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO exams (title, summary, image, content) VALUES (?, ?, ?, ?)",
                [title, summary || '', image || '', content || ''],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ id: this.lastID, title, summary, image, content });
                    }
                }
            );
        });
    }

    static async update(id, examData) {
        const { title, summary, image, content } = examData;
        
        return new Promise((resolve, reject) => {
            db.run(
                "UPDATE exams SET title = ?, summary = ?, image = ?, content = ? WHERE id = ?",
                [title, summary, image, content, id],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.changes > 0);
                    }
                }
            );
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            db.run(
                "DELETE FROM exams WHERE id = ?",
                [id],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.changes > 0);
                    }
                }
            );
        });
    }
}

module.exports = Exam;