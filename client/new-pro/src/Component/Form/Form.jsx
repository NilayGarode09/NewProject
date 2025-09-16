import  './style.css';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography } from "@mui/material";
import { createPost ,editPost } from "../../features/post/postSlice.js";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar.jsx";
export default function Form({ currentId, setCurrentId }) {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    creator: '',
    tags: '',
    selectedFile: '',
  });
  const { id } = useParams();
  const dispatch = useDispatch();
const navigate = useNavigate();
  // Find the post to edit (if currentId is set)
  const post = useSelector((state) =>
    currentId ? state.posts.value.find((p) => String(p._id) === String(currentId))
  : null);
// console.log(currentId);
  // Populate form if editing
   useEffect(() => {
  if (id) {
    setCurrentId(id); // update local state
  }
}, [id]);

// Prefill form when post is available
useEffect(() => {
  if (post) {
    setPostData({
      creator: post.creator || "",
      title: post.title || "",
      message: post.message || "",
      tags: Array.isArray(post.tags) ? post.tags : [],
      selectedFile: post.selectedFile || "",
    });
  }
}, [post]);

  // Clear form
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: '',
      message: '',
      creator: '',
      tags: '',
      selectedFile: '',
    });
  };

  // Submit handler
  const handleSubmit = (e) => {
  e.preventDefault();
 if (!postData.creator.trim()) {
    alert("Creator is required");
    return;
  }
  if (!postData.title.trim()) {
    alert("Title is required");
    return;
  }
if (!postData.selectedFile) {
    alert("Image is required");
    return;
  }



  if (currentId) {
    dispatch(editPost({ id: currentId, post: postData }))
    console.log(post);
  } else {
    dispatch(createPost(postData));
    // console.log(postData);
  }
  navigate("/");
  clear();
};
  return (
    <>
    <NavBar />
     <Paper
  className="paper"
  elevation={2} // ✅ lighter shadow
  sx={{
    width: {
      xs: "100%", // full width on small screens
      sm: "90%",
      md: "70%",
      lg: "50%",
    },
    maxWidth: 500,
    height: {
      xs: "auto",
      sm: "400px",
      md: "500px",
      lg: "600px",
    },
    maxHeight: "70vh", // ✅ more breathing space
    overflowY: "auto",
    p: 3, // ✅ inner padding
    backgroundColor: "rgba(241, 241, 241, 1)", // ✅ light clean background
    borderRadius: 2,
  }}
>
  <form autoComplete="off" noValidate className="root form" onSubmit={handleSubmit}>
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, textAlign: "center" }}>
      {currentId ? `Editing "${post?.title}"` : "Creating a Memory"}
    </Typography>

    <TextField
  name="creator"
  variant="outlined"
  label="Creator"
  fullWidth
  required   
  value={postData.creator}
  onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
  sx={{ mb: 2 }}
/>

<TextField
  name="title"
  variant="outlined"
  label="Title"
  fullWidth
  required   
  value={postData.title}
  onChange={(e) => setPostData({ ...postData, title: e.target.value })}
  sx={{ mb: 2 }}
/>

    <TextField
      name="message"
      variant="outlined"
      label="Message"
      fullWidth
      multiline
      required   
      rows={4}
      value={postData.message}
      onChange={(e) => setPostData({ ...postData, message: e.target.value })}
      sx={{ mb: 2 }}
    />

    <TextField
      name="tags"
      variant="outlined"
      label="Tags (comma separated)"
      fullWidth
      required   
      value={postData.tags}
      onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
      sx={{ mb: 2 }}
    />

    {/* ✅ File Input */}
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPostData({ ...postData, selectedFile: reader.result });
        };
      }}
      style={{ margin: "10px 0" }}
    />

    {/* ✅ Preview */}
    {postData.selectedFile && (
      <img
        src={postData.selectedFile}
        alt="preview"
        style={{
          width: "150px",
          height: "auto",
          maxWidth: "100%",
          marginTop: "10px",
          borderRadius: "8px",
          objectFit: "cover",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    )}

    {/* ✅ Buttons in different lines */}
    <Button
      variant="contained"
      size="large"
      type="submit"
      sx={{
        mt: 3,
        width: "60%",
        display: "block",
        mx: "auto",
        borderRadius: 2,
        backgroundColor:"#f8b2c1ad",
      }}
    >
      {currentId ? "Edit" : "Submit"}
    </Button>

    <Button
      variant="outlined" // ✅ lighter look
      size="small"
      onClick={clear}
      sx={{
        mt: 2,
        width: "60%",
        display: "block",
        mx: "auto",
        borderRadius: 2,
        borderColor: "gray",
        color: "gray",
        "&:hover": {
          borderColor: "black",
          color: "black",
        },
      }}
    >
      Clear
    </Button>
  </form>
</Paper>

    </>
  );
}
