const { findUserByEmail, updateUserVote } = require('../models/userModel');
const {castVote, getVoteStatus} = require('../models/voteModel');

// Cast a Vote
exports.vote = async (req, res, next) => {
  try {
    const userId = req.user.userId; // from JWT middleware
    const { candidateId } = req.body;

    const user = await findUserByEmail(req.user.email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.hasVoted) {
      return res.status(403).json({ message: 'You have already voted' });
    }

    await castVote(userId, candidateId);
    await updateUserVote(userId);

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
