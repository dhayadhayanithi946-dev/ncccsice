const express = require('express');
const router = express.Router();
const { getIsMongo, localStore } = require('../config/db');
const Contact = require('../models/Contact');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/contact (Public inquiry submission)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Please provide all required fields (Name, Email, Subject, Message)' });
    }

    const newContact = {
      name,
      email,
      phone: phone || '',
      subject,
      message,
      status: 'unread',
      createdAt: new Date()
    };

    if (getIsMongo()) {
      const contact = await Contact.create(newContact);
      return res.status(201).json({ message: 'Your message has been sent successfully to 31 (TN) INDEP COY NCC unit.', contact });
    } else {
      const newId = 'contact-' + Date.now();
      const item = { _id: newId, ...newContact };
      localStore.data.contacts.unshift(item);
      localStore.save();
      return res.status(201).json({ message: 'Your message has been sent successfully to 31 (TN) INDEP COY NCC unit.', contact: item });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

// GET /api/contact (Admin protected - view inbox)
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (getIsMongo()) {
      const messages = await Contact.find().sort({ createdAt: -1 });
      return res.json(messages);
    } else {
      return res.json(localStore.data.contacts || []);
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch contact submissions' });
  }
});

// DELETE /api/contact/:id (Admin protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsMongo()) {
      await Contact.findByIdAndDelete(id);
    } else {
      localStore.data.contacts = localStore.data.contacts.filter(c => (c._id || c.id) !== id);
      localStore.save();
    }
    return res.json({ message: 'Contact message deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete message' });
  }
});

module.exports = router;
