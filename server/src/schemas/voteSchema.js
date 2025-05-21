const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  election: { type: mongoose.Schema.Types.ObjectId, ref: 'Election', required: true },
  position: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 'User' not 'Student'
  votedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vote', voteSchema);
