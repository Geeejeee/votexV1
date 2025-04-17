const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const {verifyToken, requireStudent} = require('../utils/authMiddleware');
const {voteValidator} = require('../validator/voteValidator');
const {validate} = require('../utils/validate');


router.post('/vote', verifyToken, requireStudent, validate(voteValidator),studentController.vote);
router.get('/vote-status', verifyToken, requireStudent, studentController.getVoteStatus);

module.exports = router;
