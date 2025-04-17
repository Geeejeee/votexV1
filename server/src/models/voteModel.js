const Vote = require("../schemas/voteSchema");
const User = require("../schemas/userSchema");
const Candidate = require("../schemas/candidateSchema");

exports.createVote = async (data) => {
  return await Vote.create(data);
};

exports.getAllVotes = async () => {
  return await Vote.find().populate('voter').populate('candidate');
};

exports.getVotesByCandidate = async () => {
  return await Vote.find({}).populate('candidate');
};

exports.getVotedStudentIds = async () => {
  const votes = await Vote.find({}, 'voter');
  return votes.map(vote => vote.voter.toString());
};

exports.getVotedStudents = async () => {
  const votes = await Vote.find().populate('voter');
  return votes.map(vote => vote.voter); // returns full student objects
};

exports.getNonVotedStudents = async () => {
  const votedIds = await exports.getVotedStudentIds();
  const allStudents = await User.find({ role: 'student' });

  const nonVoters = allStudents.filter(student => !votedIds.includes(student._id.toString()));
  return nonVoters;
};

exports.castVote = async (userId, candidateId) => {
  const candidate = await Candidate.findById(candidateId);
  if (!candidate) throw new Error('Candidate not found');

  const vote = new Vote({
    voter: userId,
    candidate: candidateId,
    election: candidate.election,
  });

  return await vote.save();
};

exports.getVoteStatus = async () => {
  return await Vote.find()
    .populate('candidate', 'firstName lastName position')
    .populate('voter', 'name email');
};