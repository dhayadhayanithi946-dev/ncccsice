const mongoose = require('mongoose');

const StatsSchema = new mongoose.Schema({
  totalCadets: { type: Number, default: 104 },
  nccEvents: { type: Number, default: 42 },
  achievements: { type: Number, default: 28 },
  campsParticipated: { type: Number, default: 16 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Stats || mongoose.model('Stats', StatsSchema);
