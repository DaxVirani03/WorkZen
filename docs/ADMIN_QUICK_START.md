# Admin Dashboard - Quick Start Guide

## 🚀 Testing the Admin Dashboard

### Step 1: Start the Servers

Open two terminals:

**Terminal 1 - Backend:**
```powershell
cd "c:\Users\Rudra\Downloads\Odoo Workzen 11\WorkZen\backend"
node server-simple.js
```

**Terminal 2 - Frontend:**
```powershell
cd "c:\Users\Rudra\Downloads\Odoo Workzen 11\WorkZen\frontend"
npm run dev
```

### Step 2: Login as Admin

1. Open browser: http://localhost:3000/login
2. Enter credentials:
   - **Email**: `admin@workzen.com`
   - **Password**: `admin123`
3. Click "Sign In"
4. You'll be redirected to `/dashboard/admin`

### Step 3: Explore Features

#### Left Sidebar
Click through menu items:
- Employees
- Attendance
- Time Off
- Payroll
- Reports
- Settings

#### Search
Type in the search bar to filter employees:
- Try: "Sarah" or "Developer"

#### Employee Cards
- **Hover**: See shadow lift animation
- **Click**: Opens employee details panel
- **Status Indicators**:
  - 🟢 Green = Present
  - ✈️ Airplane = On Leave
  - 🟡 Yellow = Absent

#### Profile Dropdown
1. Click avatar (top-right corner)
2. Options:
   - **Profile**: Opens profile page
   - **Logout**: Signs out and returns to login

#### Profile Page
1. Click avatar → Profile
2. Click "Edit Profile"
3. Change name or email
4. Click "Save Changes"
5. Click "Back to Dashboard"

---

## 📊 What You'll See

### Quick Summary (Top)
- Total Employees: **9**
- Present Today: **6**
- On Leave: **2**
- Payroll: **$285,000**

### Attendance Chart
Line chart showing 7-day attendance trend (Mon-Sun)

### Pending Approvals
2 leave requests awaiting approval

### Employee Grid
9 employee cards with:
- Profile picture (initials)
- Name and job title
- Status indicator

---

## 🎯 Test All Features

### ✅ Authentication
- [x] Login redirects to admin dashboard
- [x] Profile dropdown works
- [x] Logout clears tokens

### ✅ Search
- [x] Filter by employee name
- [x] Filter by job title
- [x] "No results" message

### ✅ Employee Cards
- [x] All 9 cards visible
- [x] Status colors correct
- [x] Hover animation works
- [x] Click opens panel

### ✅ Details Panel
- [x] Slides in from right
- [x] Shows employee info
- [x] Quick actions buttons
- [x] Close button works
- [x] Backdrop click closes

### ✅ Profile Page
- [x] Displays user info
- [x] Edit mode works
- [x] Save updates data
- [x] Back button works

---

## 🎨 Design Verification

All elements should use:
- **Background**: Black (#000)
- **Cards**: Dark gray with blur
- **Primary**: Blue (#005eb8)
- **Accent**: Gold (#f2c744)
- **Smooth animations**: Framer Motion

---

## 🐛 Troubleshooting

### Backend Not Starting
```powershell
# Check if port 5000 is in use
netstat -ano | findstr :5000

# If occupied, kill the process or change port in .env
```

### Frontend Not Starting
```powershell
# Clear cache and reinstall
rm -r node_modules
npm install
npm run dev
```

### Login Fails
- Verify backend is running on port 5000
- Check browser console for errors
- Verify credentials: `admin@workzen.com` / `admin123`

### Page Not Found
- Clear browser cache
- Check route in App.jsx
- Verify imports in App.jsx

---

## 📱 Mobile Testing

Resize browser window to test responsive design:
- **Desktop (>1024px)**: 3-column grid
- **Tablet (768-1023px)**: 2-column grid
- **Mobile (<768px)**: 1-column grid

---

## ✅ Success Criteria

After testing, you should have:
1. ✅ Logged in as Admin
2. ✅ Seen the admin dashboard
3. ✅ Searched for employees
4. ✅ Clicked employee cards
5. ✅ Opened details panel
6. ✅ Viewed profile page
7. ✅ Logged out successfully

---

## 🎉 Congratulations!

You've successfully tested the Admin Dashboard. All features are working as designed.

**Next Steps:**
- Customize employee data
- Add backend API integration
- Implement real authentication
- Add more admin features
