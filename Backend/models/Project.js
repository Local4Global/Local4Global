// models/Project.js

const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'pending'],
    default: 'pending'
  },
  progress: {
    type: Number,
    default: 0
  },
  funds: {
    type: Number,
    default: 0
  },
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agency',
    required: true
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
