const mongoose = require('mongoose');
const Intern = require('../models/Intern');

// POST /api/interns — Create a new intern
const createIntern = async (req, res, next) => {
  try {
    const intern = await Intern.create(req.body);
    res.status(201).json({ success: true, data: intern });
  } catch (err) {
    next(err);
  }
};

// GET /api/interns — List interns with search, filter, pagination
const getInterns = async (req, res, next) => {
  try {
    const { search = '', role, status, page = 1, limit = 8 } = req.query;

    const query = {};

    // Search by name or email (case-insensitive)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by role
    if (role) query.role = role;

    // Filter by status
    if (status) query.status = status;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [interns, total] = await Promise.all([
      Intern.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Intern.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: interns,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/interns/:id — Get single intern
const getInternById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid intern ID' });
    }

    const intern = await Intern.findById(id);
    if (!intern) {
      return res.status(404).json({ success: false, message: 'Intern not found' });
    }

    res.json({ success: true, data: intern });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/interns/:id — Update an intern
const updateIntern = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid intern ID' });
    }

    const intern = await Intern.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!intern) {
      return res.status(404).json({ success: false, message: 'Intern not found' });
    }

    res.json({ success: true, data: intern });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/interns/:id — Delete an intern
const deleteIntern = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid intern ID' });
    }

    const intern = await Intern.findByIdAndDelete(id);
    if (!intern) {
      return res.status(404).json({ success: false, message: 'Intern not found' });
    }

    res.json({ success: true, message: 'Intern deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createIntern,
  getInterns,
  getInternById,
  updateIntern,
  deleteIntern,
};
