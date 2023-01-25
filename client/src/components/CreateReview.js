import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CreateReview = (props) => {
  //const { reviewList, setReviewList } = props;
  //const [errors, setErrors] = useState({});
  //const [title, setTitle] = useState("");
  const { title } = props;
  const [message, setMessage] = useState("");

  //const [addedBy, setAddedBy] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/oneMovie/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault(); //prevents default action of page refresh and state clear, once button is clicked

    axios
      .post(
        "http://localhost:8000/api/createReview",
        {
          title,
          message,
        },
        { withCredentials: true, credentials: "include" }
      )
      .then((res) => {
        console.log(res);
        console.log("in review handler", res.data);
        //navigate(`/oneMovie/${id}`);
        navigate("/displayAll");
        //**upon a successful res/post request, setState back to "", which clears form
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        console.log("ney review handler", err.response.data);
        //setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="pt-5 pb-5 mt-1 bg-dark">
      <div className="col-3 mx-auto bg-warning">
        <form className="p-4" onSubmit={submitHandler}>
          <h3 className=" p-2 d-flex justify-content-around text-warning bg-dark">
            Add a Review:
          </h3>
          {/* {errors.movieName ? (
            <p className="text-danger">{errors.movieName.message}</p>
          ) : null} */}

          <label className="form-label">Review:</label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            className="form-control"
            type="text"
            name="movieReview"
          />

          {/* {errors.movieReview ? (
            <p className="text-danger">{errors.movieReview.message}</p>
          ) : null} */}

          <button className="mt-3 btn btn-info ">Submit</button>
        </form>
        {message ? message : "review not found"}
      </div>
    </div>
  );
};

export default CreateReview;
