import "./style.css";
// 
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
// import { remove } from "../../features/post/postSlice";
import { format } from 'date-fns';
import "./style.css"
import { likePost,deletePost,editPost } from "../../../features/post/postSlice.js";
export default function Post({ post, setCurrentId }) {
  const dispatch = useDispatch();
  const handleEdit=(id,post)=>{
    dispatch(editPost({ id, post }));    
    setCurrentId(id);
    // console.log(post);
    // console.log(post.createdAt+ "hi");
  }
  return (
    <Card className="card" 
    sx={{
    width: {
      xs: "100%",   // full width on small screens
      sm: "90%",    // 90% on tablets
      md: "70%",    // 70% on medium screens
      lg: "50%",    // 50% on desktops
    },
    minWidth: 250,   // optional cap
    // margin: "auto",  // center horizontally
  }}>
       <CardHeader
        action={
         <IconButton aria-label="settings" onClick={() => handleEdit(post._id, post)}>
          <MoreVertIcon />
        </IconButton>
        }
        title={post.title}
        subheader={format(new Date(post.createdAt), "dd MMM yyyy, hh:mm a")}
      />
      <CardMedia
        component="img"
        height="194"
        image={post.selectedFile}
        alt="Paella dish"
        className="img"
        
      />
       <CardContent>
         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           {post.message}
         </Typography>
     {post.tags?.map((tag, index) => (
          <Typography
            key={index}
            sx={{ color: "text.secondary", mr: 1 }}
            display="inline"
          >
            #{tag}
          </Typography>
        ))}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={() => dispatch(likePost(post._id))}>
          <FavoriteSharpIcon sx={{ color: "red" }} />
        </IconButton>
        <Typography variant="body2">Likes: {post.likeCount}</Typography>

        <IconButton aria-label="delete" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon />
         </IconButton>
      </CardActions>
      
    </Card>
  );
}
// 