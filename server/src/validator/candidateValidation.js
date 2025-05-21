const { z } = require('zod');

const candidateSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  party: z.string().min(1, 'Party is required'),
  yearLevel: z.string().min(1, 'Year level is required'),
  motto: z.string().min(1, 'Motto is required'),
  affiliations: z.string().min(1, 'Affiliations are required'),
  advocacies: z.string().min(1, 'Advocacies are required'),
});

module.exports = { candidateSchema };