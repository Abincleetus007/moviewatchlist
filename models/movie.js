const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  rating: { type: Number, min: 0, max: 10 },
  review: { type: String },
  watched: { type: Boolean, default: false },
  imageUrl:{ type: String, required: true }
});

module.exports = mongoose.model('Movie', movieSchema);
