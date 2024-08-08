const express = require('express');
const router = express.Router();
const progressReportController = require('../controllers/progressReportController'); // Asegúrate de que esta ruta es correcta

/**
 * @swagger
 * /progress-reports:
 *   post:
 *     summary: Create a new progress report
 *     tags: [Progress]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - project
 *               - progress
 *               - description
 *             properties:
 *               project:
 *                 type: string
 *                 format: ObjectId
 *               progress:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: The progress report was successfully created
 *       500:
 *         description: Some server error
 */
router.post('/', progressReportController.createProgressReport);

/**
 * @swagger
 * /progress-reports:
 *   get:
 *     summary: Get all progress reports
 *     tags: [Progress]
 *     responses:
 *       200:
 *         description: List of all progress reports
 *       500:
 *         description: Some server error
 */
router.get('/', progressReportController.getProgressReports);

/**
 * @swagger
 * /progress-reports/{id}:
 *   get:
 *     summary: Get a progress report by ID
 *     tags: [Progress]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: ID of the progress report to get
 *     responses:
 *       200:
 *         description: The progress report details
 *       404:
 *         description: Progress report not found
 *       500:
 *         description: Some server error
 */
router.get('/:id', progressReportController.getProgressReportById);

/**
 * @swagger
 * /progress-reports/{id}:
 *   put:
 *     summary: Update a progress report by ID
 *     tags: [Progress]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: ID of the progress report to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               progress:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: The progress report was successfully updated
 *       404:
 *         description: Progress report not found
 *       500:
 *         description: Some server error
 */
router.put('/:id', progressReportController.updateProgressReport);

/**
 * @swagger
 * /progress-reports/{id}:
 *   delete:
 *     summary: Delete a progress report by ID
 *     tags: [Progress]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: ID of the progress report to delete
 *     responses:
 *       200:
 *         description: The progress report was successfully deleted
 *       404:
 *         description: Progress report not found
 *       500:
 *         description: Some server error
 */
router.delete('/:id', progressReportController.deleteProgressReport);

module.exports = router;



