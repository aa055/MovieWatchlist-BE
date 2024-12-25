import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let watchlist;

// Class interacts directly with mongodb watchlist collection to perform crud operations. 
export default class WatchlistDAO {
  
  // Used to get the connection string/instance to database collection
  static async injectDB(conn) {
    if (watchlist) {
      return
    }
    try {
      watchlist = await conn.db("reviews").collection("watchlist");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  // Add a review to the database collection using the (movieId, user)
  static async addMovietoWatchlist(movieId, user) {
    try {
      const watchlistDoc = {
        movieId: movieId,
        user: user
      }
      console.log("Adding movie to watchlist");
      return await watchlist.insertOne(watchlistDoc);
    } catch (e) {
      console.error(`Unable to post movie into watchlist: ${e}`);
      return { error: e }
    }
  }

  // Deletes the movie from the collection using the movieId
  static async removeMoviefromWatchlist(movieId) {
    try {
      const deleteResponse = await watchlist.deleteOne({
        _id: new ObjectId(movieId),
      });

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e }
    }
  }

  // Used to get all reviews
  static async getAllMoviesinWatchlist() {
    try {
      const cursor = await watchlist.find({});
      return cursor.toArray()
    } catch (e) {
      console.error(`Unable to fetch all reviews: ${e}`);
      return { error: e }
    }
  }

}