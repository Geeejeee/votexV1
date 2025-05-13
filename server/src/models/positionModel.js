const Position = require('../schemas/positionSchema');

const createPosition = async (name, description) => {
  return await Position.create({ name, description });
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


module.exports = {createPosition, deletePosition, findPositionById, getAllPositions}