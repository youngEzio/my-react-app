const express = require('express');
const Exercise = require('../models/Exercise');
const User = require('../models/User');
const { verifyToken } = require('../auth');

const router = express.Router();

// Get exercises based on language
router.get('/', async (req, res) => {
  try {
    const language = req.query.language;
    const exercises = await Exercise.find({ language });
    res.json(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Evaluate user answers
router.post('/evaluate', async (req, res) => {
  try {
    const userId = verifyToken(req.headers.authorization.split(' ')[1]).userId;
    const user = await User.findById(userId).populate('exercises');
    // Check if the user should level up
    const shouldLevelUp = score > 10; // Adjust the condition based on your requirements

    res.json({ feedback: `Your score is ${score}`, shouldLevelUp });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const { language, answers } = req.body;
    const exercises = await Exercise.find({ _id: { $in: user.exercises }, language });
    let score = 0;

    for (const exercise of exercises) {
      if (answers[exercise._id.toString()] === exercise.correctOption) {
        score += exercise.difficulty;
      }
    }

    // Update user proficiency and completed exercises
    user.proficiency += score;
    user.exercises = [...user.exercises, ...exercises.map((exercise) => exercise._id)];
    await user.save();

    res.json({ feedback: `Your score is ${score}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
