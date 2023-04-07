const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.model.js');


/* GET movies page */
router.get('/movies', (req, res, next) => {
    Movie.find()
      .then(allTheMoviesFromDB => {
        // -> allTheMoviesFromDB is a placeholder, it can be any word
        console.log('Retrieved movies from DB:', allTheMoviesFromDB);
   
        res.render('movies.hbs',{ movies: allTheMoviesFromDB });
      })
      .catch(error => {
        console.log('Error while getting the movies from the DB: ', error);
   
        // Call the error-middleware to display the error page to the user
        next(error);
      });
  });

  router.get('/movies/:movieId', (req, res) => {
    const { movieId } = req.params;
    Movie.findById(movieId)
    .then(theMovie => res.render('movie-details.hbs', { movie: theMovie }))
    .catch(error => {
      console.log('Error while retrieving movie details: ', error);
 
      // Call the error-middleware to display the error page to the user
      next(error);
    });
});


module.exports = router;
