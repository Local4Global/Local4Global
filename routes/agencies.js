const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const agencyController = require('../controllers/agencyController');

/**
 * @swagger
 * /api/agencies/register:
 *   post:
 *     summary: Register a new agency
 *     tags: [Agencies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Agency registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  agencyController.registerAgency
);

/**
 * @swagger
 * /api/agencies/login:
 *   post:
 *     summary: Login an agency
 *     tags: [Agencies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Agency logged in successfully
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  agencyController.loginAgency
);

module.exports = router;


