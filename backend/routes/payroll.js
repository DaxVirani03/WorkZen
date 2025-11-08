const express = require('express');
const { body, validationResult } = require('express-validator');
const Payroll = require('../models/Payroll');
const Employee = require('../models/Employee');

const router = express.Router();

// @route   POST /api/payroll/generate
// @desc    Generate payroll for all employees
// @access  Private (Admin/HR)
router.post('/generate', [
  body('payPeriod.startDate', 'Pay period start date is required').isISO8601(),
  body('payPeriod.endDate', 'Pay period end date is required').isISO8601(),
  body('payDate', 'Pay date is required').isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { payPeriod, payDate } = req.body;

    // Generate payroll for all active employees
    const payrollRecords = await Payroll.generateMonthlyPayroll(payPeriod, new Date(payDate));

    // Save all payroll records
    const savedRecords = await Payroll.insertMany(payrollRecords);

    res.status(201).json({
      success: true,
      message: `Payroll generated successfully for ${savedRecords.length} employees`,
      data: { payrollRecords: savedRecords }
    });

  } catch (error) {
    console.error('Generate payroll error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error generating payroll'
    });
  }
});

// @route   GET /api/payroll
// @desc    Get payroll records with filters
// @access  Private
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};

    if (req.query.employeeId) {
      filter.employee = req.query.employeeId;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.payPeriodStart && req.query.payPeriodEnd) {
      filter['payPeriod.startDate'] = { $gte: new Date(req.query.payPeriodStart) };
      filter['payPeriod.endDate'] = { $lte: new Date(req.query.payPeriodEnd) };
    }

    const payroll = await Payroll.find(filter)
      .populate('employee', 'firstName lastName employeeId department position')
      .populate('approvedBy', 'firstName lastName')
      .populate('processedBy', 'firstName lastName')
      .sort({ payDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Payroll.countDocuments(filter);

    res.json({
      success: true,
      data: {
        payroll,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get payroll error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving payroll records'
    });
  }
});

// @route   GET /api/payroll/:id
// @desc    Get payroll record by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id)
      .populate('employee', 'firstName lastName employeeId department position salary')
      .populate('approvedBy', 'firstName lastName')
      .populate('processedBy', 'firstName lastName');

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: 'Payroll record not found'
      });
    }

    res.json({
      success: true,
      data: { payroll }
    });

  } catch (error) {
    console.error('Get payroll record error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving payroll record'
    });
  }
});

// @route   PUT /api/payroll/:id/approve
// @desc    Approve payroll
// @access  Private (Admin/HR)
router.put('/:id/approve', async (req, res) => {
  try {
    const { approvedBy } = req.body;

    const payroll = await Payroll.findByIdAndUpdate(
      req.params.id,
      {
        status: 'approved',
        approvedBy,
        approvedAt: new Date()
      },
      { new: true }
    ).populate('employee', 'firstName lastName employeeId department');

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: 'Payroll record not found'
      });
    }

    res.json({
      success: true,
      message: 'Payroll approved successfully',
      data: { payroll }
    });

  } catch (error) {
    console.error('Approve payroll error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error approving payroll'
    });
  }
});

// @route   PUT /api/payroll/:id/process
// @desc    Process payroll for payment
// @access  Private (Admin/HR)
router.put('/:id/process', async (req, res) => {
  try {
    const { processedBy, paymentMethod = 'bank-transfer' } = req.body;

    const payroll = await Payroll.findByIdAndUpdate(
      req.params.id,
      {
        status: 'processed',
        paymentMethod,
        paymentStatus: 'pending',
        processedBy,
        processedAt: new Date()
      },
      { new: true }
    ).populate('employee', 'firstName lastName employeeId department');

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: 'Payroll record not found'
      });
    }

    res.json({
      success: true,
      message: 'Payroll processed successfully',
      data: { payroll }
    });

  } catch (error) {
    console.error('Process payroll error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error processing payroll'
    });
  }
});

// @route   PUT /api/payroll/:id/pay
// @desc    Mark payroll as paid
// @access  Private (Admin/HR)
router.put('/:id/pay', async (req, res) => {
  try {
    const { paymentReference } = req.body;

    const payroll = await Payroll.findByIdAndUpdate(
      req.params.id,
      {
        status: 'paid',
        paymentStatus: 'paid',
        paidAt: new Date(),
        paymentReference
      },
      { new: true }
    ).populate('employee', 'firstName lastName employeeId department');

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: 'Payroll record not found'
      });
    }

    res.json({
      success: true,
      message: 'Payroll marked as paid successfully',
      data: { payroll }
    });

  } catch (error) {
    console.error('Pay payroll error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error marking payroll as paid'
    });
  }
});

// @route   PUT /api/payroll/:id
// @desc    Update payroll record
// @access  Private (Admin/HR)
router.put('/:id', async (req, res) => {
  try {
    const updateFields = {};
    const allowedFields = [
      'basicSalary', 'earnings', 'deductions', 'notes',
      'bankDetails', 'taxDetails'
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });

    const payroll = await Payroll.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    ).populate('employee', 'firstName lastName employeeId department');

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: 'Payroll record not found'
      });
    }

    res.json({
      success: true,
      message: 'Payroll record updated successfully',
      data: { payroll }
    });

  } catch (error) {
    console.error('Update payroll error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating payroll record'
    });
  }
});

// @route   GET /api/payroll/employee/:employeeId
// @desc    Get payroll history for an employee
// @access  Private
router.get('/employee/:employeeId', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const payroll = await Payroll.find({ employee: req.params.employeeId })
      .populate('approvedBy', 'firstName lastName')
      .populate('processedBy', 'firstName lastName')
      .sort({ payDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Payroll.countDocuments({ employee: req.params.employeeId });

    res.json({
      success: true,
      data: {
        payroll,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get employee payroll error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving employee payroll'
    });
  }
});

// @route   GET /api/payroll/summary
// @desc    Get payroll summary
// @access  Private (Admin/HR)
router.get('/summary/overview', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Start date and end date are required'
      });
    }

    const summary = await Payroll.getPayrollSummary(
      new Date(startDate),
      new Date(endDate)
    );

    res.json({
      success: true,
      data: { summary: summary[0] || {} }
    });

  } catch (error) {
    console.error('Get payroll summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving payroll summary'
    });
  }
});

module.exports = router;
