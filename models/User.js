const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    static async create(userData) {
        const { username, email, password } = userData;
        const hashedPassword = bcrypt.hashSync(password, 8);
        
        return new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                [username || '', email, hashedPassword],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ id: this.lastID, username: username || '', email, avatar: '' });
                    }
                }
            );
        });
    }

    static async findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.get(
                "SELECT * FROM users WHERE email = ?",
                [email],
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

    static async findById(id) {
        return new Promise((resolve, reject) => {
            db.get(
                "SELECT * FROM users WHERE id = ?",
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

    static async updateAvatar(userId, avatarPath) {
        return new Promise((resolve, reject) => {
            db.run(
                "UPDATE users SET avatar = ? WHERE id = ?",
                [avatarPath, userId],
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

    static validatePassword(plainPassword, hashedPassword) {
        return bcrypt.compareSync(plainPassword, hashedPassword);
    }
}

module.exports = User;