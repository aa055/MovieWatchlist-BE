import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

// Class interacts directly with mongodb reviews collection to perform crud operations. 
export default class ReviewsDAO {
  
  // Used to get the connection string/instance to database collection
  static async injectDB(conn) {
    if (reviews) {
      return
    }
    try {
      reviews = await conn.db("reviews").collection("reviews");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  // Add a review to the database collection using the (movieId, user, review)
  static async addReview(movieId, user, review) {
    try {
      const reviewDoc = {
        movieId: movieId,
        user: user,
        review: review,
      }
      console.log("Adding a review");
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e }
    }
  }

  // Get the review row/object from the collection in mongodb using the reviewId
  static async getReview(reviewId) {
    try {
      return await reviews.findOne({ _id: new ObjectId(reviewId) });
    } catch (e) {
      console.error(`Unable to get review: ${e}`);
      return { error: e }
    }
  }

  // Updates the content of the review row/object and the user as well in the 
  static async updateReview(reviewId, user, review) {
    try {
      const updateResponse = await reviews.updateOne(
        { _id: new ObjectId(reviewId) },
        { $set: { user: user, review: review } }
      );

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e }
    }
  }

  // Deletes the review from the collection using the reviewId
  static async deleteReview(reviewId) {

    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId),
      });

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e }
    }
  }

  // Get all the reviews for a movie using movieId 
  static async getReviewsByMovieId(movieId) {
    try {
      const cursor = await reviews.find({ movieId: parseInt(movieId) });
      return cursor.toArray()
    } catch (e) {
      console.error(`Unable to get review: ${e}`);
      return { error: e }
    }
  }

  // Testing method: Used to get all reviews
  static async getAllReviews() {
    try {
      const cursor = await reviews.find({});
      return cursor.toArray()
    } catch (e) {
      console.error(`Unable to fetch all reviews: ${e}`);
      return { error: e }
    }
  }

}