import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DisplayMyMovies from "./DisplayMyMovies";
// import DisplayMyReviews from "./DisplayMyReviews";

const DisplayAll = () => {
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/allMovies", {
        withCredentials: true,
        credentials: "include",
      })

      .then((res) => {
        console.log(res);
        setMovieList(res.data);
        navigate("");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-secondary">
      <h3 className="mt-1 p-4 d-flex justify-content-around text-warning bg-dark">
        Home
      </h3>
      {/* <h2>Welcome {username} </h2> */}
      <div className="d-flex p-5">
        <table className="table table-bordered bg-dark text-warning">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Poster</th>
              <th scope="col">Director </th>
            </tr>
          </thead>
          <tbody>
            {movieList.map((movie, index) => (
              <tr key={index}>
                <td>
                  <div>
                    <Link
                      to={`/oneMovie/${movie._id}`}
                      className="d-flex justify-content-around m-5"
                    >
                      <>
                        <td className="">
                          <div className="">{movie.title}</div>
                        </td>
                      </>
                    </Link>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-around mx-auto m-3">
                    <img src={movie.boxArt} className="col col-4" />
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-around m-5">
                    {movie.director}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="col col-5">
          <DisplayMyMovies></DisplayMyMovies>
        </div>
        {/* <div>
          <DisplayMyReviews></DisplayMyReviews>
        </div> */}
      </div>
    </div>
  );
};

export default DisplayAll;
