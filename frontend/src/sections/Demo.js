'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Play, Monitor, Smartphone, Users, BarChart3, Settings } from 'lucide-react';

const demoFeatures = [
  {
    icon: Monitor,
    title: 'Dashboard Overview',
    description: 'Get a complete view of your HR metrics and key performance indicators'
  },
  {
    icon: Users,
    title: 'Employee Management',
    description: 'Manage employee profiles, documents, and organizational structure'
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description: 'Generate comprehensive reports and gain insights into workforce data'
  },
  {
    icon: Settings,
    title: 'System Configuration',
    description: 'Customize workflows, policies, and system settings to match your needs'
  }
];

export default function Demo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            See WorkZen in Action
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience our powerful HRMS platform with an interactive demo. Explore features, workflows, and see how WorkZen can transform your HR operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Demo Video/Screenshot */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Mock Dashboard Interface */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="flex-1"></div>
                  <div className="text-white text-sm font-medium">WorkZen HRMS Dashboard</div>
                </div>
              </div>

              <div className="p-6">
                {/* Mock Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">248</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Employees</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">96.5%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Attendance Rate</div>
                  </div>
                </div>

                {/* Mock Chart */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <div className="h-32 flex items-end justify-between space-x-2">
                    {[40, 60, 45, 70, 55, 80, 65].map((height, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-t from-blue-500 to-blue-600 rounded-t flex-1"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">Monthly Attendance Trends</div>
                </div>

                {/* Mock Actions */}
                <div className="flex space-x-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Add Employee
                  </button>
                  <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 p-6 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200">
                <Play className="w-8 h-8 ml-1" />
              </button>
            </div>
          </motion.div>

          {/* Demo Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-8">
              {demoFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-8 space-y-4"
            >
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                Start Interactive Demo
              </button>

              <button className="w-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-4 px-6 rounded-lg font-semibold text-lg hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-200 flex items-center justify-center">
                <Smartphone className="w-5 h-5 mr-2" />
                View Mobile Demo
              </button>
            </motion.div>

            {/* Demo Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-8 grid grid-cols-3 gap-4 text-center"
            >
              <div>
                <div className="text-2xl font-bold text-blue-600">5min</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Setup Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Free Demo</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Access</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
