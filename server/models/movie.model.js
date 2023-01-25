const Review = require("../models/review.model");

const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
      minLength: [4, "Title must be 4 characters!"],
    },
    director: {
      type: String,
      required: [true, "Director is required!"],
      minLength: [4, "Title must be 4 characters!"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required!"],
      enum: [
        "Drama",
        "Comedy",
        "Action",
        "Adventure",
        "Horror",
        "Fantasy",
        "Sci-Fi",
        "Documentary",
        "Family",
        "Thriller",
        "Mystery",
      ], //^creating an array of possible genres w/ enum
    },
    releaseYear: {
      type: Number,
      required: [true, "Release year is required!"],
      minLength: [4, "Year must be 4 characters!"],
    },
    rating: {
      type: String,
      required: [true, "Rating is required!"],
      enum: ["G", "PG", "PG-13", "R", "NC-17"], //presetting field options w/ enum
    },

    // boxOffice: {
    //   type: Number,
    //   required: [false],
    // },
    boxArt: {
      type: String,
      required: [false],
    },
    userCreated: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // likes: {
    //   type: Number,
    // },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", MovieSchema); //creates a new Collection in our db. mongoose.model is a function that takes two parameters (name of collection, name of schema)

module.exports = Movie; //export Movie model so we can access in other files
