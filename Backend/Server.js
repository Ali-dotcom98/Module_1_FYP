const express = require("express")
const app = express();


app.use(express.json());


app.get("/", (req, res) => {
    try {
        res.send("Coding Competitons")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.listen(3000, () => {
    console.log("App Running on Port 3000 ... ");

})