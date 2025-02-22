import jwt from "jsonwebtoken";

import Video from "../models/video.model.js"; // Import Video model

export const checkOwnership = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    // If video not found
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    // Check if the video belongs to the logged-in user
    if (video.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You don't have permission to perform this action" });
    }

    // If ownership matches, allow proceeding to the next middleware
    next();
  } catch (error) {
    console.log("Error checking video ownership", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Ensure token exists
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Decode the token to get user data
    const decodedUser = jwt.verify(token, process.env.JWT_TOKEN);

    // Attach decoded user to req.user
    req.user = decodedUser;

    next();
  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
