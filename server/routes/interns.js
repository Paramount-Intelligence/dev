const express = require('express');
const router = express.Router();
const Intern = require('../models/Intern');

// POST /api/interns - Create a new intern
router.post('/', async (req, res, next) => {
    try {
        const intern = await Intern.create(req.body);
        res.status(201).json({
            success: true,
            data: intern
        });
    } catch (err) {
        next(err);
    }
});

// GET /api/interns - List interns with search, filter, and pagination
router.get('/', async (req, res, next) => {
    try {
        const { name, email, role, status, page = 1, limit = 10 } = req.query;

        const query = {};
        if (name) query.name = { $regex: name, $options: 'i' };
        if (email) query.email = { $regex: email, $options: 'i' };
        if (role) query.role = role;
        if (status) query.status = status;

        const skip = (page - 1) * limit;

        const interns = await Intern.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Intern.countDocuments(query);

        res.status(200).json({
            success: true,
            count: interns.length,
            total,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit)
            },
            data: interns
        });
    } catch (err) {
        next(err);
    }
});

// GET /api/interns/:id - Get single intern
router.get('/:id', async (req, res, next) => {
    try {
        const intern = await Intern.findById(req.params.id);
        if (!intern) {
            return res.status(404).json({ success: false, error: 'Intern not found' });
        }
        res.status(200).json({ success: true, data: intern });
    } catch (err) {
        next(err);
    }
});

// PATCH /api/interns/:id - Update intern
router.patch('/:id', async (req, res, next) => {
    try {
        const intern = await Intern.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!intern) {
            return res.status(404).json({ success: false, error: 'Intern not found' });
        }
        res.status(200).json({ success: true, data: intern });
    } catch (err) {
        next(err);
    }
});

// DELETE /api/interns/:id - Delete intern
router.delete('/:id', async (req, res, next) => {
    try {
        const intern = await Intern.findByIdAndDelete(req.params.id);
        if (!intern) {
            return res.status(404).json({ success: false, error: 'Intern not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
