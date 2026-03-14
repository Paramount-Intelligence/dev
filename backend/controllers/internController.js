const Intern = require('../models/Intern');

// @desc    Create new intern
// @route   POST /api/interns
// @access  Public
const createIntern = async (req, res, next) => {
    try {
        const intern = await Intern.create(req.body);
        res.status(201).json(intern);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all interns
// @route   GET /api/interns
// @access  Public
const getInterns = async (req, res, next) => {
    try {
        const { search, role, status, page = 1, limit = 10 } = req.query;

        let query = {};

        // Search by name or email
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        // Filters
        if (role) {
            query.role = role;
        }
        if (status) {
            query.status = status;
        }

        // Pagination
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const skip = (pageNumber - 1) * limitNumber;

        const interns = await Intern.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber);

        const total = await Intern.countDocuments(query);

        res.status(200).json({
            interns,
            pagination: {
                total,
                page: pageNumber,
                limit: limitNumber,
                pages: Math.ceil(total / limitNumber),
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single intern
// @route   GET /api/interns/:id
// @access  Public
const getIntern = async (req, res, next) => {
    try {
        const intern = await Intern.findById(req.params.id);

        if (!intern) {
            res.status(404);
            throw new Error('Intern not found');
        }

        res.status(200).json(intern);
    } catch (error) {
        next(error);
    }
};

// @desc    Update intern
// @route   PATCH /api/interns/:id
// @access  Public
const updateIntern = async (req, res, next) => {
    try {
        const { id } = req.params;

        const intern = await Intern.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!intern) {
            res.status(404);
            throw new Error('Intern not found');
        }

        res.status(200).json(intern);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete intern
// @route   DELETE /api/interns/:id
// @access  Public
const deleteIntern = async (req, res, next) => {
    try {
        const { id } = req.params;

        const intern = await Intern.findByIdAndDelete(id);

        if (!intern) {
            res.status(404);
            throw new Error('Intern not found');
        }

        res.status(200).json({ message: 'Intern removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createIntern,
    getInterns,
    getIntern,
    updateIntern,
    deleteIntern,
};
