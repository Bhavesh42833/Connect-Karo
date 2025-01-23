import mongoose from "mongoose";
import dotenv from "dotenv";


const connectDatabase = () => {
  const dbUrl = process.env.DATABASE_URL;


  mongoose.connect(dbUrl).then(() => console.log("Database Connected"))
    .catch(err => console.error("Database connection error:", err));
};

export default connectDatabase;
