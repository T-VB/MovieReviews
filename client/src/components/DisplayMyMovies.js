import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DisplayMyMovies = () => {
  //const navigate = useNavigate();
  const [myMovieList, setMyMovieList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/movies/user", {
        withCredentials: true,
        credentials: "include",
      })

      .then((res) => {
        console.log("Movies added by me:", res);
        console.log(res.data);
        setMyMovieList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="myMovies ">
      <h5 className=" p-5 bg-dark">Movies added by me:</h5>
      <table className="p-5 table table-bordered bg-dark text-warning">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Poster</th>
            <th scope="col">Director </th>
          </tr>
        </thead>
        <tbody>
          {myMovieList.map((movie, index) => (
            <tr key={index}>
              <td>
                <div>
                  <Link
                    to={`/oneMovie/${movie._id}`}
                    className="d-flex m-4 p-3 justify-content-around"
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
                <div className="m-2">
                  <img src={movie.boxArt} className="col col-4" />
                </div>
              </td>
              <td>
                <div className="m-3 p-4">{movie.director}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayMyMovies;
