# WorkZen HRMS - Complete Local MERN Project

A comprehensive Human Resource Management System built with the MERN stack, featuring a single-file React landing page inspired by Zoho HRMS with dark theme and smooth animations.

## 🎯 Project Overview

WorkZen HRMS is designed for Indian businesses, providing:
- **Single-file React landing page** with 14 comprehensive sections
- **Express + MongoDB backend** with placeholder APIs
- **Dark, modern UI** (#000 background, blue accent)
- **Smooth animations** with Framer Motion and GSAP
- **Local-ready structure** for easy development

## 📂 Project Structure

```
WorkZen-HRMS/
│
├── frontend-react/           # React frontend (Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.js    # All 14 sections in ONE file
│   │   │   ├── About.js          # Placeholder page
│   │   │   ├── Pricing.js        # Placeholder page
│   │   │   └── Contact.js        # Placeholder page
│   │   ├── App.js                # React Router
│   │   └── index.js              # Entry point
│   ├── package.json
│   └── README.md
│
├── backend/                  # Express backend
│   ├── controllers/          # Business logic
│   │   ├── userController.js
│   │   ├── attendanceController.js
│   │   ├── payrollController.js
│   │   └── leaveController.js
│   ├── routes/               # API routes
│   │   ├── users.js
│   │   ├── payroll-simple.js
│   │   └── leaves-simple.js
│   ├── server-simple.js      # Simplified Express server
│   ├── .env.example
│   └── package.json
│
├── docs/
│   └── WorkZen_HRMS_Final_Complete_Documentation.docx
│
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16+ and npm 8+
- **MongoDB** (optional - backend uses mock data)
- Modern browser (Chrome, Firefox, Safari, Edge)

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the backend server
npm run dev
```

Backend will run on **http://localhost:5000**

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend-react

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on **http://localhost:3000**

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📋 Available API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance

### Payroll
- `GET /api/payroll` - Get payroll records
- `POST /api/payroll/process` - Process payroll

### Leaves
- `GET /api/leaves` - Get leave requests
- `POST /api/leaves` - Apply for leave
- `PUT /api/leaves/:id/approve` - Approve leave

All endpoints return JSON mock data.

## 🎨 Frontend Features

### Landing Page (Single File: LandingPage.js)

**All 14 sections in ONE component**:

1. ✅ **Hero** - Main headline, CTA buttons, stats
2. ✅ **Built for Your People** - Core features grid (6 features)
3. ✅ **HRMS in Your Pocket** - Mobile app showcase
4. ✅ **Make the Shift** - CTA section with gradient
5. ✅ **HR Software That Grows** - Scalability tiers (4 tiers)
6. ✅ **Integrations** - Third-party tools (12 integrations)
7. ✅ **Employee Engagement** - Engagement features (4 items)
8. ✅ **HR Analytics** - Dashboard and metrics
9. ✅ **Integrated Payroll** - Payroll management features
10. ✅ **Hiring & Onboarding** - Recruitment workflow (4 steps)
11. ✅ **Compensation & Learning** - L&D features (2 sections)
12. ✅ **Core HR** - Core HR functions (6 features)
13. ✅ **FAQ** - 5 frequently asked questions
14. ✅ **Awards & Footer** - Recognition, CTA, footer links

### Design

- **Dark Theme**: #000 background with white text
- **Primary Color**: #005eb8 (Blue)
- **Accent Color**: #f2c744 (Gold)
- **Typography**: Inter + Poppins fonts
- **Animations**: Framer Motion + GSAP

### Additional Pages

- `/about` - About WorkZen HRMS
- `/pricing` - Pricing plans with comparison
- `/contact` - Contact form with info

## 🛠 Technology Stack

### Frontend
- **React 18** - No Next.js, pure React
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - React animation library
- **GSAP** - Advanced scroll animations
- **Chart.js** - Data visualization
- **Lucide React** - Modern icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB (Optional)** - Mock data by default
- **CORS** - Cross-origin requests
- **Dotenv** - Environment variables

## 📝 Development Notes

### Single-File Landing Page Philosophy

The `LandingPage.js` is intentionally kept as a **single file** (not split into components) for:
- **Simplicity** - Easy to understand and navigate
- **Clear structure** - All sections visible in one place
- **JSX comments** - Each section clearly marked
- **Scroll anchors** - Internal navigation with `id` attributes
- **Future-ready** - Easy to split later if needed

### Why React (Not Next.js)?

- **Simpler setup** - No SSR complexity
- **Faster development** - Vite is extremely fast
- **Client-side routing** - React Router for SPAs
- **Local-first** - Optimized for local development
- **No build time** - Instant HMR with Vite

### Mock Data Backend

The backend uses **controllers returning mock data** instead of MongoDB queries for:
- **Instant setup** - No database configuration needed
- **Fast testing** - Quick API testing
- **Easy customization** - Modify data in controllers
- **Future-ready** - Add MongoDB later by updating controllers

## 🔧 Customization

### Change Colors

Edit `frontend-react/tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: '#YOUR_COLOR',
    // ...
  },
}
```

### Modify Landing Page Content

Edit `frontend-react/src/pages/LandingPage.js`:

```javascript
{/* ==================== SECTION 1: HERO ==================== */}
<section id="hero">
  {/* Modify content here */}
</section>
```

### Add New API Endpoints

1. Create controller in `backend/controllers/`
2. Create route in `backend/routes/`
3. Register in `backend/server-simple.js`

## 🌐 Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
```

## 📦 Installation Commands Reference

```bash
# Install all dependencies (root)
cd backend && npm install
cd ../frontend-react && npm install

# Run backend
cd backend
npm run dev

# Run frontend (in new terminal)
cd frontend-react
npm run dev

# Build frontend for production
cd frontend-react
npm run build
```

## 🎯 Design Inspiration

This project is inspired by:
- **Zoho People** - Dark, modern HRMS interface
- **Modern SaaS** - Clean, minimalist design
- **Indian businesses** - Localized features and compliance

## 📊 What's Included

✅ **Single-file React landing page** with 14 sections  
✅ **React Router** for multi-page navigation  
✅ **Tailwind CSS** with custom dark theme  
✅ **Framer Motion** smooth animations  
✅ **GSAP** scroll-based reveals  
✅ **Express backend** with mock APIs  
✅ **Controller-based architecture**  
✅ **CORS enabled** for frontend-backend communication  
✅ **Responsive design** mobile → desktop  
✅ **Clear documentation** with setup guides  

## 🚀 Next Steps

1. **Start both servers** (backend + frontend)
2. **Visit** http://localhost:3000
3. **Explore** all 14 sections on the landing page
4. **Navigate** to About, Pricing, and Contact pages
5. **Test** API endpoints with browser or Postman
6. **Customize** colors, content, and features
7. **Add MongoDB** by updating controllers (optional)
8. **Deploy** to your preferred hosting service

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 🤝 Contributing

This is a local MERN project template. Feel free to:
- Customize for your business needs
- Add new features and sections
- Integrate with real databases
- Deploy to production

## 📞 Support

For questions or issues:
- Check documentation in `docs/` folder
- Review individual README files in subdirectories
- Inspect code comments in source files

---

**Built with ❤️ for Modern Indian Businesses**

**WorkZen HRMS** - Transform Your HR Operations

🚀 **Local Setup** | 🎨 **Single-File Landing Page** | 📊 **Mock APIs** | ⚡ **Vite + React**
