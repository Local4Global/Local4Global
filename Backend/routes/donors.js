// routes/donors.js

/**
 * @swagger
 * tags:
 *   name: Donors
 *   description: API to manage donors.
 */

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const donorController = require('../controllers/donorController');

/**
 * @swagger
 * /donors/register:
 *   post:
 *     summary: Register a new donor
 *     tags: [Donors]
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The donor was successfully registered
 *       500:
 *         description: Some server error
 */

// Registro de donante
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  donorController.registerDonor
);

/**
 * @swagger
 * /donors/login:
 *   post:
 *     summary: Login for a donor
 *     tags: [Donors]
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The donor was successfully logged in
 *       500:
 *         description: Some server error
 */

// Autenticación de donante y obtención de token
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  donorController.loginDonor
);

module.exports = router;

