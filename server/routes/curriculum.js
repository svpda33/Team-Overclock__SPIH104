const express = require('express');
const { query } = require('../db');

const router = express.Router();

// Get Full Curriculum Endpoint
router.get('/', async (req, res) => {
  try {
    const rows = await query(`SELECT class_level, subject, chapter_id, title_en, title_te, desc_en, desc_te, icon FROM curriculum ORDER BY class_level ASC, id ASC`);
    
    // Group curriculum by classLevel -> subject
    const curriculumData = {};

    rows.forEach(row => {
      if (!curriculumData[row.class_level]) {
        curriculumData[row.class_level] = {};
      }
      if (!curriculumData[row.class_level][row.subject]) {
        curriculumData[row.class_level][row.subject] = [];
      }

      curriculumData[row.class_level][row.subject].push({
        id: row.chapter_id,
        title: { en: row.title_en, te: row.title_te },
        desc: { en: row.desc_en, te: row.desc_te },
        icon: row.icon
      });
    });

    res.json({ curriculum: curriculumData });
  } catch (error) {
    console.error('Fetch curriculum error:', error);
    res.status(500).json({ error: 'Server error fetching curriculum.' });
  }
});

module.exports = router;
