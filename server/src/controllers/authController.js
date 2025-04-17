const { comparePassword } = require('../utils/authUtils');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail, findUserByIdNumber } = require('../models/userModel');
const {signToken} = require('../utils/jwt');

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



const login = async (req, res) => {
  try {
    const { idNumber, password } = req.body; // Get idNumber and password from request

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


module.exports = {
  register, login
}