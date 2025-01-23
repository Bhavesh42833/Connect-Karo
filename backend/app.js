import express from "express";
import dotenv from "dotenv";
import post from "./routers/post.js";
import user from "./routers/user.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config(
    {path: './config/config.env'});

//Using Middlewares
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb",extended:true}));
app.use(cookieParser());

//using Routes
app.use("/api/v1/post", post);
app.use("/api/v1/user", user);



    export default app;