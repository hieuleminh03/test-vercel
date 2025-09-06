const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

function generateToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
    );
}

const authController = {
    async signup(req, res) {
        try {
            const { username, email, password } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }

            // Check if user already exists
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            // Create new user
            const user = await User.create({ username, email, password });
            const token = generateToken(user);

            res.status(201).json({
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    avatar: user.avatar
                },
                token
            });
        } catch (error) {
            console.error('Signup error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async signin(req, res) {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }

            // Find user by email
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            // Validate password
            const isValidPassword = User.validatePassword(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            const token = generateToken(user);

            res.json({
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    avatar: user.avatar
                },
                token
            });
        } catch (error) {
            console.error('Signin error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = authController;