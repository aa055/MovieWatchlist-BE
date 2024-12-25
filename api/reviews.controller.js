import ReviewsDAO from "../dao/reviewsDAO.js";

// Class defines the methods that will perform the actions(using the req, res, next) once an endpoint is called
export default class ReviewsController {

  // Method for a post request to add a review using the request body params (movieId, review, user)
  static async apiPostReview(req, res, next) {
    try {
      const movieId = parseInt(req.body.movieId)
      const review = req.body.review;
      const user = req.body.user;
      console.log('movieid', movieId);
      const reviewResponse = await ReviewsDAO.addReview(
        movieId,
        user,
        review
      );
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // Method for a get request to get the review object and respond with it 
  static async apiGetReview(req, res, next) {
    try {
      let id = req.params.id || {};
      let review = await ReviewsDAO.getReview(id);
      if (!review) {
        res.status(404).json({ error: "Not found" });
        return
      }
      res.json(review);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  // Method to update the review by using request body and in-url params 
  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.params.id;
      const review = req.body.review;
      const user = req.body.user;

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        user,
        review
      );

      var { error } = reviewResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review",
        );
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // Method to execite the delete request for deleting a review using its id passed in the 
  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.params.id;
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // Method to execite the get request for fetching all the reviews for a movie
  static async apiGetReviews(req, res, next) {
    try {
      let id = req.params.id || {};
      let reviews = await ReviewsDAO.getReviewsByMovieId(id);
      if (!reviews) {
        res.status(404).json({ error: "Not found" });
        return
      }
      res.json(reviews);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  // TESTING: Method to Get all the reviews
  static async apiGetAllReviews(req, res, next) {
    try {
      const reviews = await ReviewsDAO.getAllReviews();
      if (!reviews || reviews.length === 0) {
        res.status(404).json({ error: "No reviews found" });
        return
      }
      res.json(reviews);
    } catch (e) {
      console.error(`api, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

}