const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  
  
  name: {
    type: String,
    required: true,
    
  },

  
 
});



const model = mongoose.models.Moavenat || mongoose.model("Moavenat", schema);

export default model;