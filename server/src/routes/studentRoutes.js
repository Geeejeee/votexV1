const express = require('express');
const router = express.Router();
const {vote, getVote, getStudentProfile} = require('../controllers/studentController');
const {verifyToken, requireStudent} = require('../utils/authMiddleware');
const {voteValidator} = require('../validator/voteValidator');
const validate = require('../utils/validate');
const { getElections, getPositionsByElection, getTopCandidatesByPosition, getAllStudentsWithVoteStatus } = require('../controllers/adminController');


router.post('/vote', verifyToken, requireStudent, validate(voteValidator),vote);
router.get('/vote-status', verifyToken, requireStudent, getVote);

router.get('/profile', verifyToken, requireStudent, getStudentProfile);

router.get('/get-elections', verifyToken, requireStudent, getElections);
router.get('/election-positions/:electionId', verifyToken, requireStudent, getPositionsByElection);
router.get('/election-results/:electionId/:positionId', verifyToken, requireStudent, getTopCandidatesByPosition);

module.exports = router;
