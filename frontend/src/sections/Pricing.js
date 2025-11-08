'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, Star, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: { monthly: 29, yearly: 24 },
    description: 'Perfect for small teams getting started with HR management',
    features: [
      'Up to 50 employees',
      'Basic employee management',
      'Attendance tracking',
      'Leave management',
      'Basic reporting',
      'Email support',
      'Mobile app access'
    ],
    popular: false,
    color: 'border-gray-200 dark:border-gray-700'
  },
  {
    name: 'Professional',
    price: { monthly: 79, yearly: 66 },
    description: 'Ideal for growing companies with advanced HR needs',
    features: [
      'Up to 200 employees',
      'Advanced employee management',
      'Biometric attendance',
      'Payroll processing',
      'Performance management',
      'Advanced analytics',
      'API access',
      'Priority support',
      'Custom integrations'
    ],
    popular: true,
    color: 'border-blue-500 ring-2 ring-blue-500'
  },
  {
    name: 'Enterprise',
    price: { monthly: 199, yearly: 166 },
    description: 'Complete solution for large organizations with complex requirements',
    features: [
      'Unlimited employees',
      'Multi-company support',
      'Advanced payroll & compliance',
      'Custom workflows',
      'White-label solution',
      'Dedicated account manager',
      '24/7 phone support',
      'On-premise deployment',
      'Custom development'
    ],
    popular: false,
    color: 'border-purple-500'
  }
];

const addons = [
  { name: 'Advanced Analytics', price: 25 },
  { name: 'Custom Integrations', price: 50 },
  { name: 'Additional Storage', price: 10 },
  { name: 'Priority Support', price: 30 }
];

function PricingCard({ plan, billingCycle }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 ${plan.color} p-8 ${
        plan.popular ? 'scale-105' : ''
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
            <Star className="w-4 h-4 mr-1" />
            Most Popular
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {plan.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {plan.description}
        </p>

        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">
            ${plan.price[billingCycle]}
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            /{billingCycle === 'monthly' ? 'month' : 'month'}
          </span>
          {billingCycle === 'yearly' && (
            <div className="text-sm text-green-600 dark:text-green-400 mt-1">
              Save ${(plan.price.monthly - plan.price.yearly) * 12} annually
            </div>
          )}
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
          plan.popular
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-105'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        {plan.popular ? 'Start Free Trial' : 'Get Started'}
      </button>
    </motion.div>
  );
}

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-900">
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
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your organization. All plans include our core features with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 flex items-center ${
                billingCycle === 'yearly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Yearly
              <span className="ml-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              billingCycle={billingCycle}
            />
          ))}
        </div>

        {/* Add-ons Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Popular Add-ons
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Extend your plan with these powerful features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addons.map((addon, index) => (
              <div
                key={addon.name}
                className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-600"
              >
                <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {addon.name}
                </h4>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${addon.price}
                  <span className="text-sm text-gray-600 dark:text-gray-400">/month</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-300">
            Have questions about pricing?
            <button
              onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium ml-2"
            >
              Check our FAQ
            </button>
            or
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium ml-2"
            >
              Contact Sales
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
