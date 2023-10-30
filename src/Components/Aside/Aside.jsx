import React, { useState } from "react";
import big_logo from "../../assets/photos/insta_logo.svg.png";
import small_logo from "../../assets/photos/87390.png";
import { NavLink, useNavigate } from "react-router-dom";
import "./Aside.scss";

import {
  faHeart,
  faHome,
  faMessage,
  faPlusSquare,
  faSearch,
  faSignOut,
  faUser,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./Searchbar";
import { createIcon, exploreIcon, heartIcon, homeIcon, logoutIcon, messageIcon, searchIcon, userIcon } from "../../assets/photos";
// eslint-disable-next-line react/prop-types
function Aside({ setVisibleModel }) {
  const [searchShow, setSearchShow] = useState(false);
  const navigate = useNavigate();
  // there function is log out of user
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  // there show searchbar
  const showSearchSide = () => {
    setSearchShow(!searchShow);
  };
  return (
    <div className={`aside-component ${searchShow ? "searchbar-show" : ""}`}>
      <div className="aside-header">
        <img className="insta-log" src={big_logo} alt="" />
        <img className="logo-insta" src={small_logo} alt="" />
      </div>
      <div className="routes">
        <div className="route">
          <NavLink to="/">
            <img src={homeIcon} alt="" /> <span>Home</span>
          </NavLink>
        </div>

        <div className="route" onClick={showSearchSide}>
          <NavLink>
            <img src={searchIcon} alt="" /> <span>Search</span>
          </NavLink>
        </div>

        <div className="route">
          <NavLink>
            <img src={exploreIcon} alt="" /> <span>Explore</span>
          </NavLink>
        </div>

        <div className="route">
          <NavLink>
            <img src={messageIcon} alt="" /> <span>Messages</span>
          </NavLink>
        </div>

        <div className="route">
          <NavLink>
            <img src={heartIcon} alt="" /> <span>Notifications</span>
          </NavLink>
        </div>
        <div className="route" onClick={() => setVisibleModel(true)}>
          <NavLink>
            <img src={createIcon} alt="" /> <span>Create</span>
          </NavLink>
        </div>

        <div className="route">
          <NavLink to="/profile">
            <img src={userIcon} alt="" /> <span>Profile</span>
          </NavLink>
        </div>
      </div>
      <div className="aside-footer" onClick={handleLogout}>
        <img src={logoutIcon} alt="" />
        <span> Log out</span>
      </div>
      <SearchBar searchBar={searchShow} setSearchBar={setSearchShow} />
    </div>
  );
}

export default Aside;
