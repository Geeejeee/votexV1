const {createPosition, getAllPositions, findPositionById, deletePosition} = require('../models/positionModel') // Assuming your position model is located in the models folder

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

const delPosition = async (req, res) => {
    try {
      const { id } = req.params; // Assuming the position ID is passed in the URL
  
      // Check if position exists
      const position = await findPositionById(id);
      if (!position) {
        return res.status(404).json({ message: "Position not found" });
      }
  
      // Delete the position
      await deletePosition(id);
  
      res.status(200).json({ message: "Position deleted successfully" });
    } catch (error) {
      console.error("Delete Position Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  module.exports = { makePosition, getPositions, delPosition };