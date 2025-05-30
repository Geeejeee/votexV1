const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  }
});

module.exports = mongoose.model('College', collegeSchema);
