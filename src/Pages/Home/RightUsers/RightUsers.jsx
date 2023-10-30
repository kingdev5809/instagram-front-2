import React, { useEffect, useState } from "react";
import "./RightUsers.scss";
import { defaultUser } from "../../../assets/photos";
import { useDispatch, useSelector } from "react-redux";
import { FollowUserApi } from "../../../Redux/extraReducer";
import { NavLink } from "react-router-dom";
function RightUsers() {
  const dispatch = useDispatch();

  const follow = JSON.parse(localStorage.getItem("follow"));
  const appUser = JSON.parse(localStorage.getItem("appUser"));
  const [notFollowedUsers, setNotFollowedUsers] = useState([]);
  const [usersFollowed, setUsersFollowed] = useState([]);

  const { allUsers } = useSelector((state) => state.Slice);

  useEffect(() => {
    setUsersFollowed(follow);
  }, []);

  useEffect(() => {
    if (!follow) {
      localStorage.setItem("follow", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    // Filter the allUsers array to only include users that are not followed by the current user.
    const notFollowedUsers = allUsers.filter(
      (user) => !follow.includes(user._id) && appUser._id !== user._id
    );
    // Set the notFollowedUsers state variable.
    setNotFollowedUsers(notFollowedUsers);
  }, [allUsers]);

  const HandleFollow = async (user) => {
    // Determine if the user is already followed.
    const isFollowed = usersFollowed?.includes(user._id);

    // Update the following users list accordingly.
    let updatedUsersFollowed;
    if (isFollowed) {
      updatedUsersFollowed = usersFollowed?.filter((item) => item !== user._id);
    } else {
      updatedUsersFollowed = [...usersFollowed, user?._id];
    }
    setUsersFollowed(updatedUsersFollowed);
    // Update the local storage and dispatch the FollowUserApi action.
    localStorage.setItem("follow", JSON.stringify(updatedUsersFollowed));
    dispatch(
      FollowUserApi({ id: appUser._id, followingUsers: updatedUsersFollowed })
    );
  };

  return (
    <section className="side-menu">
      <div className="right-side_user-profile">
        <a href="#" className="right-side_user-avatar">
          <img src={defaultUser} alt="User Picture" />
        </a>
        <div className="right-side_user-info">
          <a target="_blank" rel="noreferrer">
            {appUser?.name}
          </a>
          <span>{appUser?.displayName}</span>
        </div>
        <button className="right-side_user-button">Switch</button>
      </div>

      <div className="right-side_suggestions-section">
        <div className="right-side_suggestions-header">
          <h2>Suggestions for You</h2>
          <button>See All</button>
        </div>
        <div className="right-side_suggestions-content">
          {notFollowedUsers.length === 0 ? (
            <h2>You have not recomended users</h2>
          ) : (
            ""
          )}
          {notFollowedUsers?.slice(0, 6)?.map((user) => (
            <div className="right-side_suggestion" key={user._id}>
              <a href="#" className="right-side_suggestion-avatar">
                <img src={defaultUser} alt="User Picture" />
              </a>
              <div className="right-side_suggestion-info">
                <NavLink to={`/profile/${user._id}`}>{user.name}</NavLink>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
              </div>
              <button
                className="side-menu-suggestionbtn"
                onClick={() => HandleFollow(user)}
              >
                {usersFollowed?.includes(user?._id) ? "Followed" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="right-side_footer">
        <span className="right-side_footer-copyright">
          &copy; 2023 instagram from facebook
        </span>
      </div>
    </section>
  );
}

export default RightUsers;
