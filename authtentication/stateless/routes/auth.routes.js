import express from "express";
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

const router = express.Router()


router.post("/signup" , async (req , res)=>{
    const {username , password} = req.body;

    try {
        const existingUser = await User.findOne({username})

        if(existingUser) return res.status(400).json({message:"Username already exists."})

         const newUser = new User({username , password});

         await newUser.save();

         res.status(201).json({message:"user registered successfully!"})

    } catch (error) {
        res.status(500).json({
            message:"Something went wrong",
            error:error.message
        })
    }
})

router.post("/login" , async(req , res)=>{
    const {username , password} = req.body;

    try {
        
        const user = await User.findOne({username})
        
        if(!user) return res.status(401).json({message:"Invalid username or password"})


        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({message:"Invalid username or password"})
       

        // create a token using jwt
        const token = jwt.sign({id:user._id , username:user.username} , process.env.JWT_SECRET , {expiresIn:"1h"});

        res.status(200).json({message:"Login Successful." , token})
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong",
            error:error.message
        })
    }
})

export default router;