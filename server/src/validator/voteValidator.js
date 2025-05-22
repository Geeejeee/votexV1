const { z } = require('zod');

const voteValidator = z.object({
  candidate: z.string().min(1, "Candidate ID is required"),
  election: z.string().min(1, "Election ID is required"),
  position: z.string().min(1, "Position ID is required"),
  student: z.string().min(1, "Student ID is required"),
});

module.exports = { voteValidator };
