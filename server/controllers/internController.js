const Intern = require('../models/Intern');

// Create Intern
exports.createIntern = async (req, res, next) => {
  try {
    const intern = await Intern.create(req.body);
    res.status(201).json(intern);
  } catch (err) {
    next(err);
  }
};

// Get All Interns with search, filter, pagination
exports.getInterns = async (req, res, next) => {
  try {
    const { search, role, status, page = 1, limit = 10 } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (role) query.role = role;
    if (status) query.status = status;

    const total = await Intern.countDocuments(query);
    const interns = await Intern.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      interns,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    next(err);
  }
};

// Get Single Intern
exports.getIntern = async (req, res, next) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern) return res.status(404).json({ message: 'Intern not found' });
    res.json(intern);
  } catch (err) {
    next(err);
  }
};

// Update Intern
exports.updateIntern = async (req, res, next) => {
  try {
    const intern = await Intern.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!intern) return res.status(404).json({ message: 'Intern not found' });
    res.json(intern);
  } catch (err) {
    next(err);
  }
};

// Delete Intern
exports.deleteIntern = async (req, res, next) => {
  try {
    const intern = await Intern.findByIdAndDelete(req.params.id);
    if (!intern) return res.status(404).json({ message: 'Intern not found' });
    res.json({ message: 'Intern deleted successfully' });
  } catch (err) {
    next(err);
  }
};