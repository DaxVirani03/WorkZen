'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { formatNumber } from '../utils/helpers';

const stats = [
  {
    value: 50000,
    label: 'Active Users',
    suffix: '+',
    description: 'Companies worldwide trust WorkZen'
  },
  {
    value: 99.9,
    label: 'Uptime',
    suffix: '%',
    description: 'Reliable service you can depend on'
  },
  {
    value: 2500000,
    label: 'Payroll Processed',
    suffix: '+',
    description: 'Transactions handled monthly'
  },
  {
    value: 45,
    label: 'Countries',
    suffix: '+',
    description: 'Global presence and support'
  },
  {
    value: 98,
    label: 'Customer Satisfaction',
    suffix: '%',
    description: 'Based on user feedback'
  },
  {
    value: 24,
    label: 'Support Response',
    suffix: 'h',
    description: 'Average response time'
  }
];

function AnimatedCounter({ value, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {typeof value === 'number' && value % 1 !== 0
        ? count.toFixed(1)
        : formatNumber(count)
      }{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Trusted by Organizations Worldwide
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join thousands of companies that have transformed their HR operations with WorkZen
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  duration={2500}
                />
              </div>
              <div className="text-lg sm:text-xl font-semibold mb-2 text-blue-100">
                {stat.label}
              </div>
              <div className="text-sm text-blue-200">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full">
            <div className="flex -space-x-2 mr-4">
              {/* Company logos placeholder */}
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                T
              </div>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                M
              </div>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                S
              </div>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                +
              </div>
            </div>
            <span className="text-blue-100">
              Trusted by Fortune 500 companies
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
