import {React,useEffect,useState} from 'react';
import { Typography, Button,Link} from '@mui/material';
import { useDispatch ,useSelector} from 'react-redux';
import './ForgotPassword.css';
import { toast } from 'react-toastify';
import { forgotPassword } from '../../Actions/User';

const ForgotPassword = () => {
    const [email,setEmail]=useState("");
    const {loading,message,error}=useSelector((state)=>(state.user))
    const dispatch = useDispatch();
    const UpdatePasswordHandler=async(e)=>{
        e.preventDefault();
        await dispatch(forgotPassword(email));
     }

    useEffect(()=>{
      if(message){
        toast.success(message);
        dispatch({type:"clearMessages"})
      }
      if(error)
      {
        toast.error(error);
        dispatch({type:"clearErrors"})
      }
    },[message,error,dispatch]);
  return (
    <div className='forgotPassword'>
      <form className="forgotPasswordForm" onSubmit={UpdatePasswordHandler}>
            <Typography variant="h3" style={{padding : "2vmax"}}>Connect Karo</Typography>
            <input className="forgotPasswordInputs" type="email" placeholder='Enter your email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            
            <Button disabled={loading} type="submit">Send Token</Button>
        </form>
    </div>
  )
}

export default ForgotPassword;