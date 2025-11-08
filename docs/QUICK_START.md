# 🚀 Quick Start Guide - WorkZen HRMS

## Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- Git

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/DaxVirani03/WorkZen.git
cd WorkZen
```

### 2. Backend Setup

```powershell
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server (default port 5000)
node server-simple.js
```

**Backend will be running at:** `http://localhost:5001`

### 3. Frontend Setup

Open a **new terminal window**:

```powershell
# Navigate to frontend directory
cd frontend

# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev
```

**Frontend will be running at:** `http://localhost:3000`

### 4. Open in Browser

Visit: **http://localhost:3000**

## � Quick Test Authentication

### Demo Login Credentials
```
Email: admin@workzen.com
Password: admin123
```

### Test the Authentication Flow

1. **Sign Up** - Navigate to `/signup` and create a new account
2. **Login** - Use the demo credentials above at `/login`
3. **Dashboard** - After login, you'll see your dashboard at `/dashboard`
4. **Logout** - Click the logout button to clear authentication

## �🔌 API Endpoints

Test the backend API:

### Health Check
```bash
GET http://localhost:5000/api/health
```

### Authentication
```bash
# Register new user
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@company.com",
  "password": "password123",
  "role": "Employee"
}

# Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@workzen.com",
  "password": "admin123"
}

# Get all users (debugging)
GET http://localhost:5000/api/auth/users
```

### Users
```bash
GET http://localhost:5001/api/users
GET http://localhost:5001/api/users/:id
```

### Attendance
```bash
GET http://localhost:5001/api/attendance
POST http://localhost:5001/api/attendance
```

### Payroll
```bash
GET http://localhost:5001/api/payroll
POST http://localhost:5001/api/payroll/process
```

### Leaves
```bash
GET http://localhost:5001/api/leaves
POST http://localhost:5001/api/leaves
PUT http://localhost:5001/api/leaves/:id/approve
```

## 🛠️ Troubleshooting

### Port Already in Use

**Problem:** Backend port 5001 or frontend port 3000 is already in use.

**Solution:**
```powershell
# For backend, use a different port
$env:PORT="5002"
node server-simple.js

# For frontend, update vite.config.js:
# Change "port: 3000" to "port: 3001"
```

### Module Not Found

**Problem:** Missing dependencies.

**Solution:**
```powershell
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### CORS Errors

**Problem:** Frontend can't connect to backend.

**Solution:**
- Check that backend is running on port 5001
- Check vite.config.js proxy settings
- Ensure CORS is enabled in backend

## 📁 Project Structure

```
WorkZen/
├── backend/          # Express.js API (Port 5001)
├── frontend/         # React App (Port 3000)
├── docs/             # Documentation
└── README.md
```

## ✨ Features

- ✅ Employee Management
- ✅ Attendance Tracking
- ✅ Payroll Processing
- ✅ Leave Management
- ✅ HR Analytics Dashboard
- ✅ Core HR Functions
- ✅ Responsive Design
- ✅ Dark Theme

## 🎯 Development Mode

Both servers support hot-reload:
- Backend: Uses nodemon (install with `npm install -g nodemon`)
- Frontend: Vite dev server (automatic hot-reload)

## 📝 Environment Variables

### Backend (.env)
```
PORT=5001
NODE_ENV=development
```

### Frontend
No `.env` file needed for development. Configuration is in `vite.config.js`.

## 🌐 Production Build

### Frontend
```bash
cd frontend
npm run build
# Output in frontend/dist/
```

### Backend
```bash
cd backend
npm start
# Uses server.js (production ready)
```

## 📚 Additional Resources

- Full Documentation: `docs/PROJECT_STATUS.md`
- Progress History: `docs/progress.txt`
- API Documentation: Coming soon

## 🆘 Need Help?

- Check `docs/` folder for detailed documentation
- Open an issue on GitHub
- Review the code comments

---

**Happy Coding! 🎉**
