/**
 * WorkZen HRMS - Admin Dashboard
 * Single-file dashboard for Admin role
 * Features (from Excalidraw HRMS flow):
 * - Left sidebar: Employees, Attendance, Time Off, Payroll, Reports, Settings
 * - Top bar: Search, NEW button, Profile dropdown (Profile/Logout)
 * - Employee card grid with status indicators (Green=Present, Plane=Leave, Yellow=Absent)
 * - Quick summary widgets: Total employees, Present today, On leave, Payroll cost
 * - Chart.js attendance trend
 * - Clickable cards showing employee details panel
 */

import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { 
  Users, Clock, Calendar, DollarSign, FileText, Settings, 
  Search, UserPlus, LogOut, User as UserIcon, ChevronDown,
  CheckCircle, Plane, AlertCircle, X, Mail, Phone, MapPin,
  Clock4, ClipboardCheck, FileEdit
} from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function DashboardAdmin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState('Employees');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeePanel, setShowEmployeePanel] = useState(false);
  const avatarBtnRef = useRef(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  // Mock employee data with status indicators
  const [employees] = useState([
    { id: 1, name: 'Sarah Johnson', title: 'Senior Developer', avatar: null, status: 'present', email: 'sarah.j@workzen.com', phone: '+1 234-567-8901', department: 'Engineering' },
    { id: 2, name: 'Michael Chen', title: 'Product Manager', avatar: null, status: 'present', email: 'michael.c@workzen.com', phone: '+1 234-567-8902', department: 'Product' },
    { id: 3, name: 'Emily Rodriguez', title: 'UX Designer', avatar: null, status: 'leave', email: 'emily.r@workzen.com', phone: '+1 234-567-8903', department: 'Design' },
    { id: 4, name: 'James Wilson', title: 'HR Manager', avatar: null, status: 'present', email: 'james.w@workzen.com', phone: '+1 234-567-8904', department: 'Human Resources' },
    { id: 5, name: 'Anna Kumar', title: 'Backend Developer', avatar: null, status: 'absent', email: 'anna.k@workzen.com', phone: '+1 234-567-8905', department: 'Engineering' },
    { id: 6, name: 'David Park', title: 'DevOps Engineer', avatar: null, status: 'present', email: 'david.p@workzen.com', phone: '+1 234-567-8906', department: 'Engineering' },
    { id: 7, name: 'Lisa Thompson', title: 'Marketing Lead', avatar: null, status: 'present', email: 'lisa.t@workzen.com', phone: '+1 234-567-8907', department: 'Marketing' },
    { id: 8, name: 'Robert Martinez', title: 'Sales Executive', avatar: null, status: 'leave', email: 'robert.m@workzen.com', phone: '+1 234-567-8908', department: 'Sales' },
    { id: 9, name: 'Jennifer Lee', title: 'QA Engineer', avatar: null, status: 'present', email: 'jennifer.l@workzen.com', phone: '+1 234-567-8909', department: 'Engineering' },
  ]);

  // Mock pending leave requests
  const [pendingLeaves] = useState([
    { id: 1, employeeName: 'Emily Rodriguez', type: 'Vacation', dates: 'Dec 10-14', days: 5 },
    { id: 2, employeeName: 'Robert Martinez', type: 'Sick Leave', dates: 'Dec 8', days: 1 },
  ]);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('workzen_token');
    const role = localStorage.getItem('workzen_role');
    const userData = localStorage.getItem('workzen_user');

    if (!token || role !== 'Admin') {
      navigate('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('workzen_token');
    localStorage.removeItem('workzen_role');
    localStorage.removeItem('workzen_user');
    navigate('/login');
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(false);
    navigate('/profile');
  };

  const handleEmployeeCardClick = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeePanel(true);
  };

  // Calculate summary metrics
  const totalEmployees = employees.length;
  const presentToday = employees.filter(e => e.status === 'present').length;
  const onLeaveToday = employees.filter(e => e.status === 'leave').length;
  const absentToday = employees.filter(e => e.status === 'absent').length;
  const monthlyPayroll = 285000; // Mock data

  // Filter employees based on search
  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Chart data - Attendance trend for past 7 days
  const attendanceTrendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Attendance %',
        data: [95, 98, 92, 96, 94, 0, 0], // Mock data
        borderColor: '#005eb8',
        backgroundColor: 'rgba(0, 94, 184, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Attendance Trend (Last 7 Days)',
        color: '#fff',
        font: { size: 14 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: '#9ca3af', callback: (value) => value + '%' },
        grid: { color: 'rgba(156, 163, 175, 0.1)' },
      },
      x: {
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(156, 163, 175, 0.1)' },
      },
    },
  };

  // Sidebar menu items (from Excalidraw)
  const menuItems = [
    { name: 'Employees', icon: Users },
    { name: 'Attendance', icon: Clock },
    { name: 'Time Off', icon: Calendar },
    { name: 'Payroll', icon: DollarSign },
    { name: 'Reports', icon: FileText },
    { name: 'Settings', icon: Settings },
  ];

  // Status indicator component
  const StatusIndicator = ({ status }) => {
    switch (status) {
      case 'present':
        return (
          <div className="flex items-center gap-1" title="Present">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        );
      case 'leave':
        return (
          <div className="flex items-center gap-1" title="On Leave">
            <Plane className="w-3 h-3 text-blue-400" />
          </div>
        );
      case 'absent':
        return (
          <div className="flex items-center gap-1" title="Absent">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* ==================== LEFT SIDEBAR ==================== */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-gray-900/50 backdrop-blur-xl border-r border-gray-800 flex flex-col"
      >
        {/* Company Logo/Name */}
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            WorkZen
          </h2>
          <p className="text-xs text-gray-400 mt-1">Admin Dashboard</p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.name}
              onClick={() => setActiveMenu(item.name)}
              whileHover={{ x: 4 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeMenu === item.name
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </motion.button>
          ))}
        </nav>
      </motion.aside>

      {/* ==================== MAIN CONTENT AREA ==================== */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ==================== TOP BAR ==================== */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800 px-6 py-4"
        >
          <div className="flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Right Side: NEW Button + Profile Avatar */}
            <div className="flex items-center gap-4 ml-6">
              {/* NEW Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg font-medium transition-all"
              >
                <UserPlus className="w-4 h-4" />
                NEW
              </motion.button>

              {/* Profile Avatar Dropdown */}
              <div className="relative">
                <motion.button
                  ref={avatarBtnRef}
                  onClick={() => {
                    const btn = avatarBtnRef.current;
                    if (btn) {
                      const rect = btn.getBoundingClientRect();
                      const dropdownWidth = 192; // matches w-48
                      setDropdownPos({
                        top: rect.bottom + window.scrollY + 8,
                        left: rect.right + window.scrollX - dropdownWidth,
                      });
                    }
                    setShowProfileDropdown(prev => !prev);
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"
                >
                  {/* Avatar Circle with Initial */}
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
                </motion.button>

                {/* Dropdown Menu rendered via portal to avoid stacking context issues */}
                {typeof document !== 'undefined' && createPortal(
                  <AnimatePresence>
                    {showProfileDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        style={{ position: 'fixed', top: dropdownPos.top, left: dropdownPos.left, width: 192 }}
                        className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden z-50"
                      >
                        <button
                          onClick={() => { setShowProfileDropdown(false); handleProfileClick(); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-all text-left"
                        >
                          <UserIcon className="w-4 h-4" />
                          Profile
                        </button>
                        <button
                          onClick={() => { setShowProfileDropdown(false); handleLogout(); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-all text-left border-t border-gray-700"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>,
                  document.body
                )}
              </div>
            </div>
          </div>
        </motion.header>

        {/* ==================== DASHBOARD CONTENT ==================== */}
        <div className="flex-1 overflow-y-auto p-6 relative">
          {/* Background Gradient */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto">
            {/* ==================== CONDITIONAL CONTENT BASED ON ACTIVE MENU ==================== */}
            {activeMenu === 'Employees' && (
              <>
                {/* ==================== QUICK SUMMARY WIDGETS ==================== */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Employees */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Employees</p>
                    <h3 className="text-3xl font-bold text-white mt-2">{totalEmployees}</h3>
                  </div>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </motion.div>

              {/* Present Today */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Present Today</p>
                    <h3 className="text-3xl font-bold text-green-500 mt-2">{presentToday}</h3>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </motion.div>

              {/* On Leave */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">On Leave Today</p>
                    <h3 className="text-3xl font-bold text-blue-400 mt-2">{onLeaveToday}</h3>
                  </div>
                  <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center">
                    <Plane className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </motion.div>

              {/* Payroll This Month */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Payroll This Month</p>
                    <h3 className="text-3xl font-bold text-accent mt-2">₹{monthlyPayroll.toLocaleString()}</h3>
                  </div>
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ==================== ATTENDANCE TREND CHART + PENDING APPROVALS ==================== */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Attendance Trend Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="lg:col-span-2 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6"
              >
                <div className="h-64">
                  <Line data={attendanceTrendData} options={chartOptions} />
                </div>
              </motion.div>

              {/* Pending Leave Approvals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Pending Approvals</h3>
                <div className="space-y-3">
                  {pendingLeaves.map((leave) => (
                    <div key={leave.id} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                      <p className="text-white font-medium text-sm">{leave.employeeName}</p>
                      <p className="text-gray-400 text-xs mt-1">{leave.type} • {leave.dates}</p>
                      <p className="text-gray-500 text-xs">{leave.days} day{leave.days > 1 ? 's' : ''}</p>
                    </div>
                  ))}
                  {pendingLeaves.length === 0 && (
                    <p className="text-gray-500 text-sm">No pending approvals</p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* ==================== STATUS LEGEND ==================== */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-6 mb-6"
            >
              <p className="text-gray-400 text-sm font-medium">Status Legend:</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">Present</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="w-3 h-3 text-blue-400" />
                <span className="text-gray-300 text-sm">On Leave</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">Absent</span>
              </div>
            </motion.div>

            {/* ==================== EMPLOYEE CARD GRID ==================== */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-xl font-semibold text-white mb-6">
                {searchQuery ? `Search Results (${filteredEmployees.length})` : 'All Employees'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEmployees.map((employee, index) => (
                  <motion.div
                    key={employee.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0, 94, 184, 0.2)' }}
                    onClick={() => handleEmployeeCardClick(employee)}
                    className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 cursor-pointer transition-all relative"
                  >
                    {/* Status Indicator - Top Right */}
                    <div className="absolute top-4 right-4">
                      <StatusIndicator status={employee.status} />
                    </div>

                    {/* Employee Avatar */}
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                      {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>

                    {/* Employee Info */}
                    <h3 className="text-lg font-semibold text-white">{employee.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">{employee.title}</p>
                  </motion.div>
                ))}
              </div>

              {/* No Results */}
              {filteredEmployees.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400">No employees found matching "{searchQuery}"</p>
                </div>
              )}
            </motion.div>
              </>
            )}

            {/* ==================== ATTENDANCE PANEL ==================== */}
            {activeMenu === 'Attendance' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Attendance Management</h2>
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                  <p className="text-gray-400">Attendance management interface - Coming soon</p>
                </div>
              </div>
            )}

            {/* ==================== TIME OFF PANEL ==================== */}
            {activeMenu === 'Time Off' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Time Off Management</h2>
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                  <p className="text-gray-400">Time off requests and approvals - Coming soon</p>
                </div>
              </div>
            )}

            {/* ==================== PAYROLL PANEL ==================== */}
            {activeMenu === 'Payroll' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Payroll Management</h2>
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                  <p className="text-gray-400">Payroll processing and management - Coming soon</p>
                </div>
              </div>
            )}

            {/* ==================== REPORTS PANEL ==================== */}
            {activeMenu === 'Reports' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Reports & Analytics</h2>
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                  <p className="text-gray-400">Reports and analytics dashboard - Coming soon</p>
                </div>
              </div>
            )}

            {/* ==================== SETTINGS PANEL ==================== */}
            {activeMenu === 'Settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Settings</h2>
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                  <p className="text-gray-400">System settings and configuration - Coming soon</p>
                </div>
              </div>
            )}
          </div>
      </div>
    </div>

      {/* ==================== EMPLOYEE DETAILS PANEL (Right Side) ==================== */}
      <AnimatePresence>
        {showEmployeePanel && selectedEmployee && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEmployeePanel(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-96 bg-gray-900 border-l border-gray-800 shadow-2xl z-50 overflow-y-auto"
            >
              {/* Panel Header */}
              <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Employee Details</h3>
                <button
                  onClick={() => setShowEmployeePanel(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-all"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Panel Content */}
              <div className="p-6 space-y-6">
                {/* Avatar & Name */}
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
                    {selectedEmployee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <h4 className="text-xl font-bold text-white">{selectedEmployee.name}</h4>
                  <p className="text-gray-400 text-sm mt-1">{selectedEmployee.title}</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <StatusIndicator status={selectedEmployee.status} />
                    <span className="text-sm text-gray-400 capitalize">{selectedEmployee.status}</span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{selectedEmployee.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{selectedEmployee.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{selectedEmployee.department}</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <h5 className="text-sm font-semibold text-gray-400 uppercase">Quick Actions</h5>
                  
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all text-left">
                    <Clock4 className="w-4 h-4 text-primary" />
                    <span className="text-white text-sm">Mark Attendance</span>
                  </button>

                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all text-left">
                    <FileEdit className="w-4 h-4 text-primary" />
                    <span className="text-white text-sm">Add Correction</span>
                  </button>

                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all text-left">
                    <ClipboardCheck className="w-4 h-4 text-primary" />
                    <span className="text-white text-sm">View Payslip</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DashboardAdmin;
