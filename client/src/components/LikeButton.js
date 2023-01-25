import axios from "axios";
import React, { useState, useParams, useEffect } from "react";

const LikeButton = () => {
  //const [likes, setLikes] = useState(passedLike);
  const [likes, setLikes] = useState(0);
  const [isClicked, setIsClicked] = useState(true);

  // const { id } = useParams();

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/api/oneMovie/${id}`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       setLikes(res.data.likes);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [id]);

  // axios
  //   .put(
  //     `http://localhost:8000/api/updateMovie/${id}`,
  //     {
  //       likes,
  //     },
  //     { withCredentials: true }
  //   )
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  const clickHandler = () => {
    if (isClicked) {
      setLikes(likes + 1);
      //update likes for Movie in controller:
    } else {
      setLikes(likes - 1);
      //^newly added above
    }
    setIsClicked(!isClicked);
  };
  return (
    <button
      className={`like-button ${isClicked && "liked"}`}
      onClick={clickHandler}
    >
      <span className="likes-counter">{`Like | ${likes}`}</span>
    </button>
  );
};

export default LikeButton;
