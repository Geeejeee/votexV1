const {  findUserByIdNumber, updateUserVote, getProfile } = require('../models/userModel');
const {checkVoteForPosition, getVoteStatus, checkStudentVotedInElection, saveVote,
  findVoterForElection, createVoteDocument} = require('../models/voteModel');


// Cast a Vote
const submitVote = async (req, res) => {
  console.log("submitVote req.body:", req.body);
  console.log("Authenticated user:", req.user);

  try {
    const { election, position, candidate } = req.body;
    const student = req.user.userId;

    console.log("studentID:", student);
    if (!election || !position || !candidate || !student) {
      return res.status(400).json({ message: "Missing required vote fields." });
    }

    // Step 1: Check if a vote document exists for this student in this election
    let voteDoc = await checkStudentVotedInElection(election, student);

    // Step 2: If exists, check if this position was already voted
    if (voteDoc) {
      const alreadyVotedForPosition = voteDoc.votes.some((v) =>
        v.position.equals(position)
      );

      if (alreadyVotedForPosition) {
        return res.status(400).json({ message: "You have already voted for this position." });
      }

      // Step 3a: Add the new vote
      voteDoc.votes.push({ position, candidate });
      await voteDoc.save();
    } else {
      // Step 3b: Create a new vote document
      console.log("Before saveVote, student ID is:", student);
      await saveVote(election, student, position, candidate);

      // Step 4: Mark user as having voted
      await updateUserVote(student);
    }

    return res.status(201).json({ message: "Vote submitted successfully." });
  } catch (error) {
    console.error("Vote submission error:", error);
    return res.status(500).json({ message: "Internal server error." });
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

const getVotesByElection = async (req, res) => {
  try {
    const { electionId } = req.params;
    const studentId = req.user._id;

    const voteDoc = await findVoterForElection(electionId, studentId);

    if (!voteDoc) {
      return res.json({ votes: [] });
    }

    const formattedVotes = voteDoc.votes.map((vote) => ({
      positionId: vote.position._id,
      positionName: vote.position.name,
      candidateId: vote.candidate._id,
      candidateName: vote.candidate.name,
    }));

    res.json({ votes: formattedVotes });
  } catch (error) {
    console.error('Error fetching votes:', error);
    res.status(500).json({ message: 'Failed to fetch votes' });
  }
};

module.exports = {submitVote, getVote, getStudentProfile, getVotesByElection};