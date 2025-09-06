const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/profile', auth, userController.getProfile);
router.post('/upload-avatar', auth, userController.upload, userController.uploadAvatar);

module.exports = router;