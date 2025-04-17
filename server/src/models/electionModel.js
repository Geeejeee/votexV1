const Election = require("../schemas/electionSchema");

exports.createElection = async (name, position, collegeId, departmentId, startDate, endDate) => {
  return await Election.create({
    name,
    position,
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
