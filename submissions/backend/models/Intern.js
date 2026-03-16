const mongoose = require('mongoose');

const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['Frontend', 'Backend', 'Fullstack', 'DevOps', 'UI/UX', 'Data Science'],
        message: '{VALUE} is not a valid role',
      },
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: {
        values: ['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'],
        message: '{VALUE} is not a valid status',
      },
      default: 'Applied',
    },
    score: {
      type: Number,
      min: [0, 'Score must be at least 0'],
      max: [100, 'Score cannot exceed 100'],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

internSchema.index({ name: 'text', email: 'text' });

const Intern = mongoose.model('Intern', internSchema);

module.exports = Intern;
