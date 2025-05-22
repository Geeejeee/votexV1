const {createColleges, deleteColleges, getAllColleges} = require('../models/collegeModel');
const {createDepartments, deleteDepartments, getAllDepartments} = require('../models/departmentModel');
const {createElections, deleteElections, findElectionById, findById,getAllElections, updateElections} = require('../models/electionModel');
const {createCandidate,getCandidatesByElectionAndPosition, findCandidateAndUpdate,findCandidatesByElectionAndPosition} = require('../models/candidateModel');
const {getPositionsByElectionId, findPositionInElection, getTopPresidents} = require('../models/positionModel');
const { getCandidateVotesByElection} = require('../models/voteModel');
const {findAllStudentsWithVoteStatus} = require('../models/userModel');
const {findUserByIdNumber, findUserByEmail, createUser} = require('../models/userModel');
const {getVoterByElectionAndPosition, getTopCandidatesForPosition, getTotalVotesForPosition} = require('../models/voteModel');
const cloudinary = require('../utils/cloudinary');


const addVoter = async (req, res) => {
  console.log('Add voter request body:', req.body);

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
      role:"student"
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


// Update Election


const createCollege = async (req, res) => {
  try {
    const { name } = req.body;
    const college = await createColleges(name);
    res.status(201).json({ message: 'College created', college });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCollege = async (req, res) => {
  try {
    const deleted = await deleteColleges(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'College not found' });
    res.status(200).json({ message: 'College deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getColleges = async (req, res) => {
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
const createDepartment = async (req, res) => {
  try {
    const { name, collegeId } = req.body;

    const department = await createDepartments(name, collegeId);

    res.status(201).json({ message: 'Department created', department });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//delete department
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteDepartments(id);
    if (!deleted) return res.status(404).json({ message: 'Department not found' });
    res.status(200).json({ message: 'Department deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// controllers/departmentController.js
const getDepartments = async (req, res) => {
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


const updateElection = async (req, res) => {
  try {
    const { electionId } = req.params;
    const { title, description, startDate, endDate, collegeId, departmentId } = req.body;

    const updatedElectionData = {
      title,
      description,
      startDate,
      endDate,
      collegeId,
      departmentId,
    };

    // Handle logo upload using multer
    if (req.file) {
      const uploadedLogo = await cloudinary.uploader.upload(req.file.path);
      updatedElectionData.logo = uploadedLogo.secure_url;
    }

    const updatedElection = await updateElections(electionId, updatedElectionData);

    if (!updatedElection) {
      return res.status(404).json({ message: 'Election not found' });
    }

    return res.status(200).json({
      message: 'Election updated successfully',
      election: updatedElection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Create Election
const createElection = async (req, res) => {
  try {
    const { title, description, collegeId, departmentId, startDate, endDate } = req.body;
    const logo = req.file;

    if (!logo) {
      console.error("❌ No logo found in request.");
      return res.status(400).json({ message: "Logo is required" });
    }

    // Upload the logo to Cloudinary
    const logoUploadResult = await cloudinary.uploader.upload(logo.path);

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    const newElection = await createElections(
      title,
      description,
      logoUploadResult.secure_url, // Cloudinary URL of the uploaded logo
      collegeId,
      departmentId,
      parsedStartDate,
      parsedEndDate
    );
    
    res.status(201).json({ message: "Election created successfully", election: newElection });
  } catch (error) {
    console.error('❌ Error creating election:', error.message);
    console.error(error.stack);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

const getElectionById = async (req, res) => {
  const { electionId } = req.params;

  try {
    const election = await findById(electionId)

    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    res.status(200).json({ election });
  } catch (error) {
    console.error('Error fetching election:', error);
    res.status(500).json({ message: 'Server error while fetching election' });
  }
};


  // Delete Election
  const deleteElection = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedElection = await deleteElections(id);
      if (!deletedElection) {
        return res.status(404).json({ message: 'Election not found' });
      }
  
      res.status(200).json({ message: 'Election deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getElections = async (req, res) => {
    try {
        const elections = await getAllElections();
        res.status(200).json({ elections });
    } catch (err) {
        console.error("Error fetching elections:", err);
        res.status(500).json({ message: 'Server error while fetching elections.' });
    }
};

  
// Add Candidate
const addCandidate = async (req, res) => {

  const { electionId, positionId } = req.params;

  try {
    // Assuming req.body is already validated by Zod in the route middleware
    const {
      firstName,
      lastName,
      party,
      yearLevel,
      motto,
      affiliations,
      advocacies,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Candidate photo is required.' });
    }

    // Get election for college and department
    const election = await findElectionById(electionId);
    if (!election) {
      return res.status(404).json({ message: 'Election not found.' });
    }

    // Validate position belongs to election
    const electionPosition = await findPositionInElection(electionId,positionId);
    if (!electionPosition) {
      return res.status(404).json({ message: 'Position not found in this election.' });
    }

    // Use file path or URL from multer / cloudinary setup
    const photoUrl = req.file?.path || req.file?.secure_url ||req.file?.location || '';

    // Create candidate
    const candidate = await createCandidate(
      firstName,
      lastName,
      party,
      yearLevel,
      motto,
      affiliations,
      advocacies,
      photoUrl,
      positionId,
      electionId,
      election.college,
      election.department
    );

    res.status(201).json({
      message: 'Candidate added successfully.',
      candidate,
    });
  } catch (error) {
    console.error('Error adding candidate:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};




const updateCandidate = async (req, res) => {
  const { candidateId } = req.params;

  try {
    const updates = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      party: req.body.party,
      course: req.body.course,
      yearLevel: req.body.yearLevel,
      motto: req.body.motto,
      affiliations: req.body.affiliations,
      advocacies: req.body.advocacies,
    };

    if (req.file) {
      updates.photo = req.file.path || req.file.location;
    }

    const updatedCandidate = await findCandidateAndUpdate(candidateId, updates);

    if (!updatedCandidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.json({ candidate: updatedCandidate });
  } catch (error) {
    console.error("Update candidate error:", error);
    res.status(500).json({ message: 'Failed to update candidate' });
  }
};


const getCandidatesByElectionId = async (req, res) => {
  try {
    const { electionId } = req.params;

    // 1. Fetch all positions assigned to this election
    const assignedPositions = await getPositionsByElectionId(electionId);

    // 2. Fetch all candidates for this election (with position populated)
    const candidates = await findCandidatesByElectionAndPosition({ election: electionId, isArchived: false });

    // 3. Group candidates by position ID
    const positionsMap = {};

    candidates.forEach(candidate => {
      const positionId = candidate.position?._id?.toString();
      if (!positionId) {
        console.warn(`Candidate ${candidate._id} is missing position data`);
        return;
      }

      if (!positionsMap[positionId]) {
        positionsMap[positionId] = {
          id: positionId,
          name: candidate.position.name,
          candidates: [],
        };
      }

      positionsMap[positionId].candidates.push({
        id: candidate._id,
        name: `${candidate.firstName} ${candidate.lastName}`,
        party: candidate.party || '',
        department: candidate.department?.name || '',
        yearLevel: candidate.yearLevel || '',
        motto: candidate.motto || '',
        affiliations: candidate.affiliations || '',
        advocacies: candidate.advocacies || '',
        photo: candidate.photo || '',
        college: candidate.college?.name || '',
      });
    });

    // 4. Ensure all assigned positions are in the map (even if they have no candidates)
    assignedPositions.forEach(assignment => {
      const pos = assignment.position;
      const posId = pos._id.toString();
      if (!positionsMap[posId]) {
        positionsMap[posId] = {
          id: posId,
          name: pos.name,
          candidates: [],
        };
      }
    });

    const positionsList = Object.values(positionsMap);
    res.json({ positions: positionsList });
  } catch (error) {
    console.error('Failed to fetch candidates with positions:', error);
    res.status(500).json({ message: 'Failed to fetch candidates' });
  }
};


const archiveCandidate = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const { isArchived } = req.body;

    if (typeof isArchived !== 'boolean') {
      return res.status(400).json({ message: 'isArchived must be a boolean' });
    }

    const candidate = await findCandidateAndUpdate(candidateId, { isArchived });

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.json({ message: `Candidate ${isArchived ? 'archived' : 'unarchived'} successfully`, candidate });
  } catch (error) {
    console.error('Error archiving candidate:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getElectionResults = async (req, res) => {
  try {
    const { electionId } = req.params;

    const election = await findElectionById(electionId);
    if (!election) return res.status(404).json({ error: 'Election not found' });

    // get all candidates with votes and positions
    const candidatesWithVotes = await getCandidateVotesByElection(electionId);

    console.log('candidatesWithVotes:', candidatesWithVotes);
    // Group candidates by position
    const positionsMap = new Map();

    candidatesWithVotes.forEach(cand => {
      const posId = cand.positionId.toString();
      if (!positionsMap.has(posId)) {
        positionsMap.set(posId, {
          positionId: posId,
          positionName: cand.positionName,
          candidates: []
        });
      }

      positionsMap.get(posId).candidates.push({
        _id: cand._id.toString(),
        firstName: cand.firstName,
        lastName: cand.lastName,
        photo: cand.photo,
        votes: cand.votes || 0 // just in case
      });
    });

    // Convert to array
    const positions = Array.from(positionsMap.values());

    res.status(200).json({
      election: {
        title: election.title,
        logo: election.logo,
      },
      positions,
    });

  } catch (error) {
    console.error('Error fetching election results:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


  
  const getAllStudentsWithVoteStatus = async (req, res) => {
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

  const getVotersByElectionAndPosition = async (req, res) => {
  try {
    const { electionId, positionId } = req.params;
    if (!electionId || !positionId) {
    return res.status(400).json({ message: 'Election ID and Position ID are required.' });
}

    const voters = await getVoterByElectionAndPosition(electionId, positionId);

    res.status(200).json({ voters });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch voters.' });
  }
};

const getTopCandidatesByPosition = async (req, res) => {
  const { electionId, positionId } = req.params;

  try {
    // Fetch election details
    const election = await findById(electionId);
    if (!election) {
      return res.status(404).json({ message: "Election not found" });
    }

    // Fetch all candidates for this election + position
    const candidates = await getCandidatesByElectionAndPosition(electionId, positionId);
    if (!candidates.length) {
      return res.status(404).json({ message: "No candidates found for this position." });
    }

    // Get vote count per candidate
    const votes = await getTopCandidatesForPosition(electionId, positionId);

    // Build vote count map
    const voteCountMap = new Map(
      votes.map((v) => [v._id.toString(), v.voteCount])
    );

    // Build candidate result with vote counts
    const candidateResults = candidates.map((candidate) => {
      const idStr = candidate._id.toString();
      const votes = voteCountMap.get(idStr) || 0;
      return {
        id: candidate._id,
        name: `${candidate.firstName} ${candidate.lastName}`,
        votes,
        party: candidate.party,
        photo: candidate.photo,
      };
    });

    const totalVotes = candidateResults.reduce((sum, c) => sum + c.votes, 0);

    const withPercentage = candidateResults.map((c) => ({
      ...c,
      percent: totalVotes > 0 ? c.votes / totalVotes : 0,
    }));

    res.status(200).json({
      electionTitle: election.title,
      electionDate: election.startDate,
      collegeName: election.college.name,
      departmentName: election.department.name,
      positionId,
      topCandidates: withPercentage,
    });
  } catch (error) {
    console.error("Error in getTopCandidatesByPosition:", error);
    res.status(500).json({ message: "Server error while getting top candidates" });
  }
};



const getPositionsByElection = async (req, res) => {
  const { electionId } = req.params;
  try {
    const positions = await getPositionsByElectionId(electionId);
    res.status(200).json({ positions });
  } catch (err) {
    console.error("Error fetching positions for election:", err);
    res.status(500).json({ message: 'Server error while fetching election positions.' });
  }
};

  module.exports = {
    addVoter, createCollege, deleteCollege, getColleges,
    createDepartment, deleteDepartment, getDepartments, updateElection, deleteElection, getElections,
    getElectionById, createElection, addCandidate,getCandidatesByElectionId, archiveCandidate, getElectionResults, 
    getAllStudentsWithVoteStatus, updateCandidate, getVotersByElectionAndPosition, getTopCandidatesByPosition,
    getPositionsByElection
  };