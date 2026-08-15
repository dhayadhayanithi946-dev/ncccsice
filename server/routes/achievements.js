const express = require('express');
const router = express.Router();
const { getIsMongo, localStore } = require('../config/db');
const Achievement = require('../models/Achievement');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// GET /api/achievements
router.get('/', async (req, res) => {
  try {
    if (getIsMongo()) {
      const achievements = await Achievement.find().sort({ date: -1 });
      return res.json(achievements);
    } else {
      const achievements = [...(localStore.data.achievements || [])];
      achievements.sort((a, b) => new Date(b.date) - new Date(a.date));
      return res.json(achievements);
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});

// POST /api/achievements (Admin protected)
router.post('/', authMiddleware, upload.single('photo'), async (req, res) => {
  try {
    const { title, cadetName, date, event, category, description } = req.body;
    let imageUrl = req.body.imageUrl || '/assets/achievement_badge.png';

    if (req.file) {
      imageUrl = `/uploads/photos/${req.file.filename}`;
    }

    const newItem = {
      title,
      cadetName,
      date,
      event,
      category: category || 'Best Cadet',
      description,
      imageUrl,
      createdAt: new Date()
    };

    if (getIsMongo()) {
      const achievement = await Achievement.create(newItem);
      return res.status(201).json(achievement);
    } else {
      const newId = 'achievement-' + Date.now();
      const item = { _id: newId, ...newItem };
      localStore.data.achievements.unshift(item);
      localStore.save();
      return res.status(201).json(item);
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create achievement' });
  }
});

// DELETE /api/achievements/:id (Admin protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsMongo()) {
      await Achievement.findByIdAndDelete(id);
    } else {
      localStore.data.achievements = localStore.data.achievements.filter(a => (a._id || a.id) !== id);
      localStore.save();
    }
    return res.json({ message: 'Achievement record deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete achievement' });
  }
});

module.exports = router;
