import { useState } from "react";
import NavBar from "../NavBar/NavBar.jsx";

import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useDispatch } from 'react-redux';
import {authData,signup,signin} from "../../features/auth/authSlice.js"
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
    const navigate = useNavigate();
 
  const dispatch =useDispatch()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let result;

    if (isSignup) {
      result = await dispatch(signup(formData));
    } else {
      result = await dispatch(signin(formData));
    }

    // Check if thunk was fulfilled
    if (result.type.endsWith("fulfilled")) {
      // Save user in local state or Redux
      dispatch(authData(result.payload));

      // Redirect to homepage
      navigate("/");
    } else {
      // Thunk rejected → show error message
      alert(result.payload?.message || "Something went wrong");
    }
  } catch (err) {
    console.error("Error in handleSubmit:", err);
    alert("An unexpected error occurred. Please try again.");
  }
};

  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const userData = {
      uid: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
    };

    dispatch(authData(userData))
        navigate("/");  // ✅ safe place to redirect

  } catch (err) {
    console.error(err);
  }
};
  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: 3,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "secondary.main", mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>

          <form onSubmit={handleSubmit} style={{ marginTop: "20px", width: "100%" }}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="firstName"
                      label="First Name"
                      onChange={handleChange}
                      fullWidth
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="lastName"
                      label="Last Name"
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email Address"
                  onChange={handleChange}
                  fullWidth
                  type="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  fullWidth
                  type="password"
                />
              </Grid>

              {isSignup && (
                <Grid item xs={12}>
                  <TextField
                    name="confirmPassword"
                    label="Repeat Password"
                    onChange={handleChange}
                    fullWidth
                    type="password"
                  />
                </Grid>
              )}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>

            <Typography sx={{ textAlign: "center", mb: 1 }}>OR</Typography>

            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              fullWidth
              onClick={handleGoogleLogin}
              sx={{ mb: 2 }}
            >
              Sign in with Google
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={() => setIsSignup((prev) => !prev)}>
                  {isSignup
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
}
