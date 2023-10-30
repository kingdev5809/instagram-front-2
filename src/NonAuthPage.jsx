import React from "react";
import { Route, Routes } from "react-router";
import { Authfication, Login, Page404, Register } from "./Pages";

function NonAuthPage() {
  const route = [
    { id: 1, name: "Login", path: "/", element: <Authfication /> },
    { id: 2, name: "Login", path: "/login", element: <Login /> },
    { id: 3, name: "Register", path: "/register", element: <Register /> },
  ];
  return (
    <div>
      <div className="main-side">
        <Routes>
          {route.map((link) => (
            <Route key={link.id} path={link.path} element={link.element} />
          ))}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </div>
  );
}

export default NonAuthPage;
