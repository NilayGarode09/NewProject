import mongoose from "mongoose";

const postSchema =mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    like:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default: new Date()
    },
})
const Post =mongoose.model("Post",postSchema);

export default Post;
