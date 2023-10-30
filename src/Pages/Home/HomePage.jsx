import React from "react";
import StorySide from "./StorySide/StorySide";
import "./Home.scss";
import RightUsers from "./RightUsers/RightUsers";
import PostsSide from "./PostsSide/PostsSide";
function HomePage() {
  return (
    <div className="home-page">
      <div className="left">
        <div className="history-side">
          <StorySide />
          <PostsSide />
        </div>
      </div>
      <div className="righ">
        <div className="right-users">
          <RightUsers />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
