import {React,useEffect,useState} from 'react';
import { Typography, Button} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import './Login.css';
import { loginUser } from '../../Actions/User';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {message,error}=useSelector((state)=>(state.user))
    const dispatch = useDispatch();
    const LoginHandler=(e)=>{
        e.preventDefault();
        dispatch(loginUser(email,password));
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
    <div className='login'>
      <form className="loginForm" onSubmit={LoginHandler}>
            <Typography variant="h3" style={{padding : "2vmax"}}>Connect Karo</Typography>
            <input type="email" placeholder='Enter your Email' required value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder='Enter your Password' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <Link to="/forgot/password">
            <Typography>Forgot Password ?</Typography>
            </Link>
            <Button type="submit">Login</Button>
            <Link to="/register">
            <Typography>Don't have an account ?</Typography>
            </Link>
        </form>
    </div>
  )
}

export default Login;