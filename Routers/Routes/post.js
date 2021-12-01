const express = require("express");
const postRouter = express.Router();

const {newPost, allPost, updatePost, deletePost} = require('../Controllers/post');


postRouter.post('/', newPost)
postRouter.get('/posts', allPost)
postRouter.put('/update', updatePost)
postRouter.delete('/', deletePost)



module.exports = postRouter;