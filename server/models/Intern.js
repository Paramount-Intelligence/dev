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
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['Frontend', 'Backend', 'Fullstack'],
        message: 'Role must be Frontend, Backend, or Fullstack',
      },
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: {
        values: ['Applied', 'Interviewing', 'Hired', 'Rejected'],
        message: 'Status must be Applied, Interviewing, Hired, or Rejected',
      },
      default: 'Applied',
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
