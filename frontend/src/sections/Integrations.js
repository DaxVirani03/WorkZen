'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const integrations = [
  { name: 'Slack', logo: '💬' },
  { name: 'Microsoft Teams', logo: '👥' },
  { name: 'Google Workspace', logo: '📧' },
  { name: 'Zoom', logo: '📹' },
  { name: 'Salesforce', logo: '☁️' },
  { name: 'QuickBooks', logo: '💼' },
  { name: 'ADP', logo: '📊' },
  { name: 'BambooHR', logo: '🎋' },
  { name: 'Workday', logo: '🏢' },
  { name: 'SAP', logo: '🔧' },
  { name: 'Oracle', logo: '🗄️' },
  { name: 'AWS', logo: '☁️' }
];

export default function Integrations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Seamless Integrations
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Connect WorkZen with your favorite tools and services for a unified workflow experience
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-200 hover:scale-105 border border-gray-200 dark:border-gray-700"
            >
              <div className="text-3xl mb-3">{integration.logo}</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {integration.name}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Don't see your tool? We support 200+ integrations via Zapier and custom APIs.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
            View All Integrations
          </button>
        </motion.div>
      </div>
    </section>
  );
}
