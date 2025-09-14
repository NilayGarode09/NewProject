import  './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography } from "@mui/material";
import { createPost ,editPost } from "../../features/post/postSlice.js";


export default function Form({ currentId, setCurrentId }) {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    creator: '',
    tags: '',
    selectedFile: '',
  });

  const dispatch = useDispatch();

  // Find the post to edit (if currentId is set)
  const post = useSelector((state) =>
    currentId ? state.posts.value.find((p) => p._id === currentId) : null
  );

  // Populate form if editing
  useEffect(() => {
    if (post) setPostData(post);
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
  if (currentId) {
    dispatch(editPost({ id: currentId, post: postData }));
  } else {
    dispatch(createPost(postData));
  }
  clear();
};
  return (
    <>
      <Paper className="paper" elevation={3}  sx={{
    width: {
      xs: "100%",   // full width on small screens
      sm: "90%",    // 90% on tablets
      md: "70%",    // 70% on medium screens
      lg: "50%",    // 50% on desktops
    },
    maxWidth: 500,
    height: {
      xs: "auto",      // height adjusts to content on small screens
      sm: "400px",     // 400px on tablets
      md: "500px",     // 500px on medium screens
      lg: "600px",     // 600px on desktops
    },
    maxHeight: "60vh", // optional: don’t exceed 90% of viewport height
      overflowY: "auto", // scroll if content exceeds height
  }}>
      <form
        autoComplete="off"
        noValidate
        className="root form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post?.title}"` : "Creating a Memory"}
        </Typography>

        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
          sx={{ mb: 2 }}
        />

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) =>
            setPostData({ ...postData, title: e.target.value })
          }
          sx={{ mb: 2 }}
        />

        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          sx={{ mb: 2 }}
        />

        <TextField
          name="tags"
          variant="outlined"
          label="Tags (comma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
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
      width: "150px",       // 👈 smaller width
      height: "auto",       // keep aspect ratio
      maxWidth: "100%",     // responsive (won’t overflow container)
      marginTop: "10px",
      borderRadius: "8px",
      objectFit: "cover",   // keeps image looking nice
    }}
  />
)}

        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
        >
          {currentId ? "Edit" : "Submit"}
        </Button>

        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
          sx={{ mt: 1 }}
        >
          Clear
        </Button>
      </form>
    </Paper>
    </>
  );
}
