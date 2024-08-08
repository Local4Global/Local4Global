const Project = require('../models/Project');
const { validationResult } = require('express-validator');

// Crear un nuevo proyecto
exports.createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, startDate, endDate, location, status, progress, funds } = req.body;

  try {
    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
      location,
      status,
      progress,
      funds,
      agency: req.agencyId // Asigna la agencia al ID de la agencia autenticada
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Obtener todos los proyectos de una agencia específica
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ agency: req.agencyId }); // Filtrar por agencia
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Obtener un proyecto por ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Asegúrate de que el usuario que intenta obtener el proyecto es el mismo que lo creó
    if (project.agency.toString() !== req.agencyId) {
      return res.status(401).json({ msg: 'Not authorized' });
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

// Actualizar un proyecto por ID
exports.updateProject = async (req, res) => {
  const { name, description, startDate, endDate, location, status, progress, funds } = req.body;

  const projectFields = {};
  if (name) projectFields.name = name;
  if (description) projectFields.description = description;
  if (startDate) projectFields.startDate = startDate;
  if (endDate) projectFields.endDate = endDate;
  if (location) projectFields.location = location;
  if (status) projectFields.status = status;
  if (progress) projectFields.progress = progress;
  if (funds) projectFields.funds = funds;

  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Asegúrate de que el usuario que intenta actualizar el proyecto es el mismo que lo creó
    if (project.agency.toString() !== req.agencyId) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: projectFields },
      { new: true }
    );

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Eliminar un proyecto por ID
exports.deleteProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Asegúrate de que el usuario que intenta eliminar el proyecto es el mismo que lo creó
    if (project.agency.toString() !== req.agencyId) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Project.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
