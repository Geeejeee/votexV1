const Vote = require("../schemas/voteSchema");
const User = require("../schemas/userSchema");
const Candidate = require("../schemas/candidateSchema");
const mongoose = require('mongoose');

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

const getVoterByElectionAndPosition = async (electionId, positionId) => {
  const votes = await Vote.find({ election: electionId, position: positionId })
    .populate({
      path: 'student', // or 'voter' if that's the correct field
      match: { role: 'student' },
      select: 'idNumber firstname lastname email college department',
      populate: [
        { path: 'college', select: 'name' },
        { path: 'department', select: 'name' }
      ]
    })
    .sort({ votedAt: -1 });

  // Filter and map results
  return votes
    .filter(vote => vote.student) // only include if student is populated
    .map(vote => ({
      idNumber: vote.student.idNumber,
      firstName: vote.student.firstname,
      lastName: vote.student.lastname,
      email: vote.student.email,
      college: vote.student.college?.name || 'N/A',
      department: vote.student.department?.name || 'N/A',
      time: vote.votedAt,
    }));
};

const getTopCandidatesForPosition = async (electionId, positionId, limit = 3) => {
  return await Vote.aggregate([
    {
      $match: {
        election: new mongoose.Types.ObjectId(electionId),
        position: new mongoose.Types.ObjectId(positionId),
      },
    },
    {
      $group: {
        _id: "$candidate",
        voteCount: { $sum: 1 },
      },
    },
    {
      $sort: { voteCount: -1 },
    },
    {
      $limit: limit,
    },
  ]);
};

const getTotalVotesForPosition = async (electionId, positionId) => {
  return await Vote.countDocuments({
    election: electionId,
    position: positionId,
  });
};

module.exports = {
  createVote,
  getAllVotes,
  getVotesByCandidate,
  getVotedStudents,
  getNonVotedStudents,
  castVote,
  getVoteStatus,
  getVoterByElectionAndPosition,
  getTopCandidatesForPosition,
  getTotalVotesForPosition
};