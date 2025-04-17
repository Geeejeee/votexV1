const { z } = require('zod');

const registerSchema = z.object({
  idNumber: z.string().min(1, 'ID Number is required'),
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format').refine((val) => val.endsWith('@gmail.com'), {
    message: 'Email must end with @gmail.com',
  }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  college: z.string().min(1, 'College is required'),
  department: z.string().min(1, 'Department is required'),
  yearLevel: z.enum(['1st Year', '2nd Year', '3rd Year', '4th Year'], {
    required_error: 'Year level is required'
  }),
  section: z.string().min(1, 'Section is required')
});

const mobileLoginSchema = z.object({
  idNumber: z.string().min(1, 'ID Number is required'),
  password: z.string()
});

const webLoginSchema = z.object({
  username: z.string().min(1, 'username is required'),
  password: z.string()
});

module.exports = { registerSchema, webLoginSchema, mobileLoginSchema };
