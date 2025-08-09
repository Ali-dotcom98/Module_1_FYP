// routes/submission.js
const express = require("express");
const axios = require("axios");
const { Protect } = require("../Middleware/Token_Middleware");
const router = express.Router();
const Submission_Model = require("../Models/Submission.js")

const JUDGE0_API = "https://judge0-ce.p.rapidapi.com";
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
console.log(RAPIDAPI_KEY);


// Language mapping
const languageMap = {
    python: 71,
    cpp: 54,
    java: 62,
    javascript: 63
};

router.post("/Create", Protect, async (req, res) => {
    try {
        const { ChallengeID } = req.body;
        const DefaultSubmission = {
            code: "",
            result: "Pending",
            language: "",
            testCases: [
                {
                    input: null,
                    expectedOutput: null,
                }
            ],
            DetailTestCases: [
                {
                    input: "",
                    expected: "",
                    output: "",
                    status: "",
                    time: 0,
                    memory: 0
                }
            ]
        }
        const CreateSubmission = await Submission_Model.create({
            challengeID: ChallengeID,
            studentID: req.user._id,
            ...DefaultSubmission
        })
        res.send(CreateSubmission);

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})
router.delete("/Delete/:id", Protect, async (req, res) => {
    try {
        const response = await Submission_Model.findByIdAndDelete({ _id: req.params.id })
        if (!response) {
            return res.status(500).json({ message: "Failed to delete item due to server error" });
        }
        return res.send("Submission Deleted");

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }

})

router.get("/GetAllByInstructor/:id", Protect, async (req, res) => {
    try {
        const Status = req.user.status;
        if (Status == "Student")
            return res.status(401).json({ message: "Students are not Allowed to Create a Challenge" })

        const submissions = await Submission_Model.find({ _id: id });

        if (!submissions || submissions.length === 0) {
            return res.status(404).json({ message: "No submissions found" });
        }

        res.status(200).json(submissions);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.get("/StudentSubmission", Protect, async (req, res) => {
    try {
        const response = await Submission_Model.find({ studentID: req.user._id });
        if (!response || response.length == 0)
            return res.status(404).json({ message: "No submissions found" });

        res.send(response)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

const HandleTestcases = async (code, language, testCases) => {
    try {
        if (!languageMap[language]) {
            throw new Error("Language not supported");
        }

        const results = [];

        for (const tc of testCases) {
            // Normalize input
            let stdinValue;
            if (typeof tc.input === "string") {
                stdinValue = JSON.parse(tc.input);
            } else {
                stdinValue = JSON.stringify(tc.input);
            }

            // Normalize expected output as string (trimmed)
            const expectedOutput = String(tc.expectedOutput).trim();

            const submission = await axios.post(
                `${JUDGE0_API}/submissions?wait=true`,
                {
                    language_id: languageMap[language],
                    source_code: code,
                    stdin: stdinValue,
                    expected_output: expectedOutput
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-RapidAPI-Key": RAPIDAPI_KEY,
                        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
                    }
                }
            );

            results.push({
                input: tc.input,
                expected: expectedOutput,
                output: submission.data.stdout?.trim() ?? "",
                status: submission.data.status?.description,
                time: submission.data.time,
                memory: submission.data.memory
            });
        }

        return results;

    } catch (error) {
        console.error(error);
        return [];
    }
};



router.put("/Update/:id", Protect, async (req, res) => {
    try {
        const Submission = await Submission_Model.findOne({ _id: req.params.id })
        if (!Submission)
            return res.status(404).json({ message: "No submissions found" });
        Object.assign(Submission, req.body);

        Submission.save();
        const { code, language, testCases } = Submission
        const GetSubmissionResult = await HandleTestcases(code, language, testCases);

        res.send(GetSubmissionResult)

        // const ConfirmSubmission = await Submission_Model.findOne({ _id: req.params.id })

        // ConfirmSubmission.DetailTestCases = ConfirmSubmission :

        // res.send(Submission)


    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})



// router.post("/Submit", async (req, res) => {
//     try {
//         const { language, code, testCases } = req.body;

//         if (!languageMap[language]) {
//             return res.status(400).json({ error: "Language not supported" });
//         }

//         const results = [];

//         for (const tc of testCases) {
//             const submission = await axios.post(
//                 `${JUDGE0_API}/submissions?wait=true`,
//                 {
//                     language_id: languageMap[language],
//                     source_code: code,
//                     stdin: tc.input,
//                     expected_output: tc.expectedOutput
//                 },
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         "X-RapidAPI-Key": RAPIDAPI_KEY,
//                         "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
//                     }
//                 }
//             );

//             results.push({
//                 input: tc.input,
//                 expected: tc.expectedOutput,
//                 output: submission.data.stdout,
//                 status: submission.data.status.description,
//                 time: submission.data.time,
//                 memory: submission.data.memory
//             });
//         }

//         res.json({ results });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error processing submission" });
//     }
// });

module.exports = router;
