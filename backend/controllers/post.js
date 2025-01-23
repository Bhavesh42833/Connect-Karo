import e from "express";
import Post from "../models/posts.js";
import User from "../models/users.js";
import cloudinary from "cloudinary";
export const createPost = async (req, res) => {
 try{

     const myCloud=await cloudinary.v2.uploader.upload(req.body.image,{
      folder:"posts",
     });
      const newPostData={
          caption:req.body.caption,
          image:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
          },
          owner:req.user._id,
        }
     
        const newPost = await Post.create(newPostData);
        console.log(req.user._id);
        const user=await User.findById(req.user._id);
        
         user.posts.unshift(newPost._id);
         user.save();
        
         res.status(201).json({
            success:true,
            message:"Post created successfully",
            post:newPost,
        })
 }
 catch(err){
    res.status(500).json({
        success:false,
        message:err.message,
    })

 }

}

export const deletePost = async(req,res)=>{
  try {

    let post=await Post.findById(req.params.id);

    if(!post){
      res.status(404).json({
        success:"false",
        message:"Post not found",
      })
    }

    if(post.owner.toString()!==req.user._id.toString()){
      return res.status(401).json({ 
        success:false,
        message:"Unauthorized User",
      });}
    
    let user=await User.findById(req.user._id);
    const index=user.posts.indexOf(post._id);
    user.posts.splice(index,1);
    await user.save();
    await cloudinary.v2.uploader.destroy(post.image.public_id);
    await post.deleteOne();
    res.status(200).json({
      success:"true",
      message:"Post deleted successfully",});
  
  } catch (error) {
    res.status(500).json({
      success:"false",
      message:error.message,
    })
  }

}

export const likeandUnlikePost=async(req,res)=>{

  try {

    const post=await Post.findById(req.params.id);

    if(!post){
      return res.status(404).json({
        success:false,
        message:"Post not found",
      })
    }

    if(post.likes.includes(req.user._id)){
       const index=post.likes.indexOf(req.user._id);
       post.likes.splice(index,1);  
       await post.save();
       return res.status(200).json({
        success:true,
        message:"Post Unliked successfully",
       })
    }

    post.likes.push(req.user._id);
    await post.save();
    res.status(200).json({
      success:true,
      message:"Post liked successfully",
    })
    
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}

export const updateCaption=async(req,res)=>{

  try {

    const post=await Post.findById(req.params.id);

    if(!post){
      return res.status(404).json({
        success:false,
        message:"Post not found",
      })
    }

    if(post.owner.toString()!==req.user._id.toString()){
      return res.status(401).json({
        success:false,
        message:"Unauthorized"
      })
    }
    post.caption=req.body.caption;
    await post.save();
    res.status(200).json({
      success:true,
      message:"Post updated successfully",
    })
    
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}

export const AddComment=async(req,res)=>{
  try {
    
    const post =await Post.findById(req.params.id);
    if(!post){  
      return res.status(404).json({
        success:false,
        message:"Post not found",
      })
    }

    let CommentExist=false,index;
    post.comments.forEach((item)=>{
      if(item.user.toString()===req.user._id.toString()){
        CommentExist=true;
        index=post.comments.indexOf(item);
      }
    })

    if(CommentExist){
      post.comments[index].comment=req.body.comment;
      await post.save();
      res.status(200).json({
        success:true,
        message:"Comment updated successfully",
      })
    }
    else{
      post.comments.push({
        user:req.user._id,
        comment:req.body.comment
      })
      await post.save();
      res.status(200).json({
        success:true,
        message:"Comment added successfully",
      })
    }


  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
    });
  }
}

export const deleteComment=async(req,res)=>{
  try {
    const post =await Post.findById(req.params.id);
    if(!post){
      return res.status(404).json({
        success:false,
        message:"Post not found",
      })
    }

    if(post.owner.toString()==req.user._id.toString()){
      post.comments.forEach((item,index)=>{
        if(item._id.toString()==req.body.CommentId.toString()){
          post.comments.splice(index,1);
    
        }
      })
      await post.save();
      return res.status(200).json({
        success:true,
        message:"The selected Comment is deleted successfully",
      })
    }
    else{
      post.comments.forEach((item,index)=>{
        if(item.user.toString()==req.user._id.toString()){
          post.comments.splice(index,1);
        }
      })
      await post.save();
      return res.status(200).json({
        success:true,
        message:"Your Comment is deleted successfully",
      })
    }
    
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}

export const getPostOfFollowing=async(req,res)=>{
  try {
    const user=await User.findById(req.user._id);
    const posts=await Post.find({owner:{$in:user.following}}).populate("owner likes comments.user");    ;
    res.status(200).json({
      success:true,
      posts:posts.reverse(),
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}