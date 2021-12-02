const express = require("express");
const {register, logIn, allUser, deleteUser} = require('../Controllers/user');
const authentication = require('../midleware/auth')
const authorization = require('../midleware/outh')

const userRouter = express.Router();


userRouter.post("/register", register);
userRouter.post("/login", logIn);

// just for admin
userRouter.get("/",authentication, authorization, allUser);
userRouter.delete("/",authentication, authorization, deleteUser);



module.exports = userRouter;