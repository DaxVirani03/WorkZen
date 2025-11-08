const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Employee = require('../models/Employee');

const router = express.Router();

// Generate JWT token
const generateToken = (employeeId) => {
  return jwt.sign({ employeeId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// @route   POST /api/auth/login
// @desc    Authenticate employee and get token
// @access  Public
router.post('/login', [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists()
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

    const { email, password } = req.body;

    // Check if employee exists and get password
    const employee = await Employee.findOne({ email }).select('+password');

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if employee is active
    if (!employee.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Check password
    const isMatch = await employee.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    await employee.updateLastLogin();

    // Generate token
    const token = generateToken(employee._id);

    // Remove password from response
    const employeeResponse = {
      _id: employee._id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      employeeId: employee.employeeId,
      department: employee.department,
      position: employee.position,
      role: employee.role,
      profilePicture: employee.profilePicture
    };

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        employee: employeeResponse
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// @route   POST /api/auth/register
// @desc    Register a new employee (Admin only)
// @access  Private (Admin)
router.post('/register', [
  body('firstName', 'First name is required').notEmpty(),
  body('lastName', 'Last name is required').notEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  body('phone', 'Phone number is required').notEmpty(),
  body('dateOfBirth', 'Date of birth is required').isISO8601(),
  body('department', 'Department is required').notEmpty(),
  body('position', 'Position is required').notEmpty(),
  body('salary', 'Salary is required').isNumeric()
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

    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      dateOfBirth,
      department,
      position,
      employmentType = 'Full-time',
      startDate = new Date(),
      salary,
      currency = 'USD'
    } = req.body;

    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: 'Employee with this email already exists'
      });
    }

    // Generate employee ID
    const employeeCount = await Employee.countDocuments();
    const employeeId = `EMP${String(employeeCount + 1).padStart(4, '0')}`;

    // Create new employee
    const employee = new Employee({
      firstName,
      lastName,
      email,
      password,
      phone,
      dateOfBirth,
      employeeId,
      department,
      position,
      employmentType,
      startDate,
      salary,
      currency
    });

    await employee.save();

    // Generate token
    const token = generateToken(employee._id);

    // Remove password from response
    const employeeResponse = {
      _id: employee._id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      employeeId: employee.employeeId,
      department: employee.department,
      position: employee.position,
      role: employee.role
    };

    res.status(201).json({
      success: true,
      message: 'Employee registered successfully',
      data: {
        token,
        employee: employeeResponse
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current employee profile
// @access  Private
router.get('/me', async (req, res) => {
  try {
    // This would typically use middleware to get employee from token
    // For now, return a placeholder response
    res.json({
      success: true,
      message: 'Profile retrieved successfully',
      data: {
        employee: {
          _id: 'placeholder',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@company.com',
          employeeId: 'EMP0001',
          department: 'IT',
          position: 'Software Engineer',
          role: 'employee'
        }
      }
    });
  } catch (error) {
    console.error('Profile retrieval error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving profile'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout employee
// @access  Private
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;
