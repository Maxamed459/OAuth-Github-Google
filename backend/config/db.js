import mongoose from "mongoose"
import { MONGO_DB_URL } from "./config.js"

export const connectDB = async () => {
    try {

        if (!MONGO_DB_URL) throw new Error("Mongo DB URL not found");

        await mongoose.connect(MONGO_DB_URL);
        console.log("✅ mongoDB connection successful!");

    } catch (error) {
        console.log("MongoDB connection Error: ", error);
    }
}