// Sample attendance data
exports.getAttendance = async (req, res) => {
  try {
    const attendance = [
      {
        id: 1,
        employeeId: 1,
        employeeName: 'Rajesh Kumar',
        date: '2024-11-08',
        checkIn: '09:00 AM',
        checkOut: '06:00 PM',
        status: 'Present',
        workingHours: 9
      },
      {
        id: 2,
        employeeId: 2,
        employeeName: 'Priya Sharma',
        date: '2024-11-08',
        checkIn: '09:15 AM',
        checkOut: '06:15 PM',
        status: 'Present',
        workingHours: 9
      },
      {
        id: 3,
        employeeId: 3,
        employeeName: 'Amit Patel',
        date: '2024-11-08',
        checkIn: null,
        checkOut: null,
        status: 'Absent',
        workingHours: 0
      },
    ];

    res.json({
      success: true,
      count: attendance.length,
      data: attendance,
      summary: {
        total: 3,
        present: 2,
        absent: 1,
        attendanceRate: '66.67%'
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
