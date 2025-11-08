/**
 * WorkZen HRMS - Employee Dashboard
 * Single-file dashboard for Employee role
 * Features (from Excalidraw flow):
 * - Punch In/Out for attendance
 * - Today's attendance summary
 * - My leave requests
 * - Payslip preview/download
 * - Monthly attendance chart
 */

import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LogOut, User, Clock, Calendar, DollarSign, FileText, 
  CheckCircle, XCircle, AlertCircle, Download, Play, Square
} from 'lucide-react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function DashboardEmployee() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchTime, setPunchTime] = useState(null);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('workzen_token');
    const role = localStorage.getItem('workzen_role');
    const userData = localStorage.getItem('workzen_user');

    if (!token || role !== 'Employee') {
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

  const handlePunchInOut = () => {
    if (!isPunchedIn) {
      // Punch In
      setIsPunchedIn(true);
      setPunchTime(new Date().toLocaleTimeString());
      console.log('✅ Punched In');
    } else {
      // Punch Out
      setIsPunchedIn(false);
      console.log('✅ Punched Out');
    }
  };

  // Mock data for monthly attendance chart
  const attendanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Days Present',
        data: [5, 5, 4, 5],
        backgroundColor: 'rgba(0, 94, 184, 0.6)',
        borderColor: '#005eb8',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Monthly Attendance',
        color: '#fff',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(156, 163, 175, 0.1)' },
      },
      x: {
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(156, 163, 175, 0.1)' },
      },
    },
  };

  // Mock leave requests
  const leaveRequests = [
    { id: 1, type: 'Sick Leave', dates: 'Dec 15-16, 2025', status: 'Approved', days: 2 },
    { id: 2, type: 'Casual Leave', dates: 'Dec 20, 2025', status: 'Pending', days: 1 },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 bg-gray-900/50 backdrop-blur-xl border-b border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Employee Dashboard
              </h1>
              <p className="text-sm text-gray-400 mt-1">Welcome back, {user.name}</p>
            </div>
            
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all border border-gray-700"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Punch In/Out Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-gray-800 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Attendance</h3>
                <p className="text-gray-400">
                  {isPunchedIn ? `Punched in at ${punchTime}` : 'Not punched in yet'}
                </p>
              </div>
              
              <motion.button
                onClick={handlePunchInOut}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-lg font-semibold flex items-center gap-3 transition-all ${
                  isPunchedIn
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-primary hover:bg-blue-600 text-white'
                }`}
              >
                {isPunchedIn ? (
                  <>
                    <Square className="w-6 h-6" />
                    Punch Out
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6" />
                    Punch In
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Today's Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <Clock className="w-8 h-8 text-primary mb-3" />
            <p className="text-gray-400 text-sm mb-1">Today's Status</p>
            <p className="text-2xl font-bold text-white">
              {isPunchedIn ? 'Working' : 'Not Started'}
            </p>
          </motion.div>

          {/* Leave Balance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <Calendar className="w-8 h-8 text-green-400 mb-3" />
            <p className="text-gray-400 text-sm mb-1">Leave Balance</p>
            <p className="text-2xl font-bold text-white">12 Days</p>
          </motion.div>

          {/* This Month */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <CheckCircle className="w-8 h-8 text-accent mb-3" />
            <p className="text-gray-400 text-sm mb-1">Days Present (Nov)</p>
            <p className="text-2xl font-bold text-white">19 / 20</p>
          </motion.div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Attendance Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Attendance Overview</h3>
            <div className="h-64">
              <Bar data={attendanceData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Leave Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">My Leave Requests</h3>
              <button className="text-primary hover:text-accent text-sm font-semibold transition-colors">
                Apply Leave +
              </button>
            </div>
            
            <div className="space-y-3">
              {leaveRequests.map((leave) => (
                <div key={leave.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-white">{leave.type}</p>
                      <p className="text-sm text-gray-400 mt-1">{leave.dates}</p>
                      <p className="text-xs text-gray-500 mt-1">{leave.days} day(s)</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      leave.status === 'Approved' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {leave.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Payslip Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 bg-gray-900/50 border border-gray-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">Recent Payslips</h3>
              <p className="text-sm text-gray-400 mt-1">Download your salary statements</p>
            </div>
            <FileText className="w-8 h-8 text-accent" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['November 2025', 'October 2025', 'September 2025'].map((month, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-primary transition-all text-left group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{month}</p>
                    <p className="text-sm text-gray-400 mt-1">$4,500</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default DashboardEmployee;
