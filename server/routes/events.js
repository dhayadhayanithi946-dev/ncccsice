const express = require('express');
const router = express.Router();
const { getIsMongo, localStore } = require('../config/db');
const Event = require('../models/Event');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// GET /api/events (Public with category & status filter)
router.get('/', async (req, res) => {
  try {
    const { category, type } = req.query;

    if (getIsMongo()) {
      let query = { isPublished: true };
      if (category && category !== 'All') query.category = category;
      if (type === 'upcoming') query.isUpcoming = true;
      if (type === 'past') query.isUpcoming = false;

      const events = await Event.find(query).sort({ date: -1 });
      return res.json(events);
    } else {
      let events = localStore.data.events || [];
      events = events.filter(e => e.isPublished !== false);

      if (category && category !== 'All') {
        events = events.filter(e => e.category === category);
      }
      if (type === 'upcoming') {
        events = events.filter(e => e.isUpcoming === true);
      }
      if (type === 'past') {
        events = events.filter(e => e.isUpcoming !== true);
      }

      events.sort((a, b) => new Date(b.date) - new Date(a.date));
      return res.json(events);
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// GET /api/events/all (Admin - includes unpublished)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    if (getIsMongo()) {
      const events = await Event.find().sort({ date: -1 });
      return res.json(events);
    } else {
      const events = [...(localStore.data.events || [])];
      events.sort((a, b) => new Date(b.date) - new Date(a.date));
      return res.json(events);
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch all events' });
  }
});

// POST /api/events (Admin protected - photo & PDF report upload)
router.post('/', authMiddleware, upload.fields([
  { name: 'photos', maxCount: 6 },
  { name: 'reportPdf', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, date, location, description, category, organizer, participatingCadets, achievements, youtubeLink, isUpcoming, isPublished } = req.body;

    let photos = [];
    if (req.files && req.files['photos']) {
      photos = req.files['photos'].map(f => `/uploads/photos/${f.filename}`);
    }

    let reportPdfUrl = '';
    if (req.files && req.files['reportPdf'] && req.files['reportPdf'][0]) {
      reportPdfUrl = `/uploads/reports/${req.files['reportPdf'][0].filename}`;
    }

    const parseArray = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      try {
        return JSON.parse(val);
      } catch (e) {
        return val.split(',').map(s => s.trim()).filter(Boolean);
      }
    };

    const newEventData = {
      title,
      date,
      location,
      description,
      category,
      organizer: organizer || '31 (TN) INDEP COY NCC',
      photos: photos.length > 0 ? photos : ['/assets/event_placeholder.jpg'],
      reportPdfUrl,
      participatingCadets: parseArray(participatingCadets),
      achievements: parseArray(achievements),
      youtubeLink: youtubeLink || '',
      isUpcoming: isUpcoming === 'true' || isUpcoming === true,
      isPublished: isPublished !== 'false' && isPublished !== false,
      createdAt: new Date()
    };

    if (getIsMongo()) {
      const event = await Event.create(newEventData);
      return res.status(201).json(event);
    } else {
      const newId = 'event-' + Date.now();
      const event = { _id: newId, ...newEventData };
      localStore.data.events.unshift(event);
      localStore.save();
      return res.status(201).json(event);
    }
  } catch (err) {
    console.error('Event creation error:', err);
    return res.status(500).json({ error: err.message || 'Failed to create event' });
  }
});

// PUT /api/events/:id (Admin protected)
router.put('/:id', authMiddleware, upload.fields([
  { name: 'photos', maxCount: 6 },
  { name: 'reportPdf', maxCount: 1 }
]), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, location, description, category, organizer, participatingCadets, achievements, youtubeLink, isUpcoming, isPublished } = req.body;

    const parseArray = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      try {
        return JSON.parse(val);
      } catch (e) {
        return val.split(',').map(s => s.trim()).filter(Boolean);
      }
    };

    const updateFields = {
      title, date, location, description, category, organizer,
      youtubeLink: youtubeLink || '',
      participatingCadets: parseArray(participatingCadets),
      achievements: parseArray(achievements),
      isUpcoming: isUpcoming === 'true' || isUpcoming === true,
      isPublished: isPublished === 'true' || isPublished === true
    };

    if (req.files && req.files['photos'] && req.files['photos'].length > 0) {
      updateFields.photos = req.files['photos'].map(f => `/uploads/photos/${f.filename}`);
    }

    if (req.files && req.files['reportPdf'] && req.files['reportPdf'][0]) {
      updateFields.reportPdfUrl = `/uploads/reports/${req.files['reportPdf'][0].filename}`;
    }

    if (getIsMongo()) {
      const event = await Event.findByIdAndUpdate(id, updateFields, { new: true });
      return res.json(event);
    } else {
      const index = localStore.data.events.findIndex(e => (e._id || e.id) === id);
      if (index === -1) return res.status(404).json({ error: 'Event not found' });
      localStore.data.events[index] = { ...localStore.data.events[index], ...updateFields };
      localStore.save();
      return res.json(localStore.data.events[index]);
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update event' });
  }
});

// DELETE /api/events/:id (Admin protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsMongo()) {
      await Event.findByIdAndDelete(id);
    } else {
      localStore.data.events = localStore.data.events.filter(e => (e._id || e.id) !== id);
      localStore.save();
    }
    return res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete event' });
  }
});

module.exports = router;
