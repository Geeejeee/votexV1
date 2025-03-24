const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: {
    type: String,
    enum: ['admin', 'student'],
    required: true,
  },
  college: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'College', 
    required: function() { 
      return this.role === 'student'; 
    } 
  },
  department: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Department',
     required: function() { 
      return this.role === 'student'; 
    } 
  },
  hasVoted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
