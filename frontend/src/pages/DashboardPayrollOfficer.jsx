/**
 * WorkZen HRMS - Payroll Officer Dashboard
 * Single-file dashboard for Payroll Officer role
 * Features (from Excalidraw flow):
 * - Run payroll/payrun processing
 * - View locked payruns
 * - Generate payslips
 * - Monthly payroll cost analytics
 * - Approved leaves summary (affects payroll)
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LogOut, DollarSign, Lock, FileText, Download, 
  PlayCircle, TrendingUp, CheckCircle, Calendar, Users
} from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function DashboardPayrollOfficer() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('workzen_token');
    const role = localStorage.getItem('workzen_role');
    const userData = localStorage.getItem('workzen_user');

    if (!token || role !== 'Payroll Officer') {
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

  const handleRunPayroll = async () => {
    setIsProcessing(true);
    console.log('🔄 Processing payroll...');
    
    // TODO: Call /api/payroll/process
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    
    setIsProcessing(false);
    alert('✅ Payroll processed successfully for November 2025!');
  };

  // Mock locked payruns
  const lockedPayruns = [
    { id: 1, month: 'October 2025', employees: 248, totalCost: '$842,600', status: 'Locked', date: 'Nov 1, 2025' },
    { id: 2, month: 'September 2025', employees: 245, totalCost: '$831,450', status: 'Locked', date: 'Oct 1, 2025' },
    { id: 3, month: 'August 2025', employees: 243, totalCost: '$825,100', status: 'Locked', date: 'Sept 1, 2025' },
  ];

  // Mock approved leaves affecting payroll
  const approvedLeaves = [
    { id: 1, employee: 'John Employee', type: 'Sick Leave', days: 2, dates: 'Nov 5-6', deduction: '$200' },
    { id: 2, employee: 'Jane Smith', type: 'Casual Leave', days: 1, dates: 'Nov 7', deduction: '$100' },
  ];

  // Payroll cost chart data
  const payrollData = {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'Payroll Cost ($K)',
        data: [790, 805, 815, 825, 831, 842],
        backgroundColor: 'rgba(0, 94, 184, 0.7)',
        borderColor: 'rgba(0, 94, 184, 1)',
        borderWidth: 2,
        borderRadius: 8,
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
        text: 'Monthly Payroll Costs (Last 6 Months)',
        color: '#fff',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#9CA3AF' },
        grid: { color: 'rgba(156, 163, 175, 0.1)' },
      },
      x: {
        ticks: { color: '#9CA3AF' },
        grid: { color: 'rgba(156, 163, 175, 0.1)' },
      },
    },
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
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-primary bg-clip-text text-transparent">
                Payroll Officer Dashboard
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
            <DollarSign className="w-8 h-8 text-green-400 mb-3" />
            <p className="text-gray-400 text-sm mb-1">Monthly Payroll</p>
            <p className="text-2xl font-bold text-white">$842,600</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <Users className="w-8 h-8 text-primary mb-3" />
            <p className="text-gray-400 text-sm mb-1">Employees</p>
            <p className="text-2xl font-bold text-white">248</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <CheckCircle className="w-8 h-8 text-accent mb-3" />
            <p className="text-gray-400 text-sm mb-1">Processed Payruns</p>
            <p className="text-2xl font-bold text-white">{lockedPayruns.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <Calendar className="w-8 h-8 text-orange-400 mb-3" />
            <p className="text-gray-400 text-sm mb-1">Leaves This Month</p>
            <p className="text-2xl font-bold text-white">{approvedLeaves.length}</p>
          </motion.div>
        </div>

        {/* Run Payroll Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 bg-gradient-to-br from-green-500/10 to-primary/10 border border-gray-800 rounded-xl p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <PlayCircle className="w-8 h-8 text-green-400" />
                Process November 2025 Payroll
              </h3>
              <p className="text-gray-400">
                Generate payruns and payslips for all 248 employees. Estimated total: $842,600
              </p>
              <p className="text-sm text-gray-500 mt-2">
                ⚠️ This will lock the payrun and generate all payslips automatically.
              </p>
            </div>
            
            <motion.button
              onClick={handleRunPayroll}
              disabled={isProcessing}
              whileHover={{ scale: isProcessing ? 1 : 1.05 }}
              whileTap={{ scale: isProcessing ? 1 : 0.95 }}
              className={`px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center gap-3 ${
                isProcessing
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <PlayCircle className="w-6 h-6" />
                  Run Payroll
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Payroll Cost Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8 bg-gray-900/50 border border-gray-800 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-400" />
            Payroll Cost Trend
          </h3>
          <div className="h-80">
            <Bar data={payrollData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Locked Payruns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-accent" />
              Locked Payruns
            </h3>
            
            <div className="space-y-4">
              {lockedPayruns.map((payrun) => (
                <div key={payrun.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-white">{payrun.month}</p>
                      <p className="text-sm text-gray-400 mt-1">{payrun.employees} employees</p>
                      <p className="text-sm text-gray-500 mt-1">Processed: {payrun.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-400">{payrun.totalCost}</p>
                      <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent/20 text-accent">
                        {payrun.status}
                      </span>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg transition-all text-sm font-semibold"
                  >
                    <FileText className="w-4 h-4" />
                    View Details
                  </motion.button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Approved Leaves (Payroll Impact) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-orange-400" />
              Approved Leaves (This Month)
            </h3>
            
            <div className="space-y-4">
              {approvedLeaves.map((leave) => (
                <div key={leave.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-white">{leave.employee}</p>
                      <p className="text-sm text-gray-400 mt-1">{leave.type}</p>
                      <p className="text-sm text-gray-500 mt-1">{leave.dates} ({leave.days} days)</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Deduction</p>
                      <p className="text-lg font-bold text-red-400">{leave.deduction}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 font-semibold">Total Leave Deduction:</p>
                  <p className="text-xl font-bold text-red-400">$300</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Payslip Generation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-6 bg-gray-900/50 border border-gray-800 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Download className="w-6 h-6 text-primary" />
            Bulk Payslip Generation
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-gray-400">Generate and download payslips for all employees in bulk</p>
              <p className="text-sm text-gray-500 mt-1">Available for: October 2025, September 2025, August 2025</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download All (October)
            </motion.button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default DashboardPayrollOfficer;
