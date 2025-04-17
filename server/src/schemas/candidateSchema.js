const mongoose = require('mongoose');//js and mongodb translation/ interact with database

const candidateSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true,
  },
  position: {
    type: String,
    required: true,
    enum: ['President', 'Vice President', 'Secretary', 'Treasurer', 'Class Representative'], 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  election: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Election',
    required: true,
  }
  
});

module.exports = mongoose.model('Candidate', candidateSchema);
