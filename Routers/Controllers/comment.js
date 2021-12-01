const commentModel = require('../../db/model/comment');

// creat new post
const newComment = (req, res) => {
    const { comment, postId, userId } = req.body;
    const comments = new commentModel({
        comment,
        postId,
        userId
    });
  
    comments
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };



// update comment function
const updateComment = async (req, res) => {
    const { comment, _id } = req.body;
    await commentModel.findOneAndUpdate({ _id: _id }, { $set: { comment: comment } });
  
    commentModel
      .findById({ _id })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };

// delete comment function
// const deleteComment = (req, res) => {
//     const { isDeleted, _id } = req.body;
//     postModel.findById({ _id }).then(async (result) => {
//       if (result.isDeleted == true) {
//         return res.json({ massege: "this post already have been deleted" });
//       } else {
//         await postModel.findOneAndUpdate(
//           { _id: _id },
//           { $set: { isDeleted: isDeleted } }
//           );
//           return res.json({ massege: "deleted successfully" });
//       }
//     });
//   };


module.exports = {newComment, updateComment, deleteComment}