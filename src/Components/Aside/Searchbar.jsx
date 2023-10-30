import React, { useEffect, useState } from "react";
import { defaultUser } from "../../assets/photos";
import { NavLink } from "react-router-dom";
import "./Searchbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { FollowUserApi, GetAllUsersApi } from "../../Redux/extraReducer";
function SearchBar({ searchBar, setSearchBar }) {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(null);
  const [usersFollowed, setUsersFollowed] = useState([]);
  const { allUsers } = useSelector((state) => state.Slice);

  const appUser = JSON.parse(localStorage.getItem("appUser"));
  let filteredUsers;
  filteredUsers = allUsers?.filter((user) => {
    return user.name?.toLowerCase().includes(searchTerm?.toLowerCase());
  });

  if (!searchTerm) {
    filteredUsers = [];
  }

  const follow = JSON.parse(localStorage.getItem("follow"));
  useEffect(() => {
    setUsersFollowed(follow);
    dispatch(GetAllUsersApi());
  }, []);

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
    <div className={searchBar ? "active" : ""}>
      <div className="Search_Bar">
        <h1>Search</h1>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <div className="mans">
          <div className="right-side_suggestions-content">
            {filteredUsers?.map((user) => (
              <div className="right-side_suggestion" key={user._id}>
                <a href="#" className="right-side_suggestion-avatar">
                  <img src={defaultUser} alt="User Picture" />
                </a>
                <div className="right-side_suggestion-info">
                  <NavLink to={`/profile/${user._id}`}>{user.name}</NavLink>

                  <span>Lorem ipsum dolor sit amet.</span>
                </div>
                <button
                  className="side-menu-suggestionbtn"
                  onClick={() => HandleFollow(user)}
                >
                  {usersFollowed?.includes(user._id) ? "Followed" : "Follow"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div onClick={() => setSearchBar(false)} className="black-screen"></div>
    </div>
  );
}

export default SearchBar;
