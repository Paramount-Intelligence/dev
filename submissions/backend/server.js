require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const internRoutes = require('./routes/internRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// ── Middleware ──────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Routes ──────────────────────────────────────────────
app.use('/api/interns', internRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Intern Tracker API is running 🚀' });
});

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Centralized Error Handler (must be last) ────────────
app.use(errorHandler);

// ── Start Server ────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
