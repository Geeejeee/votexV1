const Department = require("../schemas/departmentSchema");

exports.createDepartment = async (name, collegeId) => {
  return await Department.create({ name, college: collegeId });
};

exports.deleteDepartment = async (id) => {
  return await Department.findByIdAndDelete(id);
};

exports.findDepartmentById = async (id) => {
  return await Department.findById(id);
};

// ✅ Fetch departments and get college name from the College collection
exports.getAllDepartments = async (collegeId) => {
  const filter = collegeId ? { college: collegeId } : {};
  return await Department.find(filter).populate('college', 'name'); 
    // 🔥 This gets only the 'name' field from the College document
};
