const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const internRoutes = require('./routes/internRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/intern-tracker')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/interns', internRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Intern Tracker API is running' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));