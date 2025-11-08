# Quick Reference: Unified User Schema

## Overview
The User model now handles both authentication and employee data. Use role-based filtering to distinguish between different user types.

## User Roles
- `Admin` - Full system access
- `HR Officer` - Manage employees, leaves, attendance
- `Payroll Officer` - Manage payroll
- `Employee` - Regular employee

## Common Queries

### Get All Users
```javascript
const users = await User.find();
```

### Get Only Employees
```javascript
const employees = await User.find({ role: 'Employee' });
```

### Get Active Employees
```javascript
const activeEmployees = await User.findActive();
```

### Get Department Statistics
```javascript
const stats = await User.getDepartmentStats();
```

### Get Users by Role
```javascript
const hrOfficers = await User.findByRole('HR Officer');
```

### Get Users by Department
```javascript
const itEmployees = await User.find({ 
  department: 'IT',
  role: 'Employee' 
});
```

## Creating Users

### Create Admin
```javascript
const admin = new User({
  firstName: 'John',
  lastName: 'Doe',
  email: 'admin@workzen.com',
  password: 'hashedpassword',
  role: 'Admin',
  department: 'Management'
});
await admin.save();
```

### Create Employee
```javascript
const employee = new User({
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane@workzen.com',
  password: 'hashedpassword',
  role: 'Employee',
  department: 'IT',
  position: 'Software Developer',
  salary: 75000,
  dateOfJoining: new Date(),
  dateOfBirth: new Date('1995-05-15'),
  phoneNumber: '+1234567890',
  address: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA'
  },
  leaveBalance: {
    casual: 12,
    sick: 10,
    annual: 15
  }
});
await employee.save();
```

## Populating References

### In Attendance
```javascript
const attendance = await Attendance.findById(id)
  .populate('employee', 'firstName lastName employeeId department');
```

### In Leave Requests
```javascript
const leave = await Leave.findById(id)
  .populate('employee', 'firstName lastName email employeeId')
  .populate('approvedBy', 'firstName lastName');
```

### In Payroll
```javascript
const payroll = await Payroll.findById(id)
  .populate('employee', 'firstName lastName employeeId department salary');
```

## API Endpoints

### User/Employee Management
```
GET    /api/users              - Get all users
GET    /api/users?role=Employee - Get employees only
GET    /api/users/:id          - Get user by ID
POST   /api/users              - Create new user
PUT    /api/users/:id          - Update user
DELETE /api/users/:id          - Delete user
```

### Filtering Examples
```
GET /api/users?role=Employee
GET /api/users?department=IT
GET /api/users?role=Employee&department=IT
GET /api/users?isActive=true
```

## Frontend Usage

### Using API Service
```javascript
import api from '../services/api';

// Get all users
const users = await api.user.getAll();

// Get employees only
const employees = users.filter(u => u.role === 'Employee');

// Get user by ID
const user = await api.user.getById(userId);

// Create employee
const newEmployee = await api.user.create({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@workzen.com',
  role: 'Employee',
  department: 'IT',
  position: 'Developer',
  salary: 70000
});

// Update employee
const updated = await api.user.update(userId, {
  position: 'Senior Developer',
  salary: 85000
});
```

## Field Reference

### Authentication Fields
- `email` (required, unique)
- `password` (required, hashed)
- `role` (required: Admin, HR Officer, Payroll Officer, Employee)

### Basic Information
- `firstName` (required)
- `lastName` (required)
- `dateOfBirth` (optional)
- `gender` (optional: Male, Female, Other)
- `phoneNumber` (optional)

### Employee Information
- `employeeId` (auto-generated, unique)
- `department` (required for employees)
- `position` (required for employees)
- `salary` (required for employees)
- `dateOfJoining` (default: now)

### Address (embedded object)
- `street`
- `city`
- `state`
- `zipCode`
- `country`

### Leave Balance (embedded object)
- `casual` (default: 12)
- `sick` (default: 10)
- `annual` (default: 15)
- `maternity` (default: 0)
- `paternity` (default: 0)

### Additional Fields
- `skills` (array of strings)
- `qualifications` (array of strings)
- `isActive` (default: true)
- `profilePicture` (optional URL)

### Virtual Fields (computed, not stored)
- `fullName` - `firstName + lastName`
- `age` - Calculated from `dateOfBirth`

## Migration Notes

### If you have existing Employee data:
1. Run the migration script:
   ```bash
   node backend/scripts/migrateEmployeesToUsers.js
   ```

2. This will:
   - Copy all Employee records to User collection
   - Set their role to 'Employee'
   - Update all references in Attendance, Leave, Payroll

### After migration:
- All employees will be users with `role: 'Employee'`
- All employee data preserved
- All relationships maintained

## Best Practices

### ✅ Do:
- Use `User.find({ role: 'Employee' })` to get employees
- Use `User.findByRole('Employee')` static method
- Filter by role in API queries
- Populate references with needed fields only

### ❌ Don't:
- Don't import Employee model (it's deprecated)
- Don't create separate Employee records
- Don't duplicate user data

## Troubleshooting

### "Employee not found" errors:
- Make sure you're using `User.findById()` not `Employee.findById()`
- Check that the user exists and has `role: 'Employee'`

### Reference errors in Attendance/Leave/Payroll:
- Ensure references point to User model: `ref: 'User'`
- Use `populate('employee', 'fields')` not `populate('Employee')`

### Frontend not showing employees:
- Check API is querying `/api/users` not `/api/employees`
- Filter response by `role === 'Employee'`

---

**Quick Command Reference:**
```bash
# View User model
cat backend/models/User.js

# Run migration
node backend/scripts/migrateEmployeesToUsers.js

# Seed sample data
npm run seed

# Test endpoints
npm run dev
```
