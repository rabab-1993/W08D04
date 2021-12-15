const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  count: { type: Number, default: 0 },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Likes", likeSchema);
