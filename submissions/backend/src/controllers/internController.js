const Intern = require('../models/Intern');
//Show interns
exports.getAllInterns = async (req, res, next) => {
  try {
    const { name, role, status, page = 1, limit = 10 } = req.query;

    const query = {};
    
    if (name) {
        query.$or = [
            { name: { $regex: name, $options: 'i' } },
            { email: { $regex: name, $options: 'i' } }
        ];
    }
    if (role) {
      query.role = role;
    }
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;
    
    const interns = await Intern.find(query)
      .sort({ createdAt: -1 }) 
      .limit(Number(limit))
      .skip(skip);

    // 4. Get Total Count (for frontend pagination UI)
    const total = await Intern.countDocuments(query);

    res.status(200).json({
      success: true,
      count: interns.length,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      },
      data: interns
    });
  } catch (error) {
    next(error);
  }
};

// Create Intern
exports.createIntern = async (req, res, next) => {
  try {
    const intern = await Intern.create(req.body);
    res.status(201).json({ success: true, data: intern });
  } catch (error) {
    next(error);
  }
};

// Get Single Intern
exports.getInternById = async (req, res, next) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern) return res.status(404).json({ success: false, error: 'Not Found' });
    res.status(200).json({ success: true, data: intern });
  } catch (error) {
    next(error);
  }
};

// Update Intern
exports.updateIntern = async (req, res, next) => {
  try {
    // Exclude fields we don't want updated from req.body, specifically _id/id since frontend sends whole object
    if (req.body.id) delete req.body.id;
    if (req.body._id) delete req.body._id;
    const intern = await Intern.findByIdAndUpdate(req.params.id, req.body, {
      new: true,           // Return the updated document
      runValidators: true  // Ensure the update follows your Schema rules
    });

    if (!intern) {
      return res.status(404).json({ success: false, error: 'Intern not found' });
    }

    res.status(200).json({ success: true, data: intern });
  } catch (error) {
    next(error);
  }
};

// Delete Intern
exports.deleteIntern = async (req, res, next) => {
  try {
    const intern = await Intern.findByIdAndDelete(req.params.id);

    if (!intern) {
      return res.status(404).json({ success: false, error: 'Intern not found' });
    }

    res.status(200).json({ success: true, message: 'Intern deleted successfully' });
  } catch (error) {
    next(error);
  }
};
