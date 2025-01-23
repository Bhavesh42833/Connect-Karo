import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated:false,
  profile:null,
};

export const userReducer = createReducer(initialState, (builder) => {
    builder
      .addCase('LoginRequest', (state) => {
        state.loading = true;
      })
      .addCase('LoginSuccess', (state, action) => {
        state.loading = false;
        state.user = action.payload.profile;
        state.message=action.payload.message;
        state.isAuthenticated = true;
      })
      .addCase('LoginFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase('RegisterRequest', (state) => {
        state.loading = true;
      })
      .addCase('RegisterSuccess', (state, action) => {
        state.loading = false;
        state.user = action.payload.profile;
        state.message=action.payload.message;
        state.isAuthenticated = true;
      })
      .addCase('RegisterFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase('LoadUserRequest', (state) => {
        state.loading = true;
      })
      .addCase('LoadUserSuccess', (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase('LoadUserFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated=false;
      })
      .addCase('LogoutUserRequest',(state) => {
        state.loading = true;
      })
      .addCase('LogoutUserSuccess', (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase('LogoutUserFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase('UpdateProfileRequest', (state) => {
        state.loading = true;
      })
      .addCase('UpdateProfileSuccess', (state, action) => {
        state.loading = false;
        state.message=action.payload.message;
      })
      .addCase('UpdateProfileFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('UpdatePasswordRequest', (state) => {
        state.loading = true;
      })
      .addCase('UpdatePasswordSuccess', (state, action) => {
        state.loading = false;
        state.message=action.payload.message;
      })
      .addCase('UpdatePasswordFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('ForgotPasswordRequest', (state) => {
        state.loading = true;
      })
      .addCase('ForgotPasswordSuccess', (state, action) => {
        state.loading = false;
        state.message=action.payload.message;
      })
      .addCase('ForgotPasswordFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('DeleteProfileRequest', (state) => {
        state.loading = true;
      })
      .addCase('DeleteProfileSuccess', (state, action) => {
        state.loading = false;
        state.message=action.payload.message;
      })
      .addCase('DeleteProfileFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('ResetPasswordRequest', (state) => {
        state.loading = true;
      })
      .addCase('ResetPasswordSuccess', (state, action) => {
        state.loading = false;
        state.message=action.payload.message;
      })
      .addCase('ResetPasswordFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('clearErrors', (state) => {
        state.error = null;
      })
      .addCase('clearMessages', (state) => {
        state.message = null;
      });
  });

  export const postOfFollowingReducer = createReducer(initialState, (builder) => {
    builder
      .addCase('PostOfFollowingRequest', (state) => {
        state.loading = true;
      })
      .addCase('PostOfFollowingSuccess', (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.posts = action.payload;
      })
      .addCase('PostOfFollowingFailure', (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase('clearErrors', (state) => {
        state.error = null;
      });
  });

  export const  allUsersReducer = createReducer(initialState, (builder) => {
    builder
      .addCase('allUsersRequest', (state) => {
        state.loading = true;
      })
      .addCase('allUsersSuccess', (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.users = action.payload;
      })
      .addCase('allUsersFailure', (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase('clearErrors', (state) => {
        state.error = null;
      });
  });

  export const myPostReducer=createReducer(initialState, (builder) => {
    builder
      .addCase('myPostRequest', (state) => {
        state.loading = true;
      })
      .addCase('myPostSuccess', (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.myposts = action.payload;
      })
      .addCase('myPostFailure', (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase('clearErrors', (state) => {
        state.error = null;
      });
  })

  export const userPostReducer=createReducer(initialState, (builder) => {
    builder
      .addCase('userPostRequest', (state) => {
        state.loading = true;
      })
      .addCase('userPostSuccess', (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase('userPostFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('clearErrors', (state) => {
        state.error = null;
      });
  })

  export const userProfileReducer=createReducer(initialState, (builder) => {
    builder
      .addCase('userProfileRequest', (state) => {
        state.loading = true;
      })
      .addCase('userProfileSuccess', (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase('userProfileFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('clearErrors', (state) => {
        state.error = null;
      });
  })