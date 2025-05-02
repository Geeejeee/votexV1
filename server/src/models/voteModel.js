const Vote = require("../schemas/voteSchema");
const User = require("../schemas/userSchema");
const Candidate = require("../schemas/candidateSchema");

const createVote = async (data) => {
  return await Vote.create(data);
};

const getAllVotes = async () => {
  return await Vote.find().populate('voter').populate('candidate');
};

const getVotesByCandidate = async () => {
  return await Vote.find({}).populate('candidate');
};

const getVotedStudentIds = async () => {
  const votes = await Vote.find({}, 'voter');
  return votes.map(vote => vote.voter.toString());
};

const getVotedStudents = async () => {
  const votes = await Vote.find().populate('voter');
  return votes.map(vote => vote.voter); // returns full student objects
};

const getNonVotedStudents = async () => {
  const votedIds = await getVotedStudentIds();
  const allStudents = await User.find({ role: 'student' });

  const nonVoters = allStudents.filter(student => !votedIds.includes(student._id.toString()));
  return nonVoters;
};

const castVote = async (userId, candidateId) => {
  const candidate = await Candidate.findById(candidateId);
  if (!candidate) throw new Error('Candidate not found');

  const vote = new Vote({
    voter: userId,
    candidate: candidateId,
    election: candidate.election,
  });

  return await vote.save();
};

const getVoteStatus = async () => {
  return await Vote.find()
    .populate('candidate', 'firstName lastName position')
    .populate('voter', 'name email');
};

module.exports = {
  createVote,
  getAllVotes,
  getVotesByCandidate,
  getVotedStudents,
  getNonVotedStudents,
  castVote,
  getVoteStatus,
};