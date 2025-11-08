/**
 * Authentication Routes
 * Routes for user registration and login
 */

const express = require('express');
const router = express.Router();
const { register, login, getAllUsers } = require('../controllers/authController');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user and get token
 * @access  Public
 */
router.post('/login', login);

/**
 * @route   GET /api/auth/users
 * @desc    Get all registered users (for debugging)
 * @access  Public (should be protected in production)
 */
router.get('/users', getAllUsers);

module.exports = router;
