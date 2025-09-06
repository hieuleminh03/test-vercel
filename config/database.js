const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
        initializeTables();
    }
});

function initializeTables() {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        avatar TEXT DEFAULT '',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Exams table
    db.run(`CREATE TABLE IF NOT EXISTS exams (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        summary TEXT,
        image TEXT,
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Seed initial exam data if empty
    db.get("SELECT COUNT(*) as count FROM exams", (err, row) => {
        if (!err && row.count === 0) {
            const examData = [
                {
                    title: 'KHTN 2009 V1',
                    summary: 'Sample summary',
                    image: '/asset/image/Dethi/KHTN/KHTN_2009-2010_v1.jpg'
                },
                {
                    title: 'KHTN 2009 V2',
                    summary: 'Sample summary',
                    image: '/asset/image/Dethi/KHTN/KHTN_2009-2010_v2.jpg'
                }
            ];

            examData.forEach(exam => {
                db.run("INSERT INTO exams (title, summary, image) VALUES (?, ?, ?)",
                    [exam.title, exam.summary, exam.image]);
            });
        }
    });
}

module.exports = db;