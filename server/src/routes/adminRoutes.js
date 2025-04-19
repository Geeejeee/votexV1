const express = require('express');
const router = express.Router();
const {addVoter, createCollege, deleteCollege,getColleges,createDepartment, deleteDepartment,getDepartments,createElection, deleteElection,getElectionResults,getElections,addCandidate, deleteCandidate, getVotedStudents, getNonVotedStudents, getAllStudentsWithVoteStatus} = require('../controllers/adminController');
const { verifyToken, requireAdmin } = require('../utils/authMiddleware');
const { validate } = require('../utils/validate');
const { collegeSchema, departmentSchema } = require('../validator/adminValidation');
const { registerSchema } = require('../validator/authValidator');
const upload = require("../utils/upload")



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
router.post('/elections', verifyToken, requireAdmin, upload.single('logo'), (err, req, res, next) => {
    if (err) {
      console.error("Multer upload error:", err);
      return res.status(500).json({ message: "File upload failed", error: err });
    }
    next();
  }, createElection);
  
router.delete('/elections/:id', verifyToken, requireAdmin, deleteElection);
router.get('/elections/:electionId/results', verifyToken, requireAdmin, getElectionResults);
router.get('/get-elections', verifyToken, requireAdmin, getElections);

// Candidate routes
router.post('/candidates', verifyToken, requireAdmin, addCandidate);
router.delete('/candidates/:id', verifyToken, requireAdmin, deleteCandidate);


router.get('/get-all-students-with-vote-status', verifyToken, requireAdmin, getAllStudentsWithVoteStatus);
module.exports = router;
