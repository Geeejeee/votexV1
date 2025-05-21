const express = require('express');
const router = express.Router();
const {addVoter, createCollege, deleteCollege,getColleges,createDepartment, 
        updateCandidate,deleteDepartment,getDepartments,createElection, 
        getVotersByElectionAndPosition,deleteElection,getElectionResults,getElections,getElectionById,updateElection,addCandidate, 
        getCandidatesByElectionId,archiveCandidate, getAllStudentsWithVoteStatus} = require('../controllers/adminController');
const { verifyToken, requireAdmin } = require('../utils/authMiddleware');
const validate = require('../utils/validate');
const { collegeSchema, departmentSchema } = require('../validator/adminValidation');
const { registerSchema } = require('../validator/authValidator');
const upload = require("../utils/upload")
const {candidateSchema} = require('../validator/candidateValidation');



router.post('/add-voter', verifyToken, requireAdmin,validate(registerSchema), addVoter);
// College routes
router.post('/college', verifyToken, requireAdmin, validate(collegeSchema), createCollege);
router.delete('/college/:id', verifyToken, requireAdmin, deleteCollege);
router.get('/get-college', verifyToken, requireAdmin, getColleges);

// Department routes
router.post('/department', verifyToken, requireAdmin, validate(departmentSchema), createDepartment);
router.delete('/department/:id', verifyToken, requireAdmin, deleteDepartment);
router.get('/get-department/:collegeId',verifyToken, requireAdmin, getDepartments);

// Election routes
router.post('/elections', verifyToken, requireAdmin, upload.single('logo'), createElection);


  
router.delete('/delete-elections/:id', verifyToken, requireAdmin, deleteElection);

router.get('/elections/:electionId/results', verifyToken, requireAdmin, getElectionResults);

router.get('/get-elections', verifyToken, requireAdmin, getElections);
router.put('/update-election/:electionId', verifyToken, requireAdmin, upload.single('logo'),updateElection);
router.get('/elections/:electionId/candidates', verifyToken, requireAdmin, getCandidatesByElectionId);
router.get('/elections/:electionId', verifyToken, requireAdmin, getElectionById);



// Candidate routes
router.post('/candidates/:electionId/positions/:positionId', verifyToken, requireAdmin, upload.single('photo'), validate(candidateSchema),addCandidate);
router.put('/candidates/:candidateId', verifyToken, requireAdmin, upload.single('photo'), validate(candidateSchema),updateCandidate);

router.patch('/candidates/:candidateId/archive', verifyToken, requireAdmin, archiveCandidate);


router.get('/get-all-students-with-vote-status', verifyToken, requireAdmin, getAllStudentsWithVoteStatus);
router.get('/elections/:electionId/positions/:positionId/voters', verifyToken, requireAdmin, getVotersByElectionAndPosition);


module.exports = router;
