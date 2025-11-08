# Attendance Feature Implementation

## Overview
The attendance feature allows employees to mark their check-in and check-out times, and view their daily and monthly attendance logs.

## Features Implemented

### 1. Check-In/Check-Out System
- **Check-In**: Employees can mark their arrival time with a single click
- **Check-Out**: Employees can mark their departure time after checking in
- **Automatic Work Hours Calculation**: System calculates work hours based on check-in and check-out times
- **Location Tracking**: Optional geolocation capture (if browser supports it)
- **Device Information**: Captures browser user agent and IP address

### 2. Attendance Views

#### Daily View
- Table showing:
  - Date
  - Check-in time
  - Check-out time
  - Work hours
  - Status (Present/Late/Absent)
- Real-time status updates
- Last 30 days of attendance data

#### Monthly View
- Calendar grid showing:
  - Color-coded dates (Green=Present, Yellow=Late, Red=Absent)
  - Month/Year selector
  - Visual legend
- Easy month navigation

### 3. Today's Attendance Panel
- Shows current date and time
- Status indicator (Checked In / Not Checked In)
- Check-in time display
- Check-out time display
- Work hours for the day
- Conditional buttons (Check In or Check Out)

## Technical Implementation

### Frontend Components
**File**: `frontend/src/pages/DashboardEmployee.jsx`

#### State Variables
```javascript
const [todayAttendance, setTodayAttendance] = useState(null);
const [checkingIn, setCheckingIn] = useState(false);
const [checkingOut, setCheckingOut] = useState(false);
const [attendanceView, setAttendanceView] = useState('daily');
const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
```

#### Key Functions

1. **fetchTodayAttendance()**
   - Fetches today's attendance record
   - Gets user ID from localStorage
   - Filters by today's date
   - Updates `todayAttendance` state

2. **checkIn()**
   - Gets user/employee ID from localStorage
   - Captures geolocation (if available)
   - POSTs to `/api/attendance` with:
     - Employee ID
     - Check-in time
     - Location data
     - Method (web)
     - Device info
   - Shows success notification
   - Refreshes attendance list

3. **checkOut()**
   - Gets attendance record ID from `todayAttendance`
   - Captures geolocation (if available)
   - PUTs to `/api/attendance/:id` with:
     - Check-out time
     - Location data
     - Method (web)
     - Device info
   - Backend calculates work hours
   - Shows success notification
   - Refreshes attendance list

4. **fetchAttendance()**
   - Fetches last 30 days of attendance
   - Gets user ID from localStorage
   - Formats data for display
   - Updates KPIs and charts

### Backend API

**File**: `backend/controllers/attendanceController.js`

#### Endpoints

1. **POST /api/attendance** - Mark Check-In
   - Creates new attendance record
   - Validates employee ID
   - Checks for duplicate attendance on same date
   - Determines status (late if after 9:15 AM)
   - Stores location, device info, IP address
   - Returns created attendance record

2. **PUT /api/attendance/:id** - Mark Check-Out
   - Updates existing attendance record
   - Adds check-out data
   - Calculates work hours automatically
   - Returns updated attendance record

3. **GET /api/attendance** - Get Attendance Records
   - Filters by employee ID
   - Filters by date range
   - Supports pagination
   - Returns attendance summary

#### Business Logic

**Status Determination**:
- **Present**: Check-in before 9:15 AM
- **Late**: Check-in after 9:15 AM
- **Absent**: No check-in record

**Work Hours Calculation**:
```javascript
const checkInTime = new Date(attendance.checkIn.time);
const checkOutTime = new Date(attendance.checkOut.time);
const diffMs = checkOutTime - checkInTime;
const diffHours = diffMs / (1000 * 60 * 60);
attendance.workHours = Math.max(0, diffHours);
```

### Database Schema

**Collection**: `attendance`

```javascript
{
  employee: ObjectId (ref: 'Employee'),
  date: Date,
  checkIn: {
    time: Date,
    location: {
      latitude: Number,
      longitude: Number,
      address: String
    },
    method: String (web/mobile/biometric),
    ipAddress: String,
    deviceInfo: String
  },
  checkOut: {
    time: Date,
    location: { /* same structure */ },
    method: String,
    ipAddress: String,
    deviceInfo: String
  },
  status: String (present/absent/late/half-day/on-leave),
  workHours: Number,
  overtimeHours: Number,
  breakTime: {
    total: Number,
    breaks: [{ start: Date, end: Date }]
  },
  approved: Boolean,
  approvedBy: ObjectId (ref: 'Employee'),
  approvedAt: Date,
  notes: String
}
```

## User Flow

### Employee Check-In Flow
1. Employee navigates to Attendance tab
2. Sees "Today's Attendance" panel with current date/time
3. Clicks "Check In" button
4. System captures:
   - Current timestamp
   - Location (if permitted)
   - Device information
5. Backend creates attendance record
6. Success message displayed
7. UI updates to show "Checked In" status
8. Check-out button becomes available

### Employee Check-Out Flow
1. Employee clicks "Check Out" button (only visible after check-in)
2. System captures:
   - Current timestamp
   - Location (if permitted)
   - Device information
3. Backend updates attendance record
4. Backend calculates work hours
5. Success message displayed
6. UI shows total work hours
7. Status changes to "Attendance Complete"

### Viewing Attendance Logs
1. **Daily View**:
   - Shows table of last 30 days
   - Each row: Date, Check-in, Check-out, Hours, Status
   - Color-coded status badges

2. **Monthly View**:
   - Calendar grid for selected month/year
   - Color-coded dates
   - Select different months/years
   - Visual legend

## Features

### ✅ Implemented
- Check-in/Check-out functionality
- Real-time attendance tracking
- Daily attendance log view
- Monthly calendar view
- Automatic work hours calculation
- Status determination (Present/Late)
- Location capture
- Device tracking
- Duplicate prevention (one attendance per day)
- Last 30 days data display
- KPI integration (present days, late days)

### 🔮 Future Enhancements
- Break time tracking
- Overtime calculation
- Attendance approval workflow
- Biometric integration
- Mobile app support
- Attendance reports export
- Notifications for missed check-out
- Shift management
- Holiday management
- Leave integration (mark as on-leave)

## Testing Checklist

### Backend Tests
- [ ] POST /api/attendance creates new record
- [ ] POST /api/attendance prevents duplicate for same date
- [ ] POST /api/attendance marks late if after 9:15 AM
- [ ] PUT /api/attendance/:id updates check-out
- [ ] PUT /api/attendance/:id calculates work hours correctly
- [ ] GET /api/attendance filters by employee ID
- [ ] GET /api/attendance filters by date range

### Frontend Tests
- [ ] Check-in button visible when not checked in
- [ ] Check-in creates attendance record
- [ ] Check-in updates UI to show checked-in status
- [ ] Check-out button visible after check-in
- [ ] Check-out updates attendance record
- [ ] Work hours display correctly
- [ ] Daily view shows all records
- [ ] Monthly view shows color-coded calendar
- [ ] Month/year selector works
- [ ] Status badges show correct colors
- [ ] Page refresh maintains data

### Integration Tests
- [ ] Login as employee
- [ ] Navigate to Attendance tab
- [ ] Click Check In
- [ ] Verify record in MongoDB
- [ ] Click Check Out
- [ ] Verify work hours calculated
- [ ] View daily logs
- [ ] View monthly calendar
- [ ] Test with multiple days
- [ ] Test with different months

## Error Handling

### Frontend
- Invalid user ID → Alert shown
- Network error → Error logged, alert shown
- Geolocation denied → Continues without location
- Already checked in → Backend returns existing record

### Backend
- Missing employee ID → 400 Bad Request
- Duplicate attendance → 400 with message
- Invalid attendance ID → 404 Not Found
- Database error → 500 Server Error

## API Response Examples

### Check-In Success
```json
{
  "success": true,
  "message": "Attendance marked successfully",
  "attendance": {
    "_id": "64abc123...",
    "employee": "64abc456...",
    "date": "2024-01-15T00:00:00.000Z",
    "checkIn": {
      "time": "2024-01-15T08:30:00.000Z",
      "location": {
        "latitude": 40.7128,
        "longitude": -74.0060,
        "address": "Office"
      },
      "method": "web",
      "ipAddress": "192.168.1.1",
      "deviceInfo": "Mozilla/5.0..."
    },
    "status": "present"
  }
}
```

### Check-Out Success
```json
{
  "success": true,
  "message": "Attendance updated successfully",
  "attendance": {
    "_id": "64abc123...",
    "checkOut": {
      "time": "2024-01-15T17:30:00.000Z",
      "location": { /* same structure */ },
      "method": "web",
      "ipAddress": "192.168.1.1",
      "deviceInfo": "Mozilla/5.0..."
    },
    "workHours": 9.0,
    "status": "present"
  }
}
```

## Files Modified

### Frontend
- `frontend/src/pages/DashboardEmployee.jsx`
  - Added state variables for attendance
  - Added checkIn(), checkOut(), fetchTodayAttendance() functions
  - Updated fetchAttendance() to use real API
  - Replaced attendance UI with new check-in/out panel
  - Added daily view table
  - Added monthly calendar view

### Backend
- `backend/controllers/attendanceController.js`
  - Enhanced createAttendance() with location/device tracking
  - Enhanced updateAttendance() with automatic work hours calculation
  - Added status determination logic
  - Improved error handling

## Notes
- Geolocation requires HTTPS in production
- Browser may prompt for location permission
- Work hours calculated on server side for accuracy
- One attendance record per employee per day
- Late threshold: 9:15 AM (configurable)
