import React from 'react'
import "./Register.css"
import { Avatar, Button, Typography } from '@mui/material'
import { useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { RegisterUser } from '../../Actions/User'
import { useDispatch ,useSelector} from 'react-redux'
import { toast } from 'react-toastify'

const Register = () => {
  const dispatch=useDispatch();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [image,setImage]=useState(null);
  const {loading,message,error}=useSelector((state)=>(state.user));

  const submitHandler=(e)=>{
    e.preventDefault();
    dispatch(RegisterUser(image,name,email,password));

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
    <div className='register'>

     <form  className="registerForm" onSubmit={submitHandler}>

     <Typography variant="h3" style={{padding : "2vmax"}}>Connect Karo</Typography>
            <Avatar src={image} alt={name} style={{width:"10vmax",height:"10vmax"}}/>
            <input type="file" accept="image/*" onChange={imageHandler}/>
            <input className="registerInputs" type="text" placeholder='Enter your Name' required value={name} onChange={(e)=>setName(e.target.value)} />
            <input className="registerInputs" type="email" placeholder='Enter your Email' required value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input className="registerInputs" type="password" placeholder='Enter your Password' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <Link to="/"><Typography>Already Signed Up ?</Typography></Link>
            <Button disabled={loading} type="submit">Sign Up</Button>
     </form>
    </div>
  )
}

export default Register