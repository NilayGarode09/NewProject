import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/index.js";

const storedProfile = JSON.parse(localStorage.getItem("profile"));

// Thunks
export const signin = createAsyncThunk(
  "user/signin",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.signin(formData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data); // pass error to component
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.signup(formData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Initial state
const initialState = {
  user: storedProfile || null,
  loading: false,
  error: null,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authData(state, action) {
      state.user = action.payload;
      localStorage.setItem("profile", JSON.stringify(state.user));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("profile");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("profile", JSON.stringify(action.payload));
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Signin failed";
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("profile", JSON.stringify(action.payload));
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Signup failed";
      });
  },
});

export const { authData, logout } = authSlice.actions;
export default authSlice.reducer;
