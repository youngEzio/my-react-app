const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  language: { type: String, required: true },
  proficiency: { type: Number, default: 0 },
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
