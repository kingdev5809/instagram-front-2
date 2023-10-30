import React, { useState } from "react";
import "./Auth.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../../Redux/extraReducer";
import { toast } from "react-toastify";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { load } = useSelector((state) => state.Slice);

  const [data, setData] = useState({
    name: "",
    fullName: "",
    email: "",
    password: "",
  });
  const [theError, setTheError] = useState("");
  const validate = (data) => {
    const { password, email, fullName, name } = data;
    if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters.");
      return false;
    } else if (email === "") {
      toast.error("Email is required.");
      return false;
    } else if (name === "") {
      toast.error("Username is required.");
      return false;
    } else if (fullName === "") {
      toast.error("Fullname is required.");
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    // Update the form data with the new value.
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleRegister = (event) => {
    event.preventDefault();

    // Validate the form data.
    const valid = validate(data);

    // If the form data is valid, dispatch the RegisterUser action.
    if (valid) {
      dispatch(RegisterUser(data)).then((data) => {
        // Handle the response from the RegisterUser action.
        if (data.payload.status) {
          navigate("/");
          window.location.reload();
        } else {
          setTheError(data.payload.msg);
        }
      });
    }
  };

  return (
    <div className="login-page">
      <div className="page">
        <div className="header">
          <h1 className="logo">The Instagram</h1>
          <p>Sign up </p>
        </div>
        <div className="error">
          <h2>{theError}</h2>
        </div>
        <div className="load">{load ? <h2>Loading...</h2> : ""}</div>

        <div className="container">
          <form>
            <input
              type="text"
              placeholder="Email"
              value={data.email}
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              placeholder="User Name"
              value={data.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              placeholder="Full Name"
              value={data.fullName}
              name="fullName"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={(e) => handleChange(e)}
            />
            <button onClick={handleRegister}>Sign up</button>
          </form>

          <p className="link-another">
            Don`t have an account?{" "}
            <NavLink to={"/login"} onClick={() => setTheError("")}>
              login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
