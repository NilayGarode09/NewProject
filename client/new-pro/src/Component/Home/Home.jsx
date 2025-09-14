import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import { fetchAll } from "../../features/post/postSlice.js";
import Posts from "../Posts/Posts.jsx";
import Form from "../Form/Form.jsx";
import NavBar from "../NavBar/NavBar.jsx";
export default function Home(){
   
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.value);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
  dispatch(fetchAll()).then((res) => {
    console.log("Fetched posts:", res);
  });
}, [dispatch])
    return(
        <Container maxWidth="xl" disableGutters sx={{ p: 2 }}>
  <NavBar/>
  <div className="home">
         
        <Posts posts={posts} setCurrentId={setCurrentId} />
        <Form currentId={currentId} setCurrentId={setCurrentId}/>
      </div> 
</Container>
    )
}