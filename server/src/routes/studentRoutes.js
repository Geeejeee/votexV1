const express = require('express');
const router = express.Router();
const {submitVote, getVote, getStudentProfile, getVotesByElection, getElectionFullResults} = require('../controllers/studentController');
const {verifyToken, requireStudent} = require('../utils/authMiddleware');
const {voteValidator} = require('../validator/voteValidator');
const validate = require('../utils/validate');
const { getElections, getPositionsByElection, getTopCandidatesByPosition, 
    getCandidatesByElectionId,getElectionById} = require('../controllers/adminController');


router.post('/vote', verifyToken, requireStudent, submitVote);
router.get('/vote-status', verifyToken, requireStudent, getVote);

router.get('/profile', verifyToken, requireStudent, getStudentProfile);

router.get('/get-elections', verifyToken, requireStudent, getElections);
router.get('/election-positions/:electionId', verifyToken, requireStudent, getPositionsByElection);
router.get('/election-results/:electionId/:positionId', verifyToken, requireStudent, getTopCandidatesByPosition);

router.get('/elections/:electionId', verifyToken, requireStudent, getElectionById);
router.get('/elections/:electionId/candidates', verifyToken, requireStudent, getCandidatesByElectionId);
router.get('/elections/:electionId/votes', verifyToken, requireStudent, getVotesByElection);

router.get('/election-full-results/:electionId', verifyToken, requireStudent, getElectionFullResults);


module.exports = router;
