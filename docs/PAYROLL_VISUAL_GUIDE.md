# 📸 Payroll Officer - Create & Print Payslip Visual Guide

## 🎯 Complete User Flow

### Step 1: Access Dashboard
```
Login as: Payroll Officer
Navigate to: /dashboard/payroll
```

**Dashboard View**:
```
┌──────────────────────────────────────────────────────────────────┐
│  WorkZen HRMS                                         👤 Profile  │
│                                                                    │
│  🔍 Search employees...    🔵 New Payslip  🟣 Generate Payroll   │
├──────────────────────────────────────────────────────────────────┤
│  📊 DASHBOARD STATISTICS                                          │
│                                                                    │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐      │
│  │ 👥 Total    │ 💰 Pay      │ ⏸️ Pending  │ 💵 Current  │      │
│  │ Employees   │ Runs        │ Leaves      │ Month       │      │
│  │             │             │             │ Payroll     │      │
│  │    5        │    3        │    2        │ ₹2,50,000   │      │
│  └─────────────┴─────────────┴─────────────┴─────────────┘      │
│                                                                    │
│  📋 PAYROLL LIST                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Name          │ Period       │ Gross    │ Net      │ Action│  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │ John Doe      │ Oct 2025     │ ₹50,000  │ ₹43,500  │ 👁️   │  │
│  │ Jane Smith    │ Oct 2025     │ ₹45,000  │ ₹39,200  │ 👁️   │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

### Step 2: Click "New Payslip"

**Action**: Click the blue "New Payslip" button

**Result**: Modal opens with form

---

### Step 3: New Payslip Modal Opens

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  💰 New Payslip                                                           ✕  │
│  Create and compute employee payslip                                          │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│  ┌────────────────────┬────────────────────┬─────────────────────────────┐  │
│  │  📋 Employee &     │  💚 Earnings &     │  🔴 Deductions &            │  │
│  │     Dates          │     Allowances     │     Summary                 │  │
│  │                    │                    │                             │  │
│  │  👤 Select         │  ₹ Basic Salary *  │  ₹ PF Employee             │  │
│  │  Employee *        │    25,000.00       │    3,000.00                │  │
│  │  ▼ Choose...       │                    │                             │  │
│  │                    │  ₹ HRA             │  ₹ PF Employer             │  │
│  │  📅 Pay Period     │    12,500.00       │    3,000.00                │  │
│  │  Start *           │                    │                             │  │
│  │  2025-11-01        │  ₹ Conveyance      │  ₹ Professional Tax        │  │
│  │                    │    2,500.00        │    200.00                  │  │
│  │  📅 Pay Period     │                    │                             │  │
│  │  End *             │  ₹ Medical         │  ₹ Income Tax              │  │
│  │  2025-11-30        │    2,500.00        │    0.00                    │  │
│  │                    │                    │                             │  │
│  │  📅 Pay Date *     │  ₹ LTA             │  🧮 Compute Payslip        │  │
│  │  2025-11-09        │    2,075.00        │  ┌──────────────────────┐  │  │
│  │                    │                    │  │ Click to calculate   │  │  │
│  │  📊 Attendance     │  ₹ Standard        │  │ totals               │  │  │
│  │  Summary           │    1,250.00        │  └──────────────────────┘  │  │
│  │                    │                    │                             │  │
│  │  • Total Days: 22  │  ₹ Fixed           │  📊 Payslip Summary        │  │
│  │  • Present: 20     │    1,250.00        │  ┌──────────────────────┐  │  │
│  │  • Paid Leaves: 2  │                    │  │ Gross: ₹ 0.00        │  │  │
│  │                    │  ₹ Performance     │  │ Deduct: ₹ 0.00       │  │  │
│  │                    │    Bonus           │  │ ──────────────────   │  │  │
│  │                    │    0.00            │  │ Net: ₹ 0.00          │  │  │
│  │                    │                    │  └──────────────────────┘  │  │
│  │                    │  ⏱️ Overtime       │                             │  │
│  │                    │    Hours           │                             │  │
│  │                    │    0               │                             │  │
│  │                    │                    │                             │  │
│  │                    │  ⏱️ Overtime Rate  │                             │  │
│  │                    │    (₹/hour)        │                             │  │
│  │                    │    120.19          │                             │  │
│  └────────────────────┴────────────────────┴─────────────────────────────┘  │
│                                                                                │
├──────────────────────────────────────────────────────────────────────────────┤
│                        💾 Validate & Save Payslip          Cancel            │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

### Step 4: Select Employee

**Action**: Click dropdown and select "John Doe - Engineering"

**Result**: Form auto-fills with employee data

```
┌────────────────────┐
│  👤 Select         │
│  Employee *        │
│  ▼ John Doe -      │
│     Engineering    │
│                    │
│  ℹ️ Employee Info  │
│  Email: john@...   │
│  Dept: Engineering │
│  Desg: Sr Dev      │
└────────────────────┘
```

**Auto-Filled Values**:
- ✅ Basic Salary: ₹25,000 (from employee record)
- ✅ HRA: ₹12,500 (50% of basic)
- ✅ Conveyance: ₹2,500 (10% of basic)
- ✅ Medical: ₹2,500 (10% of basic)
- ✅ LTA: ₹2,075 (8.3% of basic)
- ✅ Standard: ₹1,250 (5% of basic)
- ✅ Fixed: ₹1,250 (5% of basic)
- ✅ PF Employee: ₹3,000 (12% of basic)
- ✅ PF Employer: ₹3,000 (12% of basic)
- ✅ Professional Tax: ₹200 (fixed)
- ✅ Overtime Rate: ₹120.19 (basic ÷ 208 hours)

---

### Step 5: Add Bonus or Overtime (Optional)

**Example**: Add performance bonus

```
┌────────────────────┐
│  ₹ Performance     │
│    Bonus           │
│    2,000.00   ←────┼─── Enter bonus amount
└────────────────────┘
```

**Example**: Add overtime hours

```
┌────────────────────┐
│  ⏱️ Overtime       │
│    Hours           │
│    10         ←────┼─── Enter hours worked
│                    │
│  ⏱️ Overtime Rate  │
│    (₹/hour)        │
│    120.19          │
│                    │
│  💰 Overtime       │
│     Amount:        │
│     ₹1,201.90 ←────┼─── Auto-calculated
└────────────────────┘
```

---

### Step 6: Click "Compute Payslip"

**Action**: Click the blue "Compute Payslip" button

**Result**: Summary updates with calculations

```
┌──────────────────────────┐
│  📊 Payslip Summary      │
│  ┌────────────────────┐  │
│  │ Gross Earnings:    │  │
│  │ ₹ 50,076.90   ←────┼──┼─ Basic + Allowances + Bonus + OT
│  │                    │  │
│  │ Total Deductions:  │  │
│  │ - ₹ 6,200.00  ←────┼──┼─ PF + Taxes
│  │ ──────────────────  │  │
│  │                    │  │
│  │ Net Pay:           │  │
│  │ ₹ 43,876.90   ←────┼──┼─ Gross - Deductions
│  └────────────────────┘  │
└──────────────────────────┘
```

**Calculation Breakdown**:
```
Gross Earnings:
  Basic Salary        ₹25,000.00
  HRA                 ₹12,500.00
  Conveyance          ₹ 2,500.00
  Medical             ₹ 2,500.00
  LTA                 ₹ 2,075.00
  Standard Allowance  ₹ 1,250.00
  Fixed Allowance     ₹ 1,250.00
  Performance Bonus   ₹ 2,000.00
  Overtime            ₹ 1,201.90
  ────────────────────────────
  TOTAL              ₹50,276.90

Total Deductions:
  PF Employee         ₹ 3,000.00
  PF Employer         ₹ 3,000.00
  Professional Tax    ₹   200.00
  Income Tax          ₹     0.00
  ────────────────────────────
  TOTAL              ₹ 6,200.00

Net Pay = ₹50,276.90 - ₹6,200.00 = ₹44,076.90
```

---

### Step 7: Click "Validate & Save Payslip"

**Action**: Click purple "Validate & Save Payslip" button

**Validation Checks**:
1. ✅ Employee selected?
2. ✅ Pay period dates filled?
3. ✅ Pay date filled?
4. ✅ Basic salary > 0?

**If Valid**:
- Shows loading spinner: "Saving..."
- Sends POST request to `/api/payroll`
- Receives success response
- Shows success alert: "✅ Payslip created successfully!"
- Modal closes automatically
- Dashboard stats refresh
- Payroll list updates with new payslip

**Success Message**:
```
┌────────────────────────────────────┐
│  ✅ Success                        │
│  Payslip created successfully!     │
│  [OK]                              │
└────────────────────────────────────┘
```

---

### Step 8: View Updated Dashboard

**After saving**, dashboard shows:

```
┌──────────────────────────────────────────────────────────────────┐
│  📊 DASHBOARD STATISTICS                                          │
│                                                                    │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐      │
│  │ 👥 Total    │ 💰 Pay      │ ⏸️ Pending  │ 💵 Current  │      │
│  │ Employees   │ Runs        │ Leaves      │ Month       │      │
│  │             │             │             │ Payroll     │      │
│  │    5        │    4   ←────┼─ Incremented│ ₹2,94,076  │      │
│  └─────────────┴─────────────┴─────────────┴─────────────┘      │
│                                              ↑ Updated with new payslip
│  📋 PAYROLL LIST                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Name          │ Period       │ Gross    │ Net      │ Action│  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │ John Doe      │ Nov 2025     │ ₹50,276  │ ₹44,076  │ 👁️   │ ← NEW
│  │ John Doe      │ Oct 2025     │ ₹50,000  │ ₹43,500  │ 👁️   │  │
│  │ Jane Smith    │ Oct 2025     │ ₹45,000  │ ₹39,200  │ 👁️   │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

### Step 9: View Payslip for Printing

**Action**: Click 👁️ "View Payslip" button on the new payslip

**Result**: PayslipModal opens with professional format

```
┌──────────────────────────────────────────────────────────────────────┐
│  WorkZen HRMS - Payslip                               🖨️ Print    ✕  │
├──────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │  [Employee]                                                  │    │
│  │                                                                │    │
│  │  Payrun: Payrun Nov 2025                                     │    │
│  │  Salary Structure: Regular Pay                               │    │
│  │  Period: 01 Oct To 31 Oct                                    │    │
│  │                                                                │    │
│  │  ┌────────────────────┬─────────────────────────────────┐    │    │
│  │  │ Name: John Doe     │ Employee ID: WZ001             │    │    │
│  │  │ Department: Eng    │ PAN: ABCDE1234F                │    │    │
│  │  │ Designation: Dev   │ UAN: 123456789012              │    │    │
│  │  │ Date of Joining    │ Bank Name: HDFC Bank           │    │    │
│  │  │ Bank Account:      │ Account No: 1234567890         │    │    │
│  │  └────────────────────┴─────────────────────────────────┘    │    │
│  │                                                                │    │
│  │  Worked Days                                                  │    │
│  │  ┌──────────────────────────────────────────────────────┐    │    │
│  │  │ Type              │ Days         │ Amount             │    │    │
│  │  ├──────────────────────────────────────────────────────┤    │    │
│  │  │ Attendance        │ 20.00        │ ₹ 45,833.33       │    │    │
│  │  │ Paid Time off     │ 2.00         │ ₹  4,166.66       │    │    │
│  │  │                   │ 22.00        │ ₹ 50,000.00       │    │    │
│  │  └──────────────────────────────────────────────────────┘    │    │
│  │                                                                │    │
│  │  Salary Computation                                           │    │
│  │  ┌─────────────────┬──────────┬──────────┬───────────────┐   │    │
│  │  │ Rule Name       │ Rate %   │ Amount   │ ←─── Gross    │   │    │
│  │  ├─────────────────┼──────────┼──────────┤               │   │    │
│  │  │ Basic Salary    │ 100      │ ₹25,000  │               │   │    │
│  │  │ HRA             │ 100      │ ₹12,500  │               │   │    │
│  │  │ Standard Allow  │ 100      │ ₹ 1,250  │               │   │    │
│  │  │ Performance B   │ 100      │ ₹ 2,000  │               │   │    │
│  │  │ LTA             │ 100      │ ₹ 2,075  │               │   │    │
│  │  │ Fixed Allow     │ 100      │ ₹ 1,250  │               │   │    │
│  │  ├─────────────────┴──────────┴──────────┤               │   │    │
│  │  │ Gross                        ₹50,276.90               │   │    │
│  │  └──────────────────────────────────────────────────────┘    │    │
│  │                                                                │    │
│  │  ┌─────────────────┬──────────┬──────────┬───────────────┐   │    │
│  │  │ Rule Name       │ Rate %   │ Amount   │ ←─── Deductions│  │    │
│  │  ├─────────────────┼──────────┼──────────┤               │   │    │
│  │  │ PF Employee     │ 100      │ -₹ 3,000 │               │   │    │
│  │  │ PF Employer     │ 100      │ -₹ 3,000 │               │   │    │
│  │  │ Professional T  │ 100      │ -₹   200 │               │   │    │
│  │  └─────────────────┴──────────┴──────────┘               │   │    │
│  │                                                                │    │
│  │  ┌───────────────────────────────────────────────────────┐   │    │
│  │  │ Net Amount                            ₹ 44,076.90     │   │    │
│  │  │                                                        │   │    │
│  │  │ (Forty Four Thousand Seventy Six Rupees Ninety Paise) │   │    │
│  │  └───────────────────────────────────────────────────────┘   │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                        │
└──────────────────────────────────────────────────────────────────────┘
```

---

### Step 10: Print as PDF

**Action**: Click 🖨️ "Print" button

**Result**: Browser print dialog opens

```
┌────────────────────────────────────────────────────┐
│  Print                                             │
│                                                     │
│  Destination:                                      │
│  ▼ Save as PDF  ←───────────────── Select this    │
│                                                     │
│  Pages:                                            │
│  ○ All                                             │
│  ○ Custom                                          │
│                                                     │
│  Layout:                                           │
│  ○ Portrait                                        │
│  ○ Landscape                                       │
│                                                     │
│  [Preview of payslip]                              │
│                                                     │
│              [Cancel]       [Save]  ←──── Click   │
└────────────────────────────────────────────────────┘
```

**PDF Output**:
- Professional payslip format
- Company branding (WorkZen HRMS)
- Employee details section
- Worked days table
- Earnings breakdown with amounts
- Deductions breakdown
- Net pay prominently displayed
- Net pay in words
- Optimized for A4 paper size

**Save PDF**:
```
┌────────────────────────────────────────────────────┐
│  Save As                                           │
│                                                     │
│  File name: Payslip_JohnDoe_Nov2025.pdf           │
│                                                     │
│  Location: C:\Users\Downloads\                    │
│                                                     │
│              [Cancel]       [Save]                │
└────────────────────────────────────────────────────┘
```

---

## 🎨 Color Coding

### Modal Sections
- **Employee & Dates**: Default (gray/white)
- **Earnings**: Green theme (`bg-green-900/20 border-green-500/30`)
- **Deductions**: Red theme (`bg-red-900/20 border-red-500/30`)
- **Summary**: Blue theme (`bg-blue-900/20 border-blue-500/30`)
- **Attendance**: Purple theme (`bg-purple-900/20 border-purple-500/30`)

### Buttons
- **New Payslip**: Blue (`bg-primary hover:bg-blue-600`)
- **Generate Payroll**: Purple (`bg-purple-600 hover:bg-purple-700`)
- **Compute Payslip**: Blue (`bg-blue-600 hover:bg-blue-700`)
- **Validate & Save**: Purple (`bg-purple-600 hover:bg-purple-700`)
- **Cancel**: Gray (`bg-gray-700 hover:bg-gray-600`)
- **Print**: Purple (`bg-purple-600`)

### Status Badges
- **Draft**: Gray (`bg-gray-600`)
- **Approved**: Green (`bg-green-600`)
- **Rejected**: Red (`bg-red-600`)
- **Pending**: Yellow (`bg-yellow-600`)
- **Processed**: Blue (`bg-blue-600`)
- **Paid**: Green (`bg-emerald-600`)

---

## 💡 Pro Tips

### Keyboard Shortcuts
- **Esc**: Close modal
- **Tab**: Navigate between fields
- **Enter**: Submit form (when focused on "Validate & Save" button)

### Quick Calculations
- **Basic Salary → All Allowances**: Auto-calculated instantly
- **Overtime Hours → Overtime Amount**: Auto-calculated on input
- **Compute Button**: Updates summary in real-time (~300ms)

### Best Practices
1. **Always verify employee selection** before saving
2. **Review auto-calculated values** - adjust if needed
3. **Click "Compute Payslip"** before saving to see final numbers
4. **Check pay period dates** match your payroll cycle
5. **Add bonuses/overtime** before computing
6. **Print immediately** after creation for records

### Common Workflows

**Standard Monthly Payroll**:
1. Select employee → Review auto-calculations → Compute → Save → Print

**With Overtime**:
1. Select employee → Add overtime hours → Compute → Save → Print

**With Bonus**:
1. Select employee → Add performance bonus → Compute → Save → Print

**With Adjustments**:
1. Select employee → Modify allowances → Adjust deductions → Compute → Save → Print

---

## ✅ Success Indicators

### Visual Feedback
- ✅ **Auto-fill**: Fields populate automatically (green highlight)
- ✅ **Computing**: Spinner shows "Computing..." (blue animation)
- ✅ **Saving**: Spinner shows "Saving..." (purple animation)
- ✅ **Success**: Alert "✅ Payslip created successfully!"
- ✅ **Error**: Alert "❌ Error: [message]" (red text)
- ✅ **Updated**: Dashboard stats refresh (smooth transition)
- ✅ **Added**: New payslip appears at top of list (blue highlight fade-in)

### Validation Feedback
- ❌ **No Employee**: "Please select an employee"
- ❌ **Missing Dates**: "Please fill all date fields"
- ❌ **Zero Salary**: "Basic salary must be greater than 0"
- ❌ **Server Error**: "Error creating payslip: [error message]"

---

**End of Visual Guide** 🎉

This comprehensive visual guide shows every step of creating and printing a payslip in WorkZen HRMS!
