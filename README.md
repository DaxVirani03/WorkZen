# WorkZen HRMS - Complete MERN Stack Application

A comprehensive Human Resource Management System built with the MERN stack (MongoDB, Express.js, React/Next.js, Node.js). Features a modern, responsive landing page with dark/light theme toggle and a complete backend API for HR operations.

## 🚀 Features

### Frontend (Next.js)
- **Modern Landing Page**: 14-section responsive landing page with Zoho-inspired design
- **Dark/Light Theme Toggle**: Seamless theme switching with persistent preferences
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion and GSAP animations
- **Interactive Components**: Charts, testimonials carousel, pricing tables
- **SEO Optimized**: Meta tags and structured data

### Backend (Express.js + MongoDB)
- **Employee Management**: Complete CRUD operations for employee data
- **Attendance Tracking**: Real-time check-in/check-out with geolocation
- **Leave Management**: Automated leave applications and approvals
- **Payroll Processing**: Comprehensive payroll calculations and processing
- **Dashboard Analytics**: Real-time insights and reporting
- **Authentication**: JWT-based authentication with role-based access
- **API Documentation**: RESTful API endpoints with validation

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations
- **Three.js** - 3D graphics
- **Chart.js** - Data visualization
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## 📁 Project Structure

```
WorkZen-HRMS/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js app router pages
│   │   ├── components/      # Reusable React components
│   │   ├── sections/        # Landing page sections
│   │   ├── contexts/        # React contexts (Theme)
│   │   ├── utils/           # Utility functions and helpers
│   │   └── styles/          # Global styles and Tailwind config
│   ├── package.json
│   └── next.config.js
├── backend/                  # Express.js backend API
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── server.js            # Main server file
│   ├── package.json
│   └── .env.example         # Environment variables template
└── docs/                    # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm 8+
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/workzen-hrms.git
   cd workzen-hrms
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB connection string and other settings
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/workzen-hrms
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - Employee login
- `POST /api/auth/register` - Register new employee
- `GET /api/auth/me` - Get current user profile

### Employees
- `GET /api/employees` - Get all employees (with pagination)
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Deactivate employee

### Attendance
- `POST /api/attendance/check-in` - Employee check-in
- `PUT /api/attendance/check-out` - Employee check-out
- `GET /api/attendance` - Get attendance records
- `GET /api/attendance/employee/:id/summary` - Get attendance summary

### Leave Management
- `POST /api/leave` - Apply for leave
- `GET /api/leave` - Get leave applications
- `PUT /api/leave/:id/approve` - Approve leave
- `PUT /api/leave/:id/reject` - Reject leave

### Payroll
- `POST /api/payroll/generate` - Generate payroll
- `GET /api/payroll` - Get payroll records
- `PUT /api/payroll/:id/process` - Process payroll
- `PUT /api/payroll/:id/pay` - Mark as paid

### Dashboard
- `GET /api/dashboard/overview` - Dashboard statistics
- `GET /api/dashboard/charts/attendance` - Attendance charts
- `GET /api/dashboard/charts/payroll` - Payroll charts
- `GET /api/dashboard/alerts` - System alerts

## 🎨 Customization

### Theme Configuration
The application supports dark and light themes. Theme preferences are stored in localStorage and applied globally.

### Styling
- Modify `frontend/src/styles/globals.css` for global styles
- Update `frontend/tailwind.config.js` for Tailwind configuration
- Customize components in `frontend/src/components/`

### API Configuration
- Add new routes in `backend/routes/`
- Create models in `backend/models/`
- Update validation in route handlers

## 🔧 Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend (if you add tests)
cd frontend
npm test
```

### Building for Production
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
npm start
```

## 📱 Mobile Responsiveness

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- Different screen sizes and orientations

## 🔒 Security Features

- JWT authentication with expiration
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Rate limiting
- Helmet security headers
- Data encryption at rest

## 📈 Performance

- Optimized bundle size with Next.js
- Lazy loading of components
- Database indexing for fast queries
- Caching strategies
- Compression middleware

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation in the `docs/` folder

## 🎯 Roadmap

- [ ] Mobile app development
- [ ] Advanced reporting and analytics
- [ ] Integration with third-party services
- [ ] Multi-language support
- [ ] Advanced workflow automation
- [ ] API rate limiting and caching
- [ ] Real-time notifications
- [ ] Document management system

---

Built with ❤️ for modern workplaces
