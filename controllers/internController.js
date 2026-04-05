const Intern = require("../models/Intern");

// Create Intern
exports.createIntern = async (req, res) => {
  try {
    const intern = await Intern.create(req.body);
    res.status(201).json(intern);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: 'ValidationError', details: err.errors });
    }
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(409).json({ error: 'DuplicateEmail', message: 'Email already exists' });
    }
    res.status(500).json({ error: 'ServerError', message: err.message });
  }
};

// Get All Interns
exports.getInterns = async (req, res) => {
  const { search, role, status, page = 1, limit = 5 } = req.query;
  try {
    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (role) query.role = role;
    if (status) query.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const interns = await Intern.find(query)
      .skip(skip)
      .limit(Number(limit));
    const total = await Intern.countDocuments(query);
    res.json({ total, page: Number(page), interns });
  } catch (err) {
    res.status(500).json({ error: 'ServerError', message: err.message });
  }
};

// Get Single Intern
exports.getInternById = async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern) return res.status(404).json({ error: 'NotFound', message: 'Intern not found' });
    res.json(intern);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'InvalidId', message: 'Invalid intern ID' });
    }
    res.status(500).json({ error: 'ServerError', message: err.message });
  }
};

// Update Intern
exports.updateIntern = async (req, res) => {
  try {
    const intern = await Intern.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!intern) return res.status(404).json({ error: 'NotFound', message: 'Intern not found' });
    res.json(intern);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: 'ValidationError', details: err.errors });
    }
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'InvalidId', message: 'Invalid intern ID' });
    }
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(409).json({ error: 'DuplicateEmail', message: 'Email already exists' });
    }
    res.status(500).json({ error: 'ServerError', message: err.message });
  }
};

// Delete Intern
exports.deleteIntern = async (req, res) => {
  try {
    const intern = await Intern.findByIdAndDelete(req.params.id);
    if (!intern) return res.status(404).json({ error: 'NotFound', message: 'Intern not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'InvalidId', message: 'Invalid intern ID' });
    }
    res.status(500).json({ error: 'ServerError', message: err.message });
  }
};