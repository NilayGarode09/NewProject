import express from 'express';

import {getPosts,createPost,editPost,deletePost,likePost} from '../controllers/posts.js'
 import auth from "../middleware/auth.js";

const router = express.Router();
router.get('/', getPosts);
router.post('/',auth, createPost);
router.patch('/:id',auth,editPost);
router.delete('/:id',auth,deletePost);
router.patch('/:id/likeCount',auth,likePost);

export default router;
