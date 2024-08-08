// models/ProgressReport.js

const mongoose = require('mongoose');

const ProgressReportSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  progress: { type: Number, required: true },
  description: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProgressReport', ProgressReportSchema);
