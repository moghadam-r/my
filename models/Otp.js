const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  
  
  pKey: {
    type: Number,
    required: true,
    unique:true,
  },

  phone: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  expTime: {
    type: Number,
    required: true,
  },
  meliCode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: () => Date.now(),
    immutable: false,
  },

    refreshToken: {
     type: String,
    },
});

// codes.txt -> 99000

const model = mongoose.models.Otp || mongoose.model("Otp", schema);

export default model;
