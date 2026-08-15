const express = require('express');
const router = express.Router();
const { getIsMongo, localStore } = require('../config/db');
const Announcement = require('../models/Announcement');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// GET /api/announcements
router.get('/', async (req, res) => {
  try {
    if (getIsMongo()) {
      const announcements = await Announcement.find().sort({ isPinned: -1, date: -1 });
      return res.json(announcements);
    } else {
      const announcements = [...(localStore.data.announcements || [])];
      announcements.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0) || new Date(b.date) - new Date(a.date));
      return res.json(announcements);
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch announcements' });
  }
});

// POST /api/announcements (Admin protected - supports PDF notice upload)
router.post('/', authMiddleware, upload.single('pdf'), async (req, res) => {
  try {
    const { title, content, date, category, isPinned } = req.body;
    let pdfUrl = req.body.pdfUrl || '';

    if (req.file) {
      pdfUrl = `/uploads/reports/${req.file.filename}`;
    }

    const newItem = {
      title,
      content,
      date: date || new Date().toISOString().split('T')[0],
      category: category || 'General Notice',
      isPinned: isPinned === 'true' || isPinned === true,
      pdfUrl,
      createdAt: new Date()
    };

    if (getIsMongo()) {
      const notice = await Announcement.create(newItem);
      return res.status(201).json(notice);
    } else {
      const newId = 'notice-' + Date.now();
      const item = { _id: newId, ...newItem };
      localStore.data.announcements.unshift(item);
      localStore.save();
      return res.status(201).json(item);
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create announcement' });
  }
});

// DELETE /api/announcements/:id (Admin protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsMongo()) {
      await Announcement.findByIdAndDelete(id);
    } else {
      localStore.data.announcements = localStore.data.announcements.filter(a => (a._id || a.id) !== id);
      localStore.save();
    }
    return res.json({ message: 'Announcement deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete announcement' });
  }
});

module.exports = router;
