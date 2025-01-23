import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

const connectDatabase = () => {
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    console.error("DATABASE_URL is not defined in the environment variables.");
    process.exit(1); // Exit the process if DATABASE_URL is missing
  }

  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected successfully!"))
    .catch((err) => {
      console.error("Database connection error:", err.message);
      process.exit(1); // Exit the process on connection failure
    });
};

export default connectDatabase;
