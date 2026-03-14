const Intern = require('../models/Intern');

// @desc    Get all interns (with search, filter, pagination)
// @route   GET /api/interns
// @access  Public
exports.getInterns = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search, role, status } = req.query;

        // Build query object
        const query = {};
        if (role) query.role = role;
        if (status) query.status = status;

        // Search by name or email
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }

        // Pagination parameters
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;

        // Fetch data and count total
        const interns = await Intern.find(query).skip(skip).limit(limitNum).sort({ createdAt: -1 });
        const total = await Intern.countDocuments(query);

        res.status(200).json({
            success: true,
            count: interns.length,
            pagination: {
                total,
                page: pageNum,
                pages: Math.ceil(total / limitNum),
            },
            data: interns,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single intern
// @route   GET /api/interns/:id
// @access  Public
exports.getIntern = async (req, res, next) => {
    try {
        const intern = await Intern.findById(req.params.id);

        if (!intern) {
            return res.status(404).json({ success: false, error: 'Intern not found' });
        }

        res.status(200).json({
            success: true,
            data: intern,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new intern
// @route   POST /api/interns
// @access  Public
exports.createIntern = async (req, res, next) => {
    try {
        const intern = await Intern.create(req.body);

        res.status(201).json({
            success: true,
            data: intern,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update intern
// @route   PATCH /api/interns/:id
// @access  Public
exports.updateIntern = async (req, res, next) => {
    try {
        const intern = await Intern.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!intern) {
            return res.status(404).json({ success: false, error: 'Intern not found' });
        }

        res.status(200).json({
            success: true,
            data: intern,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete intern
// @route   DELETE /api/interns/:id
// @access  Public
exports.deleteIntern = async (req, res, next) => {
    try {
        const intern = await Intern.findByIdAndDelete(req.params.id);

        if (!intern) {
            return res.status(404).json({ success: false, error: 'Intern not found' });
        }

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        next(error);
    }
};
