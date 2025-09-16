import Post from '../models/posts.js'
import mongoose from "mongoose";


export const getPosts = async (req, res) => {
  try{
    const post = await Post.find()
    res.status(200).json(post);
    // console.log(post);

  }
  catch(error){
    res.status(404).json(error);
  }
}



export const deletePost =async(req,res)=>{
  const{id}=req.params;
 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid post ID" });
  }
  try {
  const posts= await Post.findByIdAndDelete(id);
    res.status(201).json("post deleted"); 
  } catch (error) {
    console.log(error);
  }
}
export const likePost = async (req, res) => {
  const { id } = req.params;

  if(!req.userId) returnres.json({message:"Unautneticated"})
  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid post ID" });
  }

  try {
    // Find the post
    const post = await Post.findById(id);

     const index =post.like.findIndex((id)=>id===String(req.userId));
     if(index ===-1){
      post,likes.push(req.userId);
     }
     else{
      post.likes=post.like.filter((id)=> id!==String(req.userId))
     }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      post,
      {new: true }
    );

    // Send updated post
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};
