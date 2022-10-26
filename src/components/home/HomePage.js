import React, { useState, useCallback, useEffect } from "react";
import Admin from "../admin/Admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ipcRenderer } from "electron";
import Login from "./Login";
import useToken from "./useToken";
import Loading from "../common/Loading";
import AdminHeader from "../admin/AdminHeader";
import checkInternetConnected from "check-internet-connected";
import { Widget, addResponseMessage, addUserMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import { io } from "socket.io-client";
import Register from "./Register";

const apiUrl = process.env.API_URL;
const apiUrl_V = process.env.API_URL_V;
const HEALTH360_GATEWAY = process.env.HEALTH360_GATEWAY;
const HEALTH360_GATEWAY_V = process.env.HEALTH360_GATEWAY_V;

const socket = io.connect(apiUrl_V, {
  transports: ["websocket", "polling", "flashsocket"],
});
const socketGateway = io.connect(HEALTH360_GATEWAY, {
  transports: ["websocket", "polling", "flashsocket"],
});

const config = {
  timeout: 2000, //timeout connecting to each try (default 5000)
  // retries: 3,//number of retries to do before failing (default 5)
  domain: "www.google.com", //the domain to check DNS record of
};
let interv;
// var ws = new WebSocket("ws://localhost:8000/ws");
const HomePage = (props) => {
  const [loading, setLoading] = useState(false);
  const { token, setToken } = useToken();
  const [fromRegister, setFromRegister] = useState(false);
  const [subscribed, setSubscribed] = useState(
    JSON.parse(localStorage.getItem("subscribed"))
  );
  const [remaining, setRemaining] = useState(
    JSON.parse(localStorage.getItem("remaining"))
  );
  const [page, setPage] = useState("Main");
  const [fromGoogle, setFromGoogle] = useState(false);
  const handleRegisterUser = () => {
    setPage("Register");
  };
  const handleLoginUser = () => {
    setPage("Main");
  };

  // Messages States
  // const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    socket.on("broadcast", (data) => {
      console.log(data);
      if (data !== null) {
        setMessageReceived(data.message);
        // setMessageHistory((prev) => prev.concat(lastJsonMessage));
        // console.log(lastJsonMessage);
        if (data.user != 0)
          addResponseMessage(new Buffer(data.message, "base64").toString());
      }
    });
  }, [socket]);

  const getMain = async () => {
    try {
      const response = await fetch(`${apiUrl_V}/main`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      let responseData = await response.json();
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getUserInfo = async () => {
    try {
      const response = await fetch(
        `${HEALTH360_GATEWAY_V}/users/user-info?token=${localStorage.getItem(
          "token"
        )}`,
        {
          method: "GET",
        }
      );
      const responseData = await response.json();

      if (responseData.success) {
        socketGateway.emit("doctor_sid", {
          token: `${localStorage.getItem("token")}`,
          doctor_id: responseData.doctor.id,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // interv = setInterval(getMain, 1000);
    const startup = async (t, internet) => {
      try {
        const response = await fetch(
          `${apiUrl}/startup?token=${t}&state=${internet}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${t}`,
            },
          }
        );

        const responseData = await response.json();
        if (responseData.success) {
          localStorage.setItem("subscribed", responseData.success);
          // localStorage.setItem("plan", responseData.plan);
          localStorage.setItem("remaining", responseData.remain);
          setSubscribed(responseData.success);
          setRemaining(responseData.remain);
        }
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        localStorage.setItem("subscribed", false);
        setSubscribed(false);
        setLoading(false);
      }
    };
    ipcRenderer.on("register-token-received", async (e, t) => {
      localStorage.setItem("token", t);
      setLoading(false);
      setFromGoogle(true);
      setPage("Register");
    });
    ipcRenderer.on("login-token-received", async (e, t) => {
      localStorage.setItem("token", t);
      try {
        const response = await fetch(
          `${HEALTH360_GATEWAY_V}/users/login/social?token=${t}&role=${0}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${t}`,
            },
          }
        );

        const responseData = await response.json();
        if (responseData.success) {
          localStorage.setItem("subscribed", responseData.success);
          localStorage.setItem("remaining", responseData.doctor.expire_counter);
          setSubscribed(responseData.success);
          setRemaining(responseData.doctor.expire_counter);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    });
    ipcRenderer.on("offline-login", (e) => {
      // startup(null, false);
      const offlineLogin = async (t, internet) => {
        try {
          const response = await fetch(`${apiUrl}/offline-login`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${t}`,
            },
          });

          const responseData = await response.json();
          if (responseData.success) {
            localStorage.setItem("subscribed", responseData.success);
            localStorage.setItem("remaining", responseData.remain);
            setRemaining(responseData.remain);
            setLoading(false);
          } else {
            throw new Error();
          }
          setLoading(false);
        } catch (error) {
          console.log(error.message);
          localStorage.setItem("subscribed", false);
          localStorage.setItem("remaining", 0);
          setSubscribed(true);
          setLoading(false);
        }
      };
      offlineLogin();
    });
    getUserInfo();
    addResponseMessage("Welcome to this awesome chat!");
  }, []);

  const handleClickSendMessage = useCallback((message) => {
    socket.emit("broadcast", {
      message: new Buffer(message).toString("base64"),
      user: 0,
    });
    // sendJsonMessage({ message, user: 0 });
    // addResponseMessage(message);
  }, []);
  const handleClickBell = () => {
    socket.emit("broadcast", { buzz: 1, user: 0 });
  };
  if (interv != null && !loading) clearInterval(interv);
  if (loading) {
    return (
      <div
        className=""
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Loading />
      </div>
    );
  } else {
    if (subscribed) {
      return (
        <>
          <AdminHeader />
          {remaining <= 30 && (
            <div
              className={`remaining-square ${
                remaining <= 15
                  ? "bg-danger"
                  : "" || remaining <= 30
                  ? "bg-yellow"
                  : ""
              }`}
            >
              <h4 className="ps-2 pt-2">
                Remaining of subscription is {remaining} days
              </h4>
            </div>
          )}
          <Admin
            setSubscribed={setSubscribed}
            page={page}
            setPage={setPage}
            setRemaining={setRemaining}
            socket={socket}
            socketGateway={socketGateway}
          />
          <div className={`notification-square`}>
            <div className="bell-div" onClick={handleClickBell}>
              <FontAwesomeIcon icon="bell" className="bell" />
            </div>
            <Widget
              handleNewUserMessage={handleClickSendMessage}
              // profileAvatar={logo}

              title="Health360"
              subtitle="Welcome To Chat"
              // titleAvatar={logo}
              // senderPlaceHolder=""
              emojis
              showBadge
            />
          </div>
        </>
      );
    } else {
      if (page == "Register") {
        return (
          <Register
            setSubscribed={setSubscribed}
            setToken={setToken}
            setPage={setPage}
            setRemaining={setRemaining}
            setLoading={setLoading}
            checkInternetConnected={checkInternetConnected}
            config={config}
            handleLoginUser={handleLoginUser}
            fromGoogle={fromGoogle}
            setFromRegister={setFromRegister}
          />
        );
      } else {
        return (
          <Login
            setSubscribed={setSubscribed}
            setToken={setToken}
            setPage={setPage}
            setRemaining={setRemaining}
            setLoading={setLoading}
            checkInternetConnected={checkInternetConnected}
            config={config}
            username={username}
            setUserName={setUserName}
            password={password}
            setPassword={setPassword}
            handleRegisterUser={handleRegisterUser}
            fromRegister={fromRegister}
          />
        );
      }
    }
  }
};
export default HomePage;
