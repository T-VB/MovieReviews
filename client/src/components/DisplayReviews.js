import React, { useEffect, useState } from "react";
import axios from "axios";

const DisplayReviews = (props) => {
  console.log(props);
  const { id } = props;
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    console.log("Effect reached");
    axios
      .get(`http://localhost:8000/api/reviews/${id}`, {
        withCredentials: true,
        credentials: "include",
      })

      .then((res) => {
        console.log("reviews grabbed", res.data);
        setReviewList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="d-flex flex-column justify-content-aroundflex-wrap text-center p-5">
      <table className="col col-5 mx-auto table-bordered bg-dark text-warning">
        <thead>
          <tr>
            <th scope="col">Reviews:</th>
            <th scope="col">By:</th>
          </tr>
        </thead>
        <tbody className="">
          {reviewList.map((review, index) => (
            <tr key={index}>
              <td className="p-4">
                {/* <Link to={`/oneReview/${review._id}`}></Link> */}
                <div className="d-block mb-2 text-info">"{review.message}"</div>
              </td>
              <td className="p-4">
                <div className="d-block mb-2 text-info">
                  {review.userCreated.username}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayReviews;
