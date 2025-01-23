import User from "../models/users.js";
import Post from "../models/posts.js";
import crypto from "crypto";
import { sendEmail } from "../middlewares/SendEmail.js";
import cloudinary from "cloudinary";
export const createUser = async (req, res) => {
 try{
       const { image,name,email,password}=req.body;
       const myCloud=await cloudinary.v2.uploader.upload(image,{
        folder:"users",
       });
       let user=await User.findOne({email});
       if(user){
           return res.status(400).json({
               success:false,
               message:"User already Exists",}); 
           }

       user=await User.create({
           name,
           email,
           password,
           avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url, 
           }
       });

       const token=await user.generateToken();
       const options={
           expires:new Date(Date.now()+90*24*60*60*1000),
           httpOnly:true,
           SameSite:"None",
       }

            res.status(201).cookie("token",token,options).json({
               success:true,
               message:"User created successfully",
               profile:user,
           })
       }
        
catch(err){
    res.status(500).json({
        success:false,
        message:err.message,
    });
 }
}


export const loginUser = async (req, res) => {
    try {
        const {email,password}=req.body;

        let user=await User.findOne({email}).select("+password").populate("followers following posts");
        if(!user)
            return res.status(400).json({
        success:false,
        message:"User does not exist",});
        
        const isMatch=await user.comparePassword(password);
       
        if(!isMatch)
            return res.status(400).json({
        success:false,
        message:"Incorrect password",});
        
        const token=await user.generateToken();
        const options={
            expires:new Date(Date.now()+90*24*60*60*1000),
            httpOnly:true,
            SameSite:"None",
        }

        res.status(200).cookie("token",token,options).json({
            success:true,
            message:"User logged in successfully",
            profile:user,
        });
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message,
        })
    }
}

export const logoutUser=async(req,res)=>{
    res.status(200).cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    }).json({
        success:true,
        message:"User logged out successfully",
    })
}

export const followUser=async(req,res,next)=>{
    try {

     const UserToFollow=await User.findById(req.params.id);
     const loggedInUser=await User.findById(req.user._id);
     if(!UserToFollow){
        return res.status(404).json({
            success:false,
            message:"User not found",
        })
     }

     if(loggedInUser.following.includes(UserToFollow._id)){
     
        const indexFollowing=loggedInUser.following.indexOf(UserToFollow._id);
        loggedInUser.following.splice(indexFollowing,1);

        const indexFollowers=UserToFollow.followers.indexOf(loggedInUser._id);
        UserToFollow.followers.splice(indexFollowers,1);

        await loggedInUser.save();
        await UserToFollow.save();

        return res.status(200).json({
            success:true,
            message:"User unfollowed successfully",
        });
    
    }

     loggedInUser.following.push(UserToFollow._id);
     UserToFollow.followers.push(loggedInUser._id);

     await loggedInUser.save();
     await UserToFollow.save();
    //  res.status(200).json({
    //     success:true,
    //     message:"User followed successfully",
    //  });
    next();
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

export const GetFollowPost=async(req,res)=>{

    try {
        
        const user=await User.findById(req.user._id);
        const following=user.following; 

        const posts=await Post.find({
            owner:{$in:following},});
        res.status(200).json({
            success:true,
            posts,
        });


    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


export const updatePassword=async(req,res)=>{
    try {
        const {email,oldPassword,newPassword}=req.body;
         
        if(!email || !oldPassword || !newPassword){
            return res.status(400).json({
                success:false,
                message:"Please provide email, old password and new password",
            });
        }
        
        const user=await User.findOne({email}).select("+password");
         if(!user){
            return res.status(400).json({
                success:false,  
                message:"User does not exist",});
            }
        if(user._id.toString()!=req.user._id.toString()){
            return res.status(400).json({
                success:false,
                message:"Not Authorized"
            })
        }
        const isMatch=await user.comparePassword(oldPassword);
        if(!isMatch){
            return res.status(400).json({   
                success:false,
                message:"Old password is incorrect",});
            }
        user.password=newPassword;
        await user.save();
        res.status(200).json({
            success:true,
            message:"Password updated successfully",
        });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

export const updateProfile=async(req,res)=>{
    try {
     
    const user=await User.findById(req.user._id);
    const {name,email,image}=req.body;

    if(!name && !email && !image){
        return res.status(400).json({
            success:false,
            message:"Please provide Username or Email or Avatar",
        })
    }

    if(await User.findOne({email})){
        return res.status(400).json({
            success:false,
            message:"Email already exists",});
        }
    if(name){
        user.name=name;
    }
    if(email){
        user.email=email;
    }
    if(image){
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        const myCloud=await cloudinary.v2.uploader.upload(image,{
            folder:"users",
        })

        user.avatar={
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }
        
    }
    await user.save();
    res.status(200).json({
        success:true,
        message:"Profile updated successfully",
    })


    } catch (error) {
      res.status(500).json({
        success:false,
        message:error.message,
      })       
    }
}

export const DeleteProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const posts = user.posts || [];
        const followers = user.followers || [];
        const followings = user.following || [];

        // Removing photos from cloudinary
        if (user.avatar && user.avatar.public_id) {
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        }

        // Remove all posts associated with the user
        for (const postId of posts) {
            const post = await Post.findById(postId);
            if (post && post.image && post.image.public_id) {
                await cloudinary.v2.uploader.destroy(post.image.public_id);
            }
            if (post) {
                await Post.deleteOne({ _id: post._id });
            }
        }

        for (const followerId of followers) {
            const follower = await User.findById(followerId);
            if (follower) {
                const index = follower.following.indexOf(user._id);
                if (index > -1) follower.following.splice(index, 1);
                await follower.save();
            }
        }

        for (const followingId of followings) {
            const following = await User.findById(followingId);
            if (following) {
                const index = following.followers.indexOf(user._id);
                if (index > -1) following.followers.splice(index, 1);
                await following.save();
            }
        }

        // Remove all comments and likes associated with the user
        const allPosts = await Post.find();
        for (const post of allPosts) {
            post.comments = post.comments.filter(
                (comment) => comment.user.toString() !== req.user._id.toString()
            );
            post.likes = post.likes.filter(
                (like) => like.toString() !== req.user._id.toString()
            );
            await post.save();
        }

        // Delete the user
        await User.findByIdAndDelete(req.user._id);

        // Clear the token cookie
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        // Send success response
        return res.status(200).json({
            success: true,
            message: "Profile deleted successfully",
        });
    } catch (error) {
        // Send error response
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



  export const getUserProfile=async(req,res)=>{
    try {
    
        const user=await User.findById(req.params.id).populate("posts followers following");
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            })
        }
        res.status(200).json({
            success:true,
            user,
        });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

export const getMyProfile=async(req,res)=>{
    try {
    
        const user=await User.findById(req.user._id).populate(
            "followers following"
        );
        
        res.status(200).json({
            success:true,
            profile:user,   
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

export const getAllUsers=async(req,res)=>{
    try {
    
        const users=await User.find({
            name:{$regex:req.query.name,$options:"i"},
        });
        res.status(200).json({
            success:true,
            users,
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

export const forgotPassword=async(req,res)=>{
    const user =await User.findOne({email:req.body.email});

    if(!user){
        return res.status(404).json({success:false,message:"User not found"});
    }

    const resetPasswordToken =  await user.getResetPasswordToken();
        await user.save();

    const resetUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetPasswordToken}`;
    
    const message=`Reset your Password By clicking on the link below : \n\n ${resetUrl}`;

    try {
        await sendEmail({
            email:user.email,
            subject:"Reset Password",
            message 
        });
        res.status(200).json({
            success:true,
            message:`Email sent successfully to ${user.email}`,
        });

    } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save();
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

export const resetPassword=async(req,res)=>{

    const resetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
   
    const user=await User.findOne({
        resetPasswordToken:resetToken,
        resetPasswordExpire:{$gt:Date.now()},
    });
    if(!user){
        return res.status(401).json({
            success:false,
            message:"Token is invalid or has been expired",
        })
    }

    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();

    res.status(200).json({
        success:true,
        message:"Password reset successfully",
    })
}
export const getMyPost=async(req,res)=>{
    try {
    
        const users=await User.findById(req.user._id);

        const posts=[];

        for(let i=0;i<users.posts.length;i++){
            const post=await Post.findById(users.posts[i]).populate("owner likes comments.user");
            posts.push(post);
        }
        res.status(200).json({
            success:true,
            posts,
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

export const getUserPost=async(req,res)=>{
    try {
    
        const users=await User.findById(req.params.id);

        const posts=[];

        for(let i=0;i<users.posts.length;i++){
            const post=await Post.findById(users.posts[i]).populate("owner likes comments.user");
            posts.push(post);
        }
        res.status(200).json({
            success:true,
            posts,
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}