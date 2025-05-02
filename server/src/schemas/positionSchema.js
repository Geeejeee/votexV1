const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Position name is required'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0, // for sorting dropdown positions if needed
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Position', positionSchema);
