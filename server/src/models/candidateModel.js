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

const findCandidateAndUpdate = async (candidateId, updates ) => {
  console.log("Updating candidate with ID:", candidateId);
console.log("In service: updateCandidateById", candidateId, updates);

  return await Candidate.findByIdAndUpdate(candidateId, updates, { new: true });
}
module.exports = {createCandidate, deleteCandidates, findCandidateById, 
  findCandidateAndUpdate,
  findCandidatesByElection, findCandidatesByElectionAndPosition};