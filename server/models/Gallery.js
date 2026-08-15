const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Parade', 'Camp', 'Drill', 'Training', 'Community Service', 'Cultural', 'Award Ceremony', 'General']
  },
  imageUrl: { type: String, required: true },
  description: { type: String, default: '' },
  date: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
