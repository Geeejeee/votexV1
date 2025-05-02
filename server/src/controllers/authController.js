const { comparePassword } = require('../utils/authUtils');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail, findUserByIdNumber, findAdminByUsername } = require('../models/userModel');
const {signToken} = require('../utils/jwt');
const {getAllColleges} = require('../models/collegeModel');
const {getAllDepartments} = require('../models/departmentModel');

const register = async (req, res) => {
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

    if (!idNumber || !firstname || !lastname || !email || !password || !college || !department || !yearLevel || !section) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(409).json({ message: 'Email already exists' });

    const existingUserById = await findUserByIdNumber(idNumber);
        if (existingUserById) {
          return res.status(409).json({ message: 'ID Number already exists' });
        }

    const newUser = await createUser({
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
      message: 'User registered successfully',
      user: {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        idNumber: newUser.idNumber
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const mobileLogin = async (req, res) => {
  try {
    const { idNumber, password } = req.body; // Get idNumber and password from request
    console.log(idNumber, password);
    const user = await findUserByIdNumber(idNumber); // Find user by idNumber
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken({ 
      userId: user._id, 
      idNumber: user.idNumber, 
      role: user.role 
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        idNumber: user.idNumber
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const webLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the admin by username
    const admin = await findAdminByUsername(username);

    if (!admin) {
      return res.status(401).json({ message: 'Invalid username' });
    }

    // Compare passwords
    const isMatch = await comparePassword(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = signToken({
      userId: admin._id,
      username: admin.username,
      role: admin.role
    });

    // Send success response with token and user details
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        firstname: admin.firstname,
        lastname: admin.lastname,
        username: admin.username,
        role: admin.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
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

module.exports = {
  register, mobileLogin, webLogin, getColleges, getDepartments
}