const express = require("express");
const authentication = require("../midleware/auth");
const likeRouter = express.Router();


likeRouter.put("/",authentication) 






module.exports = likeRouter;