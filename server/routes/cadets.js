const express = require('express');
const router = express.Router();
const { getIsMongo, localStore } = require('../config/db');
const Cadet = require('../models/Cadet');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// GET /api/cadets (Public with query filters)
router.get('/', async (req, res) => {
  try {
    const { department, year, rank, search } = req.query;

    if (getIsMongo()) {
      let query = { active: true };
      if (department && department !== 'All') query.department = department;
      if (year && year !== 'All') query.year = year;
      if (rank && rank !== 'All') query.rank = rank;
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { enrollmentNo: { $regex: search, $options: 'i' } }
        ];
      }
      const cadets = await Cadet.find(query).sort({ rank: 1, name: 1 });
      return res.json(cadets);
    } else {
      let cadets = localStore.data.cadets || [];
      cadets = cadets.filter(c => c.active !== false);

      if (department && department !== 'All') {
        cadets = cadets.filter(c => c.department === department);
      }
      if (year && year !== 'All') {
        cadets = cadets.filter(c => c.year === year);
      }
      if (rank && rank !== 'All') {
        cadets = cadets.filter(c => c.rank === rank);
      }
      if (search) {
        const q = search.toLowerCase();
        cadets = cadets.filter(c => c.name.toLowerCase().includes(q) || c.enrollmentNo.toLowerCase().includes(q));
      }
      return res.json(cadets);
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch cadets' });
  }
});

// POST /api/cadets (Admin protected)
router.post('/', authMiddleware, upload.single('photo'), async (req, res) => {
  try {
    const { name, rank, department, year, enrollmentNo, bloodGroup, achievements, certificates, phone, email } = req.body;

    let photoUrl = req.body.photoUrl || '/assets/cadet_placeholder.jpg';
    if (req.file) {
      photoUrl = `/uploads/photos/${req.file.filename}`;
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

    const newCadetData = {
      name,
      rank,
      department,
      year,
      enrollmentNo,
      bloodGroup: bloodGroup || 'O+',
      photoUrl,
      achievements: parseArray(achievements),
      certificates: parseArray(certificates),
      phone: phone || '',
      email: email || '',
      active: true,
      createdAt: new Date()
    };

    if (getIsMongo()) {
      const cadet = await Cadet.create(newCadetData);
      return res.status(201).json(cadet);
    } else {
      const newId = 'cadet-' + Date.now();
      const cadet = { _id: newId, ...newCadetData };
      localStore.data.cadets.unshift(cadet);
      localStore.save();
      return res.status(201).json(cadet);
    }
  } catch (err) {
    console.error('Add cadet error:', err);
    return res.status(500).json({ error: err.message || 'Failed to add cadet' });
  }
});

// PUT /api/cadets/:id (Admin protected)
router.put('/:id', authMiddleware, upload.single('photo'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rank, department, year, enrollmentNo, bloodGroup, achievements, certificates, phone, email } = req.body;

    let photoUrl = req.body.photoUrl;
    if (req.file) {
      photoUrl = `/uploads/photos/${req.file.filename}`;
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

    const updateFields = {
      name, rank, department, year, enrollmentNo,
      bloodGroup, phone, email,
      achievements: parseArray(achievements),
      certificates: parseArray(certificates)
    };
    if (photoUrl) updateFields.photoUrl = photoUrl;

    if (getIsMongo()) {
      const cadet = await Cadet.findByIdAndUpdate(id, updateFields, { new: true });
      return res.json(cadet);
    } else {
      const index = localStore.data.cadets.findIndex(c => (c._id || c.id) === id);
      if (index === -1) return res.status(404).json({ error: 'Cadet not found' });
      localStore.data.cadets[index] = { ...localStore.data.cadets[index], ...updateFields };
      localStore.save();
      return res.json(localStore.data.cadets[index]);
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update cadet' });
  }
});

// DELETE /api/cadets/:id (Admin protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsMongo()) {
      await Cadet.findByIdAndDelete(id);
    } else {
      localStore.data.cadets = localStore.data.cadets.filter(c => (c._id || c.id) !== id);
      localStore.save();
    }
    return res.json({ message: 'Cadet record deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete cadet' });
  }
});

module.exports = router;
