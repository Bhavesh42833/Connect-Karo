import React from 'react'
import "./UpdateProfile.css"
import { Avatar, Button, Typography } from '@mui/material'
import { useState,useEffect} from 'react'
import { updateProfile ,loadUser} from '../../Actions/User'
import { useDispatch ,useSelector} from 'react-redux'
import { toast } from 'react-toastify'

const UpdateProfile = () => {
    const {loading,message,error,user}=useSelector((state)=>(state.user));
    const dispatch=useDispatch();
    const [name,setName]=useState(user.name);
    const [email,setEmail]=useState(user.email);
    const [image,setImage]=useState(user.avatar.url);
  
    const submitHandler=async(e)=>{
      e.preventDefault();
      await dispatch(updateProfile(image,name,email));
      dispatch(loadUser());
  
    }
  
    useEffect(()=>{
      if(message)
      {
        toast.success(message);
        dispatch({type:"clearMessages"});
      }
      if(error){
        toast.error(error);
        dispatch({type:"clearErrors"});
      }
    },[message,error,dispatch]);
  
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
  return (
    <div className='updateProfile'>

     <form  className="updateProfileForm" onSubmit={submitHandler}>

     <Typography variant="h3" style={{padding : "2vmax"}}>Connect Karo</Typography>
            <Avatar src={image} alt={name} style={{width:"10vmax",height:"10vmax"}}/>
            <input type="file" accept="image/*" onChange={imageHandler}/>
            <input className="updateProfileInputs" type="text" placeholder='Enter your Name'  value={name} onChange={(e)=>setName(e.target.value)} />
            <input className="updateProfileInputs" type="email" placeholder='Enter your Email'  value={email} onChange={(e)=>setEmail(e.target.value)} />
            <Button disabled={loading} type="submit">Update</Button>
     </form>
    </div>
  )
}

export default UpdateProfile