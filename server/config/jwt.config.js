const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;

//middleware to authenticate/verify user
module.exports.authenticate = (req, res, next) => {
  console.log("cookies", req.cookies.userToken);
  console.log(req.cookies);
  //jwt.verify confirm the token on browser to token stored in db
  jwt.verify(req.cookies.userToken, SECRET, (err, payload) => {
    if (err) {
      console.log("authentication error");
      res.status(401).json({ verified: false });
    } else {
      console.log("authenticated!");
      next();
    }
  });
};
