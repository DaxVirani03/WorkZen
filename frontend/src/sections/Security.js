'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Lock, Eye, CheckCircle } from 'lucide-react';

const securityFeatures = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and security measures protect your sensitive HR data'
  },
  {
    icon: Lock,
    title: 'Data Privacy',
    description: 'GDPR and CCPA compliant with complete control over your data'
  },
  {
    icon: Eye,
    title: 'Audit Trails',
    description: 'Comprehensive logging and monitoring of all system activities'
  },
  {
    icon: CheckCircle,
    title: 'Compliance',
    description: 'ISO 27001 certified with regular security audits and penetration testing'
  }
];

export default function Security() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Security & Compliance
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your data security is our top priority. We employ industry-leading security measures to protect your HR information.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="inline-flex p-3 rounded-lg bg-green-100 dark:bg-green-900 mb-4">
                <feature.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
