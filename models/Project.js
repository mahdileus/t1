const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
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
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
},{ timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

module.exports = Project;
