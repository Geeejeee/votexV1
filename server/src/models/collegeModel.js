const College = require("../schemas/collegeSchema");

exports.createCollege = async (name) => {
  return await College.create({ name });
};

exports.deleteCollege = async (id) => {
  return await College.findByIdAndDelete(id);
};

exports.findCollegeById = async (id) => {
  return await College.findById(id);
};

exports.getAllColleges = async () => {
  return await College.find();
};