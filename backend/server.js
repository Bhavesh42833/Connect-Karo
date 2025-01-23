import app from "./app.js";
import ConnectDatabase from "./config/database.js";
import cloudinary from "cloudinary";
ConnectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.listen(5050,()=>{
    console.log("Server is connected on port 5050");
})