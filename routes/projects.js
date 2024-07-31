// routes/projects.js

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API to manage projects.
 */

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth'); // Asegúrate de requerir el middleware de autenticación

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - location
 *               - agency
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, completed, pending]
 *                 default: pending
 *               progress:
 *                 type: number
 *                 default: 0
 *               funds:
 *                 type: number
 *                 default: 0
 *               agency:
 *                 type: string
 *                 format: ObjectId
 *     responses:
 *       200:
 *         description: The project was successfully created
 *       500:
 *         description: Some server error
 */

// Crear un nuevo proyecto
router.post('/', auth, projectController.createProject);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of all projects
 *       500:
 *         description: Some server error
 */

// Obtener todos los proyectos
router.get('/', auth, projectController.getProjects);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: ID of the project to get
 *     responses:
 *       200:
 *         description: The project details
 *       404:
 *         description: Project not found
 *       500:
 *         description: Some server error
 */

// Obtener un proyecto por ID
router.get('/:id', auth, projectController.getProjectById);

module.exports = router;
