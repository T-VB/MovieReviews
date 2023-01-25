const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },

    myMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    // ^added attribute myMovies to User model
    myReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamp: true }
);

//middleware - request makes this stop before entering server to ensure user is authenticated
UserSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    //^salt - rehash password 10x
    console.log("Hashed Password", hashedPassword);
    this.password = hashedPassword;
    next();
  } catch {
    console.log("Error in save", error);
  }
});

//1)virtual fields:
UserSchema.virtual("confirmPassword") //grabs confirmPassword from form/user input and sets that as the value
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

//2)mongoose middleware
UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords must match!");
  }
  next(); //i.e.'otherwise run the next function in the chain'
});

const User = mongoose.model("User", UserSchema); //creates a new Collection in our db. mongoose.model is a function that takes two parameters (name of collection, name of schema)

module.exports = User; //export User model so we can access in other files
