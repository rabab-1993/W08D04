const express = require("express");
const { register, logIn, allUser, deleteUser, activated, forgetPass, updatePass } = require("../Controllers/user");
const authentication = require("../midleware/auth");
const authorization = require("../midleware/outh");
const passport = require("passport");
const {googlePass} = require('../../passport')
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.get("/activated/:token", activated);
userRouter.post("/login", logIn);
userRouter.put("/forget", forgetPass);
userRouter.get("/reset-pass/:res-tok", updatePass);
// log with Google
userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] }, googlePass)
);

userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/post");
  }
);

// just for admin
userRouter.get("/", authentication, authorization, allUser);
userRouter.delete("/", authentication, authorization, deleteUser);

module.exports = userRouter;
