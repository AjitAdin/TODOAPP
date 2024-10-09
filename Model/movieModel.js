const mongoose = require('mongoose');

const movieschema = new mongoose.Schema({
  moviename: {
    type: String,
    required: [true, 'Movie name is required'],  // Added validation
  },
  completed: {
    type: Boolean,
    default: false, 
    required:[false] // Default value for completed field
  }
});

const Movie = mongoose.model("Movie", movieschema);

module.exports = Movie;
