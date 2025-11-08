'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { UserPlus, Settings, BarChart3, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Sign Up & Setup',
    description: 'Create your account and configure your company settings, departments, and employee structure in minutes.',
    step: '01',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Settings,
    title: 'Configure Workflows',
    description: 'Set up automated HR processes, approval workflows, and customize the system to match your organizational needs.',
    step: '02',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: BarChart3,
    title: 'Monitor & Analyze',
    description: 'Track employee performance, generate reports, and gain insights with powerful analytics and dashboards.',
    step: '03',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: CheckCircle,
    title: 'Scale & Optimize',
    description: 'Grow your team while continuously optimizing HR processes with data-driven insights and automation.',
    step: '04',
    color: 'from-orange-500 to-orange-600'
  }
];

function StepCard({ step, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="relative"
    >
      {/* Step Number */}
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
        {step.step}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
        <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${step.color} mb-6`}>
          <step.icon className="w-8 h-8 text-white" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {step.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Connection Line */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-1/2 -right-8 w-16 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform -translate-y-1/2"></div>
      )}
    </motion.div>
  );
}

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-gray-900">
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
            How WorkZen Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get started in four simple steps and transform your HR operations with our intuitive platform
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>

        {/* Timeline for mobile */}
        <div className="lg:hidden mt-12">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="flex items-center justify-between">
                {steps.map((_, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    {index < steps.length - 1 && (
                      <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of companies already using WorkZen to streamline their HR operations.
              Start your free trial today and see the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105"
              >
                Start Free Trial
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg font-semibold text-lg hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-200"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
