const express = require('express');
const router = express.Router();
const { getIsMongo, localStore } = require('../config/db');
const Stats = require('../models/Stats');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/stats
router.get('/', async (req, res) => {
  try {
    if (getIsMongo()) {
      let stats = await Stats.findOne();
      if (!stats) {
        stats = await Stats.create({ totalCadets: 104, nccEvents: 42, achievements: 28, campsParticipated: 16 });
      }
      return res.json(stats);
    } else {
      if (!localStore.data.stats || !localStore.data.stats.totalCadets) {
        localStore.data.stats = { totalCadets: 104, nccEvents: 42, achievements: 28, campsParticipated: 16 };
        localStore.save();
      }
      return res.json(localStore.data.stats);
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// PUT /api/stats (Admin protected)
router.put('/', authMiddleware, async (req, res) => {
  try {
    const { totalCadets, nccEvents, achievements, campsParticipated } = req.body;
    const updatedData = {
      totalCadets: Number(totalCadets),
      nccEvents: Number(nccEvents),
      achievements: Number(achievements),
      campsParticipated: Number(campsParticipated),
      updatedAt: new Date()
    };

    if (getIsMongo()) {
      let stats = await Stats.findOne();
      if (!stats) {
        stats = new Stats(updatedData);
      } else {
        Object.assign(stats, updatedData);
      }
      await stats.save();
      return res.json(stats);
    } else {
      localStore.data.stats = { ...localStore.data.stats, ...updatedData };
      localStore.save();
      return res.json(localStore.data.stats);
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update stats' });
  }
});

module.exports = router;
