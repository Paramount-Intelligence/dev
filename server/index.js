const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const internRoutes = require('./routes/interns');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/interns', internRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({ success: false, error: messages });
    }

    if (err.code === 11000) {
        return res.status(400).json({ success: false, error: 'Duplicate field value entered' });
    }

    if (err.name === 'CastError') {
        return res.status(404).json({ success: false, error: 'Resource not found' });
    }

    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Server Error'
    });
});

const PORT = process.env.PORT || 5000;

// Only connect to MongoDB if URI is provided (to avoid crash in mock/local mode)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/intern-tracker';

const startServer = async () => {
    try {
        if (process.env.NODE_ENV !== 'test') {
            await mongoose.connect(MONGO_URI);
            console.log('MongoDB Connected...');
        }
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
    }
};

startServer();

module.exports = app; // For testing
