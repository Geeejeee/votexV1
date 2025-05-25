const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  idNumber: {
    type: String,
    required: true,
    unique: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
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
  college: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'College', 
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Department',
    required: true
  },
  yearLevel: {
    type: String,
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
    required: true
  },
  section: {
    type: String,
    required: true
  },
  profilePicture: { 
    type: String, 
    default: '' 
  },
  hasVoted: { 
    type: Boolean, 
    default: false 
  },
  role: {
    type: String,
    enum: ['admin', 'student'],
    default: 'student'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
