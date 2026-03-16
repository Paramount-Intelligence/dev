require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const internRoutes = require('../routes/internRoutes');

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

// Allow localhost in dev and .vercel.app in production
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || (isProduction && origin.endsWith('.vercel.app'))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/interns', internRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Intern Management API running' });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

module.exports = async (req, res) => {
  try {
    await connectDB();
    app(req, res);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database Connection Error' });
  }
};
