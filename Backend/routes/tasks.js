// routes/tasks.js

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API to manage tasks.
 */

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - project
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in progress, completed]
 *                 default: pending
 *               project:
 *                 type: string
 *                 format: ObjectId
 *               assignedTo:
 *                 type: string
 *                 format: ObjectId
 *     responses:
 *       200:
 *         description: The task was successfully created
 *       500:
 *         description: Some server error
 */

// Crear una nueva tarea
router.post('/', taskController.createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of all tasks
 *       500:
 *         description: Some server error
 */

// Obtener todas las tareas
router.get('/', taskController.getTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: ID of the task to get
 *     responses:
 *       200:
 *         description: The task details
 *       404:
 *         description: Task not found
 *       500:
 *         description: Some server error
 */

// Obtener una tarea por ID
router.get('/:id', taskController.getTaskById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in progress, completed]
 *               assignedTo:
 *                 type: string
 *                 format: ObjectId
 *     responses:
 *       200:
 *         description: The task was successfully updated
 *       404:
 *         description: Task not found
 *       500:
 *         description: Some server error
 */

// Actualizar una tarea
router.put('/:id', taskController.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: ID of the task to delete
 *     responses:
 *       200:
 *         description: The task was successfully deleted
 *       404:
 *         description: Task not found
 *       500:
 *         description: Some server error
 */

// Eliminar una tarea
router.delete('/:id', taskController.deleteTask);

module.exports = router;
