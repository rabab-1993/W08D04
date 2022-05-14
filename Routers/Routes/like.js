const express = require("express");
const authentication = require("../midleware/auth");
const { like, unLike } = require("../Controllers/like");
const likeRouter = express.Router();

likeRouter.post("/add", authentication, like);
likeRouter.delete("/remove", authentication, unLike);

module.exports = likeRouter;
