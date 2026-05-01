const express = require('express');
const router = express.Router();
const {
  createLeave,
  getLeaves,
  getLeaveById,
  updateLeave,
  deleteLeave
} = require('../controllers/leaveRequestController');

// Middleware to extract JWT token
const jwt = require('jsonwebtoken');
const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'workzen-secret-key-change-in-production');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

/**
 * @route   POST /api/leaves
 * @desc    Create a new leave request
 * @access  Protected
 */
router.post('/', protect, createLeave);

/**
 * @route   GET /api/leaves
 * @desc    Get all leave requests (with optional filters)
 * @access  Protected
 */
router.get('/', protect, getLeaves);

/**
 * @route   GET /api/leaves/:id
 * @desc    Get leave request by ID
 * @access  Protected
 */
router.get('/:id', protect, getLeaveById);

/**
 * @route   PUT /api/leaves/:id
 * @desc    Update leave request (approve/reject)
 * @access  Protected
 */
router.put('/:id', protect, updateLeave);

/**
 * @route   DELETE /api/leaves/:id
 * @desc    Delete leave request
 * @access  Protected
 */
router.delete('/:id', protect, deleteLeave);

module.exports = router;
