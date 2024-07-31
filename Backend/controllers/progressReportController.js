const ProgressReport = require('../models/ProgressReport');

// Crear un nuevo reporte de progreso
exports.createProgressReport = async (req, res) => {
  const { project, progress, description } = req.body;
  try {
    const progressReport = new ProgressReport({ project, progress, description });
    await progressReport.save();
    res.status(201).json({ msg: 'Reporte de progreso creado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el reporte de progreso' });
  }
};

// Obtener todos los reportes de progreso
exports.getProgressReports = async (req, res) => {
  try {
    const progressReports = await ProgressReport.find().populate('project');
    res.status(200).json(progressReports);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los reportes de progreso' });
  }
};

// Obtener un reporte de progreso por ID
exports.getProgressReportById = async (req, res) => {
  try {
    const progressReport = await ProgressReport.findById(req.params.id).populate('project');
    if (!progressReport) return res.status(404).json({ msg: 'Reporte de progreso no encontrado' });
    res.status(200).json(progressReport);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el reporte de progreso' });
  }
};

// Actualizar un reporte de progreso
exports.updateProgressReport = async (req, res) => {
  const { progress, description } = req.body;
  try {
    const progressReport = await ProgressReport.findById(req.params.id);
    if (!progressReport) return res.status(404).json({ msg: 'Reporte de progreso no encontrado' });

    progressReport.progress = progress;
    progressReport.description = description;

    await progressReport.save();
    res.status(200).json({ msg: 'Reporte de progreso actualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el reporte de progreso' });
  }
};

// Eliminar un reporte de progreso
exports.deleteProgressReport = async (req, res) => {
  try {
    const progressReport = await ProgressReport.findById(req.params.id);
    if (!progressReport) return res.status(404).json({ msg: 'Reporte de progreso no encontrado' });

    await progressReport.remove();
    res.status(200).json({ msg: 'Reporte de progreso eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el reporte de progreso' });
  }
};



