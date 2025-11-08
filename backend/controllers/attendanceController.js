const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

/**
 * Get all attendance records with filters
 * @route GET /api/attendance
 * @access Protected (Admin, HR Officer)
 */
exports.getAttendance = async (req, res) => {
  try {
    const {
      employeeId,
      startDate,
      endDate,
      status,
      department,
      page = 1,
      limit = 50,
      sortBy = 'date',
      sortOrder = 'desc'
    } = req.query;

    // Build filter
    const filter = {};
    
    if (employeeId) filter.employee = employeeId;
    if (status) filter.status = status;
    
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    // Execute query
    const attendance = await Attendance.find(filter)
      .populate('employee', 'firstName lastName email department employeeId')
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Attendance.countDocuments(filter);

    // Calculate summary stats
    const summary = await Attendance.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalRecords: { $sum: 1 },
          present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
          absent: { $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] } },
          late: { $sum: { $cond: [{ $eq: ['$status', 'late'] }, 1, 0] } },
          halfDay: { $sum: { $cond: [{ $eq: ['$status', 'half-day'] }, 1, 0] } },
          avgWorkHours: { $avg: '$workHours' }
        }
      }
    ]);

    res.json({
      success: true,
      count: attendance.length,
      total,
      attendance,
      summary: summary[0] || {},
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

exports.markAttendance = async (req, res) => {
  try {
    const { employeeId, checkIn, checkOut } = req.body;

    res.json({
      success: true,
      message: 'Attendance marked successfully',
      data: {
        employeeId,
        checkIn,
        checkOut,
        status: 'Present'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

/**
 * Get attendance by ID
 * @route GET /api/attendance/:id
 * @access Protected
 */
exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .populate('employee', 'firstName lastName email department employeeId')
      .populate('approvedBy', 'firstName lastName');

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    res.json({
      success: true,
      attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

/**
 * Create attendance record (Mark attendance)
 * @route POST /api/attendance
 * @access Protected
 */
exports.createAttendance = async (req, res) => {
  try {
    const { employee, date, checkIn, status, notes } = req.body;

    // Validate required fields
    if (!employee) {
      return res.status(400).json({
        success: false,
        message: 'Employee ID is required'
      });
    }

    // Check if attendance already exists for this employee on this date
    const attendanceDate = date ? new Date(date) : new Date();
    attendanceDate.setHours(0, 0, 0, 0);

    const existingAttendance = await Attendance.findOne({
      employee,
      date: attendanceDate
    });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message: 'Attendance already marked for this employee on this date'
      });
    }

    // Create attendance record
    const attendance = await Attendance.create({
      employee,
      date: attendanceDate,
      checkIn: {
        time: checkIn || new Date(),
        method: 'manual',
        ipAddress: req.ip
      },
      status: status || 'present',
      notes
    });

    const populatedAttendance = await Attendance.findById(attendance._id)
      .populate('employee', 'firstName lastName email employeeId');

    res.status(201).json({
      success: true,
      message: 'Attendance marked successfully',
      attendance: populatedAttendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

/**
 * Update attendance record (Correction)
 * @route PUT /api/attendance/:id
 * @access Protected (Admin, HR Officer)
 */
exports.updateAttendance = async (req, res) => {
  try {
    const { checkIn, checkOut, status, workHours, notes } = req.body;

    const attendance = await Attendance.findById(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    // Update fields
    if (checkIn) attendance.checkIn.time = new Date(checkIn);
    if (checkOut) {
      attendance.checkOut = {
        time: new Date(checkOut),
        method: 'manual'
      };
    }
    if (status) attendance.status = status;
    if (workHours !== undefined) attendance.workHours = workHours;
    if (notes) attendance.notes = notes;

    await attendance.save();

    const updatedAttendance = await Attendance.findById(attendance._id)
      .populate('employee', 'firstName lastName email employeeId');

    res.json({
      success: true,
      message: 'Attendance updated successfully',
      attendance: updatedAttendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

/**
 * Delete attendance record
 * @route DELETE /api/attendance/:id
 * @access Protected (Admin only)
 */
exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    await attendance.deleteOne();

    res.json({
      success: true,
      message: 'Attendance record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};
