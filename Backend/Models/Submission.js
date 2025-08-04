const mongoose = require("mongoose");
const submissionSchema = new mongoose.Schema({
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        enum: ['javascript', 'python', 'cpp', 'java'],
        required: true
    },
    result: {
        type: String,
        default: 'pending'
    },
    passedTestCases: {
        type: Number,
        default: 0
    },
    totalTestCases: {
        type: Number,
        default: 0
    },
    executionTime: Number, // in milliseconds
    memoryUsed: Number, // optional, in KB
    errorMessage: String // if any
}, { timestamps: true });

const Submission = mongoose.model("Submission", submissionSchema)