// App constants and configuration
export const APP_CONFIG = {
  name: 'WorkZen HRMS',
  description: 'Unified HR management platform for Indian businesses',
  version: '1.0.0',
  author: 'WorkZen Team',
};

// Navigation links
export const NAV_LINKS = [
  { name: 'Home', href: 'hero' },
  { name: 'Features', href: 'features' },
  { name: 'Solutions', href: 'solutions' },
  { name: 'Pricing', href: 'pricing' },
  { name: 'Customers', href: 'customers' },
  { name: 'Resources', href: 'faq' },
];

// Features data
export const FEATURES_LIST = [
  {
    title: 'Role-Based Dashboards',
    description: 'Personalized views for HR, managers, and employees with relevant metrics.',
    icon: '📊',
  },
  {
    title: 'Configurable Compliance',
    description: 'Automated PF, ESI, and professional tax calculations for Indian businesses.',
    icon: '⚖️',
  },
  {
    title: 'Automated Workflows',
    description: 'Smart approvals, notifications, and reminders without manual intervention.',
    icon: '⚙️',
  },
  {
    title: 'In-App Notifications',
    description: 'Real-time alerts for leaves, attendance, payroll, and policy updates.',
    icon: '🔔',
  },
];

// Stats data
export const STATS_DATA = {
  modules: 4,
  pfPercentage: 12,
  setupHours: 24,
  employees: '10,000+',
  companies: '500+',
  satisfaction: 98,
  uptime: 99.9,
};

// Integration partners
export const INTEGRATION_PARTNERS = [
  { name: 'Tally', logo: '🧮' },
  { name: 'Google Workspace', logo: '📧' },
  { name: 'Razorpay', logo: '💳' },
  { name: 'Zoho Books', logo: '📚' },
  { name: 'Slack', logo: '💬' },
  { name: 'Microsoft Teams', logo: '👥' },
  { name: 'SAP', logo: '🏢' },
  { name: 'Salesforce', logo: '☁️' },
];

// Chart data for analytics
export const ATTENDANCE_TREND_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Present',
      data: [95, 92, 96, 94, 97, 95, 93, 96, 94, 95, 97, 96],
      borderColor: '#005eb8',
      backgroundColor: 'rgba(0, 94, 184, 0.1)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Absent',
      data: [5, 8, 4, 6, 3, 5, 7, 4, 6, 5, 3, 4],
      borderColor: '#f2c744',
      backgroundColor: 'rgba(242, 199, 68, 0.1)',
      tension: 0.4,
      fill: true,
    },
  ],
};

export const ENPS_DATA = {
  labels: ['Promoters', 'Passives', 'Detractors'],
  datasets: [
    {
      data: [65, 25, 10],
      backgroundColor: ['#005eb8', '#f2c744', '#ff6b6b'],
      borderWidth: 0,
    },
  ],
};

export const DEPARTMENT_DATA = {
  labels: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'],
  datasets: [
    {
      label: 'Headcount',
      data: [120, 45, 30, 15, 20, 50],
      backgroundColor: 'rgba(0, 94, 184, 0.8)',
      borderColor: '#005eb8',
      borderWidth: 2,
    },
  ],
};

// FAQ data
export const FAQ_DATA = [
  {
    question: 'Is WorkZen HRMS compliant with Indian labor laws?',
    answer: 'Yes, WorkZen is fully compliant with Indian labor regulations including PF, ESI, professional tax, gratuity, and bonus calculations. We regularly update the system to reflect changes in statutory requirements.',
  },
  {
    question: 'How long does it take to set up WorkZen?',
    answer: 'Most organizations can go live within 24 hours. Our onboarding process includes data migration, configuration, employee training, and integration with existing systems. Larger enterprises may take 2-3 days for complete setup.',
  },
  {
    question: 'Can WorkZen integrate with our existing payroll software?',
    answer: 'Yes, WorkZen seamlessly integrates with popular accounting software like Tally, Zoho Books, SAP, and QuickBooks. We also offer API access for custom integrations with your existing systems.',
  },
  {
    question: 'What support options are available?',
    answer: 'We provide 24/7 customer support via chat, email, and phone. Enterprise customers get a dedicated account manager, priority support, and quarterly business reviews. We also offer comprehensive documentation and video tutorials.',
  },
  {
    question: 'Is my company data secure on WorkZen?',
    answer: 'Absolutely. We use bank-grade encryption (AES-256), role-based access control, regular security audits, and ISO 27001 certified data centers in India. All data is backed up daily and we maintain 99.9% uptime SLA.',
  },
];

// Awards and certifications
export const AWARDS = [
  { name: 'Gartner Choice 2024', icon: '🏆' },
  { name: 'G2 Leader Winter 2025', icon: '⭐' },
  { name: 'ISO 27001 Certified', icon: '🔒' },
  { name: 'SOC 2 Type II', icon: '✅' },
];

// Footer links
export const FOOTER_LINKS = {
  Product: ['Features', 'Pricing', 'Security', 'Integrations', 'API', 'Roadmap'],
  Solutions: ['For Startups', 'For Enterprises', 'For SMBs', 'Remote Teams', 'Consulting'],
  Resources: ['Blog', 'Documentation', 'Help Center', 'Case Studies', 'Webinars', 'Newsletter'],
  Company: ['About Us', 'Careers', 'Press Kit', 'Partners', 'Contact', 'Legal'],
};

// Social media links
export const SOCIAL_LINKS = [
  { name: 'LinkedIn', icon: 'linkedin', url: '#' },
  { name: 'Twitter', icon: 'twitter', url: '#' },
  { name: 'Facebook', icon: 'facebook', url: '#' },
  { name: 'Instagram', icon: 'instagram', url: '#' },
];

// Contact information
export const CONTACT_INFO = [
  { type: 'email', value: 'support@workzen.in', url: 'mailto:support@workzen.in' },
  { type: 'phone', value: '+91 8000 123 456', url: 'tel:+918000123456' },
  { type: 'address', value: 'Mumbai, Maharashtra, India', url: '#' },
];
