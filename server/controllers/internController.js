import Intern from '../models/Intern.js';
import mongoose from 'mongoose';

// @desc    Create a new intern
// @route   POST /api/interns
export const createIntern = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    // Check for duplicate email before saving to provide a cleaner error message
    const existingIntern = await Intern.findOne({ email });
    if (existingIntern) {
      const error = new Error('Email already exists');
      error.statusCode = 400;
      throw error;
    }

    const intern = await Intern.create(req.body);
    res.status(201).json(intern);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all interns (with search, filter, pagination)
// @route   GET /api/interns
export const getInterns = async (req, res, next) => {
  try {
    const { search, role, status, page = 1, limit = 10 } = req.query;
    
    // Build query object
    const query = {};
    
    // Search by name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by role
    if (role) {
      query.role = role;
    }
    
    // Filter by status
    if (status) {
      query.status = status;
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const interns = await Intern.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);
      
    const total = await Intern.countDocuments(query);

    res.status(200).json({
      data: interns,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single intern
// @route   GET /api/interns/:id
export const getInternById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error('Invalid Intern ID format');
      error.statusCode = 400;
      throw error;
    }

    const intern = await Intern.findById(id);
    if (!intern) {
      const error = new Error('Intern not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(intern);
  } catch (error) {
    next(error);
  }
};

// @desc    Update intern
// @route   PATCH /api/interns/:id
export const updateIntern = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error('Invalid Intern ID format');
      error.statusCode = 400;
      throw error;
    }

    // Attempting to update email to one that already exists
    if (req.body.email) {
      const existingIntern = await Intern.findOne({ email: req.body.email, _id: { $ne: id } });
      if (existingIntern) {
        const error = new Error('Email already in use by another intern');
        error.statusCode = 400;
        throw error;
      }
    }

    const intern = await Intern.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!intern) {
      const error = new Error('Intern not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(intern);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete intern
// @route   DELETE /api/interns/:id
export const deleteIntern = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error('Invalid Intern ID format');
      error.statusCode = 400;
      throw error;
    }

    const intern = await Intern.findByIdAndDelete(id);
    
    if (!intern) {
      const error = new Error('Intern not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: 'Intern removed successully' });
  } catch (error) {
    next(error);
  }
};
