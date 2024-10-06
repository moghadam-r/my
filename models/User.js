const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  family: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "USER",
  },
  personeli: {
    type: String,
    required: true,
  },

    refreshToken: {
     type: String,
    },

 // refreshToken: String,
});

const model = mongoose.models.User || mongoose.model("User", schema);

module.exports = model;
