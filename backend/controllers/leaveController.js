// Sample leave requests data
exports.getLeaves = async (req, res) => {
  try {
    const leaves = [
      {
        id: 1,
        employeeId: 1,
        employeeName: 'Rajesh Kumar',
        leaveType: 'Casual Leave',
        startDate: '2024-11-15',
        endDate: '2024-11-16',
        days: 2,
        reason: 'Personal work',
        status: 'Approved',
        appliedOn: '2024-11-01'
      },
      {
        id: 2,
        employeeId: 2,
        employeeName: 'Priya Sharma',
        leaveType: 'Sick Leave',
        startDate: '2024-11-20',
        endDate: '2024-11-21',
        days: 2,
        reason: 'Medical appointment',
        status: 'Pending',
        appliedOn: '2024-11-07'
      },
      {
        id: 3,
        employeeId: 3,
        employeeName: 'Amit Patel',
        leaveType: 'Annual Leave',
        startDate: '2024-12-20',
        endDate: '2024-12-27',
        days: 8,
        reason: 'Vacation',
        status: 'Pending',
        appliedOn: '2024-11-05'
      },
    ];

    res.json({
      success: true,
      count: leaves.length,
      data: leaves,
      summary: {
        total: 3,
        approved: 1,
        pending: 2,
        rejected: 0
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

exports.applyLeave = async (req, res) => {
  try {
    const { employeeId, leaveType, startDate, endDate, reason } = req.body;

    res.json({
      success: true,
      message: 'Leave application submitted successfully',
      data: {
        employeeId,
        leaveType,
        startDate,
        endDate,
        reason,
        status: 'Pending'
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

exports.approveLeave = async (req, res) => {
  try {
    const { id } = req.params;

    res.json({
      success: true,
      message: 'Leave approved successfully',
      data: {
        id,
        status: 'Approved'
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
