import React, { useState } from "react";
import { LoginUser } from "../../Redux/extraReducer";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { load } = useSelector((state) => state.Slice);
  const [theError, setTheError] = useState("");

  const [inputsValue, setInputsValue] = useState({
    email: "",
    password: "",
  });
  const handleChangeInputs = (event) => {
    setInputsValue({ ...inputsValue, [event.target.name]: event.target.value });
  };

  const validate = (inputs) => {
    const { email, password } = inputs;
    if (email === "" || password === "") {
      toast.error("Email and Password is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the form inputsValue.
    const valid = validate(inputsValue);

    // If the form inputsValue is valid, dispatch the LoginUser action.
    if (valid) {
      dispatch(LoginUser(inputsValue)).then((inputsValue) => {
        // Handle the response from the LoginUser action.
        if (!inputsValue.payload.status) {
          setTheError(inputsValue.payload.msg);
        } else {
          navigate("/");
          window.location.reload();
        }
      });
    }
  };
  return (
    <div className="sign-page">
      <div className="page">
        <div className="header">
          <h1 className="logo">The Instagram</h1>
          <p>Login</p>
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
              value={inputsValue.email}
              name="email"
              onChange={(e) => handleChangeInputs(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={inputsValue.password}
              onChange={(e) => handleChangeInputs(e)}
            />

            <button onClick={handleSubmit}>Login</button>
          </form>
          <p className="link-another">
            Don`t have an account?{" "}
            <NavLink to={"/register"} onClick={() => setTheError("")}>
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
