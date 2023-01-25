//import controller functions
const MovieController = require("../controllers/movie.controller");
const { authenticate } = require("../config/jwt.config");

//pass in 'app' (which is what we named our express app). Gives access to express functions.
module.exports = (app) => {
  app.post("/api/createMovie/", authenticate, MovieController.createMovie);
  //request to create movie to sever, first goes middleware authenticate in jwt.config.js, if tokens match, it creates the movie and renders to page
  app.get("/api/allMovies/", authenticate, MovieController.getAllMovies);
  app.get(
    "/api/allMoviesByMe/",
    authenticate,
    MovieController.getAllMoviesByMe
  );
  app.get("/api/oneMovie/:id", authenticate, MovieController.getOneMovie);
  app.put("/api/updateMovie/:id", authenticate, MovieController.updateMovie);
  //app.put("/api/likeMovie/:id", authenticate, MovieController.likeMovie);
  app.delete("/api/deleteMovie/:id", authenticate, MovieController.deleteMovie);
  app.get("/api/movies/user", authenticate, MovieController.getByUser);
  // app.get(
  //   "/api/likeMovie/:id",
  //   authenticate,
  //   MovieController.incrementLikeMovie
  // );
}; //^"/api/" tells us this is a route on our backend server, we're interacting w/ our db we created
