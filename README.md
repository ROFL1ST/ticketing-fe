# 🎫 Ticketing Management System - Frontend

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.20.1-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.6.2-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

A modern, responsive ticketing system frontend with JWT authentication and role-based access control.

[Live Demo](#) · [Report Bug](https://github.com/yourusername/ticketing-frontend/issues) · [Request Feature](https://github.com/yourusername/ticketing-frontend/issues)

</div>

---

## 📸 Screenshots

<div align="center">

### Login Page
![Login Page](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Login+Page)

### User Dashboard
![User Dashboard](https://via.placeholder.com/800x400/10b981/ffffff?text=User+Dashboard)

### Admin Dashboard
![Admin Dashboard](https://via.placeholder.com/800x400/8b5cf6/ffffff?text=Admin+Dashboard)

</div>

---

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based Authentication** - Secure token-based login system
- **Role-Based Access Control** - Separate interfaces for Users and Admins
- **Protected Routes** - Automatic redirection for unauthorized access
- **Token Auto-Refresh** - Seamless session management
- **Secure Logout** - Complete token cleanup

### 👤 User Features
- ✅ Create support tickets with title and detailed message
- ✅ View all personal tickets in a clean dashboard
- ✅ Track ticket status (Pending, In Progress, Resolved, Closed)
- ✅ Add comments to existing tickets
- ✅ View ticket history and all comments
- ✅ Responsive card-based layout

### 👨‍💼 Admin Features
- ✅ View all tickets from all users
- ✅ Comprehensive dashboard with statistics
- ✅ Update ticket status with one click
- ✅ Filter tickets by status
- ✅ Monitor ticket resolution progress
- ✅ View detailed ticket information and comments

### 🎨 UI/UX Features
- ✅ Modern, clean design with Tailwind CSS
- ✅ Fully responsive (Mobile, Tablet, Desktop)
- ✅ Loading states and skeletons
- ✅ Toast notifications for user feedback
- ✅ Color-coded status badges
- ✅ Smooth transitions and animations
- ✅ Intuitive navigation
- ✅ Error handling with user-friendly messages

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:
- **Node.js** 18.0 or higher
- **npm** or **yarn**
- Backend API running ([Backend Repository](https://github.com/ROFL1ST/ticketing-go))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ROFL1ST/ticketing-fe
   cd ticketing-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update with your backend URL:
   ```env
   VITE_API_URL=http://localhost:8080/api
   VITE_APP_NAME=Ticketing System

   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## 🏗️ Build & Deploy

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## 📁 Project Structure

```
ticketing-fe/
│
├── public/                 
│
├── src/
│   ├── components/        
│   │   ├── AdminRoute.jsx       
│   │   ├── Navbar.jsx           
│   │   ├── ProtectedRoute.jsx   
│   │   ├── TicketCard.jsx       
│   │   └── Toast.jsx           
│   │
│   ├── hooks/             
│   │   └── useAuth.js          
│   │
│   ├── pages/            
│   │   ├── admin/
│   │   │   ├── AdminTicketDetail.jsx
│   │   │   └── AdminTicketList.jsx
│   │   ├── user/
│   │   │   ├── CreateTicket.jsx
│   │   │   ├── TicketDetail.jsx
│   │   │   └── TicketList.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── utils/             
│   │   ├── api.js             
│   │   ├── auth.js              
│   │   └── toast.js             
│   │
│   ├── App.jsx             
│   ├── main.jsx            
│   └── index.css           
│
├── .env.example            
├── .gitignore               
├── index.html              
├── package.json           
├── postcss.config.js       
├── tailwind.config.js      
├── vite.config.js          
└── README.md               
```

---

## 🛣️ Routes

### Public Routes
| Route | Component | Description |
|-------|-----------|-------------|
| `/login` | `Login.jsx` | User login page |
| `/register` | `Register.jsx` | New user registration |

### User Routes (Protected)
| Route | Component | Description |
|-------|-----------|-------------|
| `/tickets` | `TicketList.jsx` | View all user's tickets |
| `/tickets/create` | `CreateTicket.jsx` | Create new ticket |
| `/tickets/:id` | `TicketDetail.jsx` | View ticket details & comments |

### Admin Routes (Admin Only)
| Route | Component | Description |
|-------|-----------|-------------|
| `/admin/tickets` | `AdminTicketList.jsx` | Dashboard with all tickets |
| `/admin/tickets/:id` | `AdminTicketDetail.jsx` | Manage ticket & update status |

---

## 🔐 Authentication

### Demo Credentials

#### Admin Account
```
Email: admin@ticketing.com
Password: admin123
```

#### User Account
Create a new account at `/register`

### Authentication Flow

1. **Login** → User enters credentials
2. **JWT Token** → Server returns token on success
3. **Token Storage** → Token saved in localStorage
4. **Auto-Attach** → Axios interceptor adds token to all requests
5. **Token Validation** → JWT decoded and validated on protected routes
6. **Auto-Logout** → 401 errors trigger automatic logout

---

## 🎨 Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Library | 18.2.0 |
| **Vite** | Build Tool | 5.0.8 |
| **Tailwind CSS** | Styling Framework | 3.3.6 |
| **React Router DOM** | Routing | 6.20.1 |
| **Axios** | HTTP Client | 1.6.2 |
| **jwt-decode** | JWT Token Parsing | 4.0.0 |

### Why These Technologies?

- **React** - Component-based architecture, large ecosystem
- **Vite** - Lightning-fast HMR, optimized build
- **Tailwind CSS** - Utility-first, highly customizable
- **React Router** - Declarative routing, nested routes
- **Axios** - Interceptors, automatic transforms
- **JWT Decode** - Client-side token validation

---

## ⚙️ Configuration

### API Configuration

Update `src/utils/api.js` to point to your backend:

```javascript
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
```

### Axios Interceptors

**Request Interceptor:**
- Automatically attaches JWT token to all requests
- Sets proper headers

**Response Interceptor:**
- Handles 401 Unauthorized errors
- Automatically redirects to login
- Cleans up invalid tokens

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8080/api` |

---

## 🎯 API Integration

### Authentication Endpoints
```javascript
POST /api/login      // User login
POST /api/register   // User registration
```

### User Endpoints
```javascript
GET  /api/user/tickets           // Get user's tickets
POST /api/user/tickets           // Create new ticket
GET  /api/user/tickets/:id       // Get ticket details
POST /api/user/tickets/:id/comment // Add comment
```

### Admin Endpoints
```javascript
GET  /api/admin/tickets          // Get all tickets
GET  /api/admin/tickets/:id      // Get ticket details
PUT  /api/admin/tickets/:id/status // Update ticket status
```

---

## 🐛 Troubleshooting

### CORS Issues

If you encounter CORS errors, ensure your backend allows requests from your frontend origin:

**Go Backend (Fiber):**
```go
import "github.com/gofiber/fiber/v2/middleware/cors"

app.Use(cors.New(cors.Config{
    AllowOrigins: "http://localhost:5173",
    AllowHeaders: "Origin, Content-Type, Accept, Authorization",
    AllowMethods: "GET, POST, PUT, DELETE",
}))
```

### Authentication Issues

**Problem:** 401 Unauthorized errors
**Solution:**
1. Clear localStorage: `localStorage.clear()`
2. Login again
3. Ensure backend is running

### Build Issues

**Problem:** Build fails or dependencies error
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port Already in Use

**Problem:** Port 5173 is already in use
**Solution:**
```bash
npm run dev -- --port 3000
```

---

## 📦 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Coding Standards

- Use functional components with hooks
- Follow React best practices
- Write clean, readable code
- Add comments for complex logic
- Use meaningful variable names
- Keep components small and focused

---

## 📋 Roadmap

- [ ] Add pagination for ticket lists
- [ ] Implement search and filter functionality
- [ ] Add file upload for ticket attachments
- [ ] Implement real-time updates with WebSocket
- [ ] Add email notifications
- [ ] Create user profile page
- [ ] Add dark mode support
- [ ] Implement ticket priority system
- [ ] Add export functionality (CSV/PDF)
- [ ] Create analytics dashboard
- [ ] Add ticket assignment feature
- [ ] Implement ticket categories/tags
- [ ] Add activity log

---

## 🔗 Related Repositories

- **Backend API:** [ticketing-backend](https://github.com/ROFL1ST/ticketing-go)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Muhamad Danendra Prawiraamijoyo**

- GitHub: [@ROFL1ST](https://github.com/ROFL1ST)
- Email: danendrapr55@gmail.com
- LinkedIn: [Danendra Pr](https://linkedin.com/in/danendra-prawiraamijoyo/)

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - The library for web and native user interfaces
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [React Router](https://reactrouter.com/) - Declarative routing for React
- [Axios](https://axios-http.com/) - Promise based HTTP client

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

Made with ❤️ by [Muhamad Danendra Prawiraamijoyo](https://github.com/yourusername)

</div>