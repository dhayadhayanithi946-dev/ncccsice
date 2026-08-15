const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD or formatted
  location: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: [
      'NCC Camp', 'Parade', 'Drill', 'Training', 'Community Service',
      'Blood Donation', 'Tree Plantation', 'Independence Day', 'Republic Day',
      'EBSB', 'RDC', 'YEP', 'Sports', 'Awareness Programme', 'College Event'
    ]
  },
  organizer: { type: String, default: '31 (TN) INDEP COY NCC' },
  photos: [{ type: String }],
  reportPdfUrl: { type: String, default: '' },
  participatingCadets: [{ type: String }],
  achievements: [{ type: String }],
  youtubeLink: { type: String, default: '' },
  isPublished: { type: Boolean, default: true },
  isUpcoming: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema);
