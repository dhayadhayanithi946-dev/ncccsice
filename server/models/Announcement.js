const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
  category: { 
    type: String, 
    default: 'General Notice',
    enum: ['Parade Notice', 'Camp Notification', 'Training Schedule', 'Selection Notice', 'General Notice', 'Meeting']
  },
  isPinned: { type: Boolean, default: false },
  pdfUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Announcement || mongoose.model('Announcement', AnnouncementSchema);
