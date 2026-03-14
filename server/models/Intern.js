const mongoose = require('mongoose');

const internSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
            minlength: [2, 'Name must be at least 2 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        role: {
            type: String,
            required: [true, 'Please specify a role'],
            enum: ['Frontend', 'Backend', 'Fullstack'],
        },
        status: {
            type: String,
            required: [true, 'Please specify a status'],
            enum: ['Applied', 'Interviewing', 'Hired', 'Rejected'],
        },
        score: {
            type: Number,
            required: [true, 'Please provide a score'],
            min: [0, 'Score cannot be less than 0'],
            max: [100, 'Score cannot be more than 100'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Intern', internSchema);
