import express from 'express';

import {getPosts,deletePost,likePost} from '../controllers/posts.js'
 import auth from "../middleware/auth.js";

const router = express.Router();
router.get('/', getPosts);
router.delete('/:id',deletePost);
router.patch('/:id/likeCount',auth,likePost);

export default router;
