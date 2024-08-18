const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  
  
  moavenat: {
    type: String,
    required: true,
    
  },

  edare: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  telphone: {
    type: Number,
    required: true,
  },
 
});

// codes.txt -> 99000

const model = mongoose.models.Tel || mongoose.model("Tel", schema);

export default model;