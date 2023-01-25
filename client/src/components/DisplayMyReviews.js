import React, { useEffect, useState } from "react";
import axios from "axios";

const DisplayMyReviews = () => {
  //const navigate = useNavigate();
  const [myReviewList, setMyReviewList] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/allReviewsByMe", {
  //       withCredentials: true,
  //       credentials: "include",
  //     })

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/reviews/user", {
        withCredentials: true,
        credentials: "include",
      })

      .then((res) => {
        console.log("Reviews added by me:", res);

        setMyReviewList(res.data.myReviews);
      })
      .catch((err) => {
        console.log("reviews by user not reached", err);
        console.log(err);
      });
  }, []);

  return (
    <div className="myReviews ">
      <h5 className=" p-1 bg-dark">Reviews added by me:</h5>
      <table className="table table-bordered bg-dark text-warning">
        <thead>
          <tr>
            <th scope="col">Reviews</th>
            {/* <th scope="col">Poster</th>
            <th scope="col">Director </th> */}
          </tr>
        </thead>
        <tbody>
          {myReviewList.map((review, index) => (
            <tr key={index}>
              <td>
                {/* <div>
                  <Link
                    to={`/oneMovie/${movie._id}`}
                    className="d-flex m-2 justify-content-around"
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
                <div>
                  <img src={movie.boxArt} className="col col-4" />
                </div>
              </td>
              <td> */}
                <div>{review.message}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayMyReviews;
