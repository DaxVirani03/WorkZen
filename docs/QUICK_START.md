# 🚀 WorkZen HRMS - Quick Start Guide

## Welcome to Your Local MERN Project!

This is a complete React-based HRMS landing page with Express backend.

---

## ⚡ 3-Step Quick Start

### Step 1: Start Backend Server

```powershell
cd backend
node server-simple.js
```

You should see:
```
🚀 WorkZen HRMS Backend server is running on port 5000
📍 Environment: development
🔗 API URL: http://localhost:5000
📊 Health check: http://localhost:5000/api/health
```

### Step 2: Start Frontend Server

Open a **new terminal** and run:

```powershell
cd frontend-react
npm run dev
```

You should see:
```
VITE v5.4.21  ready in 230 ms

➜  Local:   http://localhost:3000/
```

### Step 3: Open in Browser

Visit: **http://localhost:3000**

---

## 🎯 What You'll See

### Landing Page (/)
- **14 comprehensive sections** in one page
- Dark theme with smooth animations
- Scroll navigation
- Mobile responsive

### Additional Pages
- **/about** - About WorkZen HRMS
- **/pricing** - Pricing plans
- **/contact** - Contact form

---

## 📊 Test the API

### Method 1: Browser
Open these URLs in your browser:
- http://localhost:5000/api/users
- http://localhost:5000/api/attendance
- http://localhost:5000/api/payroll
- http://localhost:5000/api/leaves
- http://localhost:5000/api/health

### Method 2: PowerShell
```powershell
# Get users
Invoke-RestMethod -Uri http://localhost:5000/api/users

# Get attendance
Invoke-RestMethod -Uri http://localhost:5000/api/attendance

# Get payroll
Invoke-RestMethod -Uri http://localhost:5000/api/payroll

# Get leaves
Invoke-RestMethod -Uri http://localhost:5000/api/leaves
```

---

## 🎨 Customize the Landing Page

1. Open: `frontend-react/src/pages/LandingPage.jsx`
2. Find section comments:
   ```javascript
   {/* ==================== SECTION 1: HERO ==================== */}
   ```
3. Edit content, colors, or text
4. Save and see instant updates!

---

## 🔧 Common Commands

### Frontend
```powershell
cd frontend-react

# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

### Backend
```powershell
cd backend

# Run server
node server-simple.js

# With nodemon (if installed)
npm run dev
```

---

## 📁 Key Files

### Frontend
- `src/pages/LandingPage.jsx` - **ALL 14 sections here**
- `src/App.jsx` - React Router configuration
- `tailwind.config.js` - Colors and theme
- `vite.config.js` - Dev server settings

### Backend
- `server-simple.js` - Express server
- `controllers/*.js` - API logic with mock data
- `routes/*.js` - API routes

---

## 🎯 Project Structure

```
WorkZen-HRMS/
├── frontend-react/        ← React + Vite
│   └── src/
│       └── pages/
│           └── LandingPage.jsx  ← SINGLE FILE (14 sections)
│
└── backend/               ← Express API
    ├── server-simple.js   ← Main server
    └── controllers/       ← Mock data APIs
```

---

## 💡 Tips

1. **Hot Reload**: Frontend updates automatically on save
2. **API Testing**: Use browser DevTools Network tab
3. **Dark Theme**: Everything styled for dark mode (#000)
4. **Responsive**: Resize browser to test mobile view
5. **Animations**: Scroll to see Framer Motion effects

---

## 🐛 Troubleshooting

### Port Already in Use
```powershell
# Find process using port 3000 or 5000
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID <process_id> /F
```

### Cannot Find Module
```powershell
cd frontend-react
npm install

cd ../backend
npm install
```

### Page Not Loading
1. Check both servers are running
2. Clear browser cache (Ctrl+Shift+R)
3. Check console for errors (F12)

---

## 📚 Documentation

- **Root README**: `README-REACT-VERSION.md`
- **Frontend README**: `frontend-react/README.md`
- **Project Summary**: `PROJECT_SUMMARY.md`

---

## ✅ Success Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Landing page loads with all sections
- [ ] Navigation between pages works
- [ ] API endpoints return data
- [ ] Dark theme displays correctly
- [ ] Animations work on scroll

---

## 🎉 You're All Set!

**Frontend**: http://localhost:3000  
**Backend**: http://localhost:5000  
**API Docs**: http://localhost:5000  

Enjoy building with WorkZen HRMS! 🚀

---

**Need Help?**
- Check documentation files
- Review code comments
- Inspect browser console
- Check terminal logs
