const Intern = require('../models/Intern');
const mongoose = require('mongoose');

// GET /api/interns — search, filter, pagination
exports.getAllInterns = async (req, res) => {
  try {
    const { search, role, status, page = 1, limit = 8 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    if (role) query.role = role;
    if (status) query.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Intern.countDocuments(query);
    const interns = await Intern.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      interns,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/interns/:id
exports.getInternById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid intern ID' });
    }
    const intern = await Intern.findById(req.params.id);
    if (!intern) return res.status(404).json({ message: 'Intern not found' });
    res.json(intern);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/interns
exports.createIntern = async (req, res) => {
  try {
    const intern = new Intern(req.body);
    const saved = await intern.save();
    res.status(201).json(saved);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'An intern with this email already exists' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(400).json({ message: error.message });
  }
};

// PATCH /api/interns/:id
exports.updateIntern = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid intern ID' });
    }
    const intern = await Intern.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!intern) return res.status(404).json({ message: 'Intern not found' });
    res.json(intern);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/interns/:id
exports.deleteIntern = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid intern ID' });
    }
    const intern = await Intern.findByIdAndDelete(req.params.id);
    if (!intern) return res.status(404).json({ message: 'Intern not found' });
    res.json({ message: 'Intern deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};