// Sample payroll data
exports.getPayroll = async (req, res) => {
  try {
    const payroll = [
      {
        id: 1,
        employeeId: 1,
        employeeName: 'Rajesh Kumar',
        month: 'October 2024',
        basicSalary: 50000,
        hra: 20000,
        allowances: 10000,
        deductions: 8000,
        netSalary: 72000,
        status: 'Paid',
        paymentDate: '2024-10-31'
      },
      {
        id: 2,
        employeeId: 2,
        employeeName: 'Priya Sharma',
        month: 'October 2024',
        basicSalary: 60000,
        hra: 24000,
        allowances: 12000,
        deductions: 9600,
        netSalary: 86400,
        status: 'Paid',
        paymentDate: '2024-10-31'
      },
      {
        id: 3,
        employeeId: 3,
        employeeName: 'Amit Patel',
        month: 'October 2024',
        basicSalary: 55000,
        hra: 22000,
        allowances: 11000,
        deductions: 8800,
        netSalary: 79200,
        status: 'Processing',
        paymentDate: null
      },
    ];

    res.json({
      success: true,
      count: payroll.length,
      data: payroll,
      summary: {
        totalPayroll: 237600,
        processed: 2,
        pending: 1
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

exports.processPayroll = async (req, res) => {
  try {
    const { employeeId, month } = req.body;

    res.json({
      success: true,
      message: 'Payroll processed successfully',
      data: {
        employeeId,
        month,
        status: 'Processed'
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
