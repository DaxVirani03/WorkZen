const express = require('express');
const router = express.Router();
const { getPayroll, processPayroll } = require('../controllers/payrollController');

// @route   GET /api/payroll
// @desc    Get payroll records
router.get('/', getPayroll);

// @route   POST /api/payroll/process
// @desc    Process payroll
router.post('/process', processPayroll);

module.exports = router;
