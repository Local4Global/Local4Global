const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { registerAgency, loginAgency, authenticateUser } = require('../controllers/agencyController');

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  authenticateUser
);

// @route   POST api/auth/register
// @desc    Register a new agency
// @access  Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  registerAgency
);

// @route   POST api/auth/login
// @desc    Login an agency
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  loginAgency
);

module.exports = router;

