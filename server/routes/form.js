import express from 'express';

import {createPost,editPost} from '../controllers/form.js'

const router = express.Router();
router.post('/', createPost);
router.patch('/:id',editPost);

export default router;
