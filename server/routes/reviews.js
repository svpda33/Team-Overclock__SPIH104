const express = require('express');
const { run, query } = require('../db');
const { authenticateToken } = require('./auth');

const router = express.Router();

// 1. Get All Reviews Endpoint
router.get('/', async (req, res) => {
  try {
    const reviews = await query(
      `SELECT id, author_name, stars, comment, created_at FROM reviews ORDER BY id DESC LIMIT 50`
    );
    res.json({ reviews });
  } catch (error) {
    console.error('Fetch reviews error:', error);
    res.status(500).json({ error: 'Server error fetching reviews.' });
  }
});

// 2. Submit New Review Endpoint
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { authorName, stars, comment } = req.body;

    if (!authorName || !comment) {
      return res.status(400).json({ error: 'Please provide author name and review comment.' });
    }

    const userId = req.user ? req.user.id : null;
    const starRating = parseInt(stars) || 5;

    const result = await run(
      `INSERT INTO reviews (user_id, author_name, stars, comment) VALUES (?, ?, ?, ?)`,
      [userId, authorName.trim(), starRating, comment.trim()]
    );

    res.status(201).json({
      message: 'Thank you for your review! It has been posted successfully.',
      review: {
        id: result.id,
        authorName: authorName.trim(),
        stars: starRating,
        comment: comment.trim(),
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Submit review error:', error);
    res.status(500).json({ error: 'Server error submitting review.' });
  }
});

module.exports = router;
