const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  college: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'College', 
    required: true }
});

module.exports = mongoose.model('Department', departmentSchema);
