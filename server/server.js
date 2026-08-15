const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { connectDB } = require('./config/db');
const seedInitialData = require('./seed/seedData');

// Routes
const authRoutes = require('./routes/auth');
const statsRoutes = require('./routes/stats');
const anoRoutes = require('./routes/ano');
const cadetRoutes = require('./routes/cadets');
const eventRoutes = require('./routes/events');
const galleryRoutes = require('./routes/gallery');
const achievementRoutes = require('./routes/achievements');
const announcementRoutes = require('./routes/announcements');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Static uploads serving
app.use('/uploads', express.static(path.join(__dirname, '../client/public/uploads')));
app.use('/assets', express.static(path.join(__dirname, '../client/public/assets')));

// API Endpoint routes
app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/ano', anoRoutes);
app.use('/api/cadets', cadetRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/contact', contactRoutes);

// Serve static frontend in production if built
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('CSI College of Engineering NCC (31 TN INDEP COY) API Server Running.');
  });
}

// Start Server and Initialize DB
const startServer = async () => {
  await connectDB();
  await seedInitialData();

  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 NCC CSICE Server running on http://localhost:${PORT}`);
    console.log(`====================================================`);
  });
};

startServer();
