import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateMovie = (props) => {
  //const { movieList, setMovieList } = props;
  //const [oneMovie, setOneMovie] = props;
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [rating, setRating] = useState("");
  //const [boxOffice, setBoxOffice] = useState("");
  const [boxArt, setBoxArt] = useState("");
  //const [likes, setLikes] = useState(0);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault(); //prevents default action of page refresh and state clear, once button is clicked

    axios
      .post(
        "http://localhost:8000/api/createMovie",
        {
          title,
          director,
          genre,
          releaseYear,
          rating,
          //boxOffice,
          boxArt,
          //likes,
        },
        { withCredentials: true, credentials: "include" }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/displayAll");
        //**upon a successful res/post request, setState back to "", which clears form
        // setTitle("");
        // setDirector("");
        // setGenre("");
        // setReleaseYear("");
        // setRating("");
        // setBoxOffice("");
        // setBoxArt("");
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        console.log(err.response.data);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="bg-secondary p-5 mt-1">
      <div className="bg-secondary pt-5 pb-5 mt-1">
        <div className="col-3 mx-auto bg-warning">
          <h1 className=" p-4 d-flex justify-content-around text-warning bg-dark">
            Create a Movie:
          </h1>
          <form className="p-4" onSubmit={submitHandler}>
            <label className="form-label">Title:</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              type="text"
              //name="title"
            />

            {errors.title ? (
              <p className="text-danger">{errors.title.message}</p>
            ) : null}

            <label className="form-label">Director:</label>
            <input
              onChange={(e) => setDirector(e.target.value)}
              className="form-control"
              type="text"
            />
            {errors.director ? (
              <p className="text-danger">{errors.director.message}</p>
            ) : null}
            <label className="form-label">Genre:</label>
            <select
              onChange={(e) => setGenre(e.target.value)}
              className="form-control"
            >
              <option>Select a Genre</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Horror">Horror</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Documentary">Documentary</option>
              <option value="Family">Family</option>
              <option value="Thriller">Thriller</option>
              <option value="Mystery">Mystery</option>
              <option value="Comedy">Comedy</option>
            </select>
            {errors.genre ? (
              <p className="text-danger">{errors.genre.message}</p>
            ) : null}
            <label className="form-label">Release Year:</label>
            <input
              onChange={(e) => setReleaseYear(e.target.value)}
              className="form-control"
              type="number"
            />
            {errors.releaseYear ? (
              <p className="text-danger">{errors.releaseYear.message}</p>
            ) : null}
            <label className="form-label">Rating:</label>
            <select
              onChange={(e) => setRating(e.target.value)}
              className="form-control"
            >
              <option>Select a Rating</option>
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="PG-13">PG-13</option>
              <option value="R">R</option>
              <option value="NC-17">NC-17</option>
            </select>
            {errors.rating ? (
              <p className="text-danger">{errors.rating.message}</p>
            ) : null}
            {/* <label className="form-label">Box Office:</label>
          <input
            onChange={(e) => setBoxOffice(e.target.value)}
            className="form-control"
            type="number"
          />
          {errors.boxOffice ? (
            <p className="text-danger">{errors.boxOffice.message}</p>
          ) : null} */}
            <label className="form-label">Movie Poster:</label>
            <input
              onChange={(e) => setBoxArt(e.target.value)}
              className="form-control"
              type="text"
            />
            {errors.boxArt ? (
              <p className="text-danger">{errors.boxArt.message}</p>
            ) : null}
            <button className="mt-3 btn btn-info ">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMovie;
