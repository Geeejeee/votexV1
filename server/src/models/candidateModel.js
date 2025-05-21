const Candidate = require("../schemas/candidateSchema");


const createCandidate = async (
  firstName,
  lastName,
  party,
  yearLevel,
  motto,
  affiliations,
  advocacies,
  photo,
  position,
  electionId,
  collegeId,
  departmentId
) => {
  return await Candidate.create({
    firstName,
    lastName,
    party,
    yearLevel,
    motto,
    affiliations,
    advocacies,
    photo,
    position,
    election: electionId,
    college: collegeId,
    department: departmentId,
  });
};

const deleteCandidates = async (id) => {
  return await Candidate.findByIdAndDelete(id);
};

const findCandidatesByElection = async (electionId) => {
  return await Candidate.find({ election: electionId });
};

const findCandidatesByElectionAndPosition = async (filter) => {
  return await Candidate.find(filter)
      .populate('position')
      .populate('college')
      .populate('department');
};

const findCandidateById = async (id) => {
  return await Candidate.findById(id);
};

const findCandidateAndUpdate = async (candidateId, updates) => {
  return await Candidate.findByIdAndUpdate(candidateId, updates, { new: true });
}

const getCandidatesByElectionAndPosition = async (electionId, positionId) => {
  return Candidate.find({
    election: electionId,
    position: positionId,
    isArchived: false,
  });
};

module.exports = {createCandidate, deleteCandidates, findCandidateById, 
  findCandidateAndUpdate,
  findCandidatesByElection, findCandidatesByElectionAndPosition,getCandidatesByElectionAndPosition};