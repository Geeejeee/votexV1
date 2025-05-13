const { z } = require('zod');

const voteValidator = z.object({
  candidateId: z.string().min(1, "Candidate ID is required"),
});

module.exports = {voteValidator};