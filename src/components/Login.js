import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const handleLogin = async () => {
    setIsLogging(true);
    if (email.length === 0 || password.length === 0) {
      toast.error("Email or password is empty");
      setIsLogging(false);
      return;
    }

    let res = await loginApi(email, password);
    //   {
    //     eve.holt@reqres.in
    //     cityslicka
    // }

    if (res && res.token) {
      toast.success("Login success");
      setIsLogging(false);
      localStorage.setItem("token", res.token);
      navigate("/");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      } else {
        toast.error("Login failed");
      }
      setIsLogging(false);
    }
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
     if (token) {
      navigate("/");
    }
  });
  return (
    <>
      <div className="login-container col-lg-8 col-sm-6  col-xl-4">
        <div className="title">Log in</div>
        <div className="text">{"Email or username"}</div>
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
          disabled={email.length === 0 || password.length === 0 || isLogging}
          className="btn btn-dark mt-3"
          onClick={() => {
            handleLogin();
          }}
        >
          {isLogging ? <i class="fas fa-circle-notch fa-spin"></i> : "Log in"}
        </button>
        <div role="button" className="mt-5 text-center ">
          <i className="fa-solid fa-angles-left"></i>
          <span className="fw-semibold fs-6 ">
            <u>Go Back</u>
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
