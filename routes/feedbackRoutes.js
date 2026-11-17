import express from "express";
import Feedback from "../models/feedback.js";
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({
      message: "Feedback saved successfully",
      feedback: feedback,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/",async (req,res)=>{
    try{
        const feedbacks = await Feedback.find()
        res.status(200).json({
             message: "Feedback fetched successfully",
            feedbacks: feedbacks
        })

    } catch (error){
        res.status(500).json({
            message: error.message
        });

    }
})

export default router;
