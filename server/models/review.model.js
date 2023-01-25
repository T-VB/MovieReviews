const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    title: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      //required: [true, "Title is required!"],
    },

    message: {
      type: String,
      //required: [true, "Review is required!"],
    },

    userCreated: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema); //creates a new Collection in our db. mongoose.model is a function that takes two parameters (name of collection, name of schema)

module.exports = Review; //export Review model so we can access in other files
