const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  timeToRead: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  mainPicture: {
    type: String,
    required: true,
  },
},{ timestamps: true }
);

const Article = mongoose.models.Article || mongoose.model("Article", articleSchema);

module.exports = Article;
