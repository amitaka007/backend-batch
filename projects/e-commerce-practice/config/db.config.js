import mongoose from "mongoose";


export const connectDB = async ()=>{
    try {
        let conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}