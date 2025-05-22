const {  findUserByIdNumber, updateUserVote, getProfile } = require('../models/userModel');
const {castVote, getVoteStatus} = require('../models/voteModel');


// Cast a Vote
const vote = async (req, res, next) => {
  try {
    const userId = req.user.userId; 
    const idNumber = req.user.idNumber;

    const { candidateId } = req.body;

    const user = await findUserByIdNumber(idNumber);
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


const getVote = async (req, res, next) => {
  try {
    const status = await getVoteStatus();
    res.status(200).json({ totalVotes: status.length, votes: status });

  } catch (err) {
    next(err);
  }
};

const getStudentProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // assuming you're using a decoded JWT to get user ID

    const student = await getProfile(userId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ student });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {vote, getVote, getStudentProfile};