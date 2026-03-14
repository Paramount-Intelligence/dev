const mongoose = require('mongoose');
const Intern = require('../models/Intern');

// POST /api/interns
const createIntern = async (req, res, next) => {
  try {
    const intern = await Intern.create(req.body);
    res.status(201).json({ success: true, data: intern });
  } catch (err) {
    next(err);
  }
};

// GET /api/interns
const getInterns = async (req, res, next) => {
  try {
    const { search, role, status, page = 1, limit = 10 } = req.query;

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
      success: true,
      data: interns,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/interns/:id
const getInternById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid intern ID' });
    }
    const intern = await Intern.findById(req.params.id);
    if (!intern) return res.status(404).json({ success: false, message: 'Intern not found' });
    res.json({ success: true, data: intern });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/interns/:id
const updateIntern = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid intern ID' });
    }
    const intern = await Intern.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!intern) return res.status(404).json({ success: false, message: 'Intern not found' });
    res.json({ success: true, data: intern });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/interns/:id
const deleteIntern = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid intern ID' });
    }
    const intern = await Intern.findByIdAndDelete(req.params.id);
    if (!intern) return res.status(404).json({ success: false, message: 'Intern not found' });
    res.json({ success: true, message: 'Intern deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createIntern, getInterns, getInternById, updateIntern, deleteIntern };
