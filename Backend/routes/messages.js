const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Send a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sender
 *               - receiver
 *               - content
 *             properties:
 *               sender:
 *                 type: string
 *                 format: ObjectId
 *               receiver:
 *                 type: string
 *                 format: ObjectId
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: The message was successfully sent
 *       500:
 *         description: Some server error
 */
router.post('/', messageController.createMessage);

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Get all messages
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: List of all messages
 *       500:
 *         description: Some server error
 */
router.get('/', messageController.getMessages);

module.exports = router;

