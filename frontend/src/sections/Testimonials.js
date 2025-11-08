'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'HR Director',
    company: 'TechCorp Inc.',
    image: '/api/placeholder/64/64',
    content: 'WorkZen has revolutionized our HR processes. The automation features have saved us countless hours, and the analytics provide invaluable insights into our workforce.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'CEO',
    company: 'StartupXYZ',
    image: '/api/placeholder/64/64',
    content: 'As a growing startup, we needed a scalable HR solution. WorkZen grew with us perfectly. The mobile app and integrations made it seamless for our remote team.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Operations Manager',
    company: 'Global Solutions Ltd.',
    image: '/api/placeholder/64/64',
    content: 'The payroll processing is incredibly accurate and compliant. We\'ve eliminated errors and reduced our payroll processing time by 80%. Excellent support team too!',
    rating: 5
  },
  {
    name: 'David Thompson',
    role: 'IT Manager',
    company: 'Enterprise Corp',
    image: '/api/placeholder/64/64',
    content: 'Security and compliance were our top priorities. WorkZen exceeded our expectations with enterprise-grade security and comprehensive audit trails.',
    rating: 5
  },
  {
    name: 'Lisa Wang',
    role: 'People Operations',
    company: 'InnovateLabs',
    image: '/api/placeholder/64/64',
    content: 'The user interface is intuitive and our employees adapted quickly. The self-service features have reduced HR ticket volume by 60%.',
    rating: 5
  },
  {
    name: 'Robert Kim',
    role: 'Finance Director',
    company: 'Manufacturing Plus',
    image: '/api/placeholder/64/64',
    content: 'WorkZen\'s reporting capabilities are outstanding. We get real-time insights into labor costs, productivity metrics, and compliance status.',
    rating: 5
  }
];

function TestimonialCard({ testimonial, isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: isActive ? 1 : 0.5,
        scale: isActive ? 1 : 0.95
      }}
      transition={{ duration: 0.5 }}
      className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 ${
        isActive ? 'ring-2 ring-blue-500 shadow-xl' : ''
      }`}
    >
      <div className="flex items-center mb-4">
        <Quote className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
        <div className="flex">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed italic">
        "{testimonial.content}"
      </p>

      <div className="flex items-center">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">
            {testimonial.name}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {testimonial.role}
          </div>
          <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            {testimonial.company}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3));
  };

  const getVisibleTestimonials = () => {
    const start = currentIndex * 3;
    return testimonials.slice(start, start + 3);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
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
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what industry leaders say about WorkZen
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {getVisibleTestimonials().map((testimonial, index) => (
              <TestimonialCard
                key={`${currentIndex}-${index}`}
                testimonial={testimonial}
                isActive={true}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-gray-200 dark:border-gray-600"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-blue-600 scale-125'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial set ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-gray-200 dark:border-gray-600"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
                <div className="flex justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
