const express = require("express");
const authentication = require('../midleware/auth')
const {newPost, allPost, updatePost, deletePost} = require('../Controllers/post');

const postRouter = express.Router();

postRouter.post('/',authentication, newPost)
postRouter.get('/posts',authentication, allPost)
postRouter.put('/update',authentication, updatePost)
postRouter.delete('/',authentication, deletePost)



module.exports = postRouter;