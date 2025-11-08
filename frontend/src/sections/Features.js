'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Users,
  Calendar,
  DollarSign,
  BarChart3,
  Shield,
  Zap,
  Clock,
  FileText,
  Bell,
  Settings,
  Smartphone,
  Globe
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Employee Management',
    description: 'Complete employee lifecycle management from onboarding to offboarding with comprehensive profiles and documentation.',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    icon: Calendar,
    title: 'Attendance Tracking',
    description: 'Real-time attendance monitoring with biometric integration, leave management, and automated timesheet calculations.',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  {
    icon: DollarSign,
    title: 'Payroll Processing',
    description: 'Automated payroll calculations, tax compliance, salary disbursements, and comprehensive payroll reporting.',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Powerful dashboards with HR metrics, employee engagement analytics, and predictive insights for better decision making.',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20'
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Enterprise-grade security with GDPR compliance, data encryption, and role-based access control.',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20'
  },
  {
    icon: Zap,
    title: 'Automation',
    description: 'Streamline HR processes with intelligent automation for approvals, notifications, and routine tasks.',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
  },
  {
    icon: Clock,
    title: 'Time & Leave Management',
    description: 'Comprehensive leave tracking, overtime management, and flexible work schedule configurations.',
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
  },
  {
    icon: FileText,
    title: 'Document Management',
    description: 'Secure document storage, digital signatures, and automated document workflows for HR processes.',
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20'
  },
  {
    icon: Bell,
    title: 'Notifications & Alerts',
    description: 'Smart notifications for important HR events, deadlines, and policy updates across multiple channels.',
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20'
  },
  {
    icon: Settings,
    title: 'Customizable Workflows',
    description: 'Flexible workflow designer to create custom HR processes that match your organizational needs.',
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'bg-cyan-50 dark:bg-cyan-900/20'
  },
  {
    icon: Smartphone,
    title: 'Mobile App',
    description: 'Native mobile apps for iOS and Android with offline capabilities and biometric authentication.',
    color: 'from-violet-500 to-violet-600',
    bgColor: 'bg-violet-50 dark:bg-violet-900/20'
  },
  {
    icon: Globe,
    title: 'Multi-Company Support',
    description: 'Manage multiple companies, subsidiaries, and locations with centralized control and reporting.',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
  }
];

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative p-6 rounded-xl ${feature.bgColor} border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
    >
      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4`}>
        <feature.icon className="w-6 h-6 text-white" />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {feature.title}
      </h3>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {feature.description}
      </p>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 transition-all duration-300 pointer-events-none"></div>
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
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
            Powerful Features for Modern HR
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to manage your workforce efficiently, from employee onboarding to payroll processing and analytics.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Ready to transform your HR operations?
          </p>
          <button
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            Explore All Features
          </button>
        </motion.div>
      </div>
    </section>
  );
}
