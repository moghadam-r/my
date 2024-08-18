const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    codeRahgiry: {
    type: String,
    required: true,
  },
  melicode: {
    type: String,
    required: true,
  },
  resItem: {
    type: String,
    required: true,
  },
  
  date: {
    type: Date,
    default: () => Date.now(),
    immutable: false,
  },
});

// codes.txt -> 99000

const model = mongoose.models.Response || mongoose.model("Response", schema);

export default model;
