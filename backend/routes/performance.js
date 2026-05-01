const express = require('express');
const { body, validationResult } = require('express-validator');
const {
  createPerformance,
  getAllPerformance,
  getEmployeePerformance,
  getPerformanceById,
  updatePerformance,
  deletePerformance,
  getPerformanceAnalytics,
  getPerformanceStats
} = require('../controllers/performanceController');

const router = express.Router();

/**
 * @route   POST /api/performance
 * @desc    Create a new performance review
 * @access  Private (HR Officer, Admin)
 */
router.post(
  '/',
  [
    body('employee', 'Employee ID is required').notEmpty(),
    body('reviewer', 'Reviewer ID is required').notEmpty(),
    body('rating', 'Rating is required and must be between 1 and 5').isInt({ min: 1, max: 5 }),
    body('reviewPeriod', 'Review period is required').notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }
    await createPerformance(req, res);
  }
);

/**
 * @route   GET /api/performance/stats
 * @desc    Get performance overview statistics
 * @access  Private (HR Officer, Admin)
 */
router.get('/stats', getPerformanceStats);

/**
 * @route   GET /api/performance/analytics/department
 * @desc    Get performance analytics by department
 * @access  Private (HR Officer, Admin)
 */
router.get('/analytics/department', getPerformanceAnalytics);

/**
 * @route   GET /api/performance/employee/:employeeId
 * @desc    Get performance records for a specific employee
 * @access  Private
 */
router.get('/employee/:employeeId', getEmployeePerformance);

/**
 * @route   GET /api/performance
 * @desc    Get all performance reviews with filters
 * @access  Private (HR Officer, Admin)
 */
router.get('/', getAllPerformance);

/**
 * @route   GET /api/performance/:id
 * @desc    Get a specific performance review
 * @access  Private
 */
router.get('/:id', getPerformanceById);

/**
 * @route   PUT /api/performance/:id
 * @desc    Update a performance review
 * @access  Private (HR Officer, Admin)
 */
router.put(
  '/:id',
  [
    body('rating', 'Rating must be between 1 and 5').optional().isInt({ min: 1, max: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }
    await updatePerformance(req, res);
  }
);

/**
 * @route   DELETE /api/performance/:id
 * @desc    Delete a performance review
 * @access  Private (HR Officer, Admin)
 */
router.delete('/:id', deletePerformance);

module.exports = router;
