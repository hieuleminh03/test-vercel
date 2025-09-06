const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const examRoutes = require('./routes/examRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/asset', express.static(path.join(__dirname, 'asset')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/users', userRoutes);

// Serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'web.html'));
});

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