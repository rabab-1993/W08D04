const express = require("express");
const commentRouter = express.Router();
const {newComment, updateComment, deleteComment, allComment} = require('../Controllers/comment');
const authentication = require("../midleware/auth");


commentRouter.get('/all', authentication, allComment)
commentRouter.post('/', authentication, newComment)
commentRouter.put('/', authentication, updateComment)
commentRouter.delete('/', authentication , deleteComment)






module.exports = commentRouter;