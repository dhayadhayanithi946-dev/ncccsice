const mongoose = require('mongoose');

const AnoSchema = new mongoose.Schema({
  name: { type: String, default: 'Lt. Dr. Manoj Prabhakar B.S.' },
  designation: { type: String, default: 'Associate NCC Officer (ANO)' },
  unit: { type: String, default: '31 (TN) INDEP COY NCC' },
  college: { type: String, default: 'CSI College of Engineering, Ketti, Ooty' },
  photoUrl: { type: String, default: '/assets/ano_portrait.jpg' },
  biography: { type: String, default: 'Lt. Dr. Manoj Prabhakar B.S. leads the 31 (TN) INDEP COY NCC unit at CSI College of Engineering with distinction. He holds a Doctorate in Engineering and has been commissioning cadet training, camp organization, and national integration drives since 2018.' },
  responsibilities: [{ type: String }],
  phone: { type: String, default: '9345099378' },
  email: { type: String, default: 'ano@csice.edu.in' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Ano || mongoose.model('Ano', AnoSchema);
