# 🧪 Authentication Testing Checklist

Use this checklist to verify that all authentication features are working correctly.

---

## 🚀 Pre-Testing Setup

### Start Servers

- [ ] **Backend Server Running**
  ```powershell
  cd backend
  node server-simple.js
  ```
  - Expected: `🚀 WorkZen HRMS Backend server is running on port 5000`
  - URL: http://localhost:5000

- [ ] **Frontend Server Running**
  ```powershell
  cd frontend
  npm run dev
  ```
  - Expected: `ready - started server on 0.0.0.0:3000`
  - URL: http://localhost:3000

---

## ✅ Frontend Testing

### Landing Page Navigation
- [ ] Visit http://localhost:3000
- [ ] Verify "Login" button visible in header (desktop)
- [ ] Verify "Sign Up" button visible in header (desktop)
- [ ] Click hamburger menu (mobile) - verify Login/Signup links present
- [ ] Click "Login" button → redirects to `/login`
- [ ] Click "Sign Up" button → redirects to `/signup`
- [ ] Click "WorkZen" logo → returns to home

---

### Sign-Up Page (`/signup`)
- [ ] Navigate to http://localhost:3000/signup
- [ ] **Visual Check:**
  - [ ] Dark background with gradient orbs
  - [ ] Centered card with proper styling
  - [ ] All form fields visible
  - [ ] Icons present for each field

- [ ] **Form Fields:**
  - [ ] Full Name input works
  - [ ] Email input works
  - [ ] Role dropdown works (Employee/HR/Admin)
  - [ ] Password input works
  - [ ] Confirm Password input works
  - [ ] Show/hide password toggles work

- [ ] **Validation Tests:**
  - [ ] Submit empty form → shows error
  - [ ] Submit with mismatched passwords → shows "Passwords do not match"
  - [ ] Submit with password < 6 chars → shows error
  - [ ] Submit with invalid email → shows error

- [ ] **Successful Registration:**
  - [ ] Fill form with valid data:
    - Name: `Test User`
    - Email: `test@company.com`
    - Role: `Employee`
    - Password: `test123`
    - Confirm: `test123`
  - [ ] Click "Create Account"
  - [ ] Loading spinner appears
  - [ ] Redirects to `/login` on success

- [ ] **Links Work:**
  - [ ] "Login →" link goes to `/login`
  - [ ] "← Back to Home" link goes to `/`

---

### Login Page (`/login`)
- [ ] Navigate to http://localhost:3000/login
- [ ] **Visual Check:**
  - [ ] Dark background with gradient orbs
  - [ ] Centered card with proper styling
  - [ ] "Welcome Back to WorkZen HRMS" heading
  - [ ] Demo credentials hint visible

- [ ] **Form Fields:**
  - [ ] Email input works
  - [ ] Password input works
  - [ ] Show/hide password toggle works

- [ ] **Validation Tests:**
  - [ ] Submit empty form → shows error
  - [ ] Submit with wrong credentials → shows "Invalid credentials"
  - [ ] Test with demo credentials:
    - Email: `admin@workzen.com`
    - Password: `admin123`

- [ ] **Successful Login:**
  - [ ] Enter demo credentials
  - [ ] Click "Login to Dashboard"
  - [ ] Loading spinner appears
  - [ ] Redirects to `/dashboard`
  - [ ] Check localStorage has `authToken`, `userRole`, `userEmail`

- [ ] **Links Work:**
  - [ ] "Sign Up →" link goes to `/signup`
  - [ ] "← Back to Home" link goes to `/`

---

### Dashboard Page (`/dashboard`)
- [ ] After login, should be at http://localhost:3000/dashboard
- [ ] **Header:**
  - [ ] "WorkZen HRMS" logo visible
  - [ ] "Welcome back, [Name]" displayed
  - [ ] "Logout" button visible

- [ ] **Profile Card:**
  - [ ] Name displayed correctly
  - [ ] Email displayed correctly
  - [ ] Role displayed correctly
  - [ ] Icons present for each field

- [ ] **Quick Stats:**
  - [ ] 4 stat cards visible
  - [ ] Icons displayed
  - [ ] Mock numbers shown

- [ ] **Quick Actions:**
  - [ ] 6 action buttons visible
  - [ ] Icons displayed
  - [ ] Hover effects work

- [ ] **Logout Test:**
  - [ ] Click "Logout" button
  - [ ] Redirects to `/login`
  - [ ] Check localStorage cleared

---

### Protected Route Test
- [ ] Clear localStorage: Open DevTools → Console → `localStorage.clear()`
- [ ] Try to visit http://localhost:3000/dashboard directly
- [ ] Should automatically redirect to `/login`
- [ ] Login again and verify you can access dashboard

---

## 🔌 Backend API Testing

### Health Check
- [ ] Open http://localhost:5000/api/health in browser
- [ ] Should return JSON with `success: true`

### Register Endpoint (PowerShell)
```powershell
$body = @{
    name = "Jane Doe"
    email = "jane@company.com"
    password = "password123"
    role = "HR"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Body $body -ContentType "application/json"
```
- [ ] Returns 201 status
- [ ] Returns success message
- [ ] Returns user object (without password)

### Login Endpoint (PowerShell)
```powershell
$body = @{
    email = "admin@workzen.com"
    password = "admin123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```
- [ ] Returns 200 status
- [ ] Returns success message
- [ ] Returns token
- [ ] Returns user role

### Invalid Login Test (PowerShell)
```powershell
$body = @{
    email = "wrong@email.com"
    password = "wrongpassword"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```
- [ ] Returns 401 status
- [ ] Returns "Invalid credentials" message

### Get Users Endpoint
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/users" -Method GET
```
- [ ] Returns list of users
- [ ] Passwords not included in response
- [ ] Admin user present

---

## 📱 Responsive Testing

### Mobile View (resize browser to < 768px)
- [ ] **Landing Page:**
  - [ ] Mobile menu works
  - [ ] Login/Signup buttons accessible

- [ ] **Login Page:**
  - [ ] Form fits on screen
  - [ ] Buttons are touch-friendly
  - [ ] Text is readable

- [ ] **Signup Page:**
  - [ ] All fields accessible
  - [ ] Form scrolls properly
  - [ ] Buttons work on touch

- [ ] **Dashboard:**
  - [ ] Header responsive
  - [ ] Stats stack vertically
  - [ ] Actions grid adjusts

---

## 🎨 Animation Testing

### Page Transitions
- [ ] Login page fades in smoothly
- [ ] Signup page fades in smoothly
- [ ] Dashboard loads with animation

### Form Interactions
- [ ] Input fields glow on focus
- [ ] Buttons scale on hover
- [ ] Buttons scale on click
- [ ] Error messages slide in

### Background Effects
- [ ] Gradient orbs visible
- [ ] Orbs animate (float effect)
- [ ] Backdrop blur works

---

## 🔒 Security Testing

### Password Visibility
- [ ] Passwords hidden by default
- [ ] Eye icon toggles visibility
- [ ] Toggle works independently for each field

### Form Validation
- [ ] Email format validated
- [ ] Password length validated (min 6)
- [ ] Password match validated
- [ ] Required fields validated

### Token Management
- [ ] Token saved to localStorage on login
- [ ] Token removed on logout
- [ ] Dashboard checks for token
- [ ] Redirects work properly

---

## ✅ All Tests Pass?

If all items are checked, your authentication system is working perfectly! 🎉

### Common Issues & Solutions

**Backend not connecting:**
- Check if server is running on port 5000
- Verify no other service using port 5000
- Check console for errors

**Frontend errors:**
- Clear browser cache
- Delete `node_modules` and run `npm install` again
- Check browser console for errors

**Login not working:**
- Verify backend is running
- Check Network tab in DevTools
- Verify credentials are correct
- Check backend console logs

**Dashboard redirect issues:**
- Clear localStorage
- Login again
- Check browser console for errors

---

## 📝 Test Results

**Date Tested:** _______________

**Tested By:** _______________

**Status:** ⬜ Pass  ⬜ Fail

**Notes:**
_______________________________________
_______________________________________
_______________________________________
