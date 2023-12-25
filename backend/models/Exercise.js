const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctOption: { type: String, required: true },
  difficulty: { type: Number, required: true },
  language: { type: String, required: true },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
