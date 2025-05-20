const Position = require('../schemas/positionSchema');
const Election = require('../schemas/electionSchema');
const electionPosition = require('../schemas/electionPositionSchema');

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

const deletePosition = async (id) => {
  return await Position.findByIdAndDelete(id);
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
    .populate('position', 'name'); // You can add more fields if needed
};

const findPositionInElection = async (electionId, positionId) => {
  return await electionPosition.findOne({ election: electionId, position: positionId });
};

const createElectionPosition = async (electionId, positionId) => {
  return await electionPosition.create({ election: electionId, position: positionId });
};

module.exports = {
  createPositions,
  createPositionAndAddToElection,
  deletePosition,
  findPositionById,
  getAllPositions,
  findPositionByName,
  getPositionsByElectionId,
  findPositionInElection,
  createElectionPosition
};
