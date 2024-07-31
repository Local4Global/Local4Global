const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  assignedTo: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['not started', 'in progress', 'completed'],
    default: 'not started',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
