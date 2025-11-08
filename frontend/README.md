# WorkZen HRMS Frontend

A modern, responsive landing page for WorkZen HRMS built with Next.js 15, featuring dark/light theme toggle and Zoho-inspired design.

## 🚀 Features

- **14 Complete Sections** - Hero, Features, Mobile App, CTA, Stats, Integrations, Analytics, Payroll, Hiring, Performance, Core HR, FAQ, Awards, Footer
- **Dark/Light Theme Toggle** - Persistent theme switching with localStorage
- **Responsive Design** - Mobile-first approach, works on all devices
- **Smooth Animations** - GSAP ScrollTrigger and Framer Motion
- **Interactive Charts** - Chart.js visualizations for HR analytics
- **3D Elements** - Three.js rotating hexagon logo
- **Glassmorphism Effects** - Modern card designs
- **SEO Optimized** - Meta tags, Open Graph, Twitter Cards

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **GSAP** - Advanced scroll animations
- **Chart.js** - Data visualization
- **Three.js** - 3D graphics
- **React CountUp** - Animated counters

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components (Button, Card, etc.)
│   │   ├── Navbar.js      # Navigation component
│   │   └── ThreeScene.js  # 3D graphics component
│   ├── sections/           # Landing page sections
│   │   ├── Hero.js        # Hero section
│   │   ├── Features.js    # Features grid
│   │   ├── MobileApp.js   # Mobile app showcase
│   │   ├── CTABanner.js   # Call-to-action banner
│   │   ├── Stats.js       # Statistics section
│   │   ├── Integrations.js # Partner integrations
│   │   ├── Analytics.js   # Charts and analytics
│   │   ├── Payroll.js     # Payroll features
│   │   ├── FAQ.js         # FAQ accordion
│   │   └── Footer.js      # Footer component
│   ├── pages/             # Next.js pages
│   │   ├── _app.js       # App wrapper
│   │   ├── index.js      # Landing page
│   │   └── api/          # API routes (if needed)
│   ├── styles/            # Global styles
│   │   ├── globals.css   # Global CSS
│   │   └── tailwind.config.js # Tailwind configuration
│   └── utils/             # Helper functions
│       ├── constants.js  # App constants
│       ├── animations.js # Animation utilities
│       └── helpers.js    # General helpers
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm package manager

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Color Palette
- **Primary Blue**: #005eb8
- **Accent Gold**: #f2c744
- **Dark Background**: #000000
- **Light Background**: #ffffff

### Typography
- **Primary Font**: Inter
- **Display Font**: Poppins (for headings)

### Components
- **Glass Cards**: Backdrop blur with transparency
- **Glow Effects**: Subtle neon glow on hover
- **Smooth Transitions**: 300ms duration
- **Responsive Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)

## 🔧 Customization

### Changing Colors
Edit `src/styles/tailwind.config.js`:
```javascript
colors: {
  primary: {
    DEFAULT: '#005eb8', // Change this
  },
  accent: {
    DEFAULT: '#f2c744', // Change this
  }
}
```

### Adding New Sections
1. Create new component in `src/sections/`
2. Import in `src/pages/index.js`
3. Add navigation link in `src/components/Navbar.js`

### Modifying Content
Edit data in `src/utils/constants.js` or create new data files.

## 📱 Responsive Design

The landing page is fully responsive with:
- **Mobile-first approach**
- **Flexible grid layouts**
- **Adaptive typography**
- **Touch-friendly interactions**
- **Optimized performance**

## 🎭 Animations

### GSAP Animations
- Section reveal on scroll
- Parallax background effects
- Letter-by-letter text reveals

### Framer Motion
- Card hover effects
- Button interactions
- Modal transitions
- FAQ accordion

### CSS Animations
- Floating elements
- Pulse effects
- Shimmer animations
- Gradient transitions

## 📊 Charts & Data

Uses Chart.js for:
- **Attendance Trends** - Line chart
- **Employee NPS** - Doughnut chart
- **Department Distribution** - Bar chart
- **Payroll Analytics** - Mixed charts

## 🔍 SEO & Performance

- **Next.js Optimization** - Automatic code splitting
- **Image Optimization** - Next.js Image component
- **Meta Tags** - Dynamic meta tags
- **Open Graph** - Social media sharing
- **Core Web Vitals** - Optimized for performance

## 🐛 Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   ```bash
   npm run dev -- -p 3001
   ```

2. **Tailwind classes not working**
   - Check `tailwind.config.js`
   - Restart dev server
   - Clear `.next` cache

3. **Animations not working**
   - Check browser console for errors
   - Ensure GSAP is properly imported
   - Check Framer Motion version compatibility

## 🚀 Build & Deployment

### Production Build
```bash
npm run build
npm start
```

### Deployment Options
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Self-hosted** with PM2

## 📚 API Integration

The frontend is designed to work with the backend API:
- Base URL: `http://localhost:5000/api`
- Authentication: JWT tokens
- Data fetching: RESTful endpoints

## 🤝 Contributing

1. Follow the existing code structure
2. Use meaningful component names
3. Add comments for complex logic
4. Test responsiveness on multiple devices
5. Ensure animations work smoothly

## 📄 License

Part of WorkZen HRMS project.

## 📞 Support

For frontend-specific issues:
- Check component documentation
- Review animation implementations
- Test on different browsers/devices

---

**Built for WorkZen HRMS** - *Simplifying HR for Indian businesses*
