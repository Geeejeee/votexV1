const { findUserByEmail, updateUserVote } = require('../models/userModel');
const {castVote, getVoteStatus} = require('../models/voteModel');
const emitLiveResults = require('../utils/emitLiveResults');

// Cast a Vote
exports.vote = async (req, res, next) => {
  try {
    const userId = req.user.userId; // from JWT middleware
    const userEmail = req.user.email;

    const { candidateId } = req.body;

    const user = await findUserByEmail(userEmail);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.hasVoted) {
      return res.status(403).json({ message: 'You have already voted' });
    }

    await castVote(userId, candidateId);
    await updateUserVote(userId);

    const updatedStatus = await getVoteStatus();
    emitLiveResults({ totalVotes: updatedStatus.length, votes: updatedStatus });

    res.status(200).json({ message: 'Vote submitted successfully' });

  } catch (err) {
    next(err);
  }
};


exports.getVoteStatus = async (req, res, next) => {
  try {
    const status = await getVoteStatus();
    res.status(200).json({ totalVotes: status.length, votes: status });

  } catch (err) {
    next(err);
  }
};
