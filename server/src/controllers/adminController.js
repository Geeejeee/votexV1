const {createCollege, deleteCollege, findCollegeById, getAllColleges} = require('../models/collegeModel');
const {createDepartment, deleteDepartment, findDepartmentById, getAllDepartments} = require('../models/departmentModel');
const {createElection, deleteElection, findElectionById} = require('../models/electionModel');
const {createCandidate, deleteCandidate, findCandidatesByElection} = require('../models/candidateModel');
const { getVotesByCandidate} = require('../models/voteModel');
const {findAllStudentsWithVoteStatus} = require('../models/userModel');
const {findUserByIdNumber, findUserByEmail, createUser} = require('../models/userModel');

exports.addVoter = async (req, res) => {
  try {
    const {
      idNumber,
      firstname,
      lastname,
      email,
      password,
      college,
      department,
      yearLevel,
      section
    } = req.body;

    // Ensure all fields are provided
    if (!idNumber || !firstname || !lastname || !email || !password || !college || !department || !yearLevel || !section) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email or ID number already exists
    const existingUserByEmail = await findUserByEmail(email);
    if (existingUserByEmail) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const existingUserById = await findUserByIdNumber(idNumber);
    if (existingUserById) {
      return res.status(409).json({ message: 'ID Number already exists' });
    }

   

    // Create the voter
    const newVoter = await createUser({
      idNumber,
      firstname,
      lastname,
      email,
      password,
      college,
      department,
      yearLevel,
      section,
      role: 'student'
    });

    res.status(201).json({
      message: 'Voter added successfully',
      voter: {
        firstname: newVoter.firstname,
        lastname: newVoter.lastname,
        email: newVoter.email,
        idNumber: newVoter.idNumber
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.createCollege = async (req, res) => {
  try {
    const { name } = req.body;
    const college = await createCollege(name);
    res.status(201).json({ message: 'College created', college });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCollege = async (req, res) => {
  try {
    const deleted = await deleteCollege(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'College not found' });
    res.status(200).json({ message: 'College deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getColleges = async (req, res) => {
  try {
    const colleges = await getAllColleges();

    // 🔥 Clean the response
    const cleanedColleges = colleges.map(college => ({
      id: college._id,
      name: college.name
    }));

    res.status(200).json({ colleges: cleanedColleges});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//create department
exports.createDepartment = async (req, res) => {
  try {
    const { name, collegeId } = req.body;

    const department = await createDepartment(name, collegeId);

    res.status(201).json({ message: 'Department created', department });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//delete department
exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteDepartment(id);
    if (!deleted) return res.status(404).json({ message: 'Department not found' });
    res.status(200).json({ message: 'Department deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// controllers/departmentController.js
exports.getDepartments = async (req, res) => {
  try {
    const { collegeId } = req.params;

    const departments = await getAllDepartments(collegeId);

    const cleanedDepartments = departments.map(dept => ({
      id: dept._id,
      name: dept.name,
      collegeName: dept.college?.name || 'Unknown College',
    }));

    res.status(200).json({ departments: cleanedDepartments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Create Election
exports.createElection = async (req, res) => {
    try {
      const { name, position, collegeId, departmentId, startDate, endDate } = req.body;
  
      const election = await createElection(name, position, collegeId, departmentId, startDate, endDate);
      res.status(201).json({ message: 'Election created successfully', election });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Delete Election
  exports.deleteElection = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedElection = await deleteElection(id);
      if (!deletedElection) {
        return res.status(404).json({ message: 'Election not found' });
      }
  
      res.status(200).json({ message: 'Election deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
// Add Candidate
exports.addCandidate = async (req, res) => {
  try {
    const { firstName, lastName, position, electionId } = req.body;

    const election = await findElectionById(electionId);
    if (!election) return res.status(404).json({ message: 'Election not found' });

    const collegeId = election.college;
    const departmentId = election.department;

    // Optionally, validate if college and department exist (if needed)
    const college = await findCollegeById(collegeId);
    if (!college) return res.status(404).json({ message: 'College not found (from election)' });

    const department = await findDepartmentById(departmentId);
    if (!department) return res.status(404).json({ message: 'Department not found (from election)' });

    const candidate = await createCandidate(firstName, lastName, position, electionId, collegeId, departmentId);
    res.status(201).json({ message: 'Candidate added', candidate });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete Candidate
exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await deleteCandidate(req.params.id);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    res.status(200).json({ message: 'Candidate deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


  exports.getElectionResults = async (req, res) => {
    try {
      const electionId = req.params.electionId;
  
      const candidates = await findCandidatesByElection(electionId);
  
      const votes = await getVotesByCandidate();
  
      const resultMap = {};
  
      // Count votes per candidate
      for (const candidate of candidates) {
        resultMap[candidate._id] = {
          candidate,
          votes: 0,
        };
      }
  
      for (const vote of votes) {
        if (vote.candidate && vote.candidate.election.toString() === electionId) {
          resultMap[vote.candidate._id].votes++;
        }
      }
  
      const results = Object.values(resultMap);
      res.status(200).json({ results });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.getAllStudentsWithVoteStatus = async (req, res) => {
    try {
      const students = await findAllStudentsWithVoteStatus();
  
      const formatted = students.map(student => ({
        idNumber: student.idNumber,
        firstname: student.firstname,
        lastname: student.lastname,
        email: student.email,
        college: student.college?.name || "Unknown",
        department: student.department?.name || "Unknown",
        registeredAt: student.createdAt
      }));
  
      res.status(200).json({ students: formatted });
    } catch (err) {
      console.error("Error fetching student vote status:", err);
      res.status(500).json({ message: err.message });
    }
  };