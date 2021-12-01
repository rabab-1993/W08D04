const express = require("express");
const dotenv = require("dotenv"); 
dotenv.config();
const mongoose = require("mongoose");
const app = express()
// imported the db file
require("./db/index")

// app level middleware
app.use(express.json())


// import all routers

// user router
const userRouter = require('./Routers/Routes/user');
app.use("/user", userRouter);
// role router
const roleRouter = require('./Routers/Routes/role')
app.use("/role", roleRouter);
// task router
const taskRouter = require('./Routers/Routes/task')
app.use("/tasks", taskRouter);




const PORT = process.env.PORT || 4000;





app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})