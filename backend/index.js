import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import authenticateUser from "./middlewares/authentication.js";
import productRouter from "./routers/productRouter.js";

const app = express();

const mongodbURI = "mongodb+srv://kanchana:KanchANA2000@cluster0.scmq5gg.mongodb.net/icomputers?appName=Cluster0"

mongoose.connect(mongodbURI).then(
    ()=>{
        console.log("connected to mongoDB")
    }
)

app.use(express.json())
// call middleware 
app.use (authenticateUser)

/*app.get("/", (req,res)=>{
    console.log(req)
    console.log("get request received.")})
app.post("/", (req,res)=>{
    console.log(req.body)
    console.log("post request received.")
    res.json({
        message: "data recevied."
    })
})
app.delete("/", ()=>{console.log("delete request received.")})
app.put("/", ()=>{console.log("put request received.")})*/

app.use ("/users", userRouter)
app.use("/products", productRouter)

app.listen(3000, ()=>{console.log("server is running on port 3000")});