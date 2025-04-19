const Election = require("../schemas/electionSchema");

// CREATE
exports.createElection = async (title, description, logo, collegeId, departmentId, startDate, endDate) => {
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
exports.updateElection = async (electionId, updatedData) => {
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
exports.deleteElection = async (id) => {
  return await Election.findByIdAndDelete(id);
};

// FIND BY ID
exports.findElectionById = async (id) => {
  return await Election.findById(id);
};

// GET ALL
exports.getAllElections = async () => {
  return await Election.find()
    .populate('college', 'name')
    .populate('department', 'name')
    .sort({ createdAt: -1 });
};
