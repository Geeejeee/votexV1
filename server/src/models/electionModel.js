const Election = require("../schemas/electionSchema");

exports.createElection = async (title, description, logo, collegeId, departmentId, startDate, endDate) => {
  // Case-insensitive check for duplicate title within same college & department
  const existingElection = await Election.findOne({
    title: { $regex: new RegExp(`^${title}$`, 'i') }, // case-insensitive exact match
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

exports.deleteElection = async (id) => {
  return await Election.findByIdAndDelete(id);
};

exports.findElectionById = async (id) => {
  return await Election.findById(id);
};
