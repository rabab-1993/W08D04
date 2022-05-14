const postModel = require("../../db/model/post");
const likeModel = require("../../db/model/likes");
const userModel = require("../../db/model/user");

const cloudinary = require("cloudinary").v2;
// cloudinary configuration
cloudinary.config({
  cloud_name: "dtj6j4tpa",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// creat new post
const newPost = async (req, res) => {
  const { user, desc, img } = req.body;
  const cloude = await cloudinary.uploader.upload(img, {
    folder: "social-img",
  });

  const post = new postModel({
    desc,
    img: cloude.secure_url,
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
    .find({ isDeleted: false })
    .populate("likes")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// get post by id
const postedBy = async (req, res) => {
  const { user } = req.query;

  await postModel
    .find({ user, isDeleted: false })
    .then((result) => {
      res.status(200).json(result);
      console.log(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// update post function
const updatePost = async (req, res) => {
  const { desc, _id } = req.query;
  const idToken = req.saveToken.id;
  const userId = await postModel.findOne({ _id });

  if (idToken == userId.user) {
    await postModel.findOneAndUpdate(
      { _id },
      { $set: { desc } },
      { new: true }
    );
    res.json("done");
  } else {
    return res.status(403).json("forbidden");
  }
};

// soft delete post function
const deletePost = async (req, res) => {
  const { _id, adminId } = req.query;
  const tokenId = req.saveToken.id;
  const postBy = await postModel.findById(_id);
  const admin = await userModel.findById(adminId);

  if (tokenId == postBy.user || admin.role == "61a82b332b8f8814ee629667") {
    await postModel
      .findByIdAndUpdate({ _id }, { $set: { isDeleted: true } }, { new: true })
      .then(() => {
        res.json({ massege: "deleted successfully" });
      })
      .catch((err) => {
        res.status(403).json({ massege: "forbidden" });
      });
  }
};

module.exports = { newPost, allPost, updatePost, deletePost, postedBy };
