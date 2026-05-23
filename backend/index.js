import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import authenticateUser from "./middlewares/authentication.js";
import productRouter from "./routers/productRouter.js";
import cors from "cors";
import dotenv from "dotenv";
import orderRouter from "./routers/orderRouter.js";
import reviewRouter from "./routers/reviewRouter.js"

dotenv.config();


const app = express();

const mongodbURI = process.env.MONGO_URI

mongoose.connect(mongodbURI).then(
    ()=>{
        console.log("connected to mongoDB")
    }
)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));
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

app.use ("/api/users", userRouter)
app.use("/api/products", productRouter)
app.use("/api/orders", orderRouter)
app.use("/api/reviews", reviewRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{console.log(`server is running on port ${PORT}`)});