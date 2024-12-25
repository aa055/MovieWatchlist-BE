import WatchlistDAO from "../dao/watchlistDAO.js";

// Class defines the methods that will perform the actions(using the req, res, next) once an endpoint is called
export default class WatchlistController {

  // Method for a post request to add a movie using the request body params (movieId, user)
  static async apiPostMovietoWatchlist(req, res, next) {
    try {
      const movieId = parseInt(req.body.movieId)
      const user = req.body.user;
      console.log('movieid', movieId);
      const watchlistResponse = await WatchlistDAO.addMovietoWatchlist(
        movieId,
        user
      );
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // Method to execite the delete request for deleting a movie using its id passed in the 
  static async apiDeleteMoviefromWatchlist(req, res, next) {
    try {
      const movieId = req.params.id;
      const watchlistResponse = await WatchlistDAO.removeMoviefromWatchlist(movieId);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // Method to Get all the movies in the watchlist
  static async apiGetWatchlist(req, res, next) {
    try {
      const movies = await WatchlistDAO.getAllMoviesinWatchlist();
      if (!movies || movies.length === 0) {
        res.status(404).json({ error: "No movies found" });
        return
      }
      res.json(movies);
    } catch (e) {
      console.error(`api, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

}