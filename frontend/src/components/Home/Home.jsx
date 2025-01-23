import React, { useEffect } from 'react';
import './Home.css';
import User from '../User/User';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowingPost, getAllUsers } from '../../Actions/User';
import { Typography } from '@mui/material';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';

const Home = () => {
  const dispatch = useDispatch();
  const {error,message}=useSelector((state)=>state.Action);

  useEffect(() => {
    dispatch(getFollowingPost());
    dispatch(getAllUsers());
  }, [dispatch]);

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

  const { loading, posts } = useSelector((state) => state.postOfFollowing);
  const { users ,loading:usersLoading } = useSelector((state) => state.allUsers);

  return (loading || usersLoading)? (
    <Loader />
  ) : (
    <div className="home">
      {/* Left Section */}
      <div className="homeleft">
        {posts?.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image?.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner?.avatar?.url}
              ownerName={post.owner?.name}
              ownerId={post.owner?._id}
            />
          ))
        ) : (
          <Typography variant="h6">No Post Yet</Typography>
        )}
      </div>

      {/* Right Section */}
      <div className="homeright">
        {users?.length > 0 ? (
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar?.url}
            />
          ))
        ) : (
          <Typography variant="h6">No Users Found</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
