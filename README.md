# SIH Project - Local Link Portal

A comprehensive MERN stack platform designed to connect users with verified local services, skilled workers, and PG accommodations in the Bhopal region.

---

## 🚀 Live Deployment

- **Frontend (Vercel):** [https://sih-project-ashen-ten.vercel.app/](https://sih-project-ashen-ten.vercel.app/)
- **Backend (Render):** [https://sih-project-65lm.onrender.com](https://sih-project-65lm.onrender.com)

---

## ✨ Features

- **Multi-Role Authentication**: Secure signup/login for Users, Workers, and PG Owners.
- **Worker Portal**: Register skills, experience, and professional domains.
- **PG Booking System**: Browse, filter, and register local paying guest accommodations.
- **Smart AI Assistant**: Integrated Gemini-powered Chatbot for instant query resolutions.
- **Interactive Dashboard**: Intuitive user panel for managing bookings and wishlists.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- React Router DOM
- Vanilla CSS (Premium aesthetics)

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas (Mongoose ORM)
- JSON Web Tokens (JWT) & Bcrypt for security

---

## 💻 Local Setup & Installation

If you want to run this project on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/Ayushsingh0128/SIH-project.git
cd SIH-project
```

### 2. Setup the Backend
```bash
cd backend
npm install
```
*Create a `.env` file in the `backend` folder and add:*
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
GOOGLE_CLIENT_ID=your_google_oauth_id
GOOGLE_CLIENT_SECRET=your_google_oauth_secret
FRONTEND_URL=http://localhost:5173
```
```bash
npm start
```

### 3. Setup the Frontend
```bash
cd ../project
npm install
```
*Create a `.env` file in the `project` folder and add:*
```env
VITE_API_URL=http://localhost:3000
VITE_GEMINI_API_KEY=your_gemini_api_key
```
```bash
npm run dev
```
