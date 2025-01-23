import {configureStore} from "@reduxjs/toolkit";
import { userReducer,myPostReducer,postOfFollowingReducer, allUsersReducer, userProfile, userProfileReducer, userPostReducer } from "./Reducers/user";
import {PostActionReducer } from "./Reducers/post";
// import { userReducer } from "./Reducers/user";

const store=configureStore({
    reducer:{
     user:userReducer,
     postOfFollowing:postOfFollowingReducer,
     allUsers:allUsersReducer,
     Action:PostActionReducer,
     myPost:myPostReducer,
     userProfile:userProfileReducer,
     userPost:userPostReducer
    }
});

export default store;