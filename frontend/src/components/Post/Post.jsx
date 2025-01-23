import {
  ChatBubbleOutline,
  DeleteOutline,
  Favorite,
  FavoriteBorder,
  MoreVert
} from "@mui/icons-material"
import { Avatar, Button, Dialog, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addComment, deletePost, likePost, updatePost } from "../../Actions/Post"
import { getFollowingPost, getMyPost, getUserPost, loadUser } from '../../Actions/User'
import User from '../User/User'
import "./Post.css"
import CommentCard from "../CommentCard/CommentCard"
const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  tab = "home",
  isDelete = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [LikedUsers, setLikedUsers] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);

    const dispatch = useDispatch();
    const Params=useParams();
  const { _id } = useSelector((state) => state.user.user);
  const handleLike = async () => {
    setLiked(!liked);
    await dispatch(likePost(postId));
    if (tab==='home') {
      dispatch(getFollowingPost());
     } 
    else if(tab==='profile') {
      dispatch(getUserPost(Params.id));
    }else if(tab==="account")
      dispatch(getMyPost());
    }

  const deletePostHandler=async()=>{
await dispatch(deletePost(postId));
dispatch(getMyPost());
dispatch(loadUser());
  }

  const updatePostHandler=async(e)=>{
    e.preventDefault();
    await dispatch(updatePost(postId,captionValue));
    dispatch(getMyPost());
  }

  const addCommentHandler = async (e) => {
    console.log("Add Commment");
    e.preventDefault();
    await dispatch(addComment(postId, commentValue));

    if (tab==='account') { 
      dispatch(getMyPost());
    }
    else if(tab==='profile'){
        dispatch(getUserPost(Params.id));
    }
    else {
      dispatch(getFollowingPost());
    }
  }

  useEffect(() => {
    likes.forEach((like) => {
      if (like._id === _id) {
        setLiked(true);
      }
    })
  }, [likes, _id])

  return (
    <div className='post'>
      <div className="postHeader">
      {tab==='account' ? <Button onClick={()=>setCaptionToggle(!captionToggle)}><MoreVert /></Button> : null}
      </div>

      <img src={postImage} alt="Post" />

      <div className='postDetails'>

        <Avatar src={ownerImage} alt={ownerName} sx={{ width: "3vmax", height: "3vmax" }} />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>

        <Typography
          fontWeight={100}
          color="rgba(0, 0, 0, 0.582)"
          style={{ alignSelf: "center" }}
        >{caption}</Typography>

      </div>

      <div className='postFooter'>

        <Button onClick={handleLike}>
          {liked ? <Favorite style={{ 'color': 'red' }} /> : <FavoriteBorder />}
        </Button>
        <button disabled={likes.length === 0} onClick={() => setLikedUsers(!LikedUsers)} style={{ background: "none", border: "none", color: "rgba(0, 0, 0, 0.582)", marginLeft: "0vmax" }}>{likes.length}</button>


        <Button onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubbleOutline />
        </Button>
        <button style={{ background: "none", border: "none", color: "rgba(0, 0, 0, 0.582)", marginLeft: "0.5vmax" }}>{comments.length}</button>

        {isDelete ? <Button onClick={deletePostHandler}><DeleteOutline /></Button> : null}

      </div>
      <Dialog open={LikedUsers} onClose={() => setLikedUsers(false)}>
        <div className="DialogBox">
          <Typography variant="h4">Liked By</Typography>
          {likes.map((like) => (
            <User
              key={like._id}
              userId={like._id}
              name={like.name}
              avatar={like.avatar.url}
            />
          ))}

        </div>
      </Dialog>

      <Dialog open={commentToggle} onClose={() => setCommentToggle(!commentToggle)}>
        <div className="DialogBox">
          <Typography variant="h4">Comments</Typography>

          <form className="commentForm" onSubmit={addCommentHandler}>
            <input type="text" value={commentValue} onChange={(e) => setCommentValue(e.target.value)} placeholder="Comment Here.." required />
            <Button type="submit" variant="contained">Add</Button>
          </form>

          {comments.length > 0 ? comments.map((item) => (
            <CommentCard
              userId={item.user._id}
              name={item.user.name}
              avatar={item.user.avatar.url}
              commentId={item._id}
              comment={item.comment}
              postId={postId}
              tab={tab}
            />
          )) : (<Typography>No Comments Yet</Typography>)}
        </div>
      </Dialog>
      

      <Dialog open={captionToggle} onClose={() => setCaptionToggle(!captionToggle)}>
      <div className="DialogBox">
        <Typography variant="h4">Add New Caption</Typography>

        <form className="commentForm" onSubmit={updatePostHandler}>
            <input type="text" value={captionValue} onChange={(e) => setCaptionValue(e.target.value)} placeholder="Type Here.." required />
            <Button type="submit" variant="contained">Update</Button>
          </form>
      </div>
      </Dialog>
    </div>
  )
}

export default Post