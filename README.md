# 🚀 Personal Portfolio - Modern Full Stack Application

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-16.x-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-5.0-47A248?style=for-the-badge&logo=mongodb)
![Express](https://img.shields.io/badge/Express.js-4.18-000000?style=for-the-badge&logo=express)

A modern, responsive portfolio website with admin dashboard, built with cutting-edge technologies.

[![Live Demo](https://img.shields.io/badge/Live_Demo-2a9d8f?style=for-the-badge&logo=react&logoColor=white)](https://sauravbhilare.github.io/Personal_Portfolio)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github)](https://github.com/sauravbhilare/Personal_Portfolio)

</div>

## ✨ Features

### 🎨 Frontend Excellence
- ⚡ **Blazing Fast** - Optimized React performance
- 📱 **Fully Responsive** - Mobile-first design
- 🎭 **Modern UI/UX** - Glassmorphism & gradient designs
- ♿ **Accessibility First** - WCAG compliant
- 🌙 **Dark Mode** - Automatic theme detection

### 🔧 Backend Power
- 🛡️ **Secure Authentication** - JWT & bcrypt
- 📊 **Real-time Dashboard** - Live statistics & analytics
- 🖼️ **File Management** - Image uploads with Multer
- 🔄 **RESTful API** - Clean, structured endpoints
- 🗄️ **Database Optimization** - Efficient MongoDB queries

### 🎯 Admin Dashboard
- 📈 **Project Management** - Full CRUD operations
- 👥 **User Management** - Profile customization
- 📸 **Media Library** - Drag & drop image uploads
- 📊 **Analytics** - Project statistics & insights
- ⚙️ **Settings** - Customizable preferences

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| **React.js** | Frontend Framework | 18.2.0 |
| **React Router** | Navigation | 6.8.0 |
| **Redux Toolkit** | State Management | 1.9.0 |
| **Axios** | HTTP Client | 1.3.0 |
| **CSS3** | Styling & Animations | - |

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime Environment | 16.x |
| **Express.js** | Web Framework | 4.18.0 |
| **MongoDB** | Database | 5.0+ |
| **Mongoose** | ODM Library | 7.0.0 |
| **JWT** | Authentication | 9.0.0 |
| **Multer** | File Uploads | 1.4.5 |

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16.x or higher
- **MongoDB**
- **Git**

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sauravbhilare/Personal_Portfolio.git
cd Personal_Portfolio
```

### Backend Setup
```bash
cd backend
npm install
```

### Frontend Setup
```bash
cd ../frontend
npm install
```

## Environment Variables

### Backend (.env)
```
PORT=8000
NODE_ENV=development
MONGODB_URL=mongodb://localhost:27017/portfolio
JWT_SECRET=your_ultra_secure_jwt_secret_here
JWT_EXPIRE=7d
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000/api/v1
REACT_APP_BACKEND_URL=http://localhost:8000
REACT_APP_DARK_MODE=true
REACT_APP_ANALYTICS=true
```

## 🎮 Usage

### Development
```bash
cd backend && npm run dev
cd frontend && npm start
```

### Production
```bash
cd frontend && npm run build
cd backend && npm start
```

## 📡 API Documentation

### 🔐 Authentication Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/register | User Registration |
| POST | /api/v1/auth/login | User Login |
| POST | /api/v1/auth/logout | Logout |
| PUT | /api/v1/auth/updateProfile/:id | Update Profile |

### 📂 Project Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/project/getProjects | Get All Projects |
| POST | /api/v1/project/createProject | Create Project |
| PUT | /api/v1/project/updateProject/:id | Update Project |
| DELETE | /api/v1/project/deleteProject/:id | Delete Project |

## 👨‍💻 Author
**Saurav Bhilare**  
GitHub: @sauravbhilare  
Portfolio: Live Demo  
LinkedIn: Saurav Bhilare
