const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env file if available
const envFilePath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envFilePath)) {
  const envContent = fs.readFileSync(envFilePath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let val = match[2] || '';
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
      process.env[key] = val.trim();
    }
  });
}

const { initDb, get } = require('./db');
const seed = require('./seed');

const { router: authRouter } = require('./routes/auth');
const tutorRouter = require('./routes/tutorRoutes');
const reviewsRouter = require('./routes/reviews');
const curriculumRouter = require('./routes/curriculum');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS & JSON Parsing
app.use(cors());
app.use(express.json());

// Serve Static Frontend Files (index.html, script.js, style.css)
app.use(express.static(path.join(__dirname, '..')));

// Ensure Database Initialization on First Request (Vercel Serverless Ready)
let isDbInitialized = false;
let dbInitPromise = null;

async function ensureDbReady() {
  if (isDbInitialized) return;
  if (!dbInitPromise) {
    dbInitPromise = (async () => {
      try {
        await initDb();
        await seed();
        isDbInitialized = true;
      } catch (err) {
        console.error('❌ Database initialization error:', err);
      }
    })();
  }
  await dbInitPromise;
}

app.use(async (req, res, next) => {
  await ensureDbReady();
  next();
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/tutor', tutorRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/curriculum', curriculumRouter);

// Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'LearnAIQ Express Gemini LLM Backend operational',
    environment: process.env.VERCEL ? 'Vercel Serverless' : 'Local Node.js'
  });
});

// Fallback to index.html for SPA Navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Start Server for Local Execution
async function startServer() {
  try {
    await ensureDbReady();
    if (!process.env.VERCEL) {
      app.listen(PORT, () => {
        console.log(`====================================================`);
        console.log(`🚀 LearnAIQ Backend Server listening on http://localhost:${PORT}`);
        console.log(`📊 SQLite WAL Mode Enabled (Capacity: 1k users, 50k DB records)`);
        console.log(`====================================================`);
      });
    }
  } catch (err) {
    console.error('❌ Server startup error:', err);
  }
}

if (require.main === module || !process.env.VERCEL) {
  startServer();
}

module.exports = app;
