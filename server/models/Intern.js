const mongoose = require('mongoose');

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name must be at least 2 characters long'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: {
            values: ['Frontend', 'Backend', 'Fullstack'],
            message: '{VALUE} is not a valid role'
        }
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: {
            values: ['Applied', 'Interviewing', 'Hired', 'Rejected'],
            message: '{VALUE} is not a valid status'
        }
    },
    score: {
        type: Number,
        required: [true, 'Score is required'],
        min: [0, 'Score cannot be less than 0'],
        max: [100, 'Score cannot be more than 100']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Intern', internSchema);
