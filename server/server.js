const express = require("express");
const cors = require("cors");
const app = express(); //the express() method allows us to create an express app
require("dotenv").config();
//^this allows access to everything in dotenv file (secret_key)
const cookieParser = require("cookie-parser");

//Middleware, allows us to store our 'put' and 'post' requests on back-end
app.use(express.json()); //middleware that allows us to read JSON objects sent in the client's request
app.use(express.urlencoded({ extended: true })); //middleware that allows us to read JSON objects with strings and arrays in the client's request)
//Middleware, adds cookies to the request
app.use(cookieParser());

app.use(
  cors({
    //cors allows different ports to talk/send requests to our API
    origin: "http://localhost:3000",
    credentials: true,
  })
);
//**add the 'requires' below after app.listen is secure** We require our mongoose config file so that it is available to our express method
require("./config/mongoose.config.js");

//we require our routes folder which had a function (with an app parameter) exported in this short-hand syntax. The express method must be added as an argument.
//import Routes

//require("./routes/movie.routes.js")(app);
const Routes = require("./routes/movie.routes.js");
Routes(app);

//require("./routes/user.routes.js")(app);
const UserRoutes = require("./routes/user.routes.js");
UserRoutes(app);

const ReviewRoutes = require("./routes/review.routes.js");
ReviewRoutes(app);

const port = 8000;
app.listen(port, () => console.log(`Listening on Port:${port}`));
