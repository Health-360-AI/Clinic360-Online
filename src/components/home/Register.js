import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { ipcRenderer } from "electron";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const HEALTH360_GATEWAY_V = process.env.HEALTH360_GATEWAY_V;

async function registerOnlineUser(credentials, fromGoogle) {
  let formData = new FormData();
  let socialPath = `${HEALTH360_GATEWAY_V}/users/login/social?token=${localStorage.getItem(
    "token"
  )}&role=${credentials.role}&name=${credentials.name}&address=${
    credentials.address
  }&phone=${credentials.phone}&speciality=${credentials.speciality}`;
  let registerPath = `${HEALTH360_GATEWAY_V}/users/register?&role=${credentials.role}&name=${credentials.name}&address=${credentials.address}&phone=${credentials.phone}&speciality=${credentials.speciality}`;
  formData.append("username", credentials.username);
  formData.append("password", credentials.password);
  return fetch(fromGoogle ? socialPath : registerPath, {
    method: "POST",
    body: formData,
  })
    .then(async (data) => {
      let d = await data.json();
      if (d.success) {
        return d;
      } else {
        toast.error("User Already Registered");
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error("Error");
    });
}

async function getSocialEmail() {
  return fetch(
    `${HEALTH360_GATEWAY_V}/users/social/email?access_token=${localStorage.getItem(
      "token"
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
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

export default function Register({
  setToken,
  setSubscribed,
  setPage,
  setRemaining,
  setLoading,
  checkInternetConnected,
  config,
  handleLoginUser,
  fromGoogle,
  setFromRegister,
}) {
  const [role, setRole] = useState(0);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [repeatedPasswordType, setRepeatedPasswordType] = useState("password");

  const handleSignWithGoogle = async () => {
    setLoading(true);
    ipcRenderer.send("handleSignUpWithGoogle", "google-oauth2");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    registerOnlineUser(
      {
        role,
        username: username.toLowerCase(),
        password,
        name,
        address,
        phone,
        speciality,
      },
      fromGoogle
    )
      .then(async (token) => {
        let email;
        if (fromGoogle) {
          email = await getSocialEmail();
        }
        if (token != undefined) {
          if (token.success) {
            localStorage.setItem("subscribed", token.success);
            setFromRegister(true);
            setPage("Main");
          } else {
            toast.error("There is already an user");
          }
          setLoading(false);
        } else {
          localStorage.setItem("subscribed", false);
          setSubscribed(false);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const handlePasswordType = () => {
    setPasswordType(passwordType == "text" ? "password" : "text");
  };
  const handleRepeatedPasswordType = () => {
    setRepeatedPasswordType(
      repeatedPasswordType == "text" ? "password" : "text"
    );
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center main pb-5"
      style={{ height: "100vh" }}
    >
      <form onSubmit={handleSubmit} className="w-50">
        <h3 className="text-center mb-3">Register</h3>
        <div className="form-group mb-3">
          <label className="form-label">Name *</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {!fromGoogle && (
          <div className="form-group mb-3">
            <label className="form-label">Email *</label>
            <input
              type="username"
              className="form-control"
              placeholder="Email"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group mb-3">
          <label className="form-label">Address</label>
          <input
            type="address"
            className="form-control"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="phone"
            className="form-control"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Speciality</label>
          <input
            type="speciality"
            className="form-control"
            placeholder="Speciality"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
          />
        </div>

        <div className="form-group row mb-3">
          <label className="form-label col-12">Password *</label>
          <div className="col-11">
            <input
              type={passwordType}
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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

        <div className="form-group row mb-3">
          <label className="form-label col-12">Repeat Password *</label>
          <div className="col-11">
            <input
              type={repeatedPasswordType}
              className="form-control"
              placeholder="Password"
              value={repeatedPassword}
              onChange={(e) => setRepeatedPassword(e.target.value)}
              required
            />
          </div>
          <button
            onClick={handleRepeatedPasswordType}
            type="button"
            className="btn btn-secondary col-1"
          >
            {repeatedPasswordType == "text" ? "Hide" : "Show"}
          </button>
          {password != repeatedPassword && (
            <div className="invalid-feedback" style={{ display: "block" }}>
              Password is not the same
            </div>
          )}
        </div>

        <div className="row justify-content-center mt-4">
          <button
            type="submit"
            className="btn btn-secondary btn-block col-5"
            disabled={password != repeatedPassword ? true : false}
          >
            Register
          </button>
          {!fromGoogle && (
            <button
              onClick={handleSignWithGoogle}
              type="button"
              className="col-5 ms-3 google-btn"
            >
              <FontAwesomeIcon icon={faGoogle} className="pe-4" />
              Sign Up With Google
            </button>
          )}
          <button
            onClick={handleLoginUser}
            type="button"
            className={`btn btn-secondary btn-block col-5 ${
              fromGoogle && "ms-3"
            } ${!fromGoogle && "mt-3"}`}
          >
            Return To Login
          </button>
        </div>
      </form>
    </div>
  );
}
