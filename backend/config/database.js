import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config({path: '../backend/config/.env'});

export const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB is connected to :", db.connection.name);
    } catch(error) 
    {
        console.log(error);
    }
};
