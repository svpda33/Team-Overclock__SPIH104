const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { run, get } = require('../db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'learnaiq_secret_key_2026_super_secure';

// Auth Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      req.user = null;
    } else {
      req.user = user;
    }
    next();
  });
};

// 1. Student Registration Endpoint
router.post('/register', async (req, res) => {
  try {
    const { name, username, phone, password, classLevel } = req.body;

    if (!name || !username || !phone || !password) {
      return res.status(400).json({ error: 'Please provide all required fields (name, username, phone, password).' });
    }

    const cleanUsername = username.trim().toLowerCase();
    const existingUser = await get('SELECT id FROM users WHERE username = ?', [cleanUsername]);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken. Please choose another username.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const numericClass = parseInt(classLevel) || 1;

    const result = await run(
      'INSERT INTO users (name, username, phone, password_hash, class_level) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), cleanUsername, phone.trim(), passwordHash, numericClass]
    );

    const userPayload = {
      id: result.id,
      name: name.trim(),
      username: cleanUsername,
      classLevel: numericClass
    };

    const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      message: 'Registration successful! 7-Day Free Trial activated.',
      token,
      user: userPayload
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

// 2. Student Login Endpoint (Requires 3 details: username, phone, password)
router.post('/login', async (req, res) => {
  try {
    const { username, phone, password } = req.body;

    if (!username || !phone || !password) {
      return res.status(400).json({ error: 'Please provide username, mobile number, and password.' });
    }

    const cleanUsername = username.trim().toLowerCase();
    const cleanPhone = phone.trim();

    // Query user matching both username and phone
    const user = await get('SELECT * FROM users WHERE username = ? AND phone = ?', [cleanUsername, cleanPhone]);

    if (!user) {
      return res.status(401).json({ error: 'Invalid username, phone number, or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username, phone number, or password.' });
    }

    const userPayload = {
      id: user.id,
      name: user.name,
      username: user.username,
      phone: user.phone,
      classLevel: user.class_level,
      language: user.language
    };

    const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      message: 'Login successful!',
      token,
      user: userPayload
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// 3. Current Authenticated User Endpoint
router.get('/me', authenticateToken, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const user = await get('SELECT id, name, username, phone, class_level, language, created_at FROM users WHERE id = ?', [req.user.id]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get question count stats
    const stats = await get('SELECT COUNT(*) as total_questions FROM chat_history WHERE user_id = ?', [req.user.id]);

    res.json({
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        phone: user.phone,
        classLevel: user.class_level,
        language: user.language,
        createdAt: user.created_at
      },
      stats: {
        questionsAsked: stats ? stats.total_questions : 0
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Server error fetching user profile.' });
  }
});

module.exports = {
  router,
  authenticateToken,
  JWT_SECRET
};
