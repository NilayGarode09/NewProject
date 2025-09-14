import { configureStore } from '@reduxjs/toolkit';
import postsSlice from '../features/post/postSlice.js';
import authSlice from '../features/auth/authSlice.js';


export const store = configureStore({
  reducer: {
    posts: postsSlice, 
    auth: authSlice,
  },
});
