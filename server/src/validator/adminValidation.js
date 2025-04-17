const { z } = require('zod'); //validates input data

const collegeSchema = z.object({
  name: z.string().min(1, 'College name is required'),
});

const departmentSchema = z.object({
  name: z.string().min(1, 'Department name is required'),
  collegeId: z.string().min(1, 'College ID is required'),
});

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string()
});
module.exports = {collegeSchema,departmentSchema,loginSchema};
