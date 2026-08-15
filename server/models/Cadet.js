const mongoose = require('mongoose');

const CadetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rank: { 
    type: String, 
    required: true,
    enum: ['CDT', 'LCPL', 'CPL', 'SGT', 'CQMS', 'JUO', 'SUO']
  },
  department: { 
    type: String, 
    required: true,
    enum: ['Computer Science', 'Electronics & Comm.', 'Electrical & Electronics', 'Mechanical Engg.', 'Civil Engg.', 'Information Tech.']
  },
  year: { type: String, required: true, enum: ['I Year', 'II Year', 'III Year', 'IV Year'] },
  enrollmentNo: { type: String, required: true, unique: true },
  bloodGroup: { type: String, default: 'O+' },
  photoUrl: { type: String, default: '' },
  achievements: [{ type: String }],
  certificates: [{ type: String }],
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Cadet || mongoose.model('Cadet', CadetSchema);
