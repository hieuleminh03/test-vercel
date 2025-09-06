const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup multer for avatar uploads
const uploadsDir = path.join(__dirname, '..', 'uploads');

// Ensure uploads directory exists
function ensureUploadsDir() {
    if (!fs.existsSync(uploadsDir)) {
        try {
            fs.mkdirSync(uploadsDir, { recursive: true });
        } catch (error) {
            console.error('Error creating uploads directory:', error);
        }
    }
}

// Create directory on module load
ensureUploadsDir();

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
            // Ensure uploads directory exists before processing
            ensureUploadsDir();
            
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