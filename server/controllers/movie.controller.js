const Movie = require("../models/movie.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;

module.exports = {
  createMovie: (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET);
    Movie.create({ ...req.body, userCreated: user }) //creates from client input(incoming request)
      .then((newMovie) => {
        console.log("movie created", newMovie);
        console.log("pass to user", user);

        res.json(newMovie);
      }) //^returns a promise so start with .then, convert to json
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getByUser: (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET);
    Movie.find({ userCreated: user._id })
      .populate("userCreated", "username")
      .then((e) => res.status(201).json(e))
      .catch((err) => res.status(400).json(err));
  },

  getAllMovies: (req, res) => {
    Movie.find() //creates from client input
      .then((allMovies) => {
        res.json(allMovies);
      }) //^returns a promise so start with .then, convert to json
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  getAllMoviesByMe: (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET);
    console.log("Found User", user);
    User.findById(user._id)
      .populate("myMovies")
      .then((myMovies) => {
        //console.log("Found user movies!", myMovies);
        res.json(myMovies);
      }) //^returns a promise so start with .then, convert to json
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getOneMovie: (req, res) => {
    Movie.findOne({ _id: req.params.id }) //creates from client input. "Movie" comes from the model
      .then((oneMovie) => {
        //console.log(movie);
        res.json(oneMovie);
      }) //^returns a promise so start with .then, convert to json
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getAllReviewsByMovie: (req, res) => {
    Movie.findById({ _id: req.params.id }) //creates from client input
      .then((allReviews) => {
        res.json(allReviews);
      }) //^returns a promise so start with .then, convert to json
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  updateMovie: (req, res) => {
    Movie.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      //}) //^req.params.id comes from what is passed in through the url via routes
      //^req.body is what we are wanting to update
      .then((updatedMovie) => {
        console.log(updatedMovie);
        res.json(updatedMovie);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // incrementLIkeMovie: (req, res) => {
  //   Movie.findOneAndUpdate(
  //     { _id: req.params.id },
  //     { $inc: { saveLike: 1 } },
  //     { new: true }
  //   )
  //     .then((e) => res.json(e))
  //     .catch((e) => res.status(400).json(e));
  // },

  // likeMovie: (req, res) => {
  //   Movie.findOneAndUpdate({ _id: req.params.id }, req.body.likes, {
  //     new: true,
  //     runValidators: true,
  //   })
  //     .then((likedMovie) => {
  //       console.log(likedMovie);
  //       res.json(likedMovie);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(400).json(err);
  //     });
  // },

  //*Only the uer who created the movie can delete..?
  deleteMovie: (req, res) => {
    //if{movie.userCreated == user._id}
    Movie.deleteOne({ _id: req.params.id })
      .then((deletedMovie) => {
        console.log(deletedMovie);
        res.json(deletedMovie);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};
