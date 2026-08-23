/**
 * Express Router for AI Tutor Endpoints
 */

const express = require('express');
const { authenticateToken } = require('./auth');
const {
  handleTutorChat,
  handleGetProgress,
  handleCompleteLesson,
  handleRestartLesson,
  handleGetStats
} = require('../controllers/tutorController');

const router = express.Router();

// 1. Tutor Chat Endpoint
router.post('/chat', authenticateToken, handleTutorChat);

// 2. Student Progress Endpoint
router.get('/progress', authenticateToken, handleGetProgress);

// 3. Mark Lesson Complete Endpoint
router.post('/complete-lesson', authenticateToken, handleCompleteLesson);

// 4. Restart Lesson Fresh Endpoint
router.post('/restart-lesson', authenticateToken, handleRestartLesson);

// 5. System Stats Endpoint
router.get('/stats', handleGetStats);

module.exports = router;
