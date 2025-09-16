import { Box, CircularProgress } from "@mui/material";
import Post from "./Post/Post";
import { useSelector } from "react-redux";

import './style.css';

export default function Posts({setCurrentId}) {
  const posts = useSelector((state) => state.posts.value || []); 
  // console.log(posts);

  return (
    <>
    <Box
  className="posts"
  sx={{
    // display: "flex",
    flexWrap: "wrap",

   align :"center",
    gap: 2, // spacing between posts
    width: "100%", // make full width
    p: 2, // padding
     
  }}
>
  {!posts || posts.length === 0 ? (
    <CircularProgress />
  ) : (
    posts.map((post) => (
      <Post key={post._id} post={post} setCurrentId={setCurrentId} />
    ))
  )}
</Box>
    </>
  );
}
