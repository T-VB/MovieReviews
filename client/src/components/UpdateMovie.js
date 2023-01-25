import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateMovie = () => {
  //const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [rating, setRating] = useState("");
  //const [boxOffice, setBoxOffice] = useState("");
  const [boxArt, setBoxArt] = useState("");
  const [likes, setLikes] = useState(0);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/oneMovie/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setTitle(res.data.title);
        setDirector(res.data.director);
        setGenre(res.data.genre);
        setReleaseYear(res.data.releaseYear);
        setRating(res.data.rating);
        //setBoxOffice(res.data.boxOffice);
        setBoxArt(res.data.boxArt);
        setLikes(res.data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:8000/api/updateMovie/${id}`,
        {
          title,
          director,
          genre,
          releaseYear,
          rating,
          //boxOffice,
          boxArt,
          likes,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        navigate("/displayAll");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" bg-secondary p-5 mt-1">
      <div className="pt-5 pb-5 mt-1 bg-secondary">
        <div className="col-3 mx-auto bg-warning">
          <h1 className=" p-4 d-flex justify-content-around text-warning bg-dark">
            Edit Movie Info
          </h1>
          <form className="p-4" onSubmit={submitHandler}>
            <label className="form-label">Title:</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="form-control"
              type="text"
            />
            {/* {errors.title ? (
            <p className="text-danger">{errors.title.message}</p>
          ) : null} */}

            <label className="form-label">Director:</label>
            <input
              onChange={(e) => setDirector(e.target.value)}
              value={director}
              className="form-control"
              type="text"
            />
            {/* {errors.title ? (
            <p className="text-danger">{errors.title.message}</p>
          ) : null} */}

            <label className="form-label">Genre:</label>
            <select
              onChange={(e) => setGenre(e.target.value)}
              value={genre}
              className="form-control"
            >
              <option>Select a Genre</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
              <option value="Action">Action</option>
              <option value="Horror">Horror</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Documentary">Documentary</option>
              <option value="Family">Family</option>
              <option value="Thriller">Thriller</option>
              <option value="Mystery">Mystery</option>
              <option value="Comedy">Comedy</option>
            </select>
            {/* {errors.title ? (
            <p className="text-danger">{errors.title.message}</p>
          ) : null} */}

            <label className="form-label">Release Year:</label>
            <input
              onChange={(e) => setReleaseYear(e.target.value)}
              value={releaseYear}
              className="form-control"
              type="number"
            />
            {/* {errors.title ? (
            <p className="text-danger">{errors.title.message}</p>
          ) : null} */}

            <label className="form-label">Rating:</label>
            <select
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              className="form-control"
            >
              <option>Select a Rating</option>
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="PG-13">PG-13</option>
              <option value="R">R</option>
              <option value="NC-17">NC-17</option>
            </select>
            {/* {errors.title ? (
            <p className="text-danger">{errors.title.message}</p>
          ) : null} */}

            {/* <label className="form-label">Box Office:</label>
          <input
            onChange={(e) => setBoxOffice(e.target.value)}
            value={boxOffice}
            className="form-control"
            type="number"
          /> */}
            {/* {errors.title ? (
            <p className="text-danger">{errors.title.message}</p>
          ) : null} */}

            <label className="form-label">Movie Poster:</label>
            <input
              onChange={(e) => setBoxArt(e.target.value)}
              value={boxArt}
              className="form-control"
              type="text"
            />
            {/* {errors.title ? (
            <p className="text-danger">{errors.title.message}</p>
          ) : null} */}

            {/* <label className="form-label">Kid Friendly</label>
        <input
        onChange={(e) => setKidFriendly(e.target.value)}
        className="form-control"
        type="boolean"
        /> */}
            <button className="mt-3 btn btn-info ">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMovie;
