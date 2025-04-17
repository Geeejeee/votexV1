const bcrypt = require('bcrypt'); //hash and compare passwords

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (input, hashed) => {
  return await bcrypt.compare(input, hashed);
};

module.exports = { hashPassword, comparePassword };
