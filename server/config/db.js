const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

let isConnectedToMongo = false;
const LOCAL_DB_FILE = path.join(__dirname, '../data/local_db.json');

// Ensure data folder exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Local JSON DB Helper
class LocalDB {
  constructor() {
    this.filePath = LOCAL_DB_FILE;
    this.data = {
      users: [],
      stats: {},
      ano: {},
      cadets: [],
      events: [],
      gallery: [],
      achievements: [],
      announcements: [],
      contacts: []
    };
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf8');
        this.data = JSON.parse(raw);
      } else {
        this.save();
      }
    } catch (e) {
      console.error('Error loading local JSON DB:', e);
    }
  }

  save() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
    } catch (e) {
      console.error('Error saving local JSON DB:', e);
    }
  }
}

const localStore = new LocalDB();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ncc_csice';
    console.log(`Connecting to MongoDB at: ${mongoUri}...`);
    
    // Set short selection timeout so if Mongo is not running, it falls back gracefully
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000
    });
    isConnectedToMongo = true;
    console.log('✅ MongoDB Connected successfully.');
  } catch (err) {
    isConnectedToMongo = false;
    console.warn('⚠️ MongoDB connection failed or not available locally. Using built-in resilient JSON storage mode.');
    console.warn(`Error: ${err.message}`);
  }
};

const getIsMongo = () => isConnectedToMongo;

module.exports = {
  connectDB,
  getIsMongo,
  localStore
};
