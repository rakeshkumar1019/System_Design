import express from "express";
import { createClient } from "redis";
const app = express();
app.use(express.json());


const client = createClient();
client.connect();

app.post("/submit", async (req, res) => {
    const { problemId, userId, code, language } = req.body;
    //push to db
    try {
        await client.lPush("submissions", JSON.stringify({ problemId, userId, code, language }))
        res.json({
            message: "Submission received!!"
        })
    } catch (err) {
        res.json({
            message: "Submission failled!!"
        })
    }

})

app.listen(3000,()=>{
    console.log("server is running at 3000")
});