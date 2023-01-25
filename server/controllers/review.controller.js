const Review = require("../models/review.model");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;
const Movie = require("../models/movie.model");
const User = require("../models/user.model");

module.exports = {
  createReview: (req, res) => {
    //const review = new Review();
    const user = jwt.verify(req.cookies.userToken, SECRET);
    console.log("review found", req.body.message);
    Review.create({
      title: req.body.title,
      message: req.body.message,
      userCreated: user,
    }) //creates from client input(incoming request)
      .then((newReview) => {
        res.json(newReview);
      })
      //^returns a promise so start with .then, convert to json
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getByUser: (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET);
    Review.find({ userCreated: user._id })
      .populate("userCreated", "username")
      .then((e) => res.status(201).json(e))
      .catch((err) => res.status(400).json(err));
  },

  // getAllReviewsByMe: (req, res) => {
  //   const user = jwt.verify(req.cookies.userToken, SECRET);
  //   console.log("Found User", user);
  //   User.findById(user._id)
  //     .populate("myReviews")
  //     .then((myReviews) => {
  //       console.log("Found user reviews!", myReviews);
  //       res.json(myReviews);
  //     }) //^returns a promise so start with .then, convert to json
  //     .catch((err) => {
  //       console.log("user reviews not found", err);
  //       res.status(400).json(err);
  //     });
  // },

  getAllReviewsByMe: (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET);
    console.log("Found reviews by User", user);
    User.findById(user._id)
      .populate("myReviews")
      .then((myReviews) => {
        console.log("Found user reviews!", myReviews);
        res.json(myReviews);
      }) //^returns a promise so start with .then, convert to json
      .catch((err) => {
        console.log("user reviews not found", err);
        res.status(400).json(err);
      });
  },

  getByMovie: (req, res) => {
    console.log("movie id found", req.params.id);
    const user = jwt.verify(req.cookies.userToken, SECRET);
    Review.find({ title: req.params.id })
      .populate("userCreated")
      .then((allReviews) => {
        console.log("yay getByReview", allReviews);
        res.json(allReviews);
      }) //^returns a promise so start with .then, convert to json
      .catch((err) => {
        //console.log("getByMovie error", err);
        res.status(400).json(err);
      });
  },

  getAllReviews: (req, res) => {
    Review.find() //creates from client input
      .then((allReviews) => {
        res.json(allReviews);
      }) //^returns a promise so start with .then, convert to json
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getAllReviewsByMovie: (req, res) => {
    Review.findById({ _id: req.params.id }) //creates from client input
      .then((allReviews) => {
        res.json(allReviews);
      }) //^returns a promise so start with .then, convert to json
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getOneReview: (req, res) => {
    Review.findOne({ _id: req.params.id }) //creates from client input. "Movie" comes from the model
      .then((oneReview) => {
        console.log(review);
        res.json(oneReview);
      }) //^returns a promise so start with .then, convert to json
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  deleteReview: (req, res) => {
    Review.deleteOne({ _id: req.params.id })
      .then((deletedReview) => {
        console.log(deletedReview);
        res.json(deletedReview);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};
