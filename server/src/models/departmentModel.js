const Department = require("../schemas/departmentSchema");

const createDepartments = async (name, collegeId) => {
  return await Department.create({ name, college: collegeId });
};

const deleteDepartments = async (id) => {
  return await Department.findByIdAndDelete(id);
};

const findDepartmentById = async (id) => {
  return await Department.findById(id);
};


const getAllDepartments = async (collegeId) => {
  const filter = collegeId ? { college: collegeId } : {};
  return await Department.find(filter).populate('college', 'name'); 

};

module.exports = {createDepartments, deleteDepartments, findDepartmentById, getAllDepartments}