const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const examRoutes = require('./routes/examRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure required directories exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    try {
        fs.mkdirSync(uploadsDir, { recursive: true });
        console.log('Created uploads directory');
    } catch (error) {
        console.error('Error creating uploads directory:', error);
    }
}

// Serve static files
app.use('/asset', express.static(path.join(__dirname, 'asset')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/users', userRoutes);

// Serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'web.html'));
});

// Original file names for compatibility
app.get('/web.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'web.html'));
});

app.get('/sign_in.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'sign_in.html'));
});

app.get('/sign_up.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'sign_up.html'));
});

app.get('/profile.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'profile.html'));
});

app.get('/Dethi.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Dethi.html'));
});

app.get('/Sohoc.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Sohoc.html'));
});

app.get('/Pt.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Pt.html'));
});

// Clean URL routes (optional)
app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'sign_in.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'sign_up.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'profile.html'));
});

app.get('/dethi', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Dethi.html'));
});

app.get('/sohoc', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Sohoc.html'));
});

app.get('/pt', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Pt.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;