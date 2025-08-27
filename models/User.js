const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    default:"ADMIN"
  },
    phone: {
    type: String,
    required: true,
  },
    password: {
    type:String,
    required: false,
  },
    role: {
    type: String,
    default: "ADMIN",
  }
},
  {
    timestamps: true,
  });

const model = mongoose.models.User || mongoose.model("User", schema);

module.exports = model;
