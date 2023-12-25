const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateToken, verifyToken } = require('../auth');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password, language } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, language });
    await user.save();
    const token = generateToken(user._id);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const userId = verifyToken(req.headers.authorization.split(' ')[1]).userId;
    const user = await User.findById(userId);
    if (user) {
      res.json({ username: user.username, language: user.language, proficiency: user.proficiency });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Change user language
router.post('/change-language', async (req, res) => {
  try {
    const userId = verifyToken(req.headers.authorization.split(' ')[1]).userId;
    const { language } = req.body;

    await User.findByIdAndUpdate(userId, { language });

    res.json({ message: 'Language changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
