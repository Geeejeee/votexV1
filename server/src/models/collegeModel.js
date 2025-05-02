const College = require("../schemas/collegeSchema");

const createColleges = async (name) => {
  return await College.create({ name });
};

const deleteColleges = async (id) => {
  return await College.findByIdAndDelete(id);
};

const findCollegeById = async (id) => {
  return await College.findById(id);
};

const getAllColleges = async () => {
  return await College.find();
};

module.exports = {createColleges, deleteColleges, findCollegeById, getAllColleges}