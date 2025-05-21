const mongoose = require('mongoose');//js and mongodb translation/ interact with database

const candidateSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  party: {
    type: String,
    required: true,
  },
  yearLevel: {
    type: String,
    required: true,
  },
  motto: {
    type: String,
    required: true,
  },
  affiliations: {
    type: String,
    required: true,
  },
  advocacies: {
    type: String,
    required: true,
  },
  photo: {
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
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Position', 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  election: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Election',
    required: true,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  
});

module.exports = mongoose.model('Candidate', candidateSchema);
