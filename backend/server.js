const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const passwordRoutes = require('./routes/passwords');
const noteRoutes = require('./routes/notes');
const diaryRoutes = require('./routes/diary');

const app = express();

app.use(express.json());
app.use(cookieParser());
// Allow both localhost and 127.0.0.1 so saves aren't blocked by CORS
// when the app is opened from either address.
app.use(cors({
  origin: (origin, cb) => {
    const allowed = ['http://localhost:3000', 'http://127.0.0.1:3000'];
    if (!origin || allowed.includes(origin)) return cb(null, true);
    return cb(null, false);
  },
  credentials: true
}));

// Health check — confirms the server is up and whether MongoDB is connected.
app.get('/api/health', (req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({
    status: 'ok',
    db: states[mongoose.connection.readyState] || 'unknown',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/passwords', passwordRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/diary', diaryRoutes);

const PORT = process.env.PORT || 5000;

// Fail fast (15s) if the DB is unreachable, and log a clear, actionable error
// instead of silently hanging.
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 10000
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.error('Check that MONGODB_URI in backend/.env is correct, that this machine');
    console.error('can reach the database, and (for MongoDB Atlas) that your current IP');
    console.error('is allowed in Network Access.');
    process.exit(1);
  });
