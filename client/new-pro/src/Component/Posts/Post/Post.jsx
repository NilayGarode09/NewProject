import "./style.css";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography
} from "@mui/material";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { likePost, deletePost } from "../../../features/post/postSlice.js";

export default function Post({ post, setCurrentId }) {
  const user = JSON.parse(localStorage.getItem("profile"));

const Like = () => {
  const iconSize = 18; // smaller than default 24
  const fontSize = "0.8rem"; // smaller text

  if (post.likes.length > 0) {
    return post.likes.find((like) => like === user?.result?._id) ? (
      <>
        <FavoriteSharpIcon sx={{ color: red[500] }} />
        &nbsp;
        {post.likes.length > 2
          ? `You and ${post.likes.length - 1} others`
          : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
      </>
    ) : (
      <>
        <FavoriteSharpIcon sx={{ color: red[500] }} />
        &nbsp;{post.likes.length}{" "}
        {post.likes.length === 1 ? "Like" : "Likes"}
      </>
    );
  }}
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = (id) => {
    setCurrentId(id);
    navigate(`/form/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id)).then(() => {
      navigate("/");
      window.location.reload();
    });
  };

  return (
    <Card
      className="card"
      sx={{
        width: 300, // fixed width
        height: 450, // fixed height
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
      }}
    >
      <CardHeader
        action={
          <IconButton aria-label="edit" onClick={() => handleEdit(post._id)}>
            <MoreVertIcon />
          </IconButton>
        }
        title={post.title}
        subheader={format(new Date(post.createdAt), "dd MMM yyyy, hh:mm a")}
      />

      <CardMedia
        component="img"
        height="200"
        image={post.selectedFile}
        alt={post.title}
        sx={{ objectFit: "cover" }}
      />

      <CardContent sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.message}
        </Typography>

        {post.tags?.map((tag, index) => (
          <Typography
            key={index}
            variant="caption"
            sx={{ color: "text.secondary", mr: 1 }}
            display="inline"
          >
            #{tag}
          </Typography>
        ))}
      </CardContent>

      {user && (
        <CardActions disableSpacing sx={{ mt: "auto" }}>
          <IconButton
            aria-label="like"
            onClick={() => dispatch(likePost(post._id))}
          >
             <FavoriteSharpIcon sx={{ color: red[500] }} />
      &nbsp;{Like()}
            {/* <FavoriteSharpIcon sx={{ color: red[500] }} /> */}
          </IconButton>

          <IconButton aria-label="delete" onClick={() => handleDelete(post._id)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
}
