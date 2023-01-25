const UserController = require("../controllers/user.controller.js");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/register", UserController.registerUser);
  app.post("/api/login", UserController.loginUser);
  app.get("/api/logout", UserController.logoutUser);
  app.put("/api/myMovies/:movieId", authenticate, UserController.updateUser);
  app.put("/api/myReviews/:reviewId", authenticate, UserController.updateUser);
};
