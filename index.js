const express = require("express");
const dotenv = require("dotenv") 
dotenv.config();
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const googleConfig = require("./passport")(passport)


const app = express();

// imported the db file
require("./db/index")

//  Middlewares
app.use(express.json({limit: "30mb", extended: true}));
app. use(express.urlencoded({limit: "30mb", extended: false}))
app.use(cors());
app.use(passport.initialize());
app.use(morgan("dev"));


// import all routers

// user router
const userRouter = require('./Routers/Routes/user');
app.use("/user", userRouter);
// role router
const roleRouter = require('./Routers/Routes/role')
app.use("/role", roleRouter);
// post router
const postRouter = require('./Routers/Routes/post')
app.use("/posts", postRouter);
// comment router
const commentRouter = require('./Routers/Routes/comment')
app.use("/comment", commentRouter);
// comment router
const likeRouter = require('./Routers/Routes/like')
app.use("/like", likeRouter);





const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})