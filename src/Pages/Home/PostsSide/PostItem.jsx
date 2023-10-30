import { defaultUser, heartIcon } from "../../../assets/photos";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { LikeThePostApi, backendLink } from "../../../Redux/extraReducer";
import Review from "../../../Components/Review/Review";
import axios from "axios";

function PostItem({ post }) {
  const dispatch = useDispatch();
  const [postTheUsers, setPostTheUsers] = useState(null);
  const [visibleCommentModal, setVisibleCommentModal] = useState(false);
  const theUser = JSON.parse(localStorage.getItem("appUser"));
  const [theLIkde, setIsLiked] = useState(false);

  const LikeThePost = () => {
    // Toggle the like state.
    setIsLiked((prev) => !prev);
    // Update the likes list.
    const updatedLikes = theLIkde
      ? [...post.likes, theUser._id]
      : post.likes?.filter((item) => item !== theUser._id);

    // Dispatch the LikeThePostApi action.
    dispatch(LikeThePostApi({ id: post._id, likedUsers: updatedLikes }));
  };

  const OneUserGetApi = async (id) => {
    try {
      const response = await axios.get(`${backendLink}/user/${id}`);
      setPostTheUsers(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    OneUserGetApi(post.user);
    if (post.likes.includes(theUser?._id)) {
      setIsLiked(true);
    }
  }, []);
  return (
    <div className="post-item">
      <div className="title">
        <div className="user">
          <img src={defaultUser} alt="" />
          {postTheUsers?.name}
        </div>
        <FontAwesomeIcon icon={faEllipsis} />
      </div>
      <div className="content">
        <img src={post?.image} alt="" />
        <div className="icons">
          <div className="icon">
            <span className="heart" onClick={LikeThePost}>
              {theLIkde ? (
                <FontAwesomeIcon icon={faHeart} />
              ) : (
                <img src={heartIcon} alt="" />
              )}
            </span>
            <span
              className="review"
              onClick={() => setVisibleCommentModal(true)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.2959 20.8165L20.2351 16.8602C20.1743 16.6385 20.2047 16.3994 20.309 16.1907C21.2351 14.3342 21.5438 12.117 20.9742 9.80402C20.2003 6.67374 17.757 4.16081 14.6354 3.33042C13.7833 3.10869 12.9442 3 12.1312 3C6.29665 3 1.74035 8.47365 3.31418 14.5647C4.04458 17.3819 7.05314 20.2992 9.88344 20.9861C10.6486 21.173 11.4008 21.26 12.1312 21.26C13.7006 21.26 15.1701 20.8557 16.4614 20.1601C16.6049 20.0818 16.7657 20.0383 16.9222 20.0383C17.0005 20.0383 17.0787 20.047 17.157 20.0688L21.009 21.0991C21.0307 21.1035 21.0525 21.1078 21.0699 21.1078C21.2177 21.1078 21.3351 20.9687 21.2959 20.8165ZM19.0178 17.1863L19.6178 19.4253L17.4831 18.8558C17.3005 18.8079 17.1135 18.7819 16.9222 18.7819C16.557 18.7819 16.1875 18.8775 15.8571 19.0558C14.6963 19.6818 13.4441 19.9992 12.1312 19.9992C11.4834 19.9992 10.8269 19.9166 10.1791 19.7601C7.78354 19.1775 5.14453 16.6037 4.53586 14.2473C3.90111 11.7865 4.40109 9.26057 5.90536 7.31719C7.40964 5.3738 9.6791 4.26081 12.1312 4.26081C12.8529 4.26081 13.5876 4.35646 14.3137 4.5521C16.9961 5.26511 19.0786 7.39544 19.7525 10.1084C20.2264 12.0213 20.0308 13.9299 19.183 15.6298C18.9395 16.1168 18.8787 16.6689 19.0178 17.1863Z"
                  fill="var(--text-dark)"
                  stroke="var(--text-dark)"
                  strokeWidth="0.7"
                />
              </svg>
            </span>
          </div>
          <span className="save">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.875 2H4.125C3.50625 2 3 2.44939 3 3.00481V22.4648C3 23.0202 3.36563 23.1616 3.82125 22.7728L11.5444 16.1986C11.7244 16.0471 12.0225 16.0471 12.2025 16.1936L20.1731 22.7879C20.6287 23.1666 21 23.0202 21 22.4648V3.00481C21 2.44939 20.4994 2 19.875 2ZM19.3125 20.0209L13.3444 15.0827C12.9281 14.7394 12.405 14.5677 11.8763 14.5677C11.3363 14.5677 10.8019 14.7444 10.3856 15.0979L4.6875 19.9502V3.51479H19.3125V20.0209Z"
                fill="var(--text-dark)"
                stroke="var(--text-dark)"
                strokeWidth="0.7"
              />
            </svg>
          </span>
        </div>

        <div className="text-post">
          <p>{post.content}</p>
        </div>
      </div>
      {visibleCommentModal ? (
        <Review post={post} setVisibleCommentModal={setVisibleCommentModal} />
      ) : (
        ""
      )}
    </div>
  );
}

export default PostItem;
