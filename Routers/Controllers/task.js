const taskModel = require('../../db/model/task');




//  new task function
const newTask = (req ,res) => {
    const {user, name} = req.body;
    const newTask = new taskModel({
        name, 
        user
    });

    newTask
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });  
}


// get all not deleted tasks function
const allTasks = (req, res) => {
    taskModel
    .find({ isDeleted: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  }


// get tasks by id function
const tasksId = (req, res) => {
const {_id} = req.body
    taskModel
    .findById({_id})
    .then((result) => {
        if(result.isDeleted == true) {
            res.json({massege: "this task has been deleted"});
        }
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  }
// get tasks if is deleted function
const isDeletedTask = (req, res) => {
const {_id} = req.body
    taskModel
    .findById({_id})
    .then((result) => {
        if(result.isDeleted == true) {
            res.json({massege: "this task has been deleted"});
        }
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  }


// soft delete task function
const deleteTask = (req, res) => {
    const {isDeleted, _id} = req.body;
    taskModel.findById({_id}).then(async (result) =>{
        if(result.isDeleted == true) {
            return res.json({massege: "this task already have been deleted"})
        } else {
            await taskModel.findOneAndUpdate(
                {"_id":_id},
                 {$set: {"isDeleted": isDeleted}},
              //    { new: true}
               )
        }
    })
    taskModel
    .find({_id})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  }


// update tasks function
  const updateTask = async (req, res) => {
      const {name, _id} = req.body;
     await taskModel.findOneAndUpdate(
          {"_id":_id},
           {$set: {"name": name}},
           { new: true}
         )

    taskModel
    .findById({_id})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  }


module.exports = {newTask, allTasks, tasksId, updateTask, deleteTask, isDeletedTask}