import { AddComment, createPost, deleteComment, deletePost, likeandUnlikePost, updateCaption,getPostOfFollowing } from "../controllers/post.js";
import express from "express";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();

router.route("/upload").post(isAuthenticated,createPost);

router.route("/:id").get(isAuthenticated,likeandUnlikePost).
delete(isAuthenticated,deletePost).put(isAuthenticated,updateCaption);

router.route("/comment/:id").put(isAuthenticated,AddComment).delete(isAuthenticated,deleteComment);
export default router;

router.route("/").get(isAuthenticated,getPostOfFollowing);