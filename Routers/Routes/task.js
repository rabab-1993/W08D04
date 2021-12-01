const express = require("express");
const taskRouter = express.Router();
const authentication = require('../midleware/auth')

const {
  newTask,
  allTasks,
  tasksId,
  updateTask,
  deleteTask,
  isDeletedTask
} = require("../Controllers/task");

// taskRouter.get("/", allRole)
taskRouter.post("/task", authentication, newTask);
taskRouter.get("/",authentication, allTasks);
taskRouter.get("/id",authentication, tasksId);
taskRouter.get("/isdeleted",authentication, isDeletedTask);
taskRouter.put("/update",authentication, updateTask);
taskRouter.delete("/delete", authentication, deleteTask);

module.exports = taskRouter;
