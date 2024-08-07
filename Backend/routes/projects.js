const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth'); // Middleware de autenticación

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
 *               - startDate
 *               - endDate
 *               - location
 *               - agency
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
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
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('startDate', 'Start date is required').isISO8601(),
      check('endDate', 'End date is required').isISO8601(),
    ],
  ],
  projectController.createProject
);

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

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: ID of the project to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               location:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Not Started, In Progress, Completed]
 *               progress:
 *                 type: number
 *               funds:
 *                 type: number
 *     responses:
 *       200:
 *         description: The project was successfully updated
 *       404:
 *         description: Project not found
 *       500:
 *         description: Some server error
 */

// Actualizar un proyecto por ID
router.put(
  '/:id',
  [
    auth,
    [
      check('name', 'Name is required').optional().not().isEmpty(),
      check('description', 'Description is required').optional().not().isEmpty(),
      check('startDate', 'Start date is required').optional().isISO8601(),
      check('endDate', 'End date is required').optional().isISO8601(),
      check('status', 'Status is invalid').optional().isIn(['Not Started', 'In Progress', 'Completed']),
    ],
  ],
  projectController.updateProject
);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: ID of the project to delete
 *     responses:
 *       200:
 *         description: The project was successfully deleted
 *       404:
 *         description: Project not found
 *       500:
 *         description: Some server error
 */

// Eliminar un proyecto por ID
router.delete('/:id', auth, projectController.deleteProject);

module.exports = router;
