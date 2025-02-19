import React, { useEffect } from 'react'
import "./NewPost.css"
import { useState } from 'react';
import { Button,Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from '../../Actions/Post';
import { toast } from 'react-toastify';
import { loadUser } from '../../Actions/User';

const NewPost = () => {

    const[image,setImage] = useState(null);
    const[caption,setCaption] = useState("");
    const dispatch=useDispatch();
    const{loading,error,message}=useSelector((state)=>state.Action)
    const imageHandler=(e)=>{
       const file=e.target.files[0];
       const reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onloadend=()=>{
        if(reader.readyState === 2){
        setImage(reader.result);
       }
     }
   }

   const newPostHandler=async(e)=>{
     e.preventDefault();
     await dispatch(addNewPost(caption,image));
    dispatch(loadUser());
     
    }

    useEffect(() => {
      if(error){
        toast.error(error);
        dispatch({type:"clearErrors"});
      }
      if(message){
        toast.success(message);
        dispatch({type:"clearMessages"}); 
      }},[error,message,dispatch]);
  return (
    <div className='newPost'>
      <form className="newPostForm" onSubmit={newPostHandler}>
            <Typography variant="h3">New Post</Typography>

            {image && <img src={image} alt="post" />}
            <input type="file" accept="image/*" onChange={imageHandler}/>
            <input type="text"  placeholder="Caption" value={caption} onChange={(e)=>setCaption(e.target.value)}/>
            <Button disabled={loading} type="submit" >Post</Button>
        </form>
    </div>
  )
}

export default NewPost