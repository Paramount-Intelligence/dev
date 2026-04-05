const mongoose = require('mongoose');

const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [2, 'Name must be at least 2 characters'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: ['Frontend', 'Backend', 'Fullstack'],
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: ['Applied', 'Interviewing', 'Hired', 'Rejected'],
    },
    score: {
      type: Number,
      required: [true, 'Score is required'],
      min: [0, 'Score must be at least 0'],
      max: [100, 'Score must be at most 100'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Intern', internSchema);
