const User = require("../schemas/userSchema");
const { hashPassword } = require("../utils/authUtils");

 const createUser = async (
    idNumber,
    firstname,
    lastname,
    email,
    password,
    college,
    department,
    yearLevel,
    section,
    role
  ) => {
    const hashed = await hashPassword(password);

    const payload = {
      idNumber,
      firstname,
      lastname,
      email,
      password: hashed,
      college,
      department,
      yearLevel,
      section,
      role
    };

    return await User.create(payload);
  };

  const findUserByEmail = async (email) => {
    return await User.findOne({ email });
  };

  const updateUserVote = async (userId) => {
    return await User.findByIdAndUpdate(userId, { hasVoted: true }, { new: true });
  };

  const findUserByIdNumber = async (idNumber) => {
    return await User.findOne({ idNumber });
  };

  const findAdminByUsername = async (username) => {
    return await User.findOne({ username });
  };

  // ✅ New method to get all students with vote status and full info
  const findAllStudentsWithVoteStatus = async () => {
    return await User.find({ role: "student" })
      .populate("college", "name")
      .populate("department", "name")
      .sort({ createdAt: -1 });
  };

  const getProfile = async (userId) => {
    return await User.findById(userId)
      .populate("college", "name")        
      .populate("department", "name")     
      .select("-password");               
  };


module.exports = {
  createUser,
  findUserByEmail,
  updateUserVote,
  findUserByIdNumber,
  findAdminByUsername,
  findAllStudentsWithVoteStatus,
  getProfile
};
