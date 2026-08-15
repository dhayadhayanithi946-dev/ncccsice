const express = require('express');
const router = express.Router();
const { getIsMongo, localStore } = require('../config/db');
const Gallery = require('../models/Gallery');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// GET /api/gallery
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    if (getIsMongo()) {
      let query = {};
      if (category && category !== 'All') query.category = category;
      const photos = await Gallery.find(query).sort({ createdAt: -1 });
      return res.json(photos);
    } else {
      let photos = localStore.data.gallery || [];
      if (category && category !== 'All') {
        photos = photos.filter(p => p.category === category);
      }
      return res.json(photos);
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

// POST /api/gallery (Admin protected)
router.post('/', authMiddleware, upload.single('photo'), async (req, res) => {
  try {
    const { title, category, description, date } = req.body;
    let imageUrl = req.body.imageUrl;

    if (req.file) {
      imageUrl = `/uploads/photos/${req.file.filename}`;
    }

    if (!imageUrl) {
      return res.status(400).json({ error: 'Photo file or URL is required' });
    }

    const newItem = {
      title,
      category,
      description: description || '',
      date: date || new Date().toISOString().split('T')[0],
      imageUrl,
      createdAt: new Date()
    };

    if (getIsMongo()) {
      const gallery = await Gallery.create(newItem);
      return res.status(201).json(gallery);
    } else {
      const newId = 'gallery-' + Date.now();
      const item = { _id: newId, ...newItem };
      localStore.data.gallery.unshift(item);
      localStore.save();
      return res.status(201).json(item);
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to upload photo to gallery' });
  }
});

// DELETE /api/gallery/:id (Admin protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsMongo()) {
      await Gallery.findByIdAndDelete(id);
    } else {
      localStore.data.gallery = localStore.data.gallery.filter(p => (p._id || p.id) !== id);
      localStore.save();
    }
    return res.json({ message: 'Photo deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete photo' });
  }
});

module.exports = router;
