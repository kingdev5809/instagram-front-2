import { defaultUser } from "../../assets/photos";
import React, { useEffect, useState } from "react";
import "./Review.scss";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import {
  GetAllCommentsApi,
  AddComment,
  DeletePost,
} from "../../Redux/extraReducer";
import { SlackSelector } from "@charkour/react-reactions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
function Review({ post, setVisibleCommentModal, profile }) {
  const dispatch = useDispatch();
  const [visibleReactions, setVisibleReactions] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const [allComments, setTheComments] = useState([]);
  const { Comments, reviewLoader } = useSelector((state) => state.Slice);
  const theUser = JSON.parse(localStorage.getItem("appUser"));

  useEffect(() => {
    dispatch(GetAllCommentsApi(post._id));
  }, [post]);

  useEffect(() => {
    setTheComments(Comments);
  }, [Comments]);
  console.log(post);
  const handleAddReaction = (reaction) => {
    if (valueInput) {
      let newValue = valueInput + reaction;
      setValueInput(newValue);
    } else {
      setValueInput(reaction);
    }
  };

  const handleAddComment = () => {
    // Create a new review object.
    const review = {
      user: theUser,
      text: valueInput,
      postId: post._id,
    };

    // Dispatch the AddComment action.
    dispatch(AddComment(review));

    // Clear the input value.
    setValueInput("");

    // Update the review state.
    if (allComments) {
      setTheComments((prev) => [...prev, review]);
    } else {
      setTheComments(review);
    }
  };
  const handleDeletePost = () => {
    dispatch(DeletePost(post._id));
    window.location.reload();
  };
  return (
    <div>
      <div className="review-modal">
        <div className="modal-content">
          <div className="modal-header">
            <span
              className="close-button"
              onClick={() => setVisibleCommentModal(false)}
            >
              ×
            </span>
            <h2 className="modal-title">Post</h2>
          </div>
          <div className="modal-body">
            <div className="post-image">
              <img src={post.image} alt="Post image" />
              {profile ? (
                <button onClick={handleDeletePost}>Delete Post</button>
              ) : (
                ""
              )}
            </div>
            <div className="post-review">
              <div className="review-box">
                {allComments
                  ?.map((review) => (
                    <div className="review-item">
                      <img src={defaultUser} alt="" />
                      <p className="review">
                        <span className="user-name">{review.user.name}</span>
                        {review.text}
                      </p>
                    </div>
                  ))
                  .reverse()}
              </div>
              <p className="post-content"> {post.content} </p>
              <div className="review-input">
                <div className="emoji">
                  {visibleReactions ? (
                    <div className="reactions">
                      <span
                        className="close"
                        onClick={() => setVisibleReactions(!visibleReactions)}
                      >
                        <FontAwesomeIcon icon={faClose} />
                      </span>
                      <SlackSelector onSelect={(e) => handleAddReaction(e)} />
                    </div>
                  ) : (
                    ""
                  )}
                  <span onClick={() => setVisibleReactions(!visibleReactions)}>
                    <svg
                      aria-label="Emoji"
                      className="x1lliihq x1n2onr6 x1roi4f4"
                      fill="currentColor"
                      height="15"
                      role="img"
                      viewBox="0 0 24 24"
                      width="15"
                    >
                      <title>Emoji</title>
                      <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
                    </svg>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Add some review"
                  value={valueInput}
                  onChange={(e) => setValueInput(e.target.value)}
                  onClick={() => setVisibleReactions(false)}
                />
                <button onClick={handleAddComment}>Post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
