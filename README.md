# My Project - MVC Node.js Application

A modern web application built with Node.js using MVC architecture and SQLite database.

## Features

- User authentication (signup/signin)
- Profile management with avatar upload
- Exam management system
- Responsive design with Bootstrap
- SQLite database for data persistence

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the application:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## Project Structure

```
├── app.js              # Main application file
├── config/             # Database configuration
├── controllers/        # Business logic
├── models/            # Data models
├── routes/            # API routes
├── middleware/        # Custom middleware
├── views/             # HTML templates
├── css/               # Stylesheets
├── asset/             # Static assets
└── uploads/           # User uploaded files
```

## API Endpoints

### Authentication
- POST `/api/auth/signup` - User registration
- POST `/api/auth/signin` - User login

### Users
- GET `/api/users/profile` - Get user profile
- POST `/api/users/upload-avatar` - Upload avatar

### Exams
- GET `/api/exams` - Get all exams
- GET `/api/exams/:id` - Get exam by ID
- POST `/api/exams` - Create new exam (auth required)
- PUT `/api/exams/:id` - Update exam (auth required)
- DELETE `/api/exams/:id` - Delete exam (auth required)

## Environment Variables

Create a `.env` file with:
```
JWT_SECRET=your_secret_key
PORT=3000
```