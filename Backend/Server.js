const express = require("express")
const app = express();
const User_Model = require("./Models/User_Model");
const Submission_Model = require("./Models/Submission");
const Challenge_Model = require("./Models/Challenge_Model");

const AuthRoutes = require("./Routers/AuthRoutes")
const Challenge = require("./Routers/ChallengeRoutes");

const { ConnectDb } = require("./DataBase/ConnectDB");
const Cors = require("cors")

ConnectDb();

app.use(express.json());
app.use(Cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/Auth", AuthRoutes);
app.use("/Chlg", Challenge)

app.listen(3000, () => {
    console.log("App Running on Port 3000 ... ");

})