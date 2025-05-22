const Position = require('../schemas/positionSchema');
const Election = require('../schemas/electionSchema');
const electionPosition = require('../schemas/electionPositionSchema');
const Candidate = require('../schemas/candidateSchema');

const createPositions = async (name, electionId) => {
  console.log("Creating with:", { name, electionId });
  return await Position.create({ name, election: electionId });
};
const createPositionAndAddToElection = async (electionId, name, description) => {
  // Check if a position with the same name already exists globally
  const existingPosition = await Position.findOne({ name });
  if (existingPosition) {
    // Check if it's already assigned to this election
    const alreadyAssigned = await electionPosition.findOne({
      election: electionId,
      position: existingPosition._id,
    });

    if (alreadyAssigned) {
      throw new Error('Position already exists and is assigned to this election.');
    }

    // If not assigned yet, just assign the existing one
    const newAssignment = await electionPosition.create({
      election: electionId,
      position: existingPosition._id,
    });

    return newAssignment; // or return newAssignment if you want the relation
  }

  // Create a new position
  const newPosition = await Position.create({ name, description });

  // Create ElectionPosition relation
  await electionPosition.create({
    election: electionId,
    position: newPosition._id,
  });

  return newPosition;
};

const deletePosition = async (positionId) => {
  await electionPosition.deleteOne({ position: positionId });
};

const findPositionById = async (id) => {
  return await Position.findById(id);
};

const getAllPositions = async () => {
  return await Position.find();
};

const findPositionByName = async (name, electionId) => {
  return await Position.findOne({ name, election: electionId });
};

const getPositionsByElectionId = async (electionId) => {
  return await electionPosition.find({ election: electionId })
    .populate('position', 'name'); 
};

const findPositionInElection = async (electionId, positionId) => {
  return await electionPosition.findOne({ election: electionId, position: positionId });
};

const createElectionPosition = async (electionId, positionId) => {
  return await electionPosition.create({ election: electionId, position: positionId });
};

const getTopPresidents = async(electionId) => {
  // Fetch the position document for 'President'
  const presidentPosition = await Position.findOne({ name: 'President' });
  if (!presidentPosition)
    throw new Error('President position not found');

  // Find the ElectionPosition for this election and position
  const ElectionPosition = await electionPosition.findOne({
    election: mongoose.Types.ObjectId(electionId),
    position: presidentPosition._id,
  });
  if (!ElectionPosition)
    throw new Error('President position not assigned to this election');

  // Get all candidates for this election with that position
  const candidates = await Candidate.find({
    election: mongoose.Types.ObjectId(electionId),
    position: ElectionPosition.position,
  });

  if (candidates.length === 0) return []; // no candidates

  // Count votes for each candidate
  const candidatesWithVotes = await Promise.all(
    candidates.map(async (candidate) => {
      const votesCount = await Vote.countDocuments({ candidate: candidate._id });
      return {
        candidate,
        votes: votesCount,
      };
    })
  );

  // Sort by votes descending
  candidatesWithVotes.sort((a, b) => b.votes - a.votes);

  // Return top 3
  return candidatesWithVotes.slice(0, 3).map(({ candidate, votes }) => ({
    id: candidate._id,
    firstName: candidate.firstName,
    lastName: candidate.lastName,
    photo: candidate.photo,
    votes,
  }));
}

module.exports = {
  createPositions,
  getTopPresidents,
  createPositionAndAddToElection,
  deletePosition,
  findPositionById,
  getAllPositions,
  findPositionByName,
  getPositionsByElectionId,
  findPositionInElection,
  createElectionPosition
};
