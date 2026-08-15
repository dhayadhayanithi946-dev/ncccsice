const express = require('express');
const router = express.Router();
const { getIsMongo, localStore } = require('../config/db');
const Ano = require('../models/Ano');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// GET /api/ano
router.get('/', async (req, res) => {
  try {
    if (getIsMongo()) {
      let ano = await Ano.findOne();
      if (!ano) {
        ano = await Ano.create({
          name: 'Lt. Dr. Manoj Prabhakar B.S.',
          designation: 'Associate NCC Officer (ANO)',
          unit: '31 (TN) INDEP COY NCC',
          college: 'CSI College of Engineering, Ketti, Ooty',
          photoUrl: '/assets/ano_portrait.jpg',
          biography: 'Lt. Dr. Manoj Prabhakar B.S. leads the 31 (TN) INDEP COY NCC unit at CSI College of Engineering with distinction. He holds a Doctorate in Engineering and has been commissioning cadet training, camp organization, and national integration drives since 2018.',
          responsibilities: [
            'Overall command and administration of 31 (TN) INDEP COY NCC unit at CSI College of Engineering.',
            'Coordinating annual training camps, Republic Day Camp (RDC), and Thal Sainik Camp (TSC) selections.',
            'Mentoring cadets in drill, leadership, weapon training, and outdoor survival skills.',
            'Organizing social service initiatives including blood donation camps, tree plantation, and clean energy drives.'
          ],
          phone: '9345099378',
          email: 'ano@csice.edu.in'
        });
      }
      return res.json(ano);
    } else {
      if (!localStore.data.ano || !localStore.data.ano.name) {
        localStore.data.ano = {
          _id: 'ano-1',
          name: 'Lt. Dr. Manoj Prabhakar B.S.',
          designation: 'Associate NCC Officer (ANO)',
          unit: '31 (TN) INDEP COY NCC',
          college: 'CSI College of Engineering, Ketti, Ooty',
          photoUrl: '/assets/ano_portrait.jpg',
          biography: 'Lt. Dr. Manoj Prabhakar B.S. leads the 31 (TN) INDEP COY NCC unit at CSI College of Engineering with distinction. He holds a Doctorate in Engineering and has been commissioning cadet training, camp organization, and national integration drives since 2018.',
          responsibilities: [
            'Overall command and administration of 31 (TN) INDEP COY NCC unit at CSI College of Engineering.',
            'Coordinating annual training camps, Republic Day Camp (RDC), and Thal Sainik Camp (TSC) selections.',
            'Mentoring cadets in drill, leadership, weapon training, and outdoor survival skills.',
            'Organizing social service initiatives including blood donation camps, tree plantation, and clean energy drives.'
          ],
          phone: '9345099378',
          email: 'ano@csice.edu.in'
        };
        localStore.save();
      }
      return res.json(localStore.data.ano);
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch ANO info' });
  }
});

// PUT /api/ano (Admin protected)
router.put('/', authMiddleware, upload.single('photo'), async (req, res) => {
  try {
    const { name, designation, unit, college, biography, responsibilities, phone, email } = req.body;
    let photoUrl = req.body.photoUrl;

    if (req.file) {
      photoUrl = `/uploads/photos/${req.file.filename}`;
    }

    let parsedResp = responsibilities;
    if (typeof responsibilities === 'string') {
      try {
        parsedResp = JSON.parse(responsibilities);
      } catch (e) {
        parsedResp = responsibilities.split('\n').filter(r => r.trim().length > 0);
      }
    }

    const updatedData = {
      name,
      designation,
      unit,
      college,
      biography,
      responsibilities: parsedResp || [],
      phone,
      email,
      updatedAt: new Date()
    };
    if (photoUrl) updatedData.photoUrl = photoUrl;

    if (getIsMongo()) {
      let ano = await Ano.findOne();
      if (!ano) {
        ano = new Ano(updatedData);
      } else {
        Object.assign(ano, updatedData);
      }
      await ano.save();
      return res.json(ano);
    } else {
      localStore.data.ano = { ...localStore.data.ano, ...updatedData };
      localStore.save();
      return res.json(localStore.data.ano);
    }
  } catch (err) {
    console.error('ANO update error:', err);
    return res.status(500).json({ error: 'Failed to update ANO info' });
  }
});

module.exports = router;
