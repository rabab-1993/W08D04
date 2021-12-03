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
  const idToken = req.saveToken.id;
  const postedBy = await postModel.findOne({ _id });

  if (idToken == postedBy.user) {
    await postModel.findOneAndUpdate({ _id }, { $set: { desc } });
    res.json("done");
  } else {
    return res.status(403).json("forbidden");
  }
};

// soft delete post function
const deletePost = async (req, res) => {
  const { isDeleted, _id } = req.body;
  const tokenId = req.saveToken.id;
  const postedBy = await postModel.findOne({ _id });
  if (tokenId == postedBy) {
    postModel.findById({ _id }).then(async (result) => {
      if (result.isDeleted == true) {
        return res.json({ massege: "this post already have been deleted" });
      } else {
        await postModel.findOneAndUpdate({ _id }, { $set: { isDeleted } });
        return res.json({ massege: "deleted successfully" });
      }
    });
  } else {
    res.status(403).json({ massege: "forbidden" });
  }
};

module.exports = { newPost, allPost, updatePost, deletePost };
