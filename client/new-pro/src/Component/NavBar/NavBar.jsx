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


export default function Nav() {
// const user =null;
  const [user ,setUser] =useState(JSON.parse(localStorage.getItem('profile')))
  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem('profile'));
  setUser(storedUser);
  },[])
  
  return (
    <Box className="navbar" sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        className="appbar"
        sx={{
          borderRadius: 2,
          width: "100%",
        }}
      >
        <Toolbar>
          {/* Home link */}
          <Typography
            variant="h4"
            component={Link}
            to="/"
            align="center"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            MEMORIES
          </Typography>
            <Grid container spacing={2}>
          {/* App logo */}
          <Avatar alt="Memories" src={memories} />

          {user ? (
           <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              
              
              <Button
              variant="contained"
              color="secondary"
               onClick={() => {
              localStorage.removeItem("profile");
              setUser(null);
          }}
    >
      Logout
    </Button>
    
  </div>
) : (
  <Typography
    variant="h6"
    component={Link}
    to="/auth"
    sx={{
      textDecoration: "none",
      color: "inherit",
      ml: 2,
      cursor: "pointer",
    }}
  >
    Sign In
  </Typography>
)}
</Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
