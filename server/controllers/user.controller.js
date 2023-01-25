const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;

module.exports = {
  registerUser: async (req, res) => {
    try {
      //console.log("trying register user");
      const newUser = await User.create(req.body);
      //console.log("user registered", newUser);
      const userToken = jwt.sign(
        { _id: newUser._id, email: newUser.email },
        SECRET
      );
      //console.log("userToken received", userToken);
      res
        //.status(201)
        .cookie("userToken", userToken, {
          httpOnly: true,
          //expires: new Date(Date.now() + 90000),
        })
        .json({ successMessage: userToken, user: newUser });
    } catch (error) {
      res.status(400).json({ error: "Invalid Registration" });
    }
  },

  getUser: async (req, res) => {
    User.findOne({ username: req.params.username })
      .populate("reviews")
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  },

  updateUser: (req, res) => {
    console.log("updatedUser");
    const user = jwt.verify(req.cookies.userToken, SECRET);
    //console.log("We are here", user._id);
    User.findOneAndUpdate({ _id: user._id }, req.body, {
      new: true,
      //runValidators: true,
    })
      //}) //^req.params.id comes from what is passed in through the url via routes
      //^req.body is what we are wanting to update
      .then((updatedUser) => {
        console.log("user is updated", updatedUser);
        res.json(updatedUser);
      })
      .catch((err) => {
        console.log("user was not updated", err);
        res.status(400).json(err);
      });
  },

  loginUser: async (req, res) => {
    console.log("loginUser");
    //check to see if email is in database
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user === null) {
      //if the user's email is not found/not match... render error message
      console.log("invalid user");
      res.status(400).json({ error: "Invalid email/password" });
      return;
    }

    try {
      //if the user email is found, continue to compare pw
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      console.log(isPasswordValid);
      if (!isPasswordValid) {
        //if the user's pw does not match records.. render error message
        res.status(400).json({ error: "Invalid email/password" });
      } else {
        //if both req.body email and pw match data in db, create json web token

        const userToken = jwt.sign(
          { _id: user._id, email: user.email },
          SECRET
        );
        res
          .status(201)
          .cookie("userToken", userToken, {
            httpOnly: true,
            //expires: new Date(Date.now() + 90000),
          })
          .json({ successMessage: "User logged in", user: user });
      }
    } catch (error) {
      res.status(500).json({ error: "Invalid email/password" });
    }
  },
  logoutUser: (req, res) => {
    //clear cookie from the browser
    res.clearCookie("userToken");
    res.json({ success: "User logged out" });
  },
};
