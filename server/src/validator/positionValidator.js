const { z } = require("zod");

const positionSchema = z.object({
  name: z.string().min(1, "Position name is required"),
  description: z.string().min(1, "Position description is required"),
});

module.exports = {
  positionSchema,
};
