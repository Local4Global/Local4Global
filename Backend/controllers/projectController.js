// controllers/projectController.js

const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  const { name, description, location, status, progress, funds, agency } = req.body;
  
  try {
    const newProject = new Project({
      name,
      description,
      location,
      status,
      progress,
      funds,
      agency
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }

    res.status(500).send('Server error');
  }
};

