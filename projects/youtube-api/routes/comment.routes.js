import express from "express";
import mongoose from "mongoose";
import Comment from "../models/comment.model.js";
import { checkAuth } from "../middleware/auth.middleware.js"; // To authenticate users

const router = express.Router();

router.post("/new", checkAuth, async (req, res) => {
    try {
      const { video_id, commentText } = req.body;
      
      if (!video_id || !commentText) {
        return res.status(400).json({ error: "Video ID and Comment Text are required" });
      }
  
      const newComment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        video_id,
        commentText,
        user_id: req.user._id, // Extracted from token
      });
  
      await newComment.save();
      res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  router.delete("/:commentId", checkAuth, async (req, res) => {
    try {
      const { commentId } = req.params;
  
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
  
      if (comment.user_id.toString() !== req.user._id) {
        return res.status(403).json({ error: "Unauthorized to delete this comment" });
      }
  
      await Comment.findByIdAndDelete(commentId);
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.put("/:commentId", checkAuth, async (req, res) => {
    try {
      const { commentId } = req.params;
      const { commentText } = req.body;
  
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
  
      if (comment.user_id.toString() !== req.user._id) {
        return res.status(403).json({ error: "Unauthorized to edit this comment" });
      }
  
      comment.commentText = commentText;
      await comment.save();
      res.status(200).json({ message: "Comment updated successfully", comment });
    } catch (error) {
      console.error("Error updating comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  
  router.get("/comment/:videoId", async (req, res) => {
    try {
      const { videoId } = req.params;
  
      const comments = await Comment.find({ video_id: videoId })
        .populate("user_id", "channelName logoUrl") // Populate user details
        .sort({ createdAt: -1 }); // Sort by newest comments first
  
      res.status(200).json({ comments });
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  

  export default router;