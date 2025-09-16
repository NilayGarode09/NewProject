import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import memories from '../../image/memories.png';
import './NavBar.css';
import { useState ,useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Nav() {
// const user =null;
  const [user ,setUser] =useState(JSON.parse(localStorage.getItem('profile')))
   const navigate = useNavigate();
  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem('profile'));
  setUser(storedUser);
  },[])
  
  return (
    <Box
  className="navbar"
  sx={{
    borderRadius: 2,
    width: "100%",
  }}
>
  <AppBar
    position="static"
    className="appbar"
    sx={{
      borderRadius: 2,
      width: "100%",
      backgroundColor: "#ffc9c9ad",
      boxShadow: "none",
    }}
  >
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
    
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar alt="Memories" src={memories} />
        <Typography
          variant="h4"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Memories
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
  {user ? (
    <Typography
      component={Link}
      to="/form"
      variant="h6"
      sx={{
        textDecoration: "none",
        color: "red", // ✅ red color
        cursor: "pointer",
        fontWeight: 500,
      }}
       
    >
      Create Post
    </Typography>
  ) : null}

  {user ? (
    <Button
      variant="text"
      component={Link}
      to="/auth"
      sx={{
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
      }}
      onClick={() => {
        localStorage.removeItem("profile");
        setUser(null);
      }}
    >
      Logout
    </Button>
  ) : (
    <Typography
      variant="h6"
      component={Link}
      to="/auth"
      sx={{
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
      }}
    >
      Sign In
    </Typography>
  )}
</Box>

    </Toolbar>
  </AppBar>
</Box>

  );
}
