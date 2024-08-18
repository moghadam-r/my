const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  pKey: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  meliCode: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  family: {
    type: String,
    required: true,
  },
  edare: {
    type: String,
    //required: true,
  },
  darkhast: {
    type: String,
    
  },
  pasokh: {
    type: String,
    
  },
  rahgiry: {
    type: String,
    //required: true,
  },
  date: {
    type: Date,
    default: () => Date.now(),
    immutable: false,
  },
});

// codes.txt -> 99000

const model = mongoose.models.SabtDarkhast || mongoose.model("SabtDarkhast", schema);

export default model;
