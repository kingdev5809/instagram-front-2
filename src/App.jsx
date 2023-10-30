import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import AuthPage from "./AuthPage";
import NonAuthPage from "./NonAuthPage";
function App() {
  let appUser;
  appUser = JSON.parse(localStorage.getItem("appUser"));

  return (
    <div className="the-app-page">
      <ToastContainer />
      {appUser ? <AuthPage /> : <NonAuthPage />}
    </div>
  );
}

export default App;
