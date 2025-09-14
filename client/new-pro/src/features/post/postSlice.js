// slice contains the logic to maintain the state of every feature
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/index.js";

// Async thunk to fetch posts
export const fetchAll = createAsyncThunk("posts/fetchAll", async () => {
  const { data } = await api.getPostData();
  return data;
});

export const likePost = createAsyncThunk("posts/likePost", async (id) => {
  const { data } = await api.likePost(id);
  return data;
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  const { data } = await api.deletePost(id);
  return data; // check: is this an ID or full post?
});

export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ id, post }) => {
    const { data } = await api.editPost(id, post);
    return data;
  }
);

export const createPost = createAsyncThunk("posts/create", async (post) => {
  const { data } = await api.createPost(post);
  return data;
});

const initialState = {
  value: [],
  loading: false,
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAll
      .addCase(fetchAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // likePost
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPost = action.payload;
        const index = state.value.findIndex(
          (post) => post._id === updatedPost._id
        );
        if (index !== -1) {
          state.value[index] = updatedPost;
        }
      })

      // deletePost
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload._id || action.payload;
        state.value = state.value.filter((post) => post._id !== deletedId);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // editPost
      .addCase(editPost.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPost = action.payload;
        const index = state.value.findIndex(
          (post) => post._id === updatedPost._id
        );
        if (index !== -1) {
          state.value[index] = updatedPost;
        }
      })

      // createPost
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.value.push(action.payload);
      });
  },
});

export default postsSlice.reducer;
