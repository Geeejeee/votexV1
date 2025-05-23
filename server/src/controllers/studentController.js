const {  findUserByIdNumber, updateUserVote, getProfile } = require('../models/userModel');
const {checkVoteForPosition, getVoteStatus, checkStudentVotedInElection, saveVote,
  findVoterForElection, getAllVotesForElection} = require('../models/voteModel');
const emitLiveResults = require('../utils/emitLiveResults');

// Cast a Vote
const submitVote = async (req, res) => {
  try {
    const { election, position, candidate } = req.body;
    const student = req.user.userId;

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
      await saveVote(election, student, position, candidate);

      // Step 4: Mark user as having voted
      await updateUserVote(student);
    }
    const io = req.app.get('io');
    await emitLiveResults(io, election);

    console.log("Live results emitted for election", election);

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

const getElectionFullResults = async (req, res) => {
  const { electionId } = req.params;

  try {
    // 1. Get election details
    const election = await findById(electionId);
    if (!election) {
      return res.status(404).json({ message: "Election not found" });
    }

    // 2. Get all positions for this election
    const positions = await getPositionsByElectionId(electionId);
    if (!positions.length) {
      return res.status(404).json({ message: "No positions found" });
    }

    // 3. Get all candidates for this election
    const candidates = await getCandidatesByElectionId(electionId);

    // 4. Get all votes for this election
    const votes = await getAllVotesForElection(electionId);

    // 5. Count votes per candidate
    const voteCountMap = new Map();
    for (const voteDoc of votes) {
      for (const vote of voteDoc.votes) {
        const candidateId = vote.candidate.toString();
        voteCountMap.set(candidateId, (voteCountMap.get(candidateId) || 0) + 1);
      }
    }

    // 6. Group candidates under each position
    const positionResults = positions.map((pos) => {
      const positionCandidates = candidates
        .filter((c) => c.position.toString() === pos._id.toString())
        .map((candidate) => {
          const idStr = candidate._id.toString();
          const voteCount = voteCountMap.get(idStr) || 0;
          return {
            id: candidate._id,
            name: `${candidate.firstName} ${candidate.lastName}`,
            party: candidate.party,
            photo: candidate.photo,
            votes: voteCount,
          };
        });

      const totalVotes = positionCandidates.reduce((sum, c) => sum + c.votes, 0);

      const withPercentage = positionCandidates.map((c) => ({
        ...c,
        percent: totalVotes > 0 ? c.votes / totalVotes : 0,
      }));

      return {
        positionId: pos._id,
        title: pos.name,
        candidates: withPercentage.sort((a, b) => b.votes - a.votes),
      };
    });

    res.status(200).json({
      election: {
        id: election._id,
        title: election.title,
        date: election.startDate,
        college: election.college?.name || "",
        department: election.department?.name || "",
      },
      positions: positionResults,
    });
  } catch (err) {
    console.error("Error in getElectionFullResults:", err);
    res.status(500).json({ message: "Server error while fetching full election results." });
  }
};
module.exports = {submitVote, getVote, getStudentProfile, getVotesByElection, getElectionFullResults};