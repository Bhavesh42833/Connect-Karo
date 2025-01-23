import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  followUser, getUserPost, getUserProfile } from '../../Actions/User';
import { useParams } from 'react-router-dom';
import Post from '../Post/Post';
import Loader from '../Loader/Loader';
import { Avatar, Button, Typography, Dialog } from '@mui/material';
import { toast } from 'react-toastify';
import User from '../User/User';

const UserProfile = () => {
    const dispatch = useDispatch();
    const Params = useParams();

    const { loading:followLoading,error:followError, message } = useSelector((state) => state.Action);
    const { user, loading: userLoading ,error:userProfileError} = useSelector((state) => state.userProfile);
    const { user: loggedinUser ,error} = useSelector((state) => state.user);
    const { loading, posts} = useSelector((state) => state.userPost);

    const [isUser, setIsUser] = useState(false);
    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);
    const [following, setFollowing] = useState(false);

    useEffect(() => {
        dispatch(getUserPost(Params.id));
        dispatch(getUserProfile(Params.id));
        if (loggedinUser && Params.id === loggedinUser._id) {
            setIsUser(true);
        } else {
            setIsUser(false);
        }
    }, [dispatch, Params.id, loggedinUser]);

    useEffect(()=>{
      user?.followers.forEach((follower) => {
            if(follower._id===loggedinUser._id){
                setFollowing(true);
           }
           else
                setFollowing(false);
        });
    },[user,loggedinUser]);

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch({ type: 'clearErrors' });
        }

        if (followError) {
            toast.error(error);
            dispatch({ type: 'clearErrors' });
        }
        if(userProfileError){
            toast.error(error);
            dispatch({ type: 'clearErrors' });

        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessages' });
        }
    }, [error, message, dispatch,userProfileError,followError]);

    const followHandler = async() => {
        await dispatch(followUser(user._id));
        dispatch(getUserProfile(Params.id));
        setFollowing(!following);
    };

    if (loading || userLoading) return <Loader />;

    return (
        <div className="account">
            {/* Left Section */}
            <div className="accountleft">
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
                            tab={"profile"}
                        />
                    ))
                ) : (
                    <Typography variant="h6">You have not made any post</Typography>
                )}
            </div>

            {/* Right Section */}
            <div className="accountright">
                {user && (
                    <>
                        <Avatar src={user.avatar?.url || ''} sx={{ height: '8vmax', width: '8vmax' }} />
                        <Typography variant="h5">{user.name}</Typography>

                        <div>
                            <button onClick={() => setFollowersToggle(!followersToggle)}>
                                <Typography>Followers</Typography>
                            </button>
                            <Typography>{user.followers?.length || 0}</Typography>
                        </div>

                        <div>
                            <button onClick={() => setFollowingToggle(!followingToggle)}>
                                <Typography>Following</Typography>
                            </button>
                            <Typography>{user.following?.length || 0}</Typography>
                        </div>

                        <div>
                            <Typography>Posts</Typography>
                            <Typography>{user.posts?.length || 0}</Typography>
                        </div>

                        {!isUser && (
                            <Button
                                onClick={followHandler}
                                style={{ background: following ? 'red' : '' }}
                                variant="contained"
                                disabled={followLoading}
                            >
                                {following ? 'Unfollow' : 'Follow'}
                            </Button>
                        )}
                    </>
                )}

                <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)}>
                    <div className="DialogBox">
                        <Typography variant="h4">Followers</Typography>
                        {user?.followers?.length > 0 ? (
                            user.followers.map((follower) => (
                                <User
                                    key={follower._id}
                                    userId={follower._id}
                                    name={follower.name}
                                    avatar={follower.avatar?.url}
                                />
                            ))
                        ) : (
                            <Typography style={{ margin: '2vmax' }}>No followers</Typography>
                        )}
                    </div>
                </Dialog>

                <Dialog open={followingToggle} onClose={() => setFollowingToggle(!followingToggle)}>
                    <div className="DialogBox">
                        <Typography variant="h4">Following</Typography>
                        {user?.following?.length > 0 ? (
                            user.following.map((following) => (
                                <User
                                    key={following._id}
                                    userId={following._id}
                                    name={following.name}
                                    avatar={following.avatar?.url}
                                />
                            ))
                        ) : (
                            <Typography style={{ margin: '2vmax' }}>No following</Typography>
                        )}
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default UserProfile;
