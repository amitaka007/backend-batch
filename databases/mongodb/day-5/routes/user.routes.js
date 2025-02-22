import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Routes

// CRUD operation

// Retrieve all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Create a new user
router.post("/users", async (req, res) => {
    try {
        const { name, age, weight } = req.body;

        const newUser = new User({ name, age, weight });
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update user details
router.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { name, age, weight } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, age, weight },
            { new: true, runValidators: true } // Returns the updated document and applies validation
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Delete a user
router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

export default router;
