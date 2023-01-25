import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";
import DisplayReviews from "./DisplayReviews";
import CreateReview from "./CreateReview";

const OneMovie = () => {
  const { id } = useParams();
  const [oneMovie, setOneMovie] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/oneMovie/${id}`, {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setOneMovie(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const deleteHandler = () => {
    axios
      .delete(
        `http://localhost:8000/api/deleteMovie/${id}`,
        {
          withCredentials: true,
          credentials: "include",
        }
        //if{movie.userCreated == user._id}
      )
      .then((res) => {
        navigate("/displayAll");
      })
      .catch((err) => {
        console.log(err);
      });

    // const deleteHandler = () => {
    //   axios
    //     .delete(`http://localhost:8000/api/deleteMovie/${id}`, {
    //       withCredentials: true,
    //       credentials: "include",
    //     })
    //     .then((res) => {
    //       navigate("/displayAll");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
  };
  return (
    <div className="bg-secondary">
      <div className="bg-dark">
        <div className="">
          <h3 className="mt-1 mb-3 bg-secondary text-warning p-4">
            {oneMovie.title}
          </h3>

          <img src={oneMovie.boxArt} className="col col-2 mx-auto" />
        </div>
        <p className="mt-4 text-warning">Director: {oneMovie.director}</p>
        <p className="text-warning">Genre: {oneMovie.genre}</p>
        <p className="text-warning">Release Year: {oneMovie.releaseYear}</p>
        <p className="text-warning">Rating: {oneMovie.rating}</p>
        {/* <p className="text-warning">Box Office: ${oneMovie.boxOffice}</p> */}

        <Link className="btn btn-primary" to={`/updateMovie/${id}`}>
          Edit Movie
        </Link>
        <button className="m-3 btn btn-danger" onClick={deleteHandler}>
          Delete Movie
        </button>

        <LikeButton></LikeButton>
      </div>
      <div className="pt-1 text-warning bg-dark">
        <div>
          <CreateReview title={oneMovie._id}></CreateReview>
        </div>

        <DisplayReviews id={id}></DisplayReviews>
      </div>
    </div>
  );
};

export default OneMovie;
