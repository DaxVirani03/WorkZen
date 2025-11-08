# Leave Management Testing Guide

## 🎯 Overview
Complete end-to-end testing guide for the Employee Leave Submission workflow.

**Flow**: Employee Submit → MongoDB Persist → HR/Payroll Approve/Reject → Database Update

---

## 📋 Prerequisites

1. **MongoDB** running at `127.0.0.1:27017`
2. **MongoDB Compass** installed (for visual verification)
3. **Backend server** ready at port 5000
4. **Frontend dev server** ready at port 3000

---

## 🚀 Step-by-Step Testing

### Step 1: Start MongoDB
```powershell
# Verify MongoDB is running
mongosh --eval "db.version()"
```

### Step 2: Seed the Database
```powershell
cd backend
npm run seed
```

**Expected Output**:
- ✅ Connected to MongoDB
- ✅ Cleared existing data
- ✅ Created 6 users
- ✅ Created 6 employees
- Test credentials displayed

**Test Users Created**:
- Admin: `admin@workzen.com` / `admin123`
- Employee: `employee@workzen.com` / `employee123`
- HR Officer: `hr@workzen.com` / `hr123`
- Payroll: `payroll@workzen.com` / `payroll123`

### Step 3: Start Backend Server
```powershell
cd backend
npm run dev
```

**Expected Output**:
```
Server running on port 5000
✅ MongoDB Connected
📁 Collections: users, employees, leaverequests
```

### Step 4: Start Frontend Server
```powershell
cd frontend
npm run dev
```

**Expected Output**:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:3000/
```

---

## 🧪 Test Scenarios

### Scenario 1: Employee Submit Leave Request

**Steps**:
1. Navigate to `http://localhost:3000`
2. Login as `employee@workzen.com` / `employee123`
3. Click **Time Off** in sidebar
4. Click **Request Leave**
5. Fill form:
   - Type: `Vacation`
   - From: `2025-11-20`
   - To: `2025-11-22`
   - Reason: `Family vacation`
6. Click **Submit Request**

**Expected Browser Console**:
```
📝 Employee - Submitting leave: {type: "Vacation", from: "2025-11-20", ...}
✅ Employee - Leave submitted: {success: true, message: "Leave created", ...}
🔍 Employee - Fetched leaves: {success: true, count: 1, leaves: [...]}
```

**Expected UI**:
- Modal closes
- Success toast appears
- New leave appears in "My Leave Requests" table with status "Pending"

**Verify in MongoDB Compass**:
1. Open MongoDB Compass
2. Connect to `mongodb://127.0.0.1:27017`
3. Navigate to `workzen_hrms` → `leaverequests` collection
4. You should see:
```json
{
  "_id": "...",
  "userId": "...",
  "employee": "...",
  "type": "Vacation",
  "from": "2025-11-20T00:00:00.000Z",
  "to": "2025-11-22T00:00:00.000Z",
  "reason": "Family vacation",
  "status": "Pending",
  "email": "employee@workzen.com",
  "userEmail": "employee@workzen.com",
  "createdAt": "..."
}
```

---

### Scenario 2: HR Officer Approve Leave

**Steps**:
1. Logout from Employee account
2. Login as `hr@workzen.com` / `hr123`
3. Click **Leave Requests** in sidebar
4. Find the pending leave request
5. Click **Approve** button
6. Confirm the dialog

**Expected Browser Console**:
```
📋 HR - Fetched leaves: {success: true, count: 1, leaves: [...]}
✅ HR - Approving leave: <leave-id>
✅ HR - Leave approved: {success: true, message: "Leave approved", ...}
📋 HR - Fetched leaves: {success: true, count: 1, leaves: [...]}
```

**Expected UI**:
- Success toast appears
- Leave status changes to "Approved"
- Leave disappears from "Pending" section (if filtered)

**Verify in MongoDB Compass**:
1. Refresh the `leaverequests` collection
2. The document should show:
```json
{
  ...
  "status": "Approved",
  "approverId": "...",
  "approvedAt": "2025-11-17T...",
  ...
}
```

3. Check `users` collection
4. Find the employee user
5. Verify `leaveBalance.annual` decreased by 3 days (if Vacation type)

---

### Scenario 3: HR Officer Reject Leave

**Steps**:
1. Submit another leave request as Employee
2. Login as HR Officer
3. Click **Reject** on the leave request
4. Enter rejection reason: `Insufficient staff coverage`
5. Confirm

**Expected Browser Console**:
```
❌ HR - Rejecting leave: <leave-id>
❌ HR - Leave rejected: {success: true, message: "Leave rejected", ...}
```

**Verify in MongoDB Compass**:
```json
{
  ...
  "status": "Rejected",
  "approverId": "...",
  "rejectedAt": "2025-11-17T...",
  "comments": "Insufficient staff coverage",
  ...
}
```

**Note**: Leave balance should NOT decrease for rejected leaves.

---

## 🔧 API Testing with cURL

### 1. Create Leave Request
```powershell
curl -X POST http://localhost:5000/api/leaves `
  -H "Content-Type: application/json" `
  -d '{\"type\":\"Sick Leave\",\"from\":\"2025-11-18\",\"to\":\"2025-11-20\",\"reason\":\"Medical appointment\",\"email\":\"employee@workzen.com\"}'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Leave request created successfully",
  "leave": {
    "_id": "...",
    "type": "Sick Leave",
    "from": "2025-11-18T00:00:00.000Z",
    "to": "2025-11-20T00:00:00.000Z",
    "status": "Pending",
    "userId": {
      "name": "John Doe",
      "email": "employee@workzen.com"
    },
    ...
  }
}
```

### 2. List All Leaves
```powershell
curl http://localhost:5000/api/leaves
```

**Expected Response**:
```json
{
  "success": true,
  "count": 2,
  "leaves": [...]
}
```

### 3. Filter Leaves by Email
```powershell
curl "http://localhost:5000/api/leaves?email=employee@workzen.com"
```

### 4. Filter Leaves by Status
```powershell
curl "http://localhost:5000/api/leaves?status=Pending"
```

### 5. Get Single Leave by ID
```powershell
# Replace <leave-id> with actual MongoDB ObjectId
curl http://localhost:5000/api/leaves/<leave-id>
```

**Expected Response**:
```json
{
  "success": true,
  "leave": {
    "_id": "...",
    "type": "Vacation",
    ...
  }
}
```

### 6. Approve Leave
```powershell
# Replace <leave-id> and <hr-user-id> with actual values
curl -X PUT http://localhost:5000/api/leaves/<leave-id> `
  -H "Content-Type: application/json" `
  -d '{\"status\":\"Approved\",\"approverId\":\"<hr-user-id>\"}'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Leave request approved successfully",
  "leave": {
    "_id": "...",
    "status": "Approved",
    "approvedAt": "...",
    ...
  }
}
```

### 7. Reject Leave
```powershell
curl -X PUT http://localhost:5000/api/leaves/<leave-id> `
  -H "Content-Type: application/json" `
  -d '{\"status\":\"Rejected\",\"approverId\":\"<hr-user-id>\",\"comments\":\"Not enough leave balance\"}'
```

### 8. Delete Leave (Admin only)
```powershell
curl -X DELETE http://localhost:5000/api/leaves/<leave-id>
```

---

## 🐛 Troubleshooting

### Issue: "Failed to submit leave"

**Check**:
1. Browser console for error details
2. Backend terminal for error logs
3. MongoDB connection status

**Common Causes**:
- Backend not running
- MongoDB not connected
- Invalid date format (should be YYYY-MM-DD)
- Email doesn't exist in database

**Solution**:
```powershell
# Check backend logs
cd backend
npm run dev

# Verify user exists
mongosh workzen_hrms --eval "db.users.findOne({email: 'employee@workzen.com'})"
```

---

### Issue: "Leave not appearing in HR dashboard"

**Check**:
1. Browser Network tab for `/api/leaves` response
2. MongoDB Compass for document existence
3. Console for filtering logic

**Solution**:
```javascript
// In HR dashboard console
fetch('/api/leaves').then(r => r.json()).then(console.log)
```

---

### Issue: "Leave balance not decreasing"

**Check**:
1. Leave type mapping in `leaveRequestController.js`:
   - `Vacation` → `annual`
   - `Sick Leave` → `sick`
   - `Personal Leave` → `personal`
   - `Casual Leave` → `casual`

2. Verify in MongoDB:
```powershell
mongosh workzen_hrms --eval "db.users.findOne({email: 'employee@workzen.com'}, {leaveBalance: 1})"
```

**Expected Output**:
```json
{
  "leaveBalance": {
    "annual": 12,  // Should decrease after approval
    "sick": 10,
    "personal": 5,
    "casual": 7
  }
}
```

---

### Issue: CORS Errors

**Check**:
- Backend `.env`: `FRONTEND_URL=http://localhost:3000`
- Backend `server.js`: CORS origin matches frontend URL
- Vite proxy configuration in `vite.config.js`

**Solution**:
```javascript
// backend/server.js
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

---

## ✅ Verification Checklist

- [ ] MongoDB running and accessible
- [ ] Database seeded with test users
- [ ] Backend server started (port 5000)
- [ ] Frontend server started (port 3000)
- [ ] Employee can submit leave request
- [ ] Leave appears in MongoDB `leaverequests` collection
- [ ] Leave appears in Employee dashboard
- [ ] Leave appears in HR dashboard
- [ ] HR can approve leave
- [ ] Leave status updates in MongoDB
- [ ] Leave balance decreases in `users` collection
- [ ] HR can reject leave
- [ ] Rejected leave doesn't affect balance
- [ ] All console logs show success (✅) messages
- [ ] No console errors

---

## 📊 Expected Database State After Testing

**Collection: `leaverequests`**
```
2-3 documents (Pending/Approved/Rejected states)
```

**Collection: `users`**
```
6 documents with updated leaveBalance for employee
```

**Collection: `employees`**
```
6 documents (unchanged)
```

---

## 🎓 Learning Points

1. **Field Name Consistency**: Frontend and backend must use matching field names
2. **MongoDB References**: Use `populate()` to join User and Employee data
3. **Leave Balance Logic**: Only approved leaves deduct balance
4. **Console Logging**: Emoji prefixes (📝✅❌🔍) help track request flow
5. **Error Handling**: Always show specific error messages to user
6. **Date Handling**: Store as ISODate, display as formatted strings

---

## 🚀 Next Steps

1. **Add Authentication**: Uncomment auth middleware in `routes/leaves.js`
2. **Add Pagination**: Implement limit/skip for large datasets
3. **Add Email Notifications**: Send emails on leave approval/rejection
4. **Add Leave History**: Track all status changes
5. **Add Reports**: Generate leave balance reports
6. **Add Calendar View**: Visual calendar for leave planning

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Check backend terminal for logs
3. Verify MongoDB Compass shows expected data
4. Review this testing guide step-by-step
5. Check `backend/controllers/leaveRequestController.js` console logs

---

**Last Updated**: November 17, 2025
**Version**: 1.0.0
**Status**: ✅ Fully Functional
