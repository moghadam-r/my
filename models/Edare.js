const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  
  moavenat: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    
  },

});



const model = mongoose.models.Edare || mongoose.model("Edare", schema);

export default model;