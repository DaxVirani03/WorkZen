/**
 * Authentication Controller
 * Handles user registration and login with mock authentication
 * Follows Excalidraw HRMS workflow for role-based access
 */

// Mock user database (in-memory storage for demo purposes)
// TODO: Replace with MongoDB/Mongoose models and bcrypt password hashing
const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@workzen.com',
    password: 'admin123', // In production, this should be hashed
    role: 'Admin'
  },
  // Seeded test users for each role
  {
    id: 2,
    name: 'John Employee',
    email: 'employee1@workzen.com',
    password: 'emp123',
    role: 'Employee'
  },
  {
    id: 3,
    name: 'Sarah HR',
    email: 'hr1@workzen.com',
    password: 'hr123',
    role: 'HR Officer'
  },
  {
    id: 4,
    name: 'Mike Payroll',
    email: 'payroll1@workzen.com',
    password: 'pay123',
    role: 'Payroll Officer'
  }
];

/**
 * Register a new user
 * @route POST /api/auth/register
 * Only allows: Employee, HR Officer, Payroll Officer
 * Admin cannot sign up via this endpoint
 */
exports.register = (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }

    // CRITICAL: Role validation - Admin cannot sign up
    const allowedRoles = ['Employee', 'HR Officer', 'Payroll Officer'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ 
        message: 'Invalid role. Only Employee, HR Officer, and Payroll Officer can sign up. Admin accounts are by invite only.' 
      });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(409).json({ 
        message: 'User with this email already exists' 
      });
    }

    // Email validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Please enter a valid email address' 
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Create new user
    // TODO: Hash password with bcrypt before storing
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In production, hash this password with bcrypt
      role
    };

    // Add to mock database
    users.push(newUser);

    console.log(`✅ New user registered: ${email} (${role})`);

    // Return success response (don't send password back)
    return res.status(201).json({ 
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      message: 'Server error during registration' 
    });
  }
};

/**
 * Login user
 * @route POST /api/auth/login
 * Returns token + user data with role for frontend redirection
 */
exports.login = (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required' 
      });
    }

    // Find user by email
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return res.status(401).json({ 
        message: 'Invalid credentials' 
      });
    }

    // Check password
    // TODO: In production, use bcrypt.compare(password, user.password)
    if (user.password !== password) {
      return res.status(401).json({ 
        message: 'Invalid credentials' 
      });
    }

    console.log(`✅ User logged in: ${email} (${user.role})`);

    // Generate mock JWT token
    // TODO: Replace with real JWT: jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' })
    const token = 'mock-jwt-' + user.id + '-' + Date.now();

    // Return success response with token and full user data
    return res.json({ 
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      message: 'Server error during login' 
    });
  }
};

/**
 * Get all registered users (for debugging)
 * @route GET /api/auth/users
 */
exports.getAllUsers = (req, res) => {
  try {
    // Return users without passwords
    const safeUsers = users.map(({ password, ...user }) => user);
    return res.json({ 
      count: safeUsers.length,
      users: safeUsers 
    });
  } catch (error) {
    console.error('Get users error:', error);
    return res.status(500).json({ 
      message: 'Server error' 
    });
  }
};
