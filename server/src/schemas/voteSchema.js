const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  election: { type: mongoose.Schema.Types.ObjectId, ref: 'Election', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  votes: [
    {
      position: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true },
      candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    }
  ],
  votedAt: { type: Date, default: Date.now }
});

// One vote document per student per election
voteSchema.index({ election: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('Vote', voteSchema);
