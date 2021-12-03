const commentModel = require("../../db/model/comment");
const roleModel = require('../../db/model/role')

// creat new comment
const newComment = (req, res) => {
  const { comment, postId, userId } = req.body;
  const comments = new commentModel({
    comment,
    postId,
    userId,
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

// get all comment

const allComment = (req, res) => {
  commentModel
    .find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// update comment function
const updateComment = async (req, res) => {
  const { comment, _id } = req.body;
  const tokenId = req.saveToken.id;
  const commentedBy = await commentModel.findOne({ _id });
  if (tokenId == commentedBy.userId) {
    await commentModel
      .findOneAndUpdate({ _id }, { $set: { comment } })
      .then(() => {
        res.status(200).json({ massege: "updated successfully" });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(403).json("forbidden");
  }
};

// delete comment function
const deleteComment = async (req, res) => {
  const { _id } = req.body;
  const tokenId = req.saveToken.id;
  const commentedBy = await commentModel.findOne({ _id });
  if (tokenId == commentedBy.userId) {
    await commentModel
      .findByIdAndDelete(_id)
      .then(() => {
        res.status(200).json({ massege: "deleted successfully" });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(403).json("forbidden");
  }
};

module.exports = { newComment, updateComment, deleteComment, allComment };
