import React from 'react'
import "./CommentCard.css"
import { Link, useParams } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { deleteComment } from '../../Actions/Post'
import { getFollowingPost,getMyPost ,getUserPost} from '../../Actions/User'
const CommentCard = ({
    userId,
    name,
    avatar,
    commentId,
    comment,
    postId,
    tab,
}) => {
    const dispatch = useDispatch();
    const Params=useParams();
    const deleteCommenthandler = async () => {
        await dispatch(deleteComment(postId, commentId));
        if (tab==='account') { 
            dispatch(getMyPost());
        }
        else if(tab==='profile')
            dispatch(getUserPost(Params.id));
        else
            dispatch(getFollowingPost());
    }

    const { _id } = useSelector((state) => state.user.user);
    return (
        <div className='commentUser'>

            <Link to={`/user/${userId}`}>
                <img src={avatar} alt={name} />
                <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
            </Link>
            <Typography>{comment}</Typography>

            {
                tab==="account" ? (<Button onClick={deleteCommenthandler}><Delete /></Button>) : (userId === _id ? (<Button onClick={deleteCommenthandler}><Delete /></Button>) : null)

            }
        </div>
    )
}

export default CommentCard