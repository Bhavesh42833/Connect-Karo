import {React,useEffect,useState} from 'react';
import { Typography, Button} from '@mui/material';
import { useDispatch ,useSelector} from 'react-redux';
import './UpdatePassword.css';
import { toast } from 'react-toastify';
import { updatePassword } from '../../Actions/User';

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [email,setEmail]=useState("");
    const {loading,message,error}=useSelector((state)=>(state.user))
    const dispatch = useDispatch();
    const UpdatePasswordHandler=async(e)=>{
        e.preventDefault();
        await dispatch(updatePassword(email,oldPassword,newPassword));
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
    <div className='updatePassword'>
      <form className="updatePasswordForm" onSubmit={UpdatePasswordHandler}>
            <Typography variant="h3" style={{padding : "2vmax"}}>Connect Karo</Typography>
            <input className="updatePasswordInputs" type="email" placeholder='Enter your email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            
            <input className="updatePasswordInputs" type="password" placeholder='Enter your Old Password' required value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
    
            <input className="updatePasswordInputs"type="password" placeholder='Enter your New Password' required value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
            <Button disabled={loading} type="submit">Update</Button>
        </form>
    </div>
  )
}

export default UpdatePassword;