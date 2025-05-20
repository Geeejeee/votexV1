const mongoose = require('mongoose');

const electionPositionSchema = new mongoose.Schema({
  election: { type: mongoose.Schema.Types.ObjectId, ref: 'Election', required: true },
  position: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true },
});

module.exports = mongoose.model('ElectionPosition', electionPositionSchema);
