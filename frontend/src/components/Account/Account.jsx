import React, { useEffect } from 'react'
import "./Account.css"
import { useDispatch,useSelector } from 'react-redux'
import { deleteProfile, getMyPost,loadUser,LogoutUser } from '../../Actions/User';
import Post from '../Post/Post';
import Loader from '../Loader/Loader';
import { Avatar, Button, Typography,Dialog } from '@mui/material';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import User from '../User/User';
const Account = () => {
    const dispatch = useDispatch();

      const {error,message}=useSelector((state)=>state.Action);
      const {user,loading:userLoading}=useSelector((state)=>state.user)
      useEffect(() => {
          dispatch(loadUser());
          dispatch(getMyPost());
        },[dispatch]);

    useEffect(()=>{
        if(error){
          toast.error(error);
          dispatch({type:"clearErrors"});
        }
        if(message){
          toast.success(message);
          dispatch({type:"clearMessages"});
        }
    },[error,message,dispatch]);

    const LogoutHandler=async()=>{
     await dispatch(LogoutUser());
     toast.success("Logged out Successfully");
    }

    const deleteAccountHandler=async()=>{
      await dispatch(deleteProfile());
      dispatch(LogoutUser());
    }

    const {loading,myposts}=useSelector((state)=>state.myPost);
    const [followersToggle,setFollowersToggle]=React.useState(false);
    const [followingToggle,setFollowingToggle]=React.useState(false);  

     return (loading ||userLoading ? (
    <Loader />
  ) : (
    <div className="account">
      {/* Left Section */}
      <div className="accountleft">
        {myposts?.length > 0 ? (
          myposts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner?.name}
              ownerId={post.owner?._id}
              tab={"account"}
              isDelete={true }
            />
          )) 
        ) : (
          <Typography variant="h6">You have not made any post</Typography>
        )}

     </div>
     <div className="accountright">

      <Avatar src={user.avatar.url} sx={{height:"8vmax",width:"8vmax"}} /> 

      <Typography variant="h5">{user.name}</Typography> 
      
      <div>
        <button onClick={() => setFollowersToggle(!followersToggle)}>
            <Typography>Followers</Typography>
        </button>
          <Typography>{user.followers.length}</Typography>
      </div>

      <div>
        <button onClick={()=>setFollowingToggle(!followingToggle)}>
            <Typography>Following</Typography>
        </button>
          <Typography>{user.following.length}</Typography>
      </div>

      <div>
          <Typography>Posts</Typography>
          <Typography>{user.posts.length}</Typography>
      </div> 

      <Button variant='contained' onClick={()=>LogoutHandler()}>Logout</Button>
      <Link to="/update/profile">Update Profile</Link>
      <Link to="/update/password">Update Password</Link>
      
      <Button disabled={userLoading} onClick={deleteAccountHandler}variant="text" style={{color:"red",margin:"2vmax"}}>Delete My Account</Button>
     
      <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)}>
        <div className="DialogBox">
          <Typography variant="h4">Followers</Typography>
          {user && user.followers.length>0?
          user.followers.map((follower) => (
            <User
            key={follower._id}
            userId={follower._id}
            name={follower.name}
            avatar={follower.avatar.url}
            />
          ))
          :(<Typography style={{margin:"2vmax"}}>You have no followers</Typography>)}

        </div>
      </Dialog>

      <Dialog open={followingToggle} onClose={() => setFollowingToggle(!followingToggle)}>
        <div className="DialogBox">
          <Typography variant="h4">Following</Typography>
          {user && user.following.length>0?
          user.following.map((following) => (
            <User
            key={following._id}
            userId={following._id}
            name={following.name}
            avatar={following.avatar.url}
            />
          ))
          :(<Typography style={{margin:"2vmax"}}>You follow no one</Typography>)}

        </div>
      </Dialog>
     
     </div>
    </div>
  )

)
}

export default Account