const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

function auth(req, res, next) {
    const header = req.headers.authorization;
    
    if (!header) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const parts = header.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ error: 'Invalid token format' });
    }

    try {
        const payload = jwt.verify(parts[1], JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = auth;