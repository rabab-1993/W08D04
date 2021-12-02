const express = require("express");
const commentRouter = express.Router();
const {newComment, updateComment, deleteComment, allComment} = require('../Controllers/comment');
const authentication = require("../midleware/auth");
const authorization = require("../midleware/outh");


commentRouter.get('/all', authentication, allComment)
commentRouter.post('/', authentication, newComment)
commentRouter.put('/', authentication, authorization, updateComment)
commentRouter.delete('/', authentication, authorization , deleteComment)






module.exports = commentRouter;