const mongoose = require("mongoose");

const comment = new mongoose.Schema({

    comment: {type: String, required: true},
    date: {type: Date, default: new Date()},
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post"},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
})






module.exports = mongoose.model("Comment", comment);