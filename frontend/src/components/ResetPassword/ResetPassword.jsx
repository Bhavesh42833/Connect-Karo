import {React,useEffect,useState} from 'react';
import { Typography, Button} from '@mui/material';
import { useDispatch ,useSelector} from 'react-redux';
import './ResetPassword.css';
import { toast } from 'react-toastify';
import { resetPassword } from '../../Actions/User';
import { useParams, Link} from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword,setNewPassword]=useState("");
    const {loading,message,error}=useSelector((state)=>(state.user))
    const dispatch = useDispatch();
    const params=useParams();
    const ResetPasswordHandler=async(e)=>{
        e.preventDefault();
        await dispatch(resetPassword(params.token,newPassword));
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
    <div className='resetPassword'>
      <form className="resetPasswordForm" onSubmit={ResetPasswordHandler}>
            <Typography variant="h3" style={{padding : "2vmax"}}>Connect Karo</Typography>
            <input className="resetPasswordInputs" type="password" placeholder='Enter new Password' required value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
            <Link to="/forgot/password">
            <Typography>Generate New Token</Typography>
            </Link>
            <Button disabled={loading} type="submit">Reset</Button>
        </form>
    </div>
  )
}

export default ResetPassword;