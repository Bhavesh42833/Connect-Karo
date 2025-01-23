import express from "express";
import { createUser, getUserPost,DeleteProfile,getMyPost, followUser, forgotPassword, getAllUsers, GetFollowPost, getMyProfile, getUserProfile, loginUser, logoutUser, resetPassword, updatePassword, updateProfile } from "../controllers/user.js";
import isAuthenticated from "../middlewares/auth.js";

const router=express.Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/follow/:id").get(isAuthenticated, followUser);
router.route("/update/password").put(isAuthenticated,updatePassword);
router.route("/update/profile").put(isAuthenticated,updateProfile);
router.route("/delete").delete(isAuthenticated,DeleteProfile);
router.route("/me").get(isAuthenticated,getMyProfile);
router.route("/me/posts").get(isAuthenticated,getMyPost);
router.route("/post/:id").get(isAuthenticated,getUserPost);
router.route("/users").get(isAuthenticated,getAllUsers);
router.route("/:id").get(isAuthenticated,getUserProfile);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

export default router;