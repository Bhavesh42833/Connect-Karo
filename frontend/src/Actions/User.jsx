import axiosInstance from "../axiosConfig";
export const loginUser=(email,password)=>async(dispatch) => {
    try {
       dispatch({
        type : "LoginRequest"
       })

        const {data}=await axiosInstance.post("/api/v1/user/login",{email,password},{
            headers:{"Content-Type":"application/json"},
        });

        dispatch({
            type : "LoginSuccess",
            payload : data,
        });

    } catch (error)
    {
        dispatch({
            type : "LoginFailure",
            payload : error.response.data.message,
        })
        
    }
}

export const loadUser=()=>async(dispatch)=>{
    try {
        dispatch ({
            type :"LoadUserRequest"
        });
        const {data}=await axiosInstance.get("/api/v1/user/me");
        dispatch({
            type :"LoadUserSuccess",
            payload : data.profile,
        })
    } catch (e) {
        dispatch({
            type :"LoadUserFailure",
            payload : e.response.data.message,
        })
        
    }
}

export const getFollowingPost=()=>async(dispatch)=>{
    try {
        
        dispatch({
            type:"PostOfFollowingRequest"
        })
        
        const {data}=await axiosInstance.get("/api/v1/post/");
        dispatch({
            type:"PostOfFollowingSuccess",
            payload:data.posts,
        })
    } catch (error) {
        dispatch({
            type:"PostOfFollowingFailure",
            payload:error.response.data.message
        })
    }
}

export const getAllUsers=(name="")=>async(dispatch)=>{
    try {
        
        dispatch({
            type:"allUsersRequest"
        })
        
        const {data}=await axiosInstance.get(`/api/v1/user/users?name=${name}`);
        dispatch({
            type:"allUsersSuccess",
            payload:data.users,
        })
    } catch (error) {
        dispatch({
            type:"allUsersFaliure",
            payload:error.response.data.message
        })
    }
}

export const getMyPost=()=>async(dispatch)=>{
    try {
        
        dispatch({
            type:"myPostRequest"
        })
        
        const {data}=await axiosInstance.get("/api/v1/user/me/posts");
        dispatch({
            type:"myPostSuccess",
            payload:data.posts,
        })
    } catch (error) {
        dispatch({
            type:"myPostFaliure",
            payload:error.response.data.message
        })
    }
}

export const LogoutUser=()=>async(dispatch)=>{
    try{
    dispatch({
        type:"LogoutUserRequest"
    })
    await axiosInstance.get("/api/v1/user/logout");
    dispatch({
        type:"LogoutUserSuccess",
    })
} catch (error) {
    dispatch({
        type:"LogoutUserFailure",
        payload:error.response.data.message
    })
}
}

export const RegisterUser=(image,name,email,password)=>async(dispatch)=>{
    try{
    dispatch({
        type:"RegisterRequest"});
    const {data}=await axiosInstance.post("/api/v1/user/register",{
        image,
        name,
        email,
        password
    },{
        headers:{"Content-Type":"application/json"},
    });
    dispatch({
        type:"RegisterSuccess",
        payload:data,})
    }
    catch(error){
        dispatch({
            type:"RegisterFailure",
            payload:error.response.data.message
        })
    }
}

export const updateProfile=(image,name,email)=>async(dispatch)=>{
    try{
    dispatch({
        type:"UpdateProfileRequest"});
    const {data}=await axiosInstance.put("/api/v1/user/update/profile",{
        image,
        name,
        email,
    },{
        headers:{"Content-Type":"application/json"},
    });
    dispatch({
        type:"UpdateProfileSuccess",
        payload:data,})
    }
    catch(error){
        dispatch({
            type:"UpdateProfileFailure",
            payload:error.response.data.message
        })
    }
}

export const updatePassword=(email,oldPassword,newPassword)=>async(dispatch)=>{
    try{
    dispatch({
        type:"UpdatePasswordRequest"});
    const {data}=await axiosInstance.put("/api/v1/user/update/password",{
        email,
        oldPassword,
        newPassword,
    },{
        headers:{"Content-Type":"application/json"},
    });
    dispatch({
        type:"UpdatePasswordSuccess",
        payload:data,})
    }
    catch(error){
        dispatch({
            type:"UpdatePasswordFailure",
            payload:error.response.data.message
        })
    }
}

export const deleteProfile=()=>async(dispatch)=>{
    try{
    dispatch({
        type:"DeleteProfileRequest"});
    const {data}=await axiosInstance.delete("/api/v1/user/delete");
    dispatch({
        type:"DeleteProfileSuccess",
        payload:data,})
    }
    catch(error){
        dispatch({
            type:"DeleteProfileFailure",
            payload:error.response?.data?.message || "Something went wrong"
        })
    }
}

export const forgotPassword=(email)=>async(dispatch)=>{
    try{
        dispatch({
            type:"ForgotPasswordRequest"});
        const {data}=await axiosInstance.post("/api/v1/user/password/forgot",{
            email,
        },{
            headers:{"Content-Type":"application/json"},
        });
        dispatch({
            type:"ForgotPasswordSuccess",
            payload:data,})
    }
    catch(error){
        dispatch({
            type:"ForgotPasswordFailure",
            payload:error.response?.data?.message || "Something went wrong"
        })
    }
}

export const resetPassword=(token,password)=>async(dispatch)=>{
    try{
        dispatch({
            type:"ResetPasswordRequest"});
        const {data}=await axiosInstance.put(`/api/v1/user/password/reset/${token}`,{
            password,
        },{
            headers:{"Content-Type":"application/json"},
        });
        dispatch({
            type:"ResetPasswordSuccess",
            payload:data,})
    }
    catch(error){
        dispatch({
            type:"ResetPasswordFailure",
            payload:error.response?.data?.message || "Something went wrong"
        })
    }

}

export const getUserPost=(id)=>async(dispatch)=>{
    try {
        
        dispatch({
            type:"userPostRequest"
        })
        
        const {data}=await axiosInstance.get(`/api/v1/user/post/${id}`);
        dispatch({
            type:"userPostSuccess",
            payload:data.posts,
        })
    } catch (error) {
        dispatch({
            type:"userPostFailure",
            payload:error.response.data.message
        })
    }
}

export const getUserProfile=(id)=>async(dispatch)=>{
    try {
        
        dispatch({
            type:"userProfileRequest"
        })
        
        const {data}=await axiosInstance.get(`/api/v1/user/${id}`);
        dispatch({
            type:"userProfileSuccess",
            payload:data.user,
        })
    } catch (error) {
        dispatch({
            type:"userProfileFailure",
            payload:error.response.data.message
        })
    }
}

export const followUser=(id)=>async(dispatch)=>{
    try {
        
        dispatch({
            type:"followRequest"
        })        
        const {data}=await axiosInstance.get(`/api/v1/user/follow/${id}`);
        dispatch({
            type:"followSuccess",
            payload:data.message,
        })
    } catch (error) {
        dispatch({
            type:"followFailure",
            payload:error.response.data.message
        })
    }
}