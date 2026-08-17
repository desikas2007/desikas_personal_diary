const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  website: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    default: '',
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  encryptedPassword: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'General',
    trim: true
  },
  notes: {
    type: String,
    default: ''
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  passwordHistory: [{
    password: String,
    date: Date
  }]
}, { timestamps: true });

module.exports = mongoose.model('Password', passwordSchema);
