const Election = require("../schemas/electionSchema");

// CREATE
const createElections = async (title, description, logo, collegeId, departmentId, startDate, endDate) => {
  const existingElection = await Election.findOne({
    title: { $regex: new RegExp(`^${title}$`, 'i') },
    college: collegeId,
    department: departmentId
  });

  if (existingElection) {
    throw new Error("Election with this title already exists in this department and college.");
  }

  return await Election.create({
    title,
    description,
    logo,
    college: collegeId,
    department: departmentId,
    startDate,
    endDate
  });
};

// UPDATE
const updateElections = async (electionId, updatedData) => {
  const updateFields = {
    title: updatedData.title,
    description: updatedData.description,
    startDate: updatedData.startDate,
    endDate: updatedData.endDate,
    college: updatedData.collegeId,
    department: updatedData.departmentId,
  };

  if (updatedData.logo) {
    updateFields.logo = updatedData.logo;
  }

  const updatedElection = await Election.findByIdAndUpdate(
    electionId,
    updateFields,
    { new: true }
  );

  return updatedElection;
};


// DELETE
const deleteElections = async (id) => {
  return await Election.findByIdAndDelete(id);
};

// FIND BY ID
const findElectionById = async (electionId) => {
  return await Election.findById(electionId).lean();
};

// GET ALL
const getAllElections = async () => {
  return await Election.find()
    .populate('college', 'name')
    .populate('department', 'name')
    .sort({ createdAt: -1 });
};

const findById = async (electionId) => {
  return await Election.findById(electionId)
    .populate('college', 'name')
    .populate('department', 'name');
};


module.exports = {createElections, updateElections, deleteElections, findElectionById, getAllElections, findById};