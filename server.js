import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import feedbackRoutes from "./routes/feedbackRoutes.js"
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express()
app.use(express.json())
app.use(express.static("public"))
app.use("/api/feedback",feedbackRoutes)
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB connected successfully")
    app.listen(PORT,()=>{
console.log(`Server is running on http://localhost:${PORT}`)
    })
})
.catch((error) => {
    console.log("MongoDB connection error:", error);
});