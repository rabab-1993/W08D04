const express = require("express");
const commentRouter = express.Router();
const {newComment, updateComment, deleteComment, allComment} = require('../Controllers/comment')


commentRouter.get('/all', allComment)
commentRouter.post('/', newComment)
commentRouter.put('/', updateComment)
commentRouter.delete('/', deleteComment)






module.exports = commentRouter;