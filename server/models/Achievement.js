const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cadetName: { type: String, required: true },
  date: { type: String, required: true },
  event: { type: String, required: true },
  category: { type: String, default: 'Best Cadet' },
  description: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Achievement || mongoose.model('Achievement', AchievementSchema);
