const mongoose = require('mongoose');

const internSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add an intern name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  role: {
    type: String,
    required: [true, 'Please specify a role'],
    enum: ['Frontend', 'Backend', 'Fullstack']
  },
  status: {
    type: String,
    required: [true, 'Please specify status'],
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  }
}, {
  timestamps: true,
  // This is the magic part for your frontend
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create a virtual 'id' that maps to '_id'
internSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Intern', internSchema);