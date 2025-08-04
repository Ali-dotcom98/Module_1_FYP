const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema({
    input: {
        type: String,
        required: true
    },
    expectedOutput: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    }
});

const challengeSchema = new mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    functionSignature: {
        type: String,
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        default: "Easy"
    },
    language: {
        type: [String],
        default: ["javascript"]
    },
    startTime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    testCases: [testCaseSchema],
    tags: {
        type: [String],
        default: []
    },
}, { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } });

module.exports = mongoose.model("Challenge", challengeSchema);
