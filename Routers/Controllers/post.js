const postModel = require("../../db/model/post");

// creat new post
const newPost = (req, res) => {
  const { user, desc } = req.body;
  const post = new postModel({
    desc,
    user,
  });

  post
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// get all post

const allPost = (req, res) => {
  postModel
    .find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// update post function
const updatePost = async (req, res) => {
  const { desc, _id } = req.body;
  await postModel.findOneAndUpdate({ _id: _id }, { $set: { desc: desc } });

  postModel
    .findById({ _id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// soft delete post function
const deletePost = (req, res) => {
  const { isDeleted, _id } = req.body;
  postModel.findById({ _id }).then(async (result) => {
    if (result.isDeleted == true) {
      return res.json({ massege: "this post already have been deleted" });
    } else {
      await postModel.findOneAndUpdate(
        { _id: _id },
        { $set: { isDeleted: isDeleted } }
        );
        return res.json({ massege: "deleted successfully" });
    }
  });
};

module.exports = { newPost, allPost, updatePost, deletePost };
