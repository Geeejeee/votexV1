
const {createElectionPosition, getAllPositions, findPositionById, findPositionInElection,deletePosition} = require('../models/positionModel') // Assuming your position model is located in the models folder
const {findElectionById} = require('../models/electionModel')

// Create Position
const makePosition = async (req, res) => {
  try {
    const {id, name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Check for duplicate
    const existing = await findPositionById(id);
    if (existing) {
      return res.status(400).json({ message: "Position already exists" });
    }

    // Create and save new position
    const newPosition = await createPosition(name, description);

    res.status(201).json({
      message: "Position created successfully",
      position: newPosition
    });
  } catch (error) {
    console.error("Create Position Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Get all Positions
const getPositions = async (req, res) => {
  try {
    const positions = await getAllPositions();
    res.status(200).json({positions});
  } catch (error) {
    console.error("Get Positions Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteElectionPosition = async (req, res) => {
  try {
    const { positionId } = req.params;
    await deletePosition(positionId);
    res.status(200).json({ message: 'Position removed from election' });
  } catch (err) {
    console.error('Failed to delete election position', err);
    res.status(500).json({ message: 'Server error' });
  }
};


 const addPositionToElection = async (req, res) => {
  const { electionId } = req.params;
  const { positionId } = req.body;

  if (!positionId) {
    return res.status(400).json({ message: "Position ID is required." });
  }

  try {
    // Ensure the election exists
    const election = await findElectionById(electionId);
    if (!election) {
      return res.status(404).json({ message: "Election not found." });
    }

    // Check if this position is already assigned to the election
    const existing = await findPositionInElection(electionId, positionId);
    if (existing) {
      return res.status(400).json({ message: "Position already added to this election." });
    }

    // Create new ElectionPosition document
    const newAssignment = await createElectionPosition(electionId, positionId);

    res.status(200).json({
      message: "Position successfully added to election.",
      electionPosition: newAssignment,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

  module.exports = { makePosition, getPositions, deleteElectionPosition, addPositionToElection };