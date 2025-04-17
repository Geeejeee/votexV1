const Candidate = require("../schemas/candidateSchema");

exports.createCandidate = async (firstName, lastName, position, electionId, collegeId, departmentId) => {
  return await Candidate.create({
    firstName,
    lastName,
    position,
    election: electionId,
    college: collegeId,
    department: departmentId
  });
};

exports.deleteCandidate = async (id) => {
  return await Candidate.findByIdAndDelete(id);
};

exports.findCandidatesByElection = async (electionId) => {
  return await Candidate.find({ election: electionId });
};

exports.findCandidateById = async (id) => {
  return await Candidate.findById(id);
};