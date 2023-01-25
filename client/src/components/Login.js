import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Register from "./Register";

const Login = () => {
  //bind usestate w/ onchange event
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/login",
        {
          email,
          password,
        },
        { withCredentials: true, credentials: "include" }
      ) //^withCredentials:true --> allows to send cookies w/ request
      .then((res) => {
        console.log(res);
        navigate("/displayAll"); //once submited, navigate to display all when clicked
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.error);
      });
  };

  return (
    <div className="login-container">
      <div className="login d-flex justify-content-around p-5 bg-dark">
        <Register></Register>
        <div className="bg-secondary text-warning p-4">
          <form className="mx-auto" onSubmit={submitHandler}>
            <h4>Login</h4>
            <label className="form-label">Email:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="font-weight-bold bg-danger m-3">
              {errorMessage ? <p>{errorMessage}</p> : null}
            </div>
            <button className="btn btn-primary mt-3">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

//*don't forget to import in app.js, and add the route
