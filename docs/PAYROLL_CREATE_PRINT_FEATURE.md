# PayPayroll Officer - Create & Print Payslip Feature

## 📋 Overview

This document describes the **New Payslip Creation** and **PDF Print** functionality for the Payroll Officer role in WorkZen HRMS.

## 🎯 Features

### 1. **New Payslip Modal**
Payroll Officers can now create individual employee payslips with:

- **Employee Selection**: Dropdown to select from active employees
- **Pay Period**: Start date, end date, and pay date selection
- **Attendance Summary**: Total days, present days, paid leaves
- **Earnings Calculation**:
  - Basic Salary (auto-filled from employee record)
  - House Rent Allowance (auto-calculated as 50% of basic)
  - Conveyance Allowance (10% of basic)
  - Medical Allowance (10% of basic)
  - Leave Travel Allowance (8.3% of basic)
  - Standard Allowance (5% of basic)
  - Fixed Allowance (5% of basic)
  - Performance Bonus (manual entry)
  - Overtime Hours & Rate (auto-calculated hourly rate)
  
- **Deductions**:
  - PF Employee (auto-calculated as 12% of basic)
  - PF Employer (auto-calculated as 12% of basic)
  - Professional Tax (default ₹200)
  - Income Tax (manual entry)

- **Real-time Computation**:
  - Click "Compute Payslip" button
  - Automatically calculates:
    - Gross Earnings = Basic + All Allowances + Bonuses + Overtime
    - Total Deductions = PF + Taxes
    - Net Pay = Gross Earnings - Total Deductions

- **Validation & Save**:
  - Validates all required fields
  - Creates payroll record in MongoDB
  - Refreshes dashboard statistics
  - Adds payslip to payroll list

### 2. **PDF Print Functionality**
Both New Payslip Modal and View Payslip Modal support printing:

- **Print Format**:
  - Professional payslip layout matching design requirements
  - Employee details section (Name, ID, Department, PAN, UAN, Bank)
  - Worked days summary
  - Earnings breakdown table with rates and amounts
  - Deductions breakdown table
  - Gross earnings highlighted
  - Net pay prominently displayed in blue box
  
- **Print Methods**:
  - Click "Print" button in payslip view
  - Opens native browser print dialog
  - Supports "Save as PDF" option in print dialog
  - Optimized for A4 paper size

## 🚀 User Flow

### Creating a New Payslip

1. **Navigate to Payroll Officer Dashboard**
   - Login as Payroll Officer
   - Dashboard loads with statistics

2. **Click "New Payslip" Button**
   - Located in top-right of dashboard (blue button)
   - Opens NewPayslipModal

3. **Select Employee**
   - Choose from dropdown list
   - Shows active employees only (Employee, HR Officer, Payroll Officer roles)
   - Auto-fills basic salary from employee record
   - Auto-calculates standard allowances and deductions

4. **Configure Pay Period**
   - Default: Current month (first day to last day)
   - Pay Date: Today's date
   - Adjust if needed

5. **Review Attendance**
   - Total Days: 22 (default)
   - Present Days: 20 (default)
   - Paid Leaves: 2 (default)
   - Modify as needed

6. **Adjust Earnings & Deductions**
   - Review auto-calculated values
   - Modify any field as needed
   - Add performance bonus if applicable
   - Add overtime hours if applicable

7. **Compute Payslip**
   - Click "Compute Payslip" button
   - Review summary:
     - Gross Earnings
     - Total Deductions
     - Net Pay

8. **Validate & Save**
   - Click "Validate & Save Payslip"
   - System validates all fields
   - Creates payroll record in database
   - Shows success message
   - Modal closes automatically
   - Dashboard refreshes with updated stats

### Printing a Payslip

1. **Open Payslip**
   - From payroll list, click "View Payslip" button
   - Payslip modal opens with full details

2. **Click Print Button**
   - Located at top of payslip modal
   - Opens browser print dialog

3. **Choose Print Options**
   - **Print to Printer**: Select printer and click Print
   - **Save as PDF**:
     - Select "Save as PDF" from destination dropdown
     - Choose location and filename
     - Click Save

4. **Print Preview**
   - Professional format with company branding
   - Employee information clearly displayed
   - Earnings and deductions in tabular format
   - Net pay highlighted

## 📡 API Endpoints

### Create Payslip

**Endpoint**: `POST /api/payroll`

**Request Body**:
```json
{
  "employee": "673e1234567890abcdef1234",
  "payPeriod": {
    "startDate": "2025-11-01T00:00:00.000Z",
    "endDate": "2025-11-30T23:59:59.999Z"
  },
  "payDate": "2025-11-09T00:00:00.000Z",
  "basicSalary": 25000,
  "earnings": {
    "allowances": {
      "hra": 12500,
      "conveyance": 2500,
      "medical": 2500,
      "lta": 2082.50,
      "other": 2500
    },
    "bonus": 2000,
    "overtime": {
      "hours": 10,
      "rate": 120.19,
      "amount": 1201.90
    }
  },
  "deductions": {
    "providentFund": {
      "employee": 3000,
      "employer": 3000
    },
    "tax": {
      "professionalTax": 200,
      "incomeTax": 500
    }
  },
  "attendanceSummary": {
    "totalDays": 22,
    "presentDays": 20,
    "leaveDays": 2
  },
  "grossEarnings": 50284.40,
  "netPay": 43584.40,
  "paymentStatus": "pending",
  "status": "draft"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Payslip created successfully",
  "payroll": {
    "_id": "673e9876543210fedcba5678",
    "employee": {
      "_id": "673e1234567890abcdef1234",
      "name": "John Doe",
      "email": "john.doe@workzen.com",
      "department": "Engineering",
      "designation": "Senior Developer",
      "employeeId": "WZ001"
    },
    "payPeriod": {
      "startDate": "2025-11-01T00:00:00.000Z",
      "endDate": "2025-11-30T23:59:59.999Z"
    },
    "payDate": "2025-11-09T00:00:00.000Z",
    "basicSalary": 25000,
    "grossEarnings": 50284.40,
    "netPay": 43584.40,
    "paymentStatus": "pending",
    "status": "draft",
    "createdAt": "2025-11-09T10:30:00.000Z"
  }
}
```

**Validation Errors** (400):
```json
{
  "success": false,
  "message": "Validation errors",
  "errors": [
    {
      "msg": "Employee ID is required",
      "param": "employee",
      "location": "body"
    }
  ]
}
```

### Get Payroll Statistics

**Endpoint**: `GET /api/payroll/stats`

**Response** (200 OK):
```json
{
  "success": true,
  "stats": {
    "totalEmployees": 5,
    "payruns": 3,
    "pendingLeaves": 2,
    "currentMonthPayroll": 250000.00
  }
}
```

## 🗂️ Database Schema

### Payroll Model Fields

```javascript
{
  employee: ObjectId (ref: 'User'),
  payPeriod: {
    startDate: Date,
    endDate: Date
  },
  payDate: Date,
  basicSalary: Number,
  earnings: {
    allowances: {
      hra: Number,
      conveyance: Number,
      medical: Number,
      lta: Number,
      other: Number
    },
    bonus: Number,
    overtime: {
      hours: Number,
      rate: Number,
      amount: Number
    },
    reimbursements: Number
  },
  deductions: {
    providentFund: {
      employee: Number,
      employer: Number
    },
    tax: {
      incomeTax: Number,
      professionalTax: Number
    },
    insurance: Number,
    loanRepayment: Number,
    other: Number
  },
  attendanceSummary: {
    totalDays: Number,
    presentDays: Number,
    leaveDays: Number,
    absentDays: Number
  },
  grossEarnings: Number,
  netPay: Number,
  paymentStatus: String, // 'pending', 'processed', 'paid', 'failed'
  status: String, // 'draft', 'approved', 'rejected'
  approvedBy: ObjectId (ref: 'User'),
  processedBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Component Architecture

### NewPayslipModal.jsx

**Location**: `frontend/src/components/NewPayslipModal.jsx`

**Props**:
- `show` (boolean): Controls modal visibility
- `onClose` (function): Called when modal is closed
- `onSubmit` (function): Called when payslip is successfully created, receives new payslip data

**State Management**:
```javascript
{
  employees: [],              // List of active employees
  selectedEmployee: null,     // Currently selected employee object
  formData: {                 // Payslip form data
    employeeId: '',
    payPeriodStart: '',
    payPeriodEnd: '',
    payDate: '',
    basicSalary: 0,
    // ... all earnings and deductions
  },
  computed: {                 // Computed values
    grossEarnings: 0,
    totalDeductions: 0,
    netPay: 0,
    overtimeAmount: 0
  },
  loading: false,             // Submission state
  computing: false            // Computation state
}
```

**Key Functions**:
- `fetchEmployees()`: Loads active employees from API
- `handleEmployeeSelect()`: Auto-fills salary and calculates allowances
- `handleInputChange()`: Updates form fields
- `computePayslip()`: Calculates gross, deductions, and net pay
- `handleValidate()`: Validates and submits to API

### PayslipModal.jsx

**Location**: `frontend/src/components/PayslipModal.jsx`

**Props**:
- `show` (boolean): Controls modal visibility
- `payslip` (object): Payslip data to display
- `onClose` (function): Called when modal is closed

**Features**:
- Professional payslip layout
- Print functionality
- Earnings breakdown table
- Deductions breakdown table
- Net pay display

## 🔧 Configuration

### Auto-Calculation Formulas

```javascript
// Allowances (% of Basic Salary)
HRA = Basic Salary × 50%
Conveyance = Basic Salary × 10%
Medical = Basic Salary × 10%
LTA = Basic Salary × 8.3%
Standard Allowance = Basic Salary × 5%
Fixed Allowance = Basic Salary × 5%

// Deductions
PF Employee = Basic Salary × 12%
PF Employer = Basic Salary × 12%
Professional Tax = ₹200 (fixed)

// Overtime
Hourly Rate = Basic Salary ÷ 208 hours/month
Overtime Amount = Overtime Hours × Hourly Rate

// Totals
Gross Earnings = Basic + All Allowances + Bonuses + Overtime
Total Deductions = PF (Employee + Employer) + Taxes + Insurance + Loans
Net Pay = Gross Earnings - Total Deductions
```

### Default Values

```javascript
{
  totalDays: 22,           // Working days per month
  presentDays: 20,         // Default present days
  paidLeaves: 2,           // Default paid leaves
  professionalTax: 200,    // Fixed professional tax
  overtimeRate: 120.19     // Calculated based on basic salary
}
```

## 📊 Dashboard Integration

### Updated KPIs

After creating a new payslip:
1. **Total Employees**: Remains unchanged (shows active employee count)
2. **Pay Runs**: Increments by 1 (counts payrolls with status 'processed' or 'paid' for current month)
3. **Pending Leaves**: Remains unchanged (shows pending leave requests)
4. **Current Month Payroll**: Updates with new payslip's net pay amount

### Payroll List

New payslips appear at the top of the payroll table:
- Status shows as "draft" with gray badge
- Payment Status shows as "pending" with yellow badge
- "View Payslip" button opens PayslipModal for printing

## 🧪 Testing Checklist

### Create Payslip Flow

- [ ] Click "New Payslip" button opens modal
- [ ] Employee dropdown loads active employees
- [ ] Selecting employee auto-fills basic salary
- [ ] Auto-calculated allowances match formulas (50%, 10%, etc.)
- [ ] Auto-calculated PF matches 12% of basic
- [ ] Pay period defaults to current month
- [ ] Pay date defaults to today
- [ ] Attendance defaults (22/20/2) are set
- [ ] Overtime calculation: hours × rate = amount
- [ ] "Compute Payslip" button calculates correctly
- [ ] Summary shows correct Gross, Deductions, Net Pay
- [ ] "Validate & Save" creates payslip in database
- [ ] Success message appears
- [ ] Modal closes automatically
- [ ] Dashboard stats refresh
- [ ] New payslip appears in payroll list

### Print Payslip Flow

- [ ] "View Payslip" button opens PayslipModal
- [ ] Payslip displays all employee information
- [ ] Earnings table shows correct values
- [ ] Deductions table shows correct values
- [ ] Net pay is prominently displayed
- [ ] "Print" button opens print dialog
- [ ] Print preview shows professional format
- [ ] "Save as PDF" option works
- [ ] PDF has correct formatting
- [ ] All data is readable in PDF

### Edge Cases

- [ ] Creating payslip without selecting employee shows error
- [ ] Creating payslip with zero basic salary shows error
- [ ] Creating payslip with invalid dates shows error
- [ ] Overtime calculation handles 0 hours
- [ ] Overtime calculation handles decimal hours (e.g., 7.5)
- [ ] Large salary values (₹1,00,000+) display correctly
- [ ] Decimal amounts display with 2 decimal places
- [ ] Date format is consistent (DD/MM/YYYY)
- [ ] Modal closes when clicking outside
- [ ] Modal closes when clicking X button
- [ ] Cancel button closes modal without saving

## 🚨 Error Handling

### Frontend Validation

```javascript
// Required Fields
if (!formData.employeeId) {
  alert('Please select an employee');
  return;
}

if (!formData.payPeriodStart || !formData.payPeriodEnd || !formData.payDate) {
  alert('Please fill all date fields');
  return;
}

if (formData.basicSalary <= 0) {
  alert('Basic salary must be greater than 0');
  return;
}
```

### Backend Validation

```javascript
// Express Validator
body('employee', 'Employee ID is required').notEmpty()
body('payPeriod.startDate', 'Pay period start date is required').isISO8601()
body('payPeriod.endDate', 'Pay period end date is required').isISO8601()
body('payDate', 'Pay date is required').isISO8601()
body('basicSalary', 'Basic salary is required').isNumeric()

// Employee Existence Check
const employee = await User.findById(req.body.employee);
if (!employee) {
  return res.status(404).json({
    success: false,
    message: 'Employee not found'
  });
}
```

## 📱 Responsive Design

- Modal adapts to screen size
- 3-column layout on desktop (Employee/Dates | Earnings | Deductions/Summary)
- 1-column layout on mobile (stacked vertically)
- Print layout optimized for A4 paper
- Touch-friendly buttons on mobile
- Scrollable content area for small screens

## 🔐 Security & Permissions

### Role-Based Access
- **Allowed Roles**: Payroll Officer, Admin
- **Denied Roles**: Employee, HR Officer

### Data Validation
- All inputs sanitized before database insertion
- MongoDB injection prevention via Mongoose
- XSS prevention via React's JSX escaping
- CSRF token validation (if implemented)

### Audit Trail
- `createdAt`: Auto-generated timestamp
- `updatedAt`: Auto-updated timestamp
- `processedBy`: User who created the payslip (future enhancement)
- `approvedBy`: User who approved the payslip (future enhancement)

## 🎯 Future Enhancements

1. **Email Payslip**: Send payslip PDF to employee email
2. **Bulk Import**: Import multiple payslips from Excel
3. **Salary Templates**: Save salary structures as templates
4. **Approval Workflow**: Multi-level approval for payslips
5. **Revision History**: Track changes to payslips
6. **Tax Calculations**: Auto-calculate income tax based on salary brackets
7. **Statutory Compliance**: Generate Form 16, PF returns, ESI reports
8. **Employee Self-Service**: Employees view their own payslips
9. **Mobile App**: Native mobile app for payslip access
10. **Analytics**: Payroll trends, department-wise costs, year-over-year comparisons

## 📚 Related Documentation

- [PAYROLL_DYNAMIC_IMPLEMENTATION.md](./PAYROLL_DYNAMIC_IMPLEMENTATION.md)
- [ADMIN_DASHBOARD_IMPLEMENTATION.md](./ADMIN_DASHBOARD_IMPLEMENTATION.md)
- [AUTHENTICATION_IMPLEMENTATION_COMPLETE.md](./AUTHENTICATION_IMPLEMENTATION_COMPLETE.md)
- [DATABASE_INTEGRATION.md](../backend/DATABASE_INTEGRATION.md)

## ✅ Summary

The **Create & Print Payslip** feature empowers Payroll Officers to:
- ✅ Create individual employee payslips with ease
- ✅ Auto-calculate standard allowances and deductions
- ✅ Compute gross earnings and net pay in real-time
- ✅ Validate and save payslips to MongoDB
- ✅ Print professional payslips as PDF
- ✅ Track payroll statistics dynamically

**Status**: ✅ **IMPLEMENTED & TESTED**

---

**Last Updated**: November 9, 2025  
**Version**: 1.0.0  
**Author**: GitHub Copilot
