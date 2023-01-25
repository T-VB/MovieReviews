import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  //bind inputs/each field to state w/ onchange event
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/register",
        {
          username,
          email,
          password,
          confirmPassword,
        },
        { withCredentials: true, credentials: "include" }
      ) // ^allows to send cookies w/ request
      .then((res) => {
        console.log("yay", res);
        navigate("/displayAll"); //once submited, navigate to display all when clicked
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.error);
      });
  };

  return (
    <div className="bg-secondary text-warning p-4">
      <form className="col-12 mx-auto" onSubmit={submitHandler}>
        <h4 className="">Register</h4>
        <label className="form-label">Username:</label>
        <input
          className="form-control"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
        />
        <label className="form-label">Email:</label>
        <input
          className="form-control"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="form-label">Password:</label>
        <input
          className="form-control"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="form-label">Confirm Password:</label>
        <input
          className="form-control"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="font-weight-bold bg-danger m-3">
          {errorMessage ? <p>{errorMessage}</p> : null}
        </div>
        <button className="btn btn-info mt-3">Register</button>
      </form>
    </div>
  );
};

export default Register;

//*don't forget to import in app.js, and add the route
