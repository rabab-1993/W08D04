const mongoose = require("mongoose");

const post = new mongoose.Schema({
   img: {type: String},
   desc: {type: String, required: true},
   date: {type: Date(), default: new Date()},
   user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
})


module.exports = mongoose.model("Post", post);