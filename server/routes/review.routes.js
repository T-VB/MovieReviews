//import controller functions
const ReviewController = require("../controllers/review.controller");
const { authenticate } = require("../config/jwt.config");

//pass in 'app' (which is what we named our express app). Gives access to express functions.
module.exports = (app) => {
  app.post("/api/createReview/", authenticate, ReviewController.createReview);
  //request to create movie to sever, first goes middleware authenticate in jwt.config.js, if tokens match, it creates the movie and renders to page
  app.get("/api/allReviews/", authenticate, ReviewController.getAllReviews);
  app.get("/api/oneReview/:id", authenticate, ReviewController.getOneReview);
  app.delete(
    "/api/deleteReview/:id",
    authenticate,
    ReviewController.deleteReview
  );
  app.get(
    "/api/allReviewsByMe/",
    authenticate,
    ReviewController.getAllReviewsByMe
  );
  app.get("/api/reviews/:id", authenticate, ReviewController.getByMovie);
  app.get("/api/reviews/user", authenticate, ReviewController.getByUser);
}; //^"/api/" tells us this is a route on our backend server, we're interacting w/ our db we created
