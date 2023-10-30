import React, { useState } from "react";
import {
  AddPost,
  Aside,
  HomePage,
  Page404,
  ProfilePage,
  PublicProfile,
} from "./Pages";
import { Route, Routes } from "react-router";

function AuthPage() {
  const [visibleModel, setVisibleModel] = useState(false);

  return (
    <div>
      <div className="authed-page">
        <div className="aside-side">
          <Aside setVisibleModel={setVisibleModel} />
        </div>
        <div className="main-side">
          <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/profile"} element={<ProfilePage />} />
            <Route path={"/profile/:id"} element={<PublicProfile />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
        {visibleModel ? <AddPost setVisibleModel={setVisibleModel} /> : ""}
      </div>
    </div>
  );
}

export default AuthPage;
