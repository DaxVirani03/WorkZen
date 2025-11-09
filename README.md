# 📊 WorkZen – Smart Human Resource Management System

WorkZen is a modular, scalable HRMS platform designed to simplify and modernize HR operations for startups, institutions, and SMEs. It integrates core HR functionalities—attendance, leave, payroll, and analytics—into a unified, user-friendly interface.

## 🚀 Vision & Mission

WorkZen empowers organizations to:
- Reduce manual HR tasks
- Improve transparency and collaboration
- Make data-driven workforce decisions
- Deliver a clean and reliable experience for employees and administrators

---

## 🧩 Core Modules

### 🔐 User & Role Management
- Secure registration and login
- Role-based access: Employee, HR Officer, Admin, Payroll Officer
- Editable user profiles

### ⏱️ Attendance & Leave Management
- Daily/monthly attendance tracking
- Leave application, approval, and rejection workflows

### 💰 Payroll Management
- Salary breakdown, deductions, and payout summaries
- Monthly payslip generation and editing (Admin/Payroll Officer)

### 📈 Dashboard & Analytics
- Visual summaries of attendance, leave, and payroll metrics
- Admin overview of employee data and HR statistics

---

## 📚 Key Terminologies

- **Payroll**: Salary processing based on attendance and leave
- **Payrun**: Payroll cycle for salary disbursement
- **Payslip**: Document showing salary breakdown
- **Time-Off**: Approved absence from work
- **Wage**: Compensation based on work hours and attendance
- **PF Contribution**: 12% of basic salary from employee and employer
- **Professional Tax**: State-imposed monthly tax deducted from salary

---

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations
- **Three.js** - 3D graphics
- **Chart.js** - Data visualization
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## 📁 Project Structure

```
WorkZen-HRMS/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js app router pages
│   │   ├── components/      # Reusable React components
│   │   ├── sections/        # Landing page sections
│   │   ├── contexts/        # React contexts (Theme)
│   │   ├── utils/           # Utility functions and helpers
│   │   └── styles/          # Global styles and Tailwind config
│   ├── package.json
│   └── next.config.js
├── backend/                  # Express.js backend API
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── server.js            # Main server file
│   ├── package.json
│   └── .env.example         # Environment variables template
└── docs/                    # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm 8+
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/workzen-hrms.git
   cd workzen-hrms
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB connection string and other settings
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🔐 Authentication & Role-Based Access

WorkZen HRMS includes a comprehensive authentication system with role-based dashboards following the Excalidraw HRMS workflow.

### Roles & Dashboards

**Four User Roles with Dedicated Dashboards:**
1. **Admin** → `/dashboard/admin`
   - View all employees in card grid with status indicators
   - Search and filter employees
   - View quick summary metrics (total employees, present, on leave, payroll cost)
   - Attendance trend analytics with Chart.js
   - Manage employee details (mark attendance, corrections, view payslips)
   - Review and approve pending leave requests
   - Access full admin menu: Employees, Attendance, Time Off, Payroll, Reports, Settings

2. **Employee** → `/dashboard/employee`
   - Punch In/Out attendance tracking
   - View monthly attendance chart
   - Apply for leave and view leave balance
   - Download payslips

3. **HR Officer** → `/dashboard/hr`
   - Approve/reject leave requests
   - Review attendance corrections
   - Manage employee directory
   - Allocate leave balances

4. **Payroll Officer** → `/dashboard/payroll`
   - Process monthly payroll (Run Payroll)
   - View locked payruns history
   - Generate payslips in bulk
   - Monitor payroll costs with analytics
   - Track approved leaves affecting payroll

### Sign Up & Login

**Sign Up** (`/signup`):
- Allowed roles: **Employee**, **HR Officer**, **Payroll Officer** only
- Admin accounts are seeded by the system (cannot sign up via UI)
- Required fields: Name, Email, Password, Role
- After signup → redirected to login page

**Login** (`/login`):
- Enter email and password
- System automatically redirects to role-specific dashboard
- localStorage stores: `workzen_token`, `workzen_role`, `workzen_user`
- **Navbar Profile Dropdown**: Click avatar → Profile or Logout

**Profile Page** (`/profile`):
- View and edit user information
- Protected route (requires authentication)
- Navigate from navbar avatar dropdown
- Updates saved to localStorage (TODO: sync with backend)

**Test Credentials:**
```
Employee:        employee1@workzen.com / emp123
HR Officer:      hr1@workzen.com / hr123
Payroll Officer: payroll1@workzen.com / pay123
Admin:           admin@workzen.com / admin123
```

### Authentication Flow

1. **Signup** → Only 3 roles allowed (Employee, HR Officer, Payroll Officer)
2. **Login** → Returns token + user object with role
3. **Role-Based Redirect:**
   - Admin → `/dashboard/admin`
   - Employee → `/dashboard/employee`
   - HR Officer → `/dashboard/hr`
   - Payroll Officer → `/dashboard/payroll`
4. **Protected Routes** → PrivateRoute component checks token and role
5. **Logout** → Clears localStorage and redirects to `/login`

### API Endpoints

**Authentication Routes:**
- `POST /api/auth/register` - Register new user (roles: Employee, HR Officer, Payroll Officer)
  ```json
  {
    "name": "John Doe",
    "email": "john@company.com",
    "password": "password123",
    "role": "Employee"
  }
  ```
  ⚠️ Returns error if role is "Admin" or invalid

- `POST /api/auth/login` - Authenticate and get token
  ```json
  {
    "email": "employee1@workzen.com",
    "password": "emp123"
  }
  ```
  Returns: `{ token, user: { id, name, email, role } }`

- `GET /api/auth/users` - Get all registered users (debugging)

### Design Features
- **Dark Theme**: Consistent with WorkZen's Zoho-inspired design
- **Smooth Animations**: Powered by Framer Motion
- **Responsive**: Works seamlessly on all devices
- **Secure**: Token-based authentication with localStorage
- **User-Friendly**: Show/hide password toggles and clear error messages

### Admin Dashboard Features

The Admin Dashboard (`/dashboard/admin`) follows the Excalidraw HRMS workflow and includes:

**Layout:**
- **Left Sidebar**: Vertical navigation menu with Employees, Attendance, Time Off, Payroll, Reports, Settings
- **Top Bar**: 
  - Search field (filters employees by name/title)
  - "NEW" CTA button (add new employee)
  - Profile avatar dropdown (Profile / Logout)
- **Main Area**: Employee card grid with status indicators

**Quick Summary Widgets:**
- Total Employees (count)
- Present Today (green indicator)
- On Leave Today (blue airplane icon)
- Payroll This Month (currency format)

**Employee Card Grid:**
- 3 columns on desktop, 2 on tablet, 1 on mobile
- Each card displays:
  - Profile avatar (initials if no photo)
  - Employee name and job title
  - Status indicator in top-right corner:
    - 🟢 Green dot = Present in office
    - ✈️ Airplane icon = On leave
    - 🟡 Yellow dot = Absent (no time-off applied)
- Hover animations (shadow lift with Framer Motion)
- Click to open employee details panel

**Employee Details Panel:**
- Slides in from right side
- Shows full employee information (contact, department)
- Quick actions: Mark Attendance, Add Correction, View Payslip
- Close with X button or click backdrop

**Analytics:**
- Chart.js line chart showing 7-day attendance trend
- Pending leave approvals sidebar widget
- Status legend for quick reference

**How to Logout:**
- Click profile avatar (top-right)
- Select "Logout" from dropdown
- Clears all authentication data
- Redirects to `/login`

### Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/workzen-hrms
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - Employee login
- `POST /api/auth/register` - Register new employee
- `GET /api/auth/me` - Get current user profile

### Employees
- `GET /api/employees` - Get all employees (with pagination)
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Deactivate employee

### Attendance
- `POST /api/attendance/check-in` - Employee check-in
- `PUT /api/attendance/check-out` - Employee check-out
- `GET /api/attendance` - Get attendance records
- `GET /api/attendance/employee/:id/summary` - Get attendance summary

### Leave Management
- `POST /api/leave` - Apply for leave
- `GET /api/leave` - Get leave applications
- `PUT /api/leave/:id/approve` - Approve leave
- `PUT /api/leave/:id/reject` - Reject leave

### Payroll
- `POST /api/payroll/generate` - Generate payroll
- `GET /api/payroll` - Get payroll records
- `PUT /api/payroll/:id/process` - Process payroll
- `PUT /api/payroll/:id/pay` - Mark as paid

### Dashboard
- `GET /api/dashboard/overview` - Dashboard statistics
- `GET /api/dashboard/charts/attendance` - Attendance charts
- `GET /api/dashboard/charts/payroll` - Payroll charts
- `GET /api/dashboard/alerts` - System alerts

## 🎨 Customization

### Theme Configuration
The application supports dark and light themes. Theme preferences are stored in localStorage and applied globally.

### Styling
- Modify `frontend/src/styles/globals.css` for global styles
- Update `frontend/tailwind.config.js` for Tailwind configuration
- Customize components in `frontend/src/components/`

### API Configuration
- Add new routes in `backend/routes/`
- Create models in `backend/models/`
- Update validation in route handlers

## 🔧 Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend (if you add tests)
cd frontend
npm test
```

### Building for Production
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
npm start
```

## 📱 Mobile Responsiveness

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- Different screen sizes and orientations

  ## 🔒 Security Features

- JWT authentication with expiration
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Rate limiting
- Helmet security headers
- Data encryption at rest

## 📈 Performance

- Optimized bundle size with Next.js
- Lazy loading of components
- Database indexing for fast queries
- Caching strategies
- Compression middleware

  ## 📦 Deliverables

- ✅ Fully functional HRMS system
- 📁 Source code hosted on Git repository with meaningful commits
- 📊 Integrated dashboard with analytics
- 🧪 Real-world ERP workflows and business logic implementation

---

## 🧠 Why This Project Matters

- Learn how HR modules interact (e.g., Attendance → Payroll)
- Practice real-world problem solving beyond just coding
- Build scalable, maintainable ERP systems

---

## 🖼️ Mockup

Explore the UI mockup: [Excalidraw Link](https://link.excalidraw.com/l/65VNwvy7c4X/7gxoB8JymIS)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation in the `docs/` folder

---

Built with ❤️ for modern workplaces
