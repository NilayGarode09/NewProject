import Post from '../models/posts.js'
import mongoose from "mongoose";



export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post(post);
  try {
    await newPost.save();
    res.status(201).json(newPost ); 
    // console.log(newPost.message);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editPost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  // Validate MongoDB ID
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ message: "Invalid post ID" });
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};