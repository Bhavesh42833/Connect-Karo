import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated:false,
};

export const PostActionReducer =createReducer(initialState, (builder) => {
    builder
      .addCase('likeRequest', (state) => {
        state.loading = true;
      })
      .addCase('likeSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('likeFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('clearErrors', (state) => {
        state.error = null;
      })
      .addCase('commentRequest', (state) => {
        state.loading = true;
      })
      .addCase('commentSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('commentFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('DeleteCommentRequest', (state) => {
        state.loading = true;
      })
      .addCase('DeleteCommentSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('DeleteCommentFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('newPostRequest', (state) => {
        state.loading = true;
      })
      .addCase('newPostSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('newPostFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('DeletePostRequest', (state) => {
        state.loading = true;
      })
      .addCase('DeletePostSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('DeletePostFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('UpdatePostRequest', (state) => {
        state.loading = true;
      })
      .addCase('UpdatePostSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('UpdatePostFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('followRequest', (state) => {
        state.loading = true;
      })
      .addCase('followSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('followFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('clearMessages', (state) => {
        state.message = null;
      });
  });

  
