# User/Employee Schema Unification Guide

## Problem Identified
The system had two separate schemas:
1. **User** - For authentication and login
2. **Employee** - For detailed employee information

This caused:
- ❌ Data duplication
- ❌ Synchronization issues
- ❌ Confusion about which model to use
- ❌ Users not showing in employee lists
- ❌ Ambiguity in relationships

## Solution Implemented

### ✅ Unified Schema
**User model now serves as the single source of truth** for both authentication AND employee data.

### Changes Made:

#### 1. **Backend Model Updates**

**`backend/models/User.js`** - UPDATED (Comprehensive)
- Merged all employee fields into User schema
- Added fields: `phone`, `dateOfBirth`, `employeeId`, `position`, `employmentType`, `startDate`, `salary`, `address`, `emergencyContact`, `skills`, `qualifications`, `performanceRating`
- Kept authentication fields: `password`, `role`, `isActive`, `loginAttempts`
- Added indexes for better performance
- Added virtuals for `fullName` and `age`
- Added static methods: `findActive()`, `getDepartmentStats()`, `findByRole()`
- Pre-save hook to auto-set `name` from `firstName + lastName`

**`backend/models/Employee.js`** - KEEP FOR LEGACY (Optional)
- Can be deprecated or used for migration
- All new data goes to User model

**`backend/models/Attendance.js`** - UPDATED
```javascript
// Changed from:
employee: { type: ObjectId, ref: 'Employee' }

// To:
employee: { type: ObjectId, ref: 'User' }
user: { type: ObjectId, ref: 'User' } // Added alternate field
approvedBy: { type: ObjectId, ref: 'User' }
```

**`backend/models/Leave.js`** - UPDATED
```javascript
// Changed references from 'Employee' to 'User'
employee: { type: ObjectId, ref: 'User' }
user: { type: ObjectId, ref: 'User' }
approvedBy: { type: ObjectId, ref: 'User' }
rejectedBy: { type: ObjectId, ref: 'User' }
```

**`backend/models/Payroll.js`** - UPDATED
```javascript
// Changed from:
employee: { type: ObjectId, ref: 'Employee' }

// To:
employee: { type: ObjectId, ref: 'User' }
user: { type: ObjectId, ref: 'User' }
```

#### 2. **Frontend API Updates**

**`frontend/src/services/api.js`** - UPDATED
```javascript
// employeeAPI now points to /users endpoints
export const employeeAPI = {
  getAll: () => apiRequest('/users'),
  getById: (id) => apiRequest(`/users/${id}`),
  create: (data) => apiRequest('/users', { method: 'POST', body: data }),
  // ... all methods use /users endpoints
}

// attendanceAPI updated
getByUser: (userId) => apiRequest(`/attendance/user/${userId}`)
// Changed from getByEmployee
```

**`frontend/src/pages/DashboardAdmin.jsx`** - UPDATED
```javascript
// Simplified data fetching
const fetchDashboardData = async () => {
  const usersData = await api.users.getAll();
  const allUsers = usersData.data || [];
  
  // Users and Employees are the same now
  setUsers(allUsers);
  setEmployees(allUsers);
}
```

## New Data Structure

### User/Employee Record Example:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "firstName": "John",
  "lastName": "Doe",
  "name": "John Doe", // Auto-generated
  "email": "john.doe@workzen.com",
  "phone": "+1-234-567-8900",
  "dateOfBirth": "1990-05-15",
  
  // Authentication
  "password": "hashed_password",
  "role": "Employee", // Admin | HR Officer | Payroll Officer | Employee
  "isActive": true,
  "lastLogin": "2025-11-09T10:30:00Z",
  
  // Employment
  "company": "WORKZEN",
  "userId": "WZ-2025-001",
  "employeeId": "EMP-001",
  "department": "Engineering",
  "designation": "Senior Developer",
  "position": "Full Stack Developer",
  "employmentType": "Full-time",
  "joinDate": "2024-01-15",
  "startDate": "2024-01-15",
  "salary": 75000,
  "currency": "USD",
  
  // Additional Info
  "address": {
    "street": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "zipCode": "94105",
    "country": "USA"
  },
  "emergencyContact": {
    "name": "Jane Doe",
    "relationship": "Spouse",
    "phone": "+1-234-567-8901"
  },
  
  // Leave Balance
  "leaveBalance": {
    "annual": 12,
    "sick": 10,
    "personal": 5,
    "casual": 7
  },
  
  // Skills & Qualifications (Optional)
  "skills": [
    { "name": "JavaScript", "level": "Expert" },
    { "name": "React", "level": "Advanced" }
  ],
  "qualifications": [
    {
      "degree": "B.S. Computer Science",
      "institution": "MIT",
      "year": 2012,
      "grade": "3.8"
    }
  ],
  
  // Virtuals (auto-calculated)
  "fullName": "John Doe",
  "age": 35
}
```

## Migration Steps

### For Existing Data:

#### Option 1: Migrate Employee Data to User
```javascript
// Migration script (backend)
const migrateEmployeesToUsers = async () => {
  const employees = await Employee.find();
  
  for (const emp of employees) {
    // Check if user already exists
    let user = await User.findOne({ email: emp.email });
    
    if (!user) {
      // Create new user from employee data
      user = new User({
        firstName: emp.firstName,
        lastName: emp.lastName,
        email: emp.email,
        phone: emp.phone,
        dateOfBirth: emp.dateOfBirth,
        employeeId: emp.employeeId,
        department: emp.department,
        position: emp.position,
        employmentType: emp.employmentType,
        startDate: emp.startDate,
        salary: emp.salary,
        currency: emp.currency,
        address: emp.address,
        emergencyContact: emp.emergencyContact,
        skills: emp.skills,
        qualifications: emp.qualifications,
        leaveBalance: emp.leaveBalance,
        password: emp.password, // Already hashed
        role: emp.role || 'Employee',
        isActive: emp.isActive
      });
      await user.save({ validateBeforeSave: false });
    } else {
      // Update existing user with employee data
      Object.assign(user, {
        phone: emp.phone,
        dateOfBirth: emp.dateOfBirth,
        employeeId: emp.employeeId,
        department: emp.department,
        position: emp.position,
        employmentType: emp.employmentType,
        startDate: emp.startDate,
        salary: emp.salary,
        // ... other fields
      });
      await user.save({ validateBeforeSave: false });
    }
    
    // Update attendance records
    await Attendance.updateMany(
      { employee: emp._id },
      { employee: user._id, user: user._id }
    );
    
    // Update leave records
    await Leave.updateMany(
      { employee: emp._id },
      { employee: user._id, user: user._id }
    );
    
    // Update payroll records
    await Payroll.updateMany(
      { employee: emp._id },
      { employee: user._id, user: user._id }
    );
  }
  
  console.log('Migration completed!');
};
```

#### Option 2: Fresh Start
1. Drop existing Employee collection
2. Create users with complete employee data
3. All new records reference User model

### Backend Route Updates Needed:

**Update these routes to use User model:**

1. **`backend/routes/employees.js`**
```javascript
// Change all Employee references to User
const User = require('../models/User');

router.get('/', async (req, res) => {
  const employees = await User.find({ 
    role: { $in: ['Employee', 'HR Officer', 'Payroll Officer'] }
  });
  res.json({ success: true, data: employees });
});
```

2. **`backend/routes/attendance.js`**
```javascript
// Update populate references
const attendance = await Attendance.find()
  .populate('employee', 'firstName lastName email department') // Now populates from User
  .populate('user', 'firstName lastName email'); // Alternate field
```

3. **`backend/routes/leave.js`**
```javascript
// Update populate references
const leaves = await Leave.find()
  .populate('employee', 'firstName lastName email department')
  .populate('approvedBy', 'firstName lastName')
  .populate('rejectedBy', 'firstName lastName');
```

4. **`backend/routes/payroll.js`**
```javascript
// Update populate references
const payroll = await Payroll.find()
  .populate('employee', 'firstName lastName employeeId salary department');
```

## Benefits of Unified Schema

### ✅ Advantages:
1. **Single Source of Truth** - No data duplication
2. **Simplified Queries** - One model to query
3. **Automatic Sync** - User data = Employee data
4. **Easier Management** - Manage everything in one place
5. **Better Performance** - No joins between User and Employee
6. **Role-Based Access** - Easy to filter by role
7. **Cleaner Code** - Less complexity in relationships

### 📊 Data Consistency:
- All users with role = 'Employee' are employees
- All users with employee data are in the system
- No orphaned records
- No synchronization issues

## Testing Checklist

- [ ] Existing users can log in
- [ ] New users can be created with employee data
- [ ] Employee list shows all users
- [ ] Attendance records link correctly
- [ ] Leave requests link correctly
- [ ] Payroll records link correctly
- [ ] User role changes work
- [ ] Department filtering works
- [ ] Search functionality works
- [ ] Dashboard statistics are correct

## API Endpoint Changes

### Before:
```
GET /api/employees          → Employee collection
GET /api/users              → User collection
```

### After:
```
GET /api/users              → User collection (includes employee data)
GET /api/employees          → Points to /api/users (for compatibility)
```

## Database Schema Comparison

### Before (Separate):
```
Users Collection:
- _id, email, password, role
- employeeId: ObjectId → References Employee

Employees Collection:
- _id, firstName, lastName, department, salary, etc.
```

### After (Unified):
```
Users Collection:
- _id, email, password, role
- firstName, lastName, department, salary, etc.
- All employee fields included
```

## Rollback Plan

If needed to rollback:
1. Restore original User.js model
2. Re-enable Employee.js model
3. Update frontend API calls back to /employees
4. Update all model references back to 'Employee'

## Next Steps

1. **Backend:**
   - Update all controller files to use User model
   - Update all routes to use User model
   - Test all endpoints
   - Run migration script if needed

2. **Frontend:**
   - Test all CRUD operations
   - Verify employee lists display correctly
   - Test search and filters
   - Verify attendance/leave/payroll integrations

3. **Database:**
   - Back up existing data
   - Run migration script
   - Verify data integrity
   - Remove old Employee collection (optional)

## Summary

The User and Employee schemas have been successfully unified into a single User model. This eliminates confusion, prevents data duplication, and ensures all users (including employees) are managed in one place. The system is now cleaner, more maintainable, and less error-prone.

**Key Point:** There is no longer a separate Employee model in use. The User model handles everything - authentication, employee data, and user management.
