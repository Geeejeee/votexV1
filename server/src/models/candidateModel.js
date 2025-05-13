const Candidate = require("../schemas/candidateSchema");

const createCandidate = async (firstName, lastName, position, electionId, collegeId, departmentId) => {
  return await Candidate.create({
    firstName,
    lastName,
    position,
    election: electionId,
    college: collegeId,
    department: departmentId
  });
};

const deleteCandidates = async (id) => {
  return await Candidate.findByIdAndDelete(id);
};

const findCandidatesByElection = async (electionId) => {
  return await Candidate.find({ election: electionId });
};

const findCandidateById = async (id) => {
  return await Candidate.findById(id);
};

module.exports = {createCandidate, deleteCandidates, findCandidateById, findCandidatesByElection}