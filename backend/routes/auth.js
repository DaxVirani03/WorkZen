/**
 * Authentication Routes
 * Handles user registration and login
 * Follows Excalidraw HRMS workflow for role-based authentication
 */

const express = require('express');
const router = express.Router();
const { register, login, getAllUsers } = require('../controllers/authController');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user (Employee, HR Officer, Payroll Officer only)
 * @access  Public
 * @body    { name, email, password, role }
 */
router.post('/register', register);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and return token + role
 * @access  Public
 * @body    { email, password }
 * @returns { token, user: { id, name, email, role } }
 */
router.post('/login', login);

/**
 * @route   GET /api/auth/users
 * @desc    Get all registered users (for debugging/testing)
 * @access  Public (should be protected in production)
 */
router.get('/users', getAllUsers);

module.exports = router;
