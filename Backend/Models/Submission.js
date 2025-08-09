const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");
const submissionSchema = new mongoose.Schema({
    challengeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
        required: true
    },
    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    code: {
        type: String,
    },
    language: {
        type: String
    },

    result: {
        type: String,
        enum: ["Passed", "Failed", "Eliminated", "Pending"],
        default: 'Pending'
    },
    testCases: [
        {
            input: { type: mongoose.Schema.Types.Mixed },
            expectedOutput: { type: mongoose.Schema.Types.Mixed }
        }
    ],
    DetailTestCases: [
        {
            input: { type: String },
            expected: { type: String },
            output: { type: String },
            status: { type: String },
            time: { type: Number },
            memory: { type: Number },

        }
    ],
}, { timestamps: true });

const Submission = mongoose.model("Submission", submissionSchema)

module.exports = Submission