import axiosInstance from "../axiosConfig";

export const likePost=(id)=>async(dispatch)=>{
    try {
        
        dispatch({
            type:"likeRequest"
        })
        
        const {data}=await axiosInstance.get(`/api/v1/post/${id}`);
        dispatch({
            type:"likeSuccess",
            payload:data.message,
        })
    } catch (error) {
        dispatch({
            type:"likeFailure",
            payload:error.response.data.message
        })
    }
}

export const addComment=(id,comment)=>async(dispatch)=>{
    try {
        
        dispatch({
            type:"commentRequest"
        })
        
        const {data}=await axiosInstance.put(`/api/v1/post/comment/${id}`,{
         comment
        },{
            headers:{"Content-Type":"application/json"},
        });
        dispatch({
            type:"commentSuccess",
            payload:data.message,
        })
    } catch (error) {
        dispatch({
            type:"commentFailure",
            payload:error.response.data.message
        })
    }
}

export const deleteComment=(postId,commentId)=>async(dispatch)=>{
    try {
        
        dispatch({
            type:"DeleteCommentRequest"
        })
        
        const {data}=await axiosInstance.delete(`/api/v1/post/comment/${postId}`,{
            
            headers:{"Content-Type":"application/json"},
            data:{CommentId:commentId},
        });
        dispatch({
            type:"DeleteCommentSuccess",
            payload:data.message,
        })
    } catch (error) {
        dispatch({
            type:"DeleteCommentFailure",
            payload:error.response.data.message
        })
    }
}

export const addNewPost=(caption,image)=>async(dispatch)=>{
    try {
        
        dispatch({
            type:"newPostRequest"
        })
        
        const {data}=await axiosInstance.post("/api/v1/post/upload",{
            caption,
            image
        },{
            headers:{"Content-Type":"application/json"},
        });
        dispatch({
            type:"newPostSuccess",
            payload:data.message,
        })
    } catch (error) {
        dispatch({
            type:"newPostFaliure",
            payload:error.response.data.message
        })
    }
}

export const deletePost=(id)=>async(dispatch)=>{
    try {
        
        dispatch({
            type:"DeletePostRequest"
        })
        
        const {data}=await axiosInstance.delete(`/api/v1/post/${id}`);
        dispatch({
            type:"DeletePostSuccess",
            payload:data.message,
        })
    } catch (error) {
        dispatch({
            type:"DeletePostFaliure",
            payload:error.response.data.message
        })
    }
}

export const updatePost=(id,caption)=>async(dispatch)=>{
    try {
        
        dispatch({
            type:"UpdatePostRequest"
        })
        
        const {data}=await axiosInstance.put(`/api/v1/post/${id}`,{
            caption
        },{
            headers:{"Content-Type":"application/json"},
        });
        dispatch({
            type:"UpdatePostSuccess",
            payload:data.message,
        })
    } catch (error) {
        dispatch({
            type:"UpdatePostFaliure",
            payload:error.response.data.message
        })
    }
}