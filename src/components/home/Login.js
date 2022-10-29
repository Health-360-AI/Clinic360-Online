import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { ipcRenderer } from "electron";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import ForgotPasswordModal from "./ForgotPasswordModal";

const apiUrl = process.env.API_URL;
const HEALTH360_GATEWAY_V = process.env.HEALTH360_GATEWAY_V;

async function loginOnlineUser(credentials) {
  let formData = new FormData();
  formData.append("username", credentials.username.toLowerCase());
  formData.append("password", credentials.password);

  return fetch(`${HEALTH360_GATEWAY_V}/users/login`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      data = data.json();
      if (data.detail) {
        toast.error("There is something wrong");
      } else {
        return data;
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error("Wrong Username or Password");
    });
}

async function postSetup(token) {
  return fetch(`${apiUrl}/setup`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (data) => {
      let d = await data.json();
      if (d.success) {
        return d;
      } else {
        toast.error("Error");
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error("Error");
    });
}

export default function Login({
  setToken,
  setSubscribed,
  setPage,
  setRemaining,
  setLoading,
  checkInternetConnected,
  config,
  username,
  setUserName,
  password,
  setPassword,
  handleRegisterUser,
  fromRegister,
}) {
  const [role, setRole] = useState(0);
  const [passwordType, setPasswordType] = useState("password");
  const [forgotPasswordModalShow, setForgotPasswordModalShow] = useState(false);
  const handleSignWithGoogle = async () => {
    setLoading(true);
    ipcRenderer.send("handleSignInWithGoogle", "google-oauth2");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    loginOnlineUser({
      username,
      password,
      role,
    })
      .then((token) => {
        if (token != undefined) {
          console.log(token);
          setToken(token.token.access_token);
          if (token.success) {
            if (fromRegister) {
              postSetup(token.token.access_token);
            }
            localStorage.setItem("token", token.token.access_token);
            localStorage.setItem("subscribed", token.success);
            localStorage.setItem("remaining", token.remain);
            setRemaining(token.remain);
            setSubscribed(token.success);
          }
          setLoading(false);
        } else {
          toast.error(token.error);
          localStorage.setItem("subscribed", false);
          setSubscribed(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handlePasswordType = () => {
    setPasswordType(passwordType == "text" ? "password" : "text");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center main pb-5"
      style={{ height: "100vh" }}
    >
      <ForgotPasswordModal
        show={forgotPasswordModalShow}
        onHide={() => setForgotPasswordModalShow(false)}
      />
      <form onSubmit={handleSubmit} className="w-50">
        <h3 className="text-center mb-3">Login</h3>

        <div className="form-group mb-3">
          <label className="form-label">Email</label>
          <input
            type="username"
            className="form-control"
            placeholder="Email"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="form-group row mb-3">
          <label className="form-label col-12">Password</label>
          <div className="col-11">
            <input
              type={passwordType}
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handlePasswordType}
            type="button"
            className="btn btn-secondary col-1"
          >
            {passwordType == "text" ? "Hide" : "Show"}
          </button>
        </div>

        <div className="row justify-content-center mt-4">
          <button type="submit" className="btn btn-primary btn-block col-5">
            Login
          </button>
          <button
            onClick={handleRegisterUser}
            type="button"
            className="btn btn-secondary btn-block ms-3 col-5"
          >
            Register
          </button>
          <button
            onClick={handleSignWithGoogle}
            type="button"
            className="col-5 mt-2 google-btn btn"
          >
            <FontAwesomeIcon icon={faGoogle} className="pe-4" />
            Sign In With Google
          </button>
          <button
            onClick={() => setForgotPasswordModalShow(true)}
            type="button"
            className="btn btn-warning btn-block ms-3 mt-2 col-5"
          >
            Forgot Password
          </button>
        </div>
      </form>
    </div>
  );
}
