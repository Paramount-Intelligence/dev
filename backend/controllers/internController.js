import Intern from '../models/Intern.js';

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

// @desc    Get all interns with pagination, search, and filter
// @route   GET /api/interns
// @access  Public
const getInterns = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search, role, status } = req.query;

        // Build query object
        const query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        if (role) {
            query.role = role;
        }

        if (status) {
            query.status = status;
        }

        // Execute query
        const interns = await Intern.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        // Get total documents count
        const total = await Intern.countDocuments(query);

        res.status(200).json({
            interns,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
            totalInterns: total
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single intern
// @route   GET /api/interns/:id
// @access  Public
const getInternById = async (req, res, next) => {
    try {
        const intern = await Intern.findById(req.params.id);

        if (intern) {
            res.status(200).json(intern);
        } else {
            res.status(404);
            throw new Error('Intern not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Update an intern
// @route   PATCH /api/interns/:id
// @access  Public
const updateIntern = async (req, res, next) => {
    try {
        const intern = await Intern.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (intern) {
            res.status(200).json(intern);
        } else {
            res.status(404);
            throw new Error('Intern not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete an intern
// @route   DELETE /api/interns/:id
// @access  Public
const deleteIntern = async (req, res, next) => {
    try {
        const intern = await Intern.findById(req.params.id);

        if (intern) {
            await intern.deleteOne();
            res.status(200).json({ message: 'Intern removed' });
        } else {
            res.status(404);
            throw new Error('Intern not found');
        }
    } catch (error) {
        next(error);
    }
};

export { createIntern, getInterns, getInternById, updateIntern, deleteIntern };
