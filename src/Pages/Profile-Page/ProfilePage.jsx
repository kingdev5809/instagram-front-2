import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { defaultUser } from "../../assets/photos";
import { useDispatch, useSelector } from "react-redux";
import { DeletePost, OneUserGetPostsAPi } from "../../Redux/extraReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-confirm-alert/src/react-confirm-alert.css";

import { confirmAlert } from "react-confirm-alert";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import EditModal from "./ProfileEdit";
import Review from "../../Components/Review/Review";
function ProfilePage() {
  const dispatch = useDispatch();
  const [editedData, setEditedData] = useState({});
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleCommentModal, setVisibleCommentModal] = useState(false);
  const [postId, setPostId] = useState(null);
  const { postTheUsers } = useSelector((state) => state.Slice);
  let appUser;
  appUser = JSON.parse(localStorage.getItem("appUser"));
  let follow = JSON.parse(localStorage.getItem("follow"));

  useEffect(() => {
    dispatch(OneUserGetPostsAPi(appUser._id));
  }, []);

  const handleShowEditModal = () => {
    let newData = {
      name: appUser.name,
      fullName: appUser.fullName,
      id: appUser._id,
    };
    setEditedData(newData);
    setVisibleEditModal(true);
  };
  const handleOpenComment = (post) => {
    setPostId(post);
    setVisibleCommentModal(true);
  };

  return (
    <div className="the-page-prufle">
      <header>
        <div className="container">
          <div className="prufle">
            <div className="prufle-image">
              <img src={defaultUser} alt="" />
            </div>

            <div className="profule-flex">
              <div className="prufle-user-settings">
                <h1 className="prufle-user-name">{appUser.name}</h1>

                <button
                  className="btn prufle-edit-btn"
                  onClick={handleShowEditModal}
                >
                  Edit Profile
                </button>

                <button
                  className="btn prufle-settings-btn"
                  aria-label="prufle settings"
                >
                  <i className="fas fa-cog" aria-hidden="true"></i>
                </button>
              </div>

              <div className="prufle-stats">
                <ul>
                  <li>
                    <span className="prufle-stat-count">
                      {postTheUsers.length}
                    </span>{" "}
                    content-post
                  </li>
                  <li>
                    <span className="prufle-stat-count">0</span> followers
                  </li>
                  <li>
                    <span className="prufle-stat-count">{follow?.length}</span>{" "}
                    following
                  </li>
                </ul>
              </div>
            </div>

            <div className="prufle-bio">
              <p></p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="profile-content-post">
            {postTheUsers?.map((post) => (
              <div
                className="content-post-item-profile"
                tabIndex="0"
                onClick={() => handleOpenComment(post)}
              >
                <img
                  src={post.image}
                  className="profile-content-post-image"
                  alt=""
                />

                <div className="content-post-item-profile-info"></div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {visibleEditModal ? (
        <EditModal
          editedData={editedData}
          setVisibleEditModal={setVisibleEditModal}
          setEditedData={setEditedData}
        />
      ) : (
        ""
      )}
      {visibleCommentModal ? (
        <>
          <Review
            setVisibleCommentModal={setVisibleCommentModal}
            post={postId}
            profile={true}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ProfilePage;
