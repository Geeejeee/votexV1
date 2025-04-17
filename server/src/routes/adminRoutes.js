const express = require('express');
const router = express.Router();
const {login, createCollege, deleteCollege,getColleges,createDepartment, deleteDepartment,getDepartments,createElection, deleteElection,getElectionResults,addCandidate, deleteCandidate, getVotedStudents, getNonVotedStudents, getAllStudentsWithVoteStatus} = require('../controllers/adminController');
const { verifyToken, requireAdmin } = require('../utils/authMiddleware');
const { validate } = require('../utils/validate');
const { collegeSchema, departmentSchema, loginSchema } = require('../validator/adminValidation');


router.post('/login', validate(loginSchema), login);

// College routes
router.post('/college', verifyToken, requireAdmin, validate(collegeSchema), createCollege);
router.delete('/college/:id', verifyToken, requireAdmin, deleteCollege);
router.get('/college', getColleges); // <-- added
router.get('/department/:collegeId', getDepartments); // <-- added
// Department routes
router.post('/department', verifyToken, requireAdmin, validate(departmentSchema), createDepartment);
router.delete('/department/:id', verifyToken, requireAdmin, deleteDepartment);


// Election routes
router.post('/elections', verifyToken, requireAdmin, createElection);
router.delete('/elections/:id', verifyToken, requireAdmin, deleteElection);
router.get('/elections/:electionId/results', verifyToken, requireAdmin, getElectionResults);

// Candidate routes
router.post('/candidates', verifyToken, requireAdmin, addCandidate);
router.delete('/candidates/:id', verifyToken, requireAdmin, deleteCandidate);


router.get('/get-all-students-with-vote-status', verifyToken, requireAdmin, getAllStudentsWithVoteStatus);
module.exports = router;
