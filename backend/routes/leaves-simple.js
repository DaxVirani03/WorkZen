const express = require('express');
const router = express.Router();
const { getLeaves, applyLeave, approveLeave } = require('../controllers/leaveController');

// @route   GET /api/leaves
// @desc    Get leave requests
router.get('/', getLeaves);

// @route   POST /api/leaves
// @desc    Apply for leave
router.post('/', applyLeave);

// @route   PUT /api/leaves/:id/approve
// @desc    Approve leave
router.put('/:id/approve', approveLeave);

module.exports = router;
