# 🇮🇳 31 (TN) INDEP COY NCC — CSI College of Engineering Portal

Official National Cadet Corps (NCC) portal built for **CSI College of Engineering**, Ketti, Ooty, The Nilgiris, Tamil Nadu.

![NCC Banner](client/public/assets/ncc_hero_bg.jpg)

---

## 🏛️ College & Unit Details

- **College Name**: CSI College of Engineering
- **Location**: Ketti, Ooty, The Nilgiris – 643215, Tamil Nadu, India
- **College Email**: office@csice.edu.in
- **College Website**: [www.csice.edu.in](http://www.csice.edu.in/)
- **Phone Numbers**: 9345099378 / 0423-2517474
- **NCC Unit**: **31 (TN) INDEP COY NCC**
- **Associate NCC Officer (ANO)**: Lt. Dr. Manoj Prabhakar B.S.
- **Motto**: *"Unity and Discipline"*

---

## ✨ Features

- 🎖️ **Hero & Live Statistics Counter**: Total Cadets, NCC Events, Achievements, and Camps Completed (editable from Admin Dashboard).
- 📜 **About NCC & 31 (TN) INDEP COY NCC**: Comprehensive section covering NCC history, purpose, core principles, training camps, and unit background.
- 👨‍✈️ **ANO Profile Card & Biography**: Detailed officer profile for Lt. Dr. Manoj Prabhakar B.S. with bio, responsibilities, and contact links.
- 🪖 **Cadet Directory**: Searchable & filterable roster (Department, Rank, Year, Regt Number) with detailed cadet badges, blood group, and certificates.
- 📅 **Events & Upload System**: Upcoming and Completed events with photo carousels, participating cadets list, downloadable PDF event reports, and YouTube video embeds.
- 🖼️ **Photo Lightbox Gallery**: Categorized photo gallery with full-screen interactive lightbox viewer.
- 🏆 **Achievements Showcase**: Cadet & unit awards, Republic Day Camp (RDC) selections, Thal Sainik Camp (TSC) medals, and Best Cadet honours.
- 📢 **Announcements Notice Board**: Official circulars, parade orders, camp selections, document verification alerts with PDF downloads.
- 📞 **Contact Desk**: College details, interactive query submission form, and embedded Google Maps view.
- 🔐 **Secure Admin Dashboard**: Full CRUD management for Cadets, Events (photos & PDF reports), ANO profile, Gallery photos, Achievements, Announcements, Stats counters, and Contact inbox.

---

## 🔑 Default Admin Credentials

- **Admin Email**: `admin@csice.edu.in`
- **Password**: `NccCsice2026!`

*(Can be customized in `.env` or updated via password hash)*

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **MongoDB** *(Optional)*: If local MongoDB is running at `mongodb://127.0.0.1:27017/ncc_csice`, the server automatically connects to it. If MongoDB is offline, the backend seamlessly switches to an embedded resilient JSON database so the site works 100% out of the box!

### 1. Installation
Clone or navigate to the project directory:
```bash
# Install root dependencies (Express backend)
npm install

# Install client dependencies (React frontend)
cd client
npm install
cd ..
```

### 2. Environment Variables (.env)
Create or review the `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ncc_csice
JWT_SECRET=csice_ncc_secret_key_2026_super_secure_token
ADMIN_EMAIL=admin@csice.edu.in
ADMIN_PASSWORD=NccCsice2026!
```

### 3. Run Locally (Development Mode)
Run both backend Express server (Port 5000) and React Vite dev server (Port 3000) concurrently:
```bash
npm run dev
```

Open your browser at:
- **Frontend App**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`

---

## 📦 Production Deployment Instructions

### Option A: Unified Single-Server Deployment (Node/Express serving React)
1. Build the production React frontend bundle:
   ```bash
   npm run build
   ```
2. Start the Express server in production mode:
   ```bash
   NODE_ENV=production npm start
   ```
   The backend will serve the compiled static frontend on port 5000.

### Option B: Cloud Hosting (Render / Railway / DigitalOcean / Vercel)
1. Set Environment Variables in your hosting dashboard (`MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`).
2. **Build Command**: `npm run build`
3. **Start Command**: `npm start`

---

## 📂 Project Architecture

```
csice-ncc-portal/
├── server/
│   ├── server.js              # Express app entry point
│   ├── config/db.js           # Database connector & fallback driver
│   ├── models/                # Mongoose models (User, Cadet, Event, etc.)
│   ├── routes/                # API endpoints
│   ├── middleware/            # Auth JWT & Multer upload handling
│   └── seed/seedData.js       # Auto-populates realistic initial sample data
└── client/
    ├── index.html
    ├── vite.config.js
    ├── src/
    │   ├── components/        # Navbar, Footer, Hero, Lightbox, Toast
    │   ├── pages/             # Home, About, Cadets, ANO, Events, Gallery, etc.
    │   └── App.jsx            # Main app router & state manager
    └── public/
        ├── assets/            # Official logos, crests, hero backgrounds
        └── uploads/           # Uploaded photo & PDF report files
```

---

## 🛡️ Security & Validation

- JWT authentication with 24-hour expiration.
- Password hashing with `bcryptjs`.
- File upload restrictions: restricted to JPEG/PNG/WEBP images and PDF documents, limited to 10MB per file.
- Form inputs validated on both client and server sides.

---

© 2026 CSI College of Engineering NCC. All Rights Reserved.
