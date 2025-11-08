/**
 * WorkZen HRMS - HR Officer Dashboard
 * Single-file dashboard for HR Officer role
 * Features (from Excalidraw flow):
 * - Pending leave approvals
 * - Attendance corrections/reviews
 * - Employee directory/management
 * - Leave allocation management
 * - Employee statistics
 */

import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LogOut, Users, Calendar, CheckCircle, XCircle, Clock, 
  UserPlus, Settings, AlertCircle, TrendingUp, FileText, Edit
} from 'lucide-react';

function DashboardHROfficer() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('workzen_token');
    const role = localStorage.getItem('workzen_role');
    const userData = localStorage.getItem('workzen_user');

    if (!token || role !== 'HR Officer') {
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

  // Mock pending leave approvals
  const pendingLeaves = [
    { id: 1, employee: 'John Employee', type: 'Sick Leave', dates: 'Dec 15-16, 2025', days: 2, reason: 'Medical appointment' },
    { id: 2, employee: 'Jane Smith', type: 'Casual Leave', dates: 'Dec 20, 2025', days: 1, reason: 'Personal work' },
    { id: 3, employee: 'Mike Johnson', type: 'Annual Leave', dates: 'Dec 25-27, 2025', days: 3, reason: 'Holiday vacation' },
  ];

  // Mock attendance corrections
  const attendanceCorrections = [
    { id: 1, employee: 'Sarah Davis', date: 'Nov 7, 2025', issue: 'Forgot to punch out', status: 'Pending' },
    { id: 2, employee: 'Tom Wilson', date: 'Nov 6, 2025', issue: 'System error during punch in', status: 'Pending' },
  ];

  const handleApproveLeave = async (leaveId) => {
    console.log('✅ Approving leave:', leaveId);
    // TODO: Call /api/leaves/:id/approve
    alert('Leave approved successfully!');
  };

  const handleRejectLeave = async (leaveId) => {
    console.log('❌ Rejecting leave:', leaveId);
    // TODO: Call /api/leaves/:id/reject
    alert('Leave rejected.');
  };

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
                HR Officer Dashboard
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
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <Users className="w-8 h-8 text-primary mb-3" />
            <p className="text-gray-400 text-sm mb-1">Total Employees</p>
            <p className="text-2xl font-bold text-white">248</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <AlertCircle className="w-8 h-8 text-yellow-400 mb-3" />
            <p className="text-gray-400 text-sm mb-1">Pending Leaves</p>
            <p className="text-2xl font-bold text-white">{pendingLeaves.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <Clock className="w-8 h-8 text-orange-400 mb-3" />
            <p className="text-gray-400 text-sm mb-1">Attendance Issues</p>
            <p className="text-2xl font-bold text-white">{attendanceCorrections.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
            <p className="text-gray-400 text-sm mb-1">Present Today</p>
            <p className="text-2xl font-bold text-white">234</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: UserPlus, label: 'Add Employee', color: 'text-primary' },
              { icon: Calendar, label: 'Allocate Leave', color: 'text-green-400' },
              { icon: FileText, label: 'Reports', color: 'text-accent' },
              { icon: Settings, label: 'Settings', color: 'text-gray-400' },
            ].map((action, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-primary transition-all group"
              >
                <action.icon className={`w-8 h-8 ${action.color} group-hover:text-primary transition-colors mx-auto mb-3`} />
                <p className="text-white text-sm font-medium">{action.label}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Leave Approvals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Pending Leave Approvals
            </h3>
            
            <div className="space-y-4">
              {pendingLeaves.map((leave) => (
                <div key={leave.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-white">{leave.employee}</p>
                      <p className="text-sm text-gray-400 mt-1">{leave.type}</p>
                      <p className="text-sm text-gray-500 mt-1">{leave.dates} ({leave.days} days)</p>
                      <p className="text-xs text-gray-500 mt-2 italic">"{leave.reason}"</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <motion.button
                      onClick={() => handleApproveLeave(leave.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all text-sm font-semibold"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </motion.button>
                    
                    <motion.button
                      onClick={() => handleRejectLeave(leave.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all text-sm font-semibold"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Attendance Corrections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-orange-400" />
              Attendance Corrections
            </h3>
            
            <div className="space-y-4">
              {attendanceCorrections.map((correction) => (
                <div key={correction.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-white">{correction.employee}</p>
                      <p className="text-sm text-gray-400 mt-1">{correction.date}</p>
                      <p className="text-sm text-gray-500 mt-1">{correction.issue}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400">
                      {correction.status}
                    </span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg transition-all text-sm font-semibold"
                  >
                    <Edit className="w-4 h-4" />
                    Review & Fix
                  </motion.button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Employee Directory Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 bg-gradient-to-br from-primary/10 to-accent/10 border border-gray-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Employee Directory</h3>
              <p className="text-gray-400 text-sm">Manage employee records, departments, and positions</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-lg font-semibold transition-all"
            >
              View All Employees
            </motion.button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default DashboardHROfficer;
