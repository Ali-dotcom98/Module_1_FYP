const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema({
    input: {
        type: String,
    },
    expectedOutput: {
        type: String,
    },
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
    Question: {
        type: String
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

    },
    duration: {
        type: Number,

    },
    isPublic: {
        type: Boolean,
        default: false
    },
    testCases: [testCaseSchema],
    tags: {
        type: [String],
        default: []
    },
    examples: [
        {
            ExampleURl: { type: String },
            input: { type: String },
            output: { type: String }
        }
    ]

}, { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } });

module.exports = mongoose.model("Challenge", challengeSchema);
