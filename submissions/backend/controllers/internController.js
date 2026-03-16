const Intern = require('../models/Intern');

const createIntern = async (req, res) => {
  try {
    const intern = await Intern.create(req.body);
    res.status(201).json({ success: true, data: intern });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getInterns = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      role = '',
      status = '',
      sortBy = 'createdAt',
      order = 'desc',
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (role) query.role = role;
    if (status) query.status = status;

    const sortOrder = order === 'asc' ? 1 : -1;
    const sortObj = { [sortBy]: sortOrder };

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const [interns, total] = await Promise.all([
      Intern.find(query).sort(sortObj).skip(skip).limit(limitNumber),
      Intern.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: interns,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getInternById = async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern) {
      return res.status(404).json({ success: false, message: 'Intern not found' });
    }
    res.status(200).json({ success: true, data: intern });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid intern ID' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateIntern = async (req, res) => {
  try {
    const intern = await Intern.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!intern) {
      return res.status(404).json({ success: false, message: 'Intern not found' });
    }
    res.status(200).json({ success: true, data: intern });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid intern ID' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteIntern = async (req, res) => {
  try {
    const intern = await Intern.findByIdAndDelete(req.params.id);
    if (!intern) {
      return res.status(404).json({ success: false, message: 'Intern not found' });
    }
    res.status(200).json({ success: true, message: 'Intern deleted successfully' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid intern ID' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { createIntern, getInterns, getInternById, updateIntern, deleteIntern };
