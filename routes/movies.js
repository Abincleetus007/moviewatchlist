const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// Get all movies
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ releaseDate: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new movie
router.post('/movies', async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    genre: req.body.genre,
    releaseDate: req.body.releaseDate,
    rating: req.body.rating,
    review: req.body.review,
    watched: req.body.watched,
    imageUrl: req.body.imageUrl
  });

  try {
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a movie by ID
router.put('/movies/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }  // Use runValidators to validate the update
    );
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// Delete a movie by ID
router.delete('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
