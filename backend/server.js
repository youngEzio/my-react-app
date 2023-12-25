const userRoutes = require('./routes/userRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api/users', userRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/users', userRoutes);
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection (replace 'your_database_url' with your MongoDB connection string)
mongoose.connect('mongodb+srv://QuizTest:OFLs7XxuUo1BSNsM@cluster0.pbgrs4y.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Test route
app.get('/', (req, res) => {
  res.send('Language Learning Game Backend');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
