const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup multer for avatar uploads
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: uploadsDir,
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const userController = {
    upload: upload.single('avatar'),

    async uploadAvatar(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const avatarUrl = `/uploads/${req.file.filename}`;
            const updated = await User.updateAvatar(req.user.id, avatarUrl);

            if (!updated) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({ url: avatarUrl });
        } catch (error) {
            console.error('Upload avatar error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getProfile(req, res) {
        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            });
        } catch (error) {
            console.error('Get profile error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = userController;