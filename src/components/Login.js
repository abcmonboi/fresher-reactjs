import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

const Login = () => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <div className="login-container col-lg-8 col-sm-6  col-xl-4">
        <div className="title">Log in</div>
        <div className="text">Email or Username</div>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email or Username"
          type="text"
          className="input"
        />
        <div className="position-relative">
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            type={isShow ? "text" : "password"}
            className="input w-100 "
          />
          <i
            onClick={() => {
              setIsShow(!isShow);
            }}
            role="button"
            className={
              isShow
                ? "fa-solid fa-eye-slash eye-watch"
                : "fa-solid fa-eye eye-watch"
            }
          />
        </div>
        <button
          disabled={email.length === 0 || password.length === 0}
          className="btn btn-dark mt-3"
        >
          Login
        </button>
        <div role="button" className="mt-5 text-center ">
          <i class="fa-solid fa-angles-left"></i>
          <span className="fw-semibold fs-6 ">
            <u>Go Back</u>
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
