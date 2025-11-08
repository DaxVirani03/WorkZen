/**
 * Authentication Controller
 * Handles user registration and login with mock authentication
 */

// Mock user database (in-memory storage for demo purposes)
const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@workzen.com',
    password: 'admin123', // In production, this should be hashed
    role: 'Admin'
  }
];

/**
 * Register a new user
 * @route POST /api/auth/register
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

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(409).json({ 
        message: 'User with this email already exists' 
      });
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password, // In production, hash this password
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

    // Check password (in production, compare hashed passwords)
    if (user.password !== password) {
      return res.status(401).json({ 
        message: 'Invalid credentials' 
      });
    }

    console.log(`✅ User logged in: ${email} (${user.role})`);

    // Return success response with mock token
    return res.json({ 
      message: 'Login successful',
      token: 'mock-jwt-token-' + Date.now(), // Mock JWT token
      role: user.role,
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
