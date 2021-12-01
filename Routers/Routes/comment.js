const express = require("express");
const commentRouter = express.Router();
const {newComment, updateComment, deleteComment} = require('../Controllers/comment')


commentRouter.post('/', newComment)
commentRouter.put('/', updateComment)
commentRouter.delete('/', deleteComment)






module.exports = commentRouter;