const express = require('express');
const router = express.Router();
const { getUsers, getUserById } = require('../controllers/userController');

// @route   GET /api/users
// @desc    Get all users
router.get('/', getUsers);

// @route   GET /api/users/:id
// @desc    Get user by ID
router.get('/:id', getUserById);

module.exports = router;
