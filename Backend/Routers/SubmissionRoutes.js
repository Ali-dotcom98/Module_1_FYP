// routes/submission.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

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

router.post("/Create", (req, res) => {
    try {

    } catch (error) {

    }
})

router.post("/Submit", async (req, res) => {
    try {
        const { language, code, testCases } = req.body;

        if (!languageMap[language]) {
            return res.status(400).json({ error: "Language not supported" });
        }

        const results = [];

        for (const tc of testCases) {
            const submission = await axios.post(
                `${JUDGE0_API}/submissions?wait=true`,
                {
                    language_id: languageMap[language],
                    source_code: code,
                    stdin: tc.input,
                    expected_output: tc.expectedOutput
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
                expected: tc.expectedOutput,
                output: submission.data.stdout,
                status: submission.data.status.description,
                time: submission.data.time,
                memory: submission.data.memory
            });
        }

        res.json({ results });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error processing submission", messsage: error.messsage });
    }
});

module.exports = router;
