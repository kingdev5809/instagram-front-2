import React from "react";
import { NavLink } from "react-router-dom";
import "./Auth.css";
function Authfication() {
  return (
    <div className="not-auth-page">
      <h1>This is Not offical Instagram Created By student</h1>
      <div className="buttons">
        <NavLink to={`/login`}>Login</NavLink>
        <NavLink to={`/register`}>Register</NavLink>
      </div>
    </div>
  );
}

export default Authfication;
