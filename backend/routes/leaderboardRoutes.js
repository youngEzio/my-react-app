const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get leaderboard based on language
router.get('/', async (req, res) => {
  try {
    const language = req.query.language;
    const leaderboard = await User.find({ language })
      .sort({ proficiency: -1 })
      .limit(10)
      .select('username proficiency');
    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
