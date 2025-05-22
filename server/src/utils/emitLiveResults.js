// emitLiveResults.js

const { getCandidateVotesByElection } = require('../models/voteModel'); // adjust path
const { findElectionById } = require('../models/electionModel'); // adjust path

const emitLiveResults = async (io, electionId) => {
  try {
    // Fetch election details
    const election = await findElectionById(electionId);
    if (!election) {
      console.warn(`Election with id ${electionId} not found`);
      return;
    }

    // Get candidates with their votes and position info
    const candidatesWithVotes = await getCandidateVotesByElection(electionId);

    // Group candidates by position
    const positionsMap = new Map();

    candidatesWithVotes.forEach(cand => {
      const posId = cand.positionId.toString();
      if (!positionsMap.has(posId)) {
        positionsMap.set(posId, {
          positionId: posId,
          positionName: cand.positionName,
          candidates: []
        });
      }

      positionsMap.get(posId).candidates.push({
        _id: cand._id.toString(),
        firstName: cand.firstName,
        lastName: cand.lastName,
        photo: cand.photo,
        votes: cand.votes || 0,
      });
    });

    // Convert map to array
    const positions = Array.from(positionsMap.values());

     console.log("Emitting voteUpdate to room:", `election_${electionId}`);

    // Emit the live vote update to the room for this election
    io.to(`election_${electionId}`).emit('voteUpdate', {
  electionId,
  election: {
    title: election.title,
    logo: election.logo,
  },
  positions,
});


  } catch (error) {
    console.error('Error emitting live results:', error);
  }
};

module.exports = emitLiveResults;
