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
  Clock4, ClipboardCheck, FileEdit, Edit2, Trash2, Eye, 
  Download, Filter, Plus, Check, XCircle, MoreVertical,
  Building2, TrendingUp, Activity, Shield, Save, Ban
} from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import api from '../services/api';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

function DashboardAdmin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState('Employees');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeePanel, setShowEmployeePanel] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const avatarBtnRef = useRef(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  
  // Dynamic data states
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [payrollRecords, setPayrollRecords] = useState([]);
  const [reports, setReports] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState([]);
  
  // Filter states
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Fetch all data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard overview
      const overviewData = await api.dashboard.getOverview();
      setDashboardStats(overviewData.data || overviewData);
      
      // Fetch all users (which includes employee data)
      const usersData = await api.users.getAll();
      const allUsers = usersData.data || [];
      setUsers(allUsers);
      
      // Set employees from users (they're the same now)
      setEmployees(allUsers);
      
      // Fetch today's attendance
      const todayData = await api.attendance.getToday();
      setTodayAttendance(todayData.data || []);
      
      // Fetch pending leave requests
      const pendingData = await api.leaveRequests.getPending();
      setLeaveRequests(pendingData.data || []);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set empty arrays to prevent errors
      setUsers([]);
      setEmployees([]);
      setTodayAttendance([]);
      setLeaveRequests([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch attendance data
  const fetchAttendanceData = async () => {
    try {
      const data = await api.attendance.getAll({ limit: 100 });
      setAttendanceData(data.data?.attendance || data.data || []);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  // Fetch payroll data
  const fetchPayrollData = async () => {
    try {
      const data = await api.payroll.getAll({ limit: 100 });
      setPayrollRecords(data.data?.payroll || data.data || []);
    } catch (error) {
      console.error('Error fetching payroll:', error);
    }
  };

  // Fetch reports
  const fetchReports = async () => {
    try {
      const data = await api.reports.getAll();
      setReports(data.data?.reports || data.data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

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

    fetchDashboardData();
  }, [navigate]);

  // Fetch specific data based on active menu
  useEffect(() => {
    if (activeMenu === 'Attendance') {
      fetchAttendanceData();
    } else if (activeMenu === 'Payroll') {
      fetchPayrollData();
    } else if (activeMenu === 'Reports') {
      fetchReports();
    }
  }, [activeMenu]);

  const handleLogout = () => {
    api.auth.logout();
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

  // User management functions
  const handleCreateUser = () => {
    setEditingUser(null);
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowUserModal(true);
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await api.users.delete(userId);
      fetchDashboardData();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      await api.users.updateRole(userId, newRole);
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role');
    }
  };

  const handleToggleUserStatus = async (userId) => {
    try {
      await api.users.toggleStatus(userId);
      fetchDashboardData();
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Failed to toggle status');
    }
  };

  // Leave approval functions
  const handleApproveLeave = async (leaveId) => {
    try {
      await api.leaveRequests.approve(leaveId, 'Approved by admin');
      fetchDashboardData();
    } catch (error) {
      console.error('Error approving leave:', error);
      alert('Failed to approve leave');
    }
  };

  const handleRejectLeave = async (leaveId) => {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;
    
    try {
      await api.leaveRequests.reject(leaveId, reason);
      fetchDashboardData();
    } catch (error) {
      console.error('Error rejecting leave:', error);
      alert('Failed to reject leave');
    }
  };

  // Calculate summary metrics
  const getEmployeeStatus = (employee) => {
    // Check if employee is on approved leave today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const onLeave = leaveRequests.some(l => {
      if (l.status !== 'Approved') return false;
      const from = new Date(l.from || l.startDate);
      const to = new Date(l.to || l.endDate);
      from.setHours(0, 0, 0, 0);
      to.setHours(23, 59, 59, 999);
      
      // Check if employee matches (handle both populated and non-populated)
      const leaveEmployeeId = l.employee?._id || l.employee?.id || l.employee;
      const currentEmployeeId = employee._id || employee.id;
      
      return leaveEmployeeId?.toString() === currentEmployeeId?.toString() && 
             today >= from && today <= to;
    });
    
    if (onLeave) return 'leave';
    
    // Check if employee has attendance today
    const todayRecord = todayAttendance.find(a => {
      const attendanceEmployeeId = a.employee?._id || a.employee?.id || a.employee;
      const currentEmployeeId = employee._id || employee.id;
      return attendanceEmployeeId?.toString() === currentEmployeeId?.toString();
    });
    
    if (todayRecord) {
      return todayRecord.status || 'present';
    }
    
    // No attendance and no leave = absent
    return 'absent';
  };

  const totalEmployees = employees.length;
  const presentToday = todayAttendance.filter(a => a.status === 'present').length;
  const onLeaveToday = leaveRequests.filter(l => {
    const today = new Date();
    const from = new Date(l.from);
    const to = new Date(l.to);
    return l.status === 'Approved' && today >= from && today <= to;
  }).length;
  const absentToday = totalEmployees - presentToday - onLeaveToday;
  
  const monthlyPayroll = payrollRecords.reduce((sum, p) => sum + (p.netPay || 0), 0);

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = searchQuery === '' || 
      `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || emp.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  // Chart data - Attendance trend for past 7 days (dynamic)
  const getLast7Days = () => {
    const days = [];
    const labels = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date);
      labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
    }
    return { days, labels };
  };

  const { days: last7Days, labels: dayLabels } = getLast7Days();
  
  const attendancePercentages = last7Days.map(day => {
    const dayAttendance = todayAttendance.filter(a => {
      const attDate = new Date(a.date);
      return attDate.toDateString() === day.toDateString();
    });
    
    const presentCount = dayAttendance.filter(a => a.status === 'present').length;
    return totalEmployees > 0 ? Math.round((presentCount / totalEmployees) * 100) : 0;
  });

  const attendanceTrendData = {
    labels: dayLabels,
    datasets: [
      {
        label: 'Attendance %',
        data: attendancePercentages,
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          Loading Dashboard...
        </div>
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
                onClick={handleCreateUser}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg font-medium transition-all"
              >
                <UserPlus className="w-4 h-4" />
                NEW USER
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
                    {(user.name || user.firstName + ' ' + user.lastName || 'A').charAt(0).toUpperCase()}
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
                    <h3 className="text-3xl font-bold text-accent mt-2">₹{(monthlyPayroll / 1000).toFixed(1)}k</h3>
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
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {leaveRequests.filter(l => l.status === 'Pending').slice(0, 5).map((leave) => (
                    <div key={leave._id} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-white font-medium text-sm">
                            {leave.userId?.firstName} {leave.userId?.lastName}
                          </p>
                          <p className="text-gray-400 text-xs mt-1">
                            {leave.type} • {new Date(leave.from).toLocaleDateString()} - {new Date(leave.to).toLocaleDateString()}
                          </p>
                          <p className="text-gray-500 text-xs">{leave.duration || 0} day(s)</p>
                        </div>
                        <div className="flex gap-1 ml-2">
                          <button
                            onClick={() => handleApproveLeave(leave._id)}
                            className="p-1 hover:bg-green-500/20 rounded text-green-500 transition-all"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRejectLeave(leave._id)}
                            className="p-1 hover:bg-red-500/20 rounded text-red-500 transition-all"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {leaveRequests.filter(l => l.status === 'Pending').length === 0 && (
                    <p className="text-gray-500 text-sm text-center py-4">No pending approvals</p>
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
                {filteredEmployees.map((employee, index) => {
                  const employeeStatus = getEmployeeStatus(employee);
                  const fullName = `${employee.firstName || ''} ${employee.lastName || ''}`.trim();
                  
                  return (
                    <motion.div
                      key={employee._id || employee.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * Math.min(index, 9) }}
                      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0, 94, 184, 0.2)' }}
                      onClick={() => handleEmployeeCardClick(employee)}
                      className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 cursor-pointer transition-all relative"
                    >
                      {/* Status Indicator - Top Right */}
                      <div className="absolute top-4 right-4">
                        <StatusIndicator status={employeeStatus} />
                      </div>

                      {/* Employee Avatar */}
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                        {(fullName || 'U').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>

                      {/* Employee Info */}
                      <h3 className="text-lg font-semibold text-white">{fullName}</h3>
                      <p className="text-gray-400 text-sm mt-1">{employee.position || employee.title || employee.role}</p>
                      <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {employee.department || 'N/A'}
                      </p>
                      
                      {/* Additional Details */}
                      <div className="mt-4 pt-4 border-t border-gray-700 space-y-2">
                        {employee.email && (
                          <p className="text-gray-400 text-xs flex items-center gap-2">
                            <Mail className="w-3 h-3" />
                            {employee.email}
                          </p>
                        )}
                        {employee.phone && (
                          <p className="text-gray-400 text-xs flex items-center gap-2">
                            <Phone className="w-3 h-3" />
                            {employee.phone}
                          </p>
                        )}
                        {employee.employeeId && (
                          <p className="text-gray-400 text-xs flex items-center gap-2">
                            <UserIcon className="w-3 h-3" />
                            ID: {employee.employeeId}
                          </p>
                        )}
                        {employee.joinDate && (
                          <p className="text-gray-400 text-xs flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            Joined: {new Date(employee.joinDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
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
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Attendance Management</h2>
                  <div className="flex gap-3">
                    <select
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="all">All Departments</option>
                      <option value="HR">HR</option>
                      <option value="IT">IT</option>
                      <option value="Finance">Finance</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                    </select>
                  </div>
                </div>

                {/* Attendance Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-4">
                    <p className="text-gray-400 text-sm">Total Today</p>
                    <p className="text-2xl font-bold text-white mt-1">{todayAttendance.length}</p>
                  </div>
                  <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-4">
                    <p className="text-gray-400 text-sm">Present</p>
                    <p className="text-2xl font-bold text-green-500 mt-1">{presentToday}</p>
                  </div>
                  <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-4">
                    <p className="text-gray-400 text-sm">On Leave</p>
                    <p className="text-2xl font-bold text-blue-400 mt-1">{onLeaveToday}</p>
                  </div>
                  <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-4">
                    <p className="text-gray-400 text-sm">Absent</p>
                    <p className="text-2xl font-bold text-yellow-500 mt-1">{absentToday}</p>
                  </div>
                </div>

                {/* Today's Attendance Table */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl overflow-hidden">
                  <div className="p-6 border-b border-gray-800">
                    <h3 className="text-lg font-semibold text-white">Today's Attendance</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-800/50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Employee</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Check In</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Check Out</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Hours</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {todayAttendance.slice(0, 10).map((attendance) => (
                          <tr key={attendance._id} className="hover:bg-gray-800/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-white">
                                {attendance.employee?.firstName} {attendance.employee?.lastName}
                              </div>
                              <div className="text-sm text-gray-400">{attendance.employee?.department}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {attendance.checkIn?.time ? new Date(attendance.checkIn.time).toLocaleTimeString() : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {attendance.checkOut?.time ? new Date(attendance.checkOut.time).toLocaleTimeString() : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {attendance.workHours ? `${attendance.workHours.toFixed(1)}h` : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                attendance.status === 'present' ? 'bg-green-500/20 text-green-400' :
                                attendance.status === 'late' ? 'bg-yellow-500/20 text-yellow-400' :
                                attendance.status === 'absent' ? 'bg-red-500/20 text-red-400' :
                                'bg-gray-500/20 text-gray-400'
                              }`}>
                                {attendance.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {todayAttendance.length === 0 && (
                      <div className="text-center py-12 text-gray-400">
                        No attendance records for today
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ==================== TIME OFF PANEL ==================== */}
            {activeMenu === 'Time Off' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Time Off Management</h2>
                  <div className="flex gap-3">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="all">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                {/* Leave Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-4">
                    <p className="text-gray-400 text-sm">Total Requests</p>
                    <p className="text-2xl font-bold text-white mt-1">{leaveRequests.length}</p>
                  </div>
                  <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-4">
                    <p className="text-gray-400 text-sm">Pending</p>
                    <p className="text-2xl font-bold text-yellow-500 mt-1">
                      {leaveRequests.filter(l => l.status === 'Pending').length}
                    </p>
                  </div>
                  <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-4">
                    <p className="text-gray-400 text-sm">Approved</p>
                    <p className="text-2xl font-bold text-green-500 mt-1">
                      {leaveRequests.filter(l => l.status === 'Approved').length}
                    </p>
                  </div>
                  <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-4">
                    <p className="text-gray-400 text-sm">Rejected</p>
                    <p className="text-2xl font-bold text-red-500 mt-1">
                      {leaveRequests.filter(l => l.status === 'Rejected').length}
                    </p>
                  </div>
                </div>

                {/* Leave Requests Table */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl overflow-hidden">
                  <div className="p-6 border-b border-gray-800">
                    <h3 className="text-lg font-semibold text-white">Leave Requests</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-800/50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Employee</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">From - To</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Days</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Reason</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {leaveRequests
                          .filter(l => statusFilter === 'all' || l.status === statusFilter)
                          .slice(0, 20)
                          .map((leave) => (
                            <tr key={leave._id} className="hover:bg-gray-800/30 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-white">
                                  {leave.userId?.firstName} {leave.userId?.lastName}
                                </div>
                                <div className="text-sm text-gray-400">{leave.userId?.email}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {leave.type}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {new Date(leave.from).toLocaleDateString()} - {new Date(leave.to).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {leave.duration || Math.ceil((new Date(leave.to) - new Date(leave.from)) / (1000 * 60 * 60 * 24)) + 1}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">
                                {leave.reason}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  leave.status === 'Approved' ? 'bg-green-500/20 text-green-400' :
                                  leave.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                  leave.status === 'Rejected' ? 'bg-red-500/20 text-red-400' :
                                  'bg-gray-500/20 text-gray-400'
                                }`}>
                                  {leave.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {leave.status === 'Pending' && (
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleApproveLeave(leave._id)}
                                      className="p-1 hover:bg-green-500/20 rounded text-green-500 transition-all"
                                      title="Approve"
                                    >
                                      <Check className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleRejectLeave(leave._id)}
                                      className="p-1 hover:bg-red-500/20 rounded text-red-500 transition-all"
                                      title="Reject"
                                    >
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    {leaveRequests.filter(l => statusFilter === 'all' || l.status === statusFilter).length === 0 && (
                      <div className="text-center py-12 text-gray-400">
                        No leave requests found
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ==================== PAYROLL PANEL ==================== */}
            {activeMenu === 'Payroll' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Payroll Management</h2>
                  <button
                    onClick={() => alert('Generate payroll functionality')}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Generate Payroll
                  </button>
                </div>

                {/* Payroll Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-4">
                    <p className="text-gray-400 text-sm">Total Records</p>
                    <p className="text-2xl font-bold text-white mt-1">{payrollRecords.length}</p>
                  </div>
                  <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-4">
                    <p className="text-gray-400 text-sm">Total Amount</p>
                    <p className="text-2xl font-bold text-accent mt-1">
                      ₹{(monthlyPayroll / 1000).toFixed(1)}k
                    </p>
                  </div>
                  <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-4">
                    <p className="text-gray-400 text-sm">Processed</p>
                    <p className="text-2xl font-bold text-green-500 mt-1">
                      {payrollRecords.filter(p => p.paymentStatus === 'paid').length}
                    </p>
                  </div>
                  <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-4">
                    <p className="text-gray-400 text-sm">Pending</p>
                    <p className="text-2xl font-bold text-yellow-500 mt-1">
                      {payrollRecords.filter(p => p.paymentStatus === 'pending').length}
                    </p>
                  </div>
                </div>

                {/* Payroll Table */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl overflow-hidden">
                  <div className="p-6 border-b border-gray-800">
                    <h3 className="text-lg font-semibold text-white">Payroll Records</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-800/50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Employee</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Period</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Basic Salary</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Gross</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Net Pay</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {payrollRecords.slice(0, 20).map((payroll) => (
                          <tr key={payroll._id} className="hover:bg-gray-800/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-white">
                                {payroll.employee?.firstName} {payroll.employee?.lastName}
                              </div>
                              <div className="text-sm text-gray-400">{payroll.employee?.employeeId}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {payroll.payPeriod?.startDate && new Date(payroll.payPeriod.startDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              ₹{payroll.basicSalary?.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              ₹{payroll.grossEarnings?.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-accent">
                              ₹{payroll.netPay?.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                payroll.paymentStatus === 'paid' ? 'bg-green-500/20 text-green-400' :
                                payroll.paymentStatus === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                payroll.paymentStatus === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                                'bg-gray-500/20 text-gray-400'
                              }`}>
                                {payroll.paymentStatus}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <button
                                onClick={() => alert('View payslip')}
                                className="p-1 hover:bg-primary/20 rounded text-primary transition-all"
                                title="View Payslip"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {payrollRecords.length === 0 && (
                      <div className="text-center py-12 text-gray-400">
                        No payroll records found
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ==================== REPORTS PANEL ==================== */}
            {activeMenu === 'Reports' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Reports & Analytics</h2>
                  <button
                    onClick={() => alert('Generate new report')}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Generate Report
                  </button>
                </div>

                {/* Report Types Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <button
                    onClick={() => alert('Generate attendance report')}
                    className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-primary transition-all text-left"
                  >
                    <Clock className="w-8 h-8 text-primary mb-3" />
                    <h3 className="text-white font-semibold">Attendance Report</h3>
                    <p className="text-gray-400 text-sm mt-1">Generate attendance analytics</p>
                  </button>
                  <button
                    onClick={() => alert('Generate leave report')}
                    className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-primary transition-all text-left"
                  >
                    <Calendar className="w-8 h-8 text-blue-400 mb-3" />
                    <h3 className="text-white font-semibold">Leave Report</h3>
                    <p className="text-gray-400 text-sm mt-1">Analyze leave patterns</p>
                  </button>
                  <button
                    onClick={() => alert('Generate payroll report')}
                    className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-primary transition-all text-left"
                  >
                    <DollarSign className="w-8 h-8 text-accent mb-3" />
                    <h3 className="text-white font-semibold">Payroll Report</h3>
                    <p className="text-gray-400 text-sm mt-1">View payroll summaries</p>
                  </button>
                  <button
                    onClick={() => alert('Generate employee report')}
                    className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-primary transition-all text-left"
                  >
                    <Users className="w-8 h-8 text-green-400 mb-3" />
                    <h3 className="text-white font-semibold">Employee Report</h3>
                    <p className="text-gray-400 text-sm mt-1">Employee analytics</p>
                  </button>
                </div>

                {/* Recent Reports */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl overflow-hidden">
                  <div className="p-6 border-b border-gray-800">
                    <h3 className="text-lg font-semibold text-white">Recent Reports</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-800/50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Generated By</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {reports.slice(0, 10).map((report) => (
                          <tr key={report._id} className="hover:bg-gray-800/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-white">{report.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary/20 text-primary">
                                {report.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {report.generatedBy?.firstName} {report.generatedBy?.lastName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {report.generatedAt && new Date(report.generatedAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                report.status === 'generated' ? 'bg-green-500/20 text-green-400' :
                                report.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-gray-500/20 text-gray-400'
                              }`}>
                                {report.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => alert('View report')}
                                  className="p-1 hover:bg-primary/20 rounded text-primary transition-all"
                                  title="View"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => alert('Download report')}
                                  className="p-1 hover:bg-green-500/20 rounded text-green-400 transition-all"
                                  title="Download"
                                >
                                  <Download className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {reports.length === 0 && (
                      <div className="text-center py-12 text-gray-400">
                        No reports generated yet. Create your first report!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ==================== SETTINGS PANEL ==================== */}
            {activeMenu === 'Settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Settings & User Management</h2>

                {/* Settings Tabs */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                  <div className="space-y-6">
                    {/* User Management Section */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">User Management</h3>
                        <button
                          onClick={handleCreateUser}
                          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-all"
                        >
                          <UserPlus className="w-4 h-4" />
                          Add User
                        </button>
                      </div>

                      {/* Users Table */}
                      <div className="border border-gray-700 rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-800/50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Department</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700">
                            {users.map((userItem) => (
                              <tr key={userItem._id || userItem.id} className="hover:bg-gray-800/30 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                                      {(userItem.firstName || userItem.name || 'U').charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-white">
                                        {userItem.firstName && userItem.lastName 
                                          ? `${userItem.firstName} ${userItem.lastName}` 
                                          : userItem.name}
                                      </div>
                                      <div className="text-sm text-gray-400">{userItem.userId || userItem.employeeId}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                  {userItem.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <select
                                    value={userItem.role}
                                    onChange={(e) => handleUpdateUserRole(userItem._id || userItem.id, e.target.value)}
                                    className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                  >
                                    <option value="Admin">Admin</option>
                                    <option value="HR Officer">HR Officer</option>
                                    <option value="Payroll Officer">Payroll Officer</option>
                                    <option value="Employee">Employee</option>
                                  </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                  {userItem.department || '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <button
                                    onClick={() => handleToggleUserStatus(userItem._id || userItem.id)}
                                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${
                                      userItem.isActive !== false
                                        ? 'bg-green-500/20 text-green-400'
                                        : 'bg-red-500/20 text-red-400'
                                    }`}
                                  >
                                    {userItem.isActive !== false ? 'Active' : 'Inactive'}
                                  </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleEditUser(userItem)}
                                      className="p-1 hover:bg-primary/20 rounded text-primary transition-all"
                                      title="Edit"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteUser(userItem._id || userItem.id)}
                                      className="p-1 hover:bg-red-500/20 rounded text-red-500 transition-all"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {users.length === 0 && (
                          <div className="text-center py-12 text-gray-400">
                            No users found
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Role Descriptions */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-white mb-4">Role Descriptions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-5 h-5 text-red-400" />
                            <h4 className="text-white font-semibold">Admin</h4>
                          </div>
                          <ul className="text-sm text-gray-300 space-y-1">
                            <li>• Full system access</li>
                            <li>• Manage all users and roles</li>
                            <li>• CRUD operations on all modules</li>
                            <li>• Oversee all activities</li>
                          </ul>
                        </div>
                        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-5 h-5 text-blue-400" />
                            <h4 className="text-white font-semibold">HR Officer</h4>
                          </div>
                          <ul className="text-sm text-gray-300 space-y-1">
                            <li>• Manage employee records</li>
                            <li>• Approve/reject leave requests</li>
                            <li>• Track attendance</li>
                            <li>• Generate reports</li>
                          </ul>
                        </div>
                        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-5 h-5 text-accent" />
                            <h4 className="text-white font-semibold">Payroll Officer</h4>
                          </div>
                          <ul className="text-sm text-gray-300 space-y-1">
                            <li>• Process payroll</li>
                            <li>• Manage salary records</li>
                            <li>• Generate payslips</li>
                            <li>• View payroll reports</li>
                          </ul>
                        </div>
                        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <UserIcon className="w-5 h-5 text-green-400" />
                            <h4 className="text-white font-semibold">Employee</h4>
                          </div>
                          <ul className="text-sm text-gray-300 space-y-1">
                            <li>• View own records</li>
                            <li>• Request leave</li>
                            <li>• Mark attendance</li>
                            <li>• View payslips</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
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
                    {`${selectedEmployee.firstName || ''} ${selectedEmployee.lastName || ''}`.trim().split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    {selectedEmployee.firstName} {selectedEmployee.lastName}
                  </h4>
                  <p className="text-gray-400 text-sm mt-1">{selectedEmployee.position || selectedEmployee.title}</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <StatusIndicator status={getEmployeeStatus(selectedEmployee)} />
                    <span className="text-sm text-gray-400 capitalize">{getEmployeeStatus(selectedEmployee)}</span>
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
                    <span className="text-sm">{selectedEmployee.phone || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{selectedEmployee.department}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{selectedEmployee.employeeId}</span>
                  </div>
                </div>

                {/* Employee Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                    <p className="text-gray-400 text-xs">Employment Type</p>
                    <p className="text-white font-semibold text-sm mt-1">
                      {selectedEmployee.employmentType || 'Full-time'}
                    </p>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                    <p className="text-gray-400 text-xs">Start Date</p>
                    <p className="text-white font-semibold text-sm mt-1">
                      {selectedEmployee.startDate 
                        ? new Date(selectedEmployee.startDate).toLocaleDateString() 
                        : 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <h5 className="text-sm font-semibold text-gray-400 uppercase">Quick Actions</h5>
                  
                  <button 
                    onClick={() => alert('Mark attendance functionality')}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all text-left"
                  >
                    <Clock4 className="w-4 h-4 text-primary" />
                    <span className="text-white text-sm">View Attendance</span>
                  </button>

                  <button 
                    onClick={() => alert('Edit employee functionality')}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all text-left"
                  >
                    <FileEdit className="w-4 h-4 text-primary" />
                    <span className="text-white text-sm">Edit Details</span>
                  </button>

                  <button 
                    onClick={() => alert('View payslip functionality')}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all text-left"
                  >
                    <ClipboardCheck className="w-4 h-4 text-primary" />
                    <span className="text-white text-sm">View Payslip</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ==================== USER CREATE/EDIT MODAL ==================== */}
      <AnimatePresence>
        {showUserModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUserModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl w-full max-w-2xl pointer-events-auto overflow-hidden">
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">
                    {editingUser ? 'Edit User' : 'Create New User'}
                  </h3>
                  <button
                    onClick={() => setShowUserModal(false)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Modal Body */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const userData = Object.fromEntries(formData);
                    
                    if (editingUser) {
                      api.users.update(editingUser._id || editingUser.id, userData)
                        .then(() => {
                          setShowUserModal(false);
                          fetchDashboardData();
                          alert('User updated successfully!');
                        })
                        .catch(err => {
                          console.error('Error updating user:', err);
                          alert(`Failed to update user: ${err.message || 'Please check if the backend server is running.'}`);
                        });
                    } else {
                      api.users.create(userData)
                        .then(() => {
                          setShowUserModal(false);
                          fetchDashboardData();
                          alert('User created successfully!');
                        })
                        .catch(err => {
                          console.error('Error creating user:', err);
                          alert(`Failed to create user: ${err.message || 'Please check if the backend server is running.'}`);
                        });
                    }
                  }}
                  className="p-6 space-y-4 max-h-[70vh] overflow-y-auto"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        defaultValue={editingUser?.firstName || ''}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        defaultValue={editingUser?.lastName || ''}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={editingUser?.email || ''}
                      required
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {!editingUser && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Password *
                      </label>
                      <input
                        type="password"
                        name="password"
                        required
                        minLength={6}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Role *
                      </label>
                      <select
                        name="role"
                        defaultValue={editingUser?.role || 'Employee'}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Admin">Admin</option>
                        <option value="HR Officer">HR Officer</option>
                        <option value="Payroll Officer">Payroll Officer</option>
                        <option value="Employee">Employee</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Department
                      </label>
                      <select
                        name="department"
                        defaultValue={editingUser?.department || ''}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select Department</option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="Finance">Finance</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Operations">Operations</option>
                        <option value="Legal">Legal</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      name="company"
                      defaultValue={editingUser?.company || 'WORKZEN'}
                      required
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Modal Footer */}
                  <div className="flex gap-3 pt-4 border-t border-gray-800">
                    <button
                      type="button"
                      onClick={() => setShowUserModal(false)}
                      className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {editingUser ? 'Update User' : 'Create User'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DashboardAdmin;
