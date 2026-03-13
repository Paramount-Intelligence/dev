import mongoose from 'mongoose';

const internSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide an intern name'],
            minlength: [2, 'Name must be at least 2 characters long'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please provide an email address'],
            unique: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
            trim: true,
            lowercase: true,
        },
        role: {
            type: String,
            required: [true, 'Please select a role'],
            enum: ['Frontend', 'Backend', 'Fullstack'],
        },
        status: {
            type: String,
            required: [true, 'Please select a status'],
            enum: ['Applied', 'Interviewing', 'Hired', 'Rejected'],
            default: 'Applied',
        },
        score: {
            type: Number,
            required: [true, 'Please provide an evaluation score'],
            min: [0, 'Score cannot be less than 0'],
            max: [100, 'Score cannot exceed 100'],
        },
    },
    {
        timestamps: true,
    }
);

// Add unique index on email
internSchema.index({ email: 1 }, { unique: true });

const Intern = mongoose.model('Intern', internSchema);

export default Intern;
