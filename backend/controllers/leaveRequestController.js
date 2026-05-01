const LeaveRequest = require('../models/LeaveRequest');
const User = require('../models/User');
// Employee model merged into User model

/**
 * Create leave request
 * @route POST /api/leaves
 * @access Protected
 */
exports.createLeave = async (req, res) => {
  try {
    // Get user ID from JWT token - the token has userId field
    const userId = req.user?.userId || req.user?.id || req.user?._id;
    
    console.log('👤 User from JWT:', req.user);
    console.log('💼 Extracted userId:', userId);
    
    // Validate userId exists
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated or userId not found in token'
      });
    }
    
    // Extract fields - handle both old and new field names
    const { 
      leaveType, 
      type,
      startDate, 
      from, 
      endDate, 
      to, 
      reason,
      duration,
      isEmergency,
      email, 
      userEmail 
    } = req.body;
    
    // Map new field names to old ones for LeaveRequest model
    const finalType = leaveType || type;
    const finalFrom = startDate || from;
    const finalTo = endDate || to;
    
    console.log('📝 Creating leave request:', { userId, finalType, finalFrom, finalTo, reason });
    
    // Validation
    if (!finalType || !finalFrom || !finalTo || !reason) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: type/leaveType, from/startDate, to/endDate, reason'
      });
    }
    
    // Get user from JWT token
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Validate dates
    const fromDate = new Date(finalFrom);
    const toDate = new Date(finalTo);
    
    if (toDate < fromDate) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after or equal to start date'
      });
    }
    
    // Create leave request - using LeaveRequest model field names
    const leaveData = {
      userId: userId,
      employee: userId,
      type: finalType,
      from: fromDate,
      to: toDate,
      reason,
      status: 'Pending',
      email: user.email,
      userEmail: user.email
    };
    
    const leave = await LeaveRequest.create(leaveData);
    
    // Populate user details
    const populatedLeave = await LeaveRequest.findById(leave._id)
      .populate('userId', 'name email role department firstName lastName')
      .populate('employee', 'name email role department firstName lastName');
    
    console.log('✅ Leave request created:', populatedLeave._id);
    
    res.status(201).json({
      success: true,
      message: 'Leave request submitted successfully',
      data: populatedLeave,
      leave: populatedLeave, // backward compatibility
      id: populatedLeave._id
    });
  } catch (error) {
    console.error('❌ Create leave error:', error);
    console.error('Error details:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while creating leave request',
      error: error.message
    });
  }
};

/**
 * Get all leave requests
 * @route GET /api/leaves
 * @access Public (should be protected)
 */
exports.getLeaves = async (req, res) => {
  try {
    const { userId, status, email, userEmail } = req.query;
    
    // Build filter
    const filter = {};
    if (userId) filter.userId = userId;
    if (status) filter.status = status;
    if (email) filter.email = email;
    if (userEmail) filter.userEmail = userEmail;
    
    console.log('🔍 Fetching leaves with filter:', filter);
    
    const leaves = await LeaveRequest.find(filter)
      .populate('userId', 'name email role department')
      .populate('employee', 'firstName lastName email employeeId department')
      .populate('approverId', 'name email role')
      .sort({ createdAt: -1 });
    
    console.log(`✅ Found ${leaves.length} leave requests`);
    
    res.json({
      success: true,
      count: leaves.length,
      leaves,
      data: leaves // backward compatibility
    });
  } catch (error) {
    console.error('❌ Get leaves error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching leaves',
      error: error.message
    });
  }
};

/**
 * Get leave request by ID
 * @route GET /api/leaves/:id
 * @access Public (should be protected)
 */
exports.getLeaveById = async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id)
      .populate('userId', 'name email role department')
      .populate('employee', 'firstName lastName email employeeId')
      .populate('approverId', 'name email role');
    
    if (!leave) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found'
      });
    }
    
    res.json({
      success: true,
      leave,
      data: leave
    });
  } catch (error) {
    console.error('❌ Get leave by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Update leave request (approve/reject)
 * @route PUT /api/leaves/:id
 * @access Protected (Admin, HR, Payroll)
 */
exports.updateLeave = async (req, res) => {
  console.log('🚀 Starting leave update process...');
  console.log('🔑 User from token:', req.user);
  
  try {
    const { id } = req.params;
    const approverId = req.user?.id || req.user?._id || req.user?.userId;

    console.log(`🆔 Leave ID: ${id}, Approver ID: ${approverId}`);

    if (!approverId) {
      console.error('❌ Authorization error: Approver ID not found in token.');
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized: Approver ID not found in token.' 
      });
    }

    const { status, comments } = req.body;
    console.log(`📝 Update payload: { status: "${status}", comments: "${comments}" }`);

    // Validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      console.error('❌ Invalid ID format:', id);
      return res.status(400).json({
        success: false,
        message: 'Invalid leave request ID format'
      });
    }

    console.log('🔍 Finding leave request by ID...');
    const leave = await LeaveRequest.findById(id);

    if (!leave) {
      console.error('❌ Leave request not found for ID:', id);
      return res.status(404).json({
        success: false,
        message: 'Leave request not found'
      });
    }
    console.log('✅ Leave request found:', leave);

    // Store previous status for audit
    const previousStatus = leave.status;
    console.log(`⏳ Previous status: ${previousStatus}`);

    // Update status
    if (status) {
      const validStatuses = ['Pending', 'Approved', 'Rejected', 'Cancelled'];
      if (!validStatuses.includes(status)) {
        console.error('❌ Invalid status value:', status);
        return res.status(400).json({
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
        });
      }

      leave.status = status;
      leave.approverId = approverId; // Always set the approver from the token

      if (status === 'Approved') {
        leave.approvedAt = new Date();
        console.log('✅ Status set to Approved. Timestamp and approver ID set.');
      } else if (status === 'Rejected') {
        leave.rejectedAt = new Date();
        console.log('❌ Status set to Rejected. Timestamp and approver ID set.');
      }
      if (comments) {
        leave.comments = comments;
      }
    }

    console.log('💾 Saving updated leave request...');
    const updatedLeave = await leave.save();
    console.log('✅ Leave request saved successfully.');

    // Populate user details for the response
    const populatedLeave = await LeaveRequest.findById(updatedLeave._id)
      .populate('userId', 'name email')
      .populate('approverId', 'name email');
    
    console.log('✅ Successfully updated and populated leave request:', populatedLeave._id);

    res.json({
      success: true,
      message: `Leave request ${status.toLowerCase()} successfully.`,
      data: populatedLeave
    });
  } catch (error) {
    console.error('❌❌❌ CRITICAL ERROR in updateLeave:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during leave update.',
      error: error.message
    });
  }
};

/**
 * Delete leave request
 * @route DELETE /api/leaves/:id
 * @access Protected (Admin, or own request)
 */
exports.deleteLeave = async (req, res) => {
  try {
    const leave = await LeaveRequest.findByIdAndDelete(req.params.id);
    
    if (!leave) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found'
      });
    }
    
    console.log('✅ Leave request deleted:', req.params.id);
    
    res.json({
      success: true,
      message: 'Leave request deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete leave error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting leave',
      error: error.message
    });
  }
};
