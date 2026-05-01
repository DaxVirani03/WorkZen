const Performance = require('../models/Performance');
const User = require('../models/User');

/**
 * Create a new performance review
 * @route POST /api/performance
 * @access Protected (HR Officer, Admin)
 */
exports.createPerformance = async (req, res) => {
  try {
    const { employee, reviewer, rating, feedback, reviewPeriod, metrics, strengths, areasForImprovement, goals, recommendation } = req.body;

    // Validate required fields
    if (!employee || !reviewer || !rating || !reviewPeriod) {
      return res.status(400).json({
        success: false,
        message: 'Employee, reviewer, rating, and review period are required'
      });
    }

    // Check if employee exists
    const employeeUser = await User.findById(employee);
    if (!employeeUser) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Check if reviewer exists
    const reviewerUser = await User.findById(reviewer);
    if (!reviewerUser) {
      return res.status(404).json({
        success: false,
        message: 'Reviewer not found'
      });
    }

    // Create performance record
    const performance = await Performance.create({
      employee,
      reviewer,
      rating,
      feedback,
      reviewPeriod,
      metrics: metrics || {},
      strengths: strengths || [],
      areasForImprovement: areasForImprovement || [],
      goals: goals || [],
      recommendation: recommendation || 'no-change',
      status: 'submitted',
      date: new Date()
    });

    // Populate employee and reviewer details
    await performance.populate('employee', 'firstName lastName email department');
    await performance.populate('reviewer', 'firstName lastName email');

    console.log('✅ Performance review created:', performance._id);

    res.status(201).json({
      success: true,
      message: 'Performance review created successfully',
      data: { performance }
    });
  } catch (error) {
    console.error('❌ Create performance error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating performance review',
      error: error.message
    });
  }
};

/**
 * Get all performance reviews
 * @route GET /api/performance
 * @access Protected (HR Officer, Admin)
 */
exports.getAllPerformance = async (req, res) => {
  try {
    const {
      employeeId,
      departmentId,
      rating,
      reviewPeriod,
      status,
      page = 1,
      limit = 20,
      sortBy = 'date',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};

    if (employeeId) {
      filter.employee = employeeId;
    }

    if (rating) {
      filter.rating = parseInt(rating);
    }

    if (reviewPeriod) {
      filter.reviewPeriod = reviewPeriod;
    }

    if (status) {
      filter.status = status;
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    // Execute query
    const performances = await Performance.find(filter)
      .populate('employee', 'firstName lastName email department')
      .populate('reviewer', 'firstName lastName email')
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Performance.countDocuments(filter);

    // Calculate summary stats
    const summary = await Performance.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalRecords: { $sum: 1 },
          averageRating: { $avg: '$rating' },
          ratingDistribution: {
            $push: '$rating'
          }
        }
      }
    ]);

    // Calculate rating distribution
    let ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    if (summary[0]?.ratingDistribution) {
      summary[0].ratingDistribution.forEach(rating => {
        ratingDistribution[rating]++;
      });
    }

    res.json({
      success: true,
      count: performances.length,
      total,
      performances,
      summary: {
        totalRecords: summary[0]?.totalRecords || 0,
        averageRating: summary[0]?.averageRating ? summary[0].averageRating.toFixed(2) : 0,
        ratingDistribution
      },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('❌ Get performance error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving performance records',
      error: error.message
    });
  }
};

/**
 * Get performance for a specific employee
 * @route GET /api/performance/employee/:employeeId
 * @access Protected
 */
exports.getEmployeePerformance = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { page = 1, limit = 10, sortBy = 'date', sortOrder = 'desc' } = req.query;

    console.log('📊 Backend - getEmployeePerformance called');
    console.log('   Employee ID:', employeeId);
    console.log('   Page:', page, 'Limit:', limit);

    // Check if employee exists
    const employee = await User.findById(employeeId).lean();
    if (!employee) {
      console.log('❌ Backend - Employee not found:', employeeId);
      // Return empty results instead of 404 error
      return res.json({
        success: true,
        count: 0,
        total: 0,
        performances: [],
        summary: { averageRating: 0, totalReviews: 0 },
        pagination: {
          page: 1,
          limit: 10,
          totalPages: 0
        }
      });
    }

    console.log('✅ Backend - Employee found:', employee.firstName, employee.lastName);

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    // Get performance records for the employee
    const performances = await Performance.find({ employee: employeeId })
      .populate('reviewer', 'firstName lastName email')
      .populate('employee', 'firstName lastName email department')
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Performance.countDocuments({ employee: employeeId });

    console.log('✅ Backend - Found', performances.length, 'out of', total, 'total records');

    // Get summary
    const summary = await Performance.getEmployeePerformanceSummary(employeeId);

    res.json({
      success: true,
      count: performances.length,
      total,
      performances,
      summary: summary[0] || { averageRating: 0, totalReviews: 0 },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('❌ Get employee performance error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving employee performance',
      error: error.message
    });
  }
};

/**
 * Get a single performance review by ID
 * @route GET /api/performance/:id
 * @access Protected
 */
exports.getPerformanceById = async (req, res) => {
  try {
    const performance = await Performance.findById(req.params.id)
      .populate('employee', 'firstName lastName email department')
      .populate('reviewer', 'firstName lastName email');

    if (!performance) {
      return res.status(404).json({
        success: false,
        message: 'Performance record not found'
      });
    }

    res.json({
      success: true,
      data: { performance }
    });
  } catch (error) {
    console.error('❌ Get performance by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving performance record',
      error: error.message
    });
  }
};

/**
 * Update a performance review
 * @route PUT /api/performance/:id
 * @access Protected (HR Officer, Admin)
 */
exports.updatePerformance = async (req, res) => {
  try {
    const { rating, feedback, metrics, strengths, areasForImprovement, goals, recommendation, status } = req.body;

    const performance = await Performance.findById(req.params.id);

    if (!performance) {
      return res.status(404).json({
        success: false,
        message: 'Performance record not found'
      });
    }

    // Update fields if provided
    if (rating !== undefined) performance.rating = rating;
    if (feedback !== undefined) performance.feedback = feedback;
    if (metrics !== undefined) performance.metrics = { ...performance.metrics, ...metrics };
    if (strengths !== undefined) performance.strengths = strengths;
    if (areasForImprovement !== undefined) performance.areasForImprovement = areasForImprovement;
    if (goals !== undefined) performance.goals = goals;
    if (recommendation !== undefined) performance.recommendation = recommendation;
    if (status !== undefined) performance.status = status;

    await performance.save();

    // Populate employee and reviewer details
    await performance.populate('employee', 'firstName lastName email department');
    await performance.populate('reviewer', 'firstName lastName email');

    console.log('✅ Performance record updated:', performance._id);

    res.json({
      success: true,
      message: 'Performance record updated successfully',
      data: { performance }
    });
  } catch (error) {
    console.error('❌ Update performance error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating performance record',
      error: error.message
    });
  }
};

/**
 * Delete a performance review
 * @route DELETE /api/performance/:id
 * @access Protected (HR Officer, Admin)
 */
exports.deletePerformance = async (req, res) => {
  try {
    const performance = await Performance.findById(req.params.id);

    if (!performance) {
      return res.status(404).json({
        success: false,
        message: 'Performance record not found'
      });
    }

    await performance.deleteOne();

    console.log('✅ Performance record deleted:', req.params.id);

    res.json({
      success: true,
      message: 'Performance record deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete performance error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting performance record',
      error: error.message
    });
  }
};

/**
 * Get performance analytics
 * @route GET /api/performance/analytics/department
 * @access Protected (HR Officer, Admin)
 */
exports.getPerformanceAnalytics = async (req, res) => {
  try {
    const { department, startDate, endDate } = req.query;

    if (!department || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Department, start date, and end date are required'
      });
    }

    const analytics = await Performance.getDepartmentAnalytics(
      department,
      new Date(startDate),
      new Date(endDate)
    );

    res.json({
      success: true,
      data: { analytics }
    });
  } catch (error) {
    console.error('❌ Get performance analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving performance analytics',
      error: error.message
    });
  }
};

/**
 * Get overview statistics for dashboard
 * @route GET /api/performance/stats
 * @access Protected (HR Officer, Admin)
 */
exports.getPerformanceStats = async (req, res) => {
  try {
    const stats = await Performance.aggregate([
      {
        $group: {
          _id: null,
          totalReviews: { $sum: 1 },
          averageRating: { $avg: '$rating' },
          employeesReviewed: { $addToSet: '$employee' }
        }
      },
      {
        $project: {
          _id: 0,
          totalReviews: 1,
          averageRating: { $round: ['$averageRating', 2] },
          employeesReviewed: { $size: '$employeesReviewed' }
        }
      }
    ]);

    res.json({
      success: true,
      stats: stats[0] || {
        totalReviews: 0,
        averageRating: 0,
        employeesReviewed: 0
      }
    });
  } catch (error) {
    console.error('❌ Get performance stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving performance statistics'
    });
  }
};
