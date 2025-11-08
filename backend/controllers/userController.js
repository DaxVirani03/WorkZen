// Sample users data
exports.getUsers = async (req, res) => {
  try {
    const users = [
      {
        id: 1,
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        role: 'HR Manager',
        department: 'Human Resources',
        joinDate: '2023-01-15'
      },
      {
        id: 2,
        name: 'Priya Sharma',
        email: 'priya@example.com',
        role: 'Software Engineer',
        department: 'Engineering',
        joinDate: '2023-03-22'
      },
      {
        id: 3,
        name: 'Amit Patel',
        email: 'amit@example.com',
        role: 'Marketing Manager',
        department: 'Marketing',
        joinDate: '2022-11-10'
      },
    ];

    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = {
      id: req.params.id,
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      role: 'HR Manager',
      department: 'Human Resources',
      joinDate: '2023-01-15',
      phone: '+91 98765 43210',
      address: 'Mumbai, Maharashtra'
    };

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};
