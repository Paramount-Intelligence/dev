const mongoose = require('mongoose');

const internSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            minlength: [2, 'Name must be at least 2 characters long'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            enum: ['Frontend', 'Backend', 'Fullstack'],
        },
        status: {
            type: String,
            required: [true, 'Status is required'],
            enum: ['Applied', 'Interviewing', 'Hired', 'Rejected'],
        },
        score: {
            type: Number,
            required: [true, 'Score is required'],
            min: [0, 'Score must be at least 0'],
            max: [100, 'Score cannot exceed 100'],
        },
    },
    {
        timestamps: true,
    }
);

const Intern = mongoose.model('Intern', internSchema);

module.exports = Intern;
