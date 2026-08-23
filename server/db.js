const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const isVercel = Boolean(process.env.VERCEL);
const DB_PATH = isVercel
  ? path.join('/tmp', 'learnaiq.db')
  : path.join(__dirname, '..', 'learnaiq.db');

// Connect to SQLite Database
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
  } else {
    console.log('✅ Connected to SQLite database:', DB_PATH);
  }
});

// Helper for Promisified Queries
const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

const get = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// Initialize Database Schema & Performance Tuning
const initDb = async () => {
  try {
    // Enable WAL (Write-Ahead Logging) mode for 100+ concurrent user performance
    await run(`PRAGMA journal_mode = WAL;`);
    await run(`PRAGMA synchronous = NORMAL;`);
    await run(`PRAGMA foreign_keys = ON;`);

    // 1. Users Table
    await run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        phone TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        class_level INTEGER NOT NULL DEFAULT 1,
        language TEXT NOT NULL DEFAULT 'en',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Chat History Table (Target 50,000+ records capacity)
    await run(`
      CREATE TABLE IF NOT EXISTS chat_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        class_level INTEGER NOT NULL,
        subject TEXT NOT NULL,
        chapter_id TEXT,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        language TEXT NOT NULL DEFAULT 'en',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )
    `);

    // 3. Reviews Table
    await run(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        author_name TEXT NOT NULL,
        stars INTEGER NOT NULL DEFAULT 5,
        comment TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
      )
    `);

    // 4. Curriculum Database Table
    await run(`
      CREATE TABLE IF NOT EXISTS curriculum (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        class_level INTEGER NOT NULL,
        subject TEXT NOT NULL,
        chapter_id TEXT NOT NULL UNIQUE,
        title_en TEXT NOT NULL,
        title_te TEXT NOT NULL,
        desc_en TEXT NOT NULL,
        desc_te TEXT NOT NULL,
        icon TEXT NOT NULL
      )
    `);

    // 5. Student Progress Tracking Table
    await run(`
      CREATE TABLE IF NOT EXISTS student_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        class_level INTEGER NOT NULL,
        subject TEXT NOT NULL,
        chapter_id TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'in_progress',
        questions_asked INTEGER NOT NULL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, chapter_id),
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )
    `);

    // 6. Indexes for fast query lookup
    await run(`CREATE INDEX IF NOT EXISTS idx_users_username ON users (username);`);
    await run(`CREATE INDEX IF NOT EXISTS idx_chat_history_user ON chat_history (user_id, created_at DESC);`);
    await run(`CREATE INDEX IF NOT EXISTS idx_chat_history_chapter ON chat_history (chapter_id);`);
    await run(`CREATE INDEX IF NOT EXISTS idx_student_progress_user ON student_progress (user_id, subject);`);

    console.log('✅ Database schemas and performance indexes initialized.');
  } catch (error) {
    console.error('❌ Failed to initialize database schema:', error);
  }
};

module.exports = {
  db,
  query,
  run,
  get,
  initDb
};
