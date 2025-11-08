const express = require('express');
const { body, validationResult } = require('express-validator');
const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

const router = express.Router();

// @route   POST /api/attendance/check-in
// @desc    Employee check-in
// @access  Private
router.post('/check-in', [
  body('employeeId', 'Employee ID is required').notEmpty(),
  body('location', 'Location is optional').optional()
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

    const { employeeId, location, method = 'web' } = req.body;

    // Find employee
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already checked in today
    const existingAttendance = await Attendance.findOne({
      employee: employeeId,
      date: today
    });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message: 'Already checked in today'
      });
    }

    // Create check-in record
    const attendance = new Attendance({
      employee: employeeId,
      date: today,
      checkIn: {
        time: new Date(),
        location,
        method,
        ipAddress: req.ip,
        deviceInfo: {
          userAgent: req.get('User-Agent'),
          platform: req.get('platform') || 'web'
        }
      },
      status: 'present'
    });

    await attendance.save();

    res.status(201).json({
      success: true,
      message: 'Check-in successful',
      data: { attendance }
    });

  } catch (error) {
    console.error('Check-in error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during check-in'
    });
  }
});

// @route   PUT /api/attendance/check-out
// @desc    Employee check-out
// @access  Private
router.put('/check-out', [
  body('employeeId', 'Employee ID is required').notEmpty(),
  body('location', 'Location is optional').optional()
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

    const { employeeId, location, method = 'web' } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find today's attendance record
    const attendance = await Attendance.findOne({
      employee: employeeId,
      date: today
    });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'No check-in record found for today'
      });
    }

    if (attendance.checkOut && attendance.checkOut.time) {
      return res.status(400).json({
        success: false,
        message: 'Already checked out today'
      });
    }

    // Update check-out
    attendance.checkOut = {
      time: new Date(),
      location,
      method,
      ipAddress: req.ip,
      deviceInfo: {
        userAgent: req.get('User-Agent'),
        platform: req.get('platform') || 'web'
      }
    };

    await attendance.save();

    res.json({
      success: true,
      message: 'Check-out successful',
      data: { attendance }
    });

  } catch (error) {
    console.error('Check-out error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during check-out'
    });
  }
});

// @route   GET /api/attendance
// @desc    Get attendance records with filters
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

    if (req.query.startDate && req.query.endDate) {
      filter.date = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const attendance = await Attendance.find(filter)
      .populate('employee', 'firstName lastName employeeId department')
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Attendance.countDocuments(filter);

    res.json({
      success: true,
      data: {
        attendance,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving attendance records'
    });
  }
});

// @route   GET /api/attendance/:id
// @desc    Get attendance record by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .populate('employee', 'firstName lastName employeeId department');

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    res.json({
      success: true,
      data: { attendance }
    });

  } catch (error) {
    console.error('Get attendance record error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving attendance record'
    });
  }
});

// @route   GET /api/attendance/employee/:employeeId/summary
// @desc    Get attendance summary for an employee
// @access  Private
router.get('/employee/:employeeId/summary', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Start date and end date are required'
      });
    }

    const summary = await Attendance.getEmployeeAttendanceSummary(
      req.params.employeeId,
      new Date(startDate),
      new Date(endDate)
    );

    res.json({
      success: true,
      data: { summary: summary[0] || {} }
    });

  } catch (error) {
    console.error('Get attendance summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving attendance summary'
    });
  }
});

// @route   GET /api/attendance/department/:department
// @desc    Get department attendance overview
// @access  Private
router.get('/department/:department', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Start date and end date are required'
      });
    }

    const overview = await Attendance.getDepartmentAttendance(
      req.params.department,
      new Date(startDate),
      new Date(endDate)
    );

    res.json({
      success: true,
      data: { overview }
    });

  } catch (error) {
    console.error('Get department attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving department attendance'
    });
  }
});

// @route   PUT /api/attendance/:id
// @desc    Update attendance record (Admin/HR)
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const updateFields = {};
    const allowedFields = [
      'status', 'notes', 'lateMinutes', 'earlyDepartureMinutes',
      'isRemote', 'locationVerified'
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });

    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    ).populate('employee', 'firstName lastName employeeId department');

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    res.json({
      success: true,
      message: 'Attendance record updated successfully',
      data: { attendance }
    });

  } catch (error) {
    console.error('Update attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating attendance record'
    });
  }
});

module.exports = router;
