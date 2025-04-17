const User = require("../schemas/userSchema");
const { hashPassword } = require("../utils/authUtils");

module.exports = {
  createUser: async ({
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
  }) => {
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
  },

  findUserByEmail: async (email) => {
    return await User.findOne({ email });
  },

  updateUserVote: async (userId) => {
    return await User.findByIdAndUpdate(userId, { hasVoted: true }, { new: true });
  },

  findUserByIdNumber: async (idNumber) => {
    return await User.findOne({ idNumber });
  },

  findAdminByUsername: async (username) => {
    return await User.findOne({ username });
  },

  // ✅ New method to get all students with vote status and full info
  findAllStudentsWithVoteStatus: async () => {
    return await User.find({ role: "student" })
      .populate("college", "name")
      .populate("department", "name")
      .sort({ createdAt: -1 });
  }
};
