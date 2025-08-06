const express = require("express");
const route = express.Router();
const { Protect } = require("../Middleware/Token_Middleware")
const Challenge_Model = require("../Models/Challenge_Model")

route.post("/Create", Protect, async (req, res) => {
    try {

        const status = req.user.status;
        if (status == "Student")
            return res.status(401).json({ message: "Students are not Allowed to Create a Challenge" })
        const { title } = req.body;
        const DefaultChallenge = {
            description: "Null",
            functionSignature: "",
            difficulty: "Easy",
            language: [""],
            startTime: "",
            duration: "",
            tags: "",
            isPublic: false,
            Question: "",
            testCases: [
                {
                    input: "",
                    expectedOutput: "",
                }
            ],
            examples: [
                {
                    ExampleURl: "",
                    input: "",
                    output: ""
                }
            ]
        }
        const ChallengeCreated = await Challenge_Model.create({
            title,
            UserID: req.user._id,
            ...DefaultChallenge
        })

        res.send(ChallengeCreated)

    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }

})

route.get("/GetAll", Protect, async (req, res) => {
    try {
        const status = req.user.status;
        if (status == "Student")
            return res.status(401).json({ message: "Student are Not Allowed" })

        const NumberOfChallengeCreated = await Challenge_Model.find({ UserID: req.user._id })
        if (!NumberOfChallengeCreated)
            return res.send("Looks like no challenges have been created yet!")
        res.send(NumberOfChallengeCreated)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
})

route.get("/GetAll/:id", Protect, async (req, res) => {
    try {
        const ChallengeID = req.params.id;
        const status = req.user.status;
        if (status == "Student")
            return res.status(401).json({ message: "Student are Not Allowed" })

        const NumberOfChallengeCreated = await Challenge_Model.findOne({ _id: ChallengeID })
        if (!NumberOfChallengeCreated)
            return res.send("The challenge ID you are looking for does not exist.")
        res.send(NumberOfChallengeCreated)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
})

route.put("/Update/:id", Protect, async (req, res) => {
    try {
        const status = req.user.status;
        if (status == "Student")
            return res.status(401).json({ message: "Student are Not Allowed" })

        const id = req.params.id;

        const Challenge = await Challenge_Model.findOne({ _id: id });
        if (!Challenge)
            return res.send("The challenge ID you are looking for does not exist.")

        Object.assign(Challenge, req.body);
        const savedChallenge = await Challenge.save();
        res.send(savedChallenge)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
})


route.delete("/Delete/:id", Protect, async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.user.status;
        if (status == "Student")
            return res.status(401).json({ message: "Students are not Allowed to Delete the Challenge" })
        const DeleteChallenge = await Challenge_Model.findByIdAndDelete({ _id: id });
        if (DeleteChallenge)
            return res.send("Challenge Deleted")
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }

})

module.exports = route