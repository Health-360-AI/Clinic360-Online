import React, { useState, useEffect } from "react";
import { Modal, Button, CloseButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import GeneralPage from "./Settings/GeneralPage";
import EditGeneral from "./Settings/EditGeneral";
import SubscriptionPage from "./Settings/SubscriptionPage";
import BackupPage from "./Settings/BackupPage";
import AboutPage from "./Settings/AboutPage";
import SupportPage from "./Settings/SupportPage";
import { ipcRenderer } from "electron";
import checkInternetConnected from "check-internet-connected";
import RxSettings from "./Settings/RxSettings";
import AutoHeight from "react-auto-height";
import SpecificationsPage from "./Settings/SpecificationsPage";
import ListsPage from "./Settings/ListsPage";
import ConnectionsPage from "./Settings/ConnectionsPage";

let fs = require("fs");
const path = require("path");
const config = {
  timeout: 5000, //timeout connecting to each try (default 5000)
  // retries: 3,//number of retries to do before failing (default 5)
  domain: "www.google.com", //the domain to check DNS record of
};

const apiUrl = process.env.API_URL;

let LOCALAPPDATA =
  process.platform !== "darwin"
    ? process.env.LOCALAPPDATA
    : path.join(process.env.HOME, "Library", "Application Support");

let Settings;
if (process.env.NODE_ENV == "development") {
  Settings = "./Settings.json";
} else {
  Settings = LOCALAPPDATA + "/clinic360/Settings.json";
}

function SettingsModal(props) {
  const [general, setGeneral] = useState({
    name: "",
    degrees: "",
    department: "",
    speciality: "",
    email: "",
    address: "",
    Time: "",
    days: "",
    phone: null,
  });
  const [subscription, setSubscription] = useState({
    plan: "",
    start_date: "",
    expire_date: "",
  });
  const [recovering, setRecovering] = useState(false);
  const [backingup, setBackingup] = useState(false);

  const [backups, setBackups] = useState([]);
  const [internet, setInternet] = useState(false);
  const [settingsPage, setSettingsPage] = useState("GeneralPage");
  const [printer, setPrinter] = useState(
    JSON.parse(fs.readFileSync(Settings, "utf8")).printer
  );
  const [paper, setPaper] = useState(
    JSON.parse(fs.readFileSync(Settings, "utf8")).pageSize
  );
  const [printers, setPrinters] = useState([]);

  const [startAppearing, setStartAppearing] = useState(false);
  const handleZippingFile = async () => {
    ipcRenderer.send("choose-path");
  };
  const handleUnzippingFile = async () => {
    ipcRenderer.send("choose-retrival-path");
  };
  const handlePrinterChange = (e) => {
    setPrinter(e.target.value);

    let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
    content.printer = e.target.value;
    //write file
    fs.writeFileSync(Settings, JSON.stringify(content));
  };
  const handlePaperChange = (e) => {
    setPaper(e.target.value);

    let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
    content.pageSize = e.target.value;
    //write file
    fs.writeFileSync(Settings, JSON.stringify(content));
  };
  const getGeneral = async () => {
    try {
      const response = await fetch(`${apiUrl}/general-info`, {
        method: "GET",
      });
      const responseData = await response.json();
      setGeneral(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubscrption = async () => {
    try {
      const response = await fetch(`${apiUrl}/subscription`, {
        method: "GET",
      });
      const responseData = await response.json();
      setSubscription(responseData);
    } catch (error) {
      console.log(error);
    }
  };
  const renewal = async () => {
    try {
      const response = await fetch(`${apiUrl}/sub`, {
        method: "GET",
      });
      const responseData = await response.json();
      props.setSubscribed(responseData.success);
      props.setRemaining(responseData.remaining);
      localStorage.setItem("remaining", responseData.remaining);
      getSubscrption();
      toast.success("Done Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };
  const getBackups = async () => {
    try {
      const response = await fetch(`${apiUrl}/backups`, {
        method: "GET",
      });
      const responseData = await response.json();
      setBackups(
        responseData.file_names.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const refreshPrinters = () => {
    ipcRenderer.send("get-printers");
  };

  useEffect(() => {
    // getGeneral();
    // getSubscrption();
    refreshPrinters();
    ipcRenderer.on("send-printers", (e, r) => {
      setPrinters(r);
    });
    ipcRenderer.on("get-recovery", (e, name) => {
      const handleRecoveryButton = async () => {
        try {
          // toast.warn("Sorry, Recovery is not ready yet");
          setRecovering(true);
          const response = await fetch(`${apiUrl}/backups/${name}`, {
            method: "GET",
          });
          const responseData = await response.json();

          toast.success("Recovery Done Successfully");
          setRecovering(false);
        } catch (error) {
          console.log(error);
          toast.success("Recovery Failed");
          setRecovering(false);
        }
      };
      handleRecoveryButton();
    });
  }, []);
  const handleEditGeneral = () => {
    setSettingsPage("EditGeneral");
  };
  const handleBackupButton = async () => {
    try {
      setBackingup(true);
      const response = await fetch(`${apiUrl}/backup`, {
        method: "POST",
      });
      const responseData = await response.json();
      toast.success("Backup Done Successfully");
      getBackups();
      setBackingup(false);
    } catch (error) {
      console.log(error);
      toast.success("Backup Failed");
    }
  };
  const handleRecoveryButton = async (name) => {
    ipcRenderer.send("handle-recovery", name);
  };
  const handleHeaderChange = async (e) => {
    let data = new FormData(document.getElementById(`prescription-header`));
    try {
      const response = await fetch(`${apiUrl}/visits/prescription-header`, {
        method: "PATCH",
        // headers: { "Content-Type": "multipart/form-data" },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
      });
      const responseData = await response.json();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleFooterChange = async (e) => {
    let data = new FormData(document.getElementById(`prescription-footer`));
    try {
      const response = await fetch(`${apiUrl}/visits/prescription-footer`, {
        method: "PATCH",
        // headers: { "Content-Type": "multipart/form-data" },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
      });
      const responseData = await response.json();
    } catch (error) {
      console.log(error.message);
    }
  };
  const pageToReturn = () => {
    if (settingsPage == "GeneralPage") {
      return <GeneralPage edit={handleEditGeneral} data={general} />;
    } else if (settingsPage == "EditGeneral") {
      return (
        <EditGeneral
          data={general}
          handleGeneralPage={() => setSettingsPage("GeneralPage")}
          getGeneral={getGeneral}
        />
      );
    } else if (settingsPage == "SubscriptionPage") {
      return <SubscriptionPage subscription={subscription} renewal={renewal} />;
    } else if (settingsPage == "BackupPage") {
      checkInternetConnected(config)
        .then(async () => {
          console.log("Connection available");
          setInternet(true);
        })
        .catch((err) => {
          console.log("No connection", err.message);
          setInternet(false);
        });
      return (
        <BackupPage
          backups={backups}
          handleBackupButton={handleBackupButton}
          handleRecoveryButton={handleRecoveryButton}
          internet={internet}
          backingup={backingup}
          recovering={recovering}
          getBackups={getBackups}
          checkInternetConnected={checkInternetConnected}
          config={config}
          handleZippingFile={handleZippingFile}
          handleUnzippingFile={handleUnzippingFile}
        />
      );
    } else if (settingsPage == "ListsPage") {
      return <ListsPage />;
    } else if (settingsPage == "RxSettings") {
      return (
        <RxSettings
          specifications={props.specifications}
          setSpecifications={props.setSpecifications}
          handleHeaderChange={handleHeaderChange}
          handleFooterChange={handleFooterChange}
          refreshPrinters={refreshPrinters}
          printer={printer}
          handlePrinterChange={handlePrinterChange}
          printers={printers}
          marginTop={JSON.parse(fs.readFileSync(Settings, "utf8")).topMargin}
          bMarginD={JSON.parse(fs.readFileSync(Settings, "utf8")).bMarginDrug}
          pageSize={JSON.parse(fs.readFileSync(Settings, "utf8")).pageSize}
          paper={paper}
          handlePaperChange={handlePaperChange}
        />
      );
    } else if (settingsPage == "SpecificationsPage") {
      return (
        <SpecificationsPage
          specifications={props.specifications}
          setSpecifications={props.setSpecifications}
        />
      );
    } else if (settingsPage == "ConnectionsPage") {
      return <ConnectionsPage setSubscribed={props.setSubscribed} />;
    } else if (settingsPage == "AboutPage") {
      return <AboutPage />;
    } else if (settingsPage == "SupportPage") {
      return <SupportPage />;
    }
  };
  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.onHide();
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="my-modal"
    >
      <Modal.Header
        closeButton
        closeVariant="white"
        id="side-bar-settings"
        className="text-white"
      >
        <Modal.Title id="contained-modal-title-vcenter">Settings</Modal.Title>
      </Modal.Header>
      <AutoHeight
        style={{
          transition: "all 0.3s ease-out",
          overflow: "hidden",
        }}
      >
        <Modal.Body className="p-0">
          <div className="row m-0">
            <div
              className="width-sidebar-wide sidebar leftfixed p-0"
              id="side-bar-settings"
            >
              <nav className="nav">
                <div>
                  <div className="nav_list">
                    <a
                      href="#"
                      className={"nav_link mt-2"}
                      onClick={() => setSettingsPage("GeneralPage")}
                    >
                      <FontAwesomeIcon
                        icon="home"
                        className={"nav-icon"}
                        size="2x"
                      />
                      <span
                        className={`nav_name ${
                          settingsPage == "GeneralPage" ? "active" : ""
                        }`}
                        id="nav-text"
                      >
                        General
                      </span>
                    </a>
                    <a
                      href="#"
                      className={"nav_link "}
                      onClick={() => setSettingsPage("SubscriptionPage")}
                    >
                      <FontAwesomeIcon
                        icon="address-card"
                        className={"nav-icon "}
                        size="2x"
                      />
                      <span
                        className={`nav_name ${
                          settingsPage == "SubscriptionPage" ? "active" : ""
                        }`}
                        id="nav-text"
                      >
                        Subscription
                      </span>
                    </a>
                    <a
                      href="#"
                      className={"nav_link "}
                      onClick={() => setSettingsPage("ListsPage")}
                    >
                      <FontAwesomeIcon
                        icon="list"
                        className={"nav-icon "}
                        size="2x"
                      />
                      <span
                        className={`nav_name ${
                          settingsPage == "ListsPage" ? "active" : ""
                        }`}
                        id="nav-text"
                      >
                        Lists
                      </span>
                    </a>
                    <a
                      href="#"
                      className={"nav_link "}
                      onClick={() => setSettingsPage("RxSettings")}
                    >
                      <FontAwesomeIcon
                        icon="print"
                        className={"nav-icon "}
                        size="2x"
                      />

                      <span
                        className={`nav_name ${
                          settingsPage == "RxSettings" ? "active" : ""
                        }`}
                        id="nav-text"
                      >
                        Print Settings
                      </span>
                    </a>
                    <a
                      href="#"
                      className={"nav_link "}
                      onClick={() => setSettingsPage("SpecificationsPage")}
                    >
                      <div className="compare"></div>
                      <svg
                        height="0"
                        width="0"
                        style={{ position: "absolute" }}
                      >
                        <clipPath
                          id="compare-path"
                          clipPathUnits="objectBoundingBox"
                        >
                          <path
                            id="Path_106"
                            data-name="Path 106"
                            d="M0.473,0 C0.426,0.011,0.389,0.047,0.377,0.093 L0.374,0.107,0.3,0.107 C0.229,0.107,0.226,0.107,0.222,0.111 C0.219,0.114,0.219,0.117,0.219,0.193 C0.219,0.281,0.218,0.278,0.234,0.278 C0.25,0.278,0.25,0.28,0.25,0.204 L0.25,0.138,0.312,0.138 L0.374,0.138,0.377,0.151 C0.408,0.278,0.591,0.278,0.622,0.151 L0.625,0.138,0.687,0.138 L0.749,0.138,0.749,0.204 C0.749,0.28,0.749,0.278,0.765,0.278 C0.781,0.278,0.781,0.281,0.781,0.193 C0.781,0.117,0.781,0.114,0.777,0.111 C0.773,0.107,0.77,0.107,0.699,0.107 L0.625,0.107,0.622,0.093 C0.606,0.028,0.537,-0.015,0.473,0 M0.525,0.034 C0.591,0.052,0.614,0.135,0.566,0.185 C0.51,0.246,0.408,0.206,0.408,0.122 C0.408,0.06,0.465,0.017,0.525,0.034 M0.066,0.376 L0,0.442,0,0.715 C0,0.987,0,0.989,0.004,0.993 C0.008,0.997,0.01,0.997,0.234,0.997 C0.458,0.997,0.461,0.997,0.465,0.993 C0.471,0.987,0.471,0.32,0.465,0.314 C0.461,0.31,0.458,0.31,0.296,0.31 L0.132,0.31,0.066,0.376 M0.597,0.376 L0.531,0.442,0.531,0.715 C0.531,0.987,0.531,0.989,0.535,0.993 C0.539,0.997,0.541,0.997,0.765,0.997 C0.989,0.997,0.992,0.997,0.995,0.993 C1,0.987,1,0.32,0.995,0.314 C0.992,0.31,0.989,0.31,0.827,0.31 L0.663,0.31,0.597,0.376 M0.437,0.653 L0.437,0.966,0.234,0.966 L0.031,0.966,0.031,0.716 L0.031,0.466,0.09,0.466 C0.165,0.466,0.156,0.475,0.156,0.4 L0.156,0.341,0.297,0.341 L0.437,0.341,0.437,0.653 M0.968,0.653 L0.968,0.966,0.765,0.966 L0.562,0.966,0.562,0.716 L0.562,0.466,0.621,0.466 C0.696,0.466,0.687,0.475,0.687,0.4 L0.687,0.341,0.828,0.341 L0.968,0.341,0.968,0.653 M0.125,0.401 L0.125,0.435,0.09,0.435 L0.056,0.435,0.09,0.401 C0.109,0.382,0.124,0.366,0.124,0.366 C0.125,0.366,0.125,0.382,0.125,0.401 M0.656,0.401 L0.656,0.435,0.621,0.435 L0.587,0.435,0.621,0.401 C0.639,0.382,0.655,0.366,0.655,0.366 C0.656,0.366,0.656,0.382,0.656,0.401 M0.232,0.425 C0.226,0.431,0.226,0.431,0.226,0.452 L0.226,0.474,0.205,0.474 C0.184,0.474,0.184,0.474,0.178,0.48 L0.172,0.486,0.172,0.521 L0.172,0.555,0.178,0.561 C0.184,0.567,0.184,0.567,0.205,0.567 L0.226,0.567,0.226,0.589 C0.226,0.61,0.226,0.61,0.232,0.616 L0.238,0.622,0.273,0.622 L0.308,0.622,0.314,0.616 C0.32,0.61,0.32,0.61,0.32,0.589 L0.32,0.567,0.341,0.567 C0.363,0.567,0.363,0.567,0.369,0.561 L0.375,0.555,0.375,0.521 L0.375,0.486,0.369,0.48 C0.363,0.474,0.363,0.474,0.341,0.474 L0.32,0.474,0.32,0.452 C0.32,0.431,0.32,0.431,0.314,0.425 L0.308,0.419,0.273,0.419 L0.238,0.419,0.232,0.425 M0.763,0.425 C0.757,0.431,0.757,0.431,0.757,0.452 L0.757,0.474,0.736,0.474 C0.715,0.474,0.715,0.474,0.709,0.48 L0.703,0.486,0.703,0.521 L0.703,0.555,0.709,0.561 C0.715,0.567,0.715,0.567,0.736,0.567 L0.757,0.567,0.757,0.589 C0.757,0.61,0.757,0.61,0.763,0.616 L0.769,0.622,0.804,0.622 L0.839,0.622,0.845,0.616 C0.851,0.61,0.851,0.61,0.851,0.589 L0.851,0.567,0.872,0.567 C0.893,0.567,0.894,0.567,0.9,0.561 L0.906,0.555,0.906,0.521 L0.906,0.486,0.9,0.48 C0.894,0.474,0.893,0.474,0.872,0.474 L0.851,0.474,0.851,0.452 C0.851,0.431,0.851,0.431,0.845,0.425 L0.839,0.419,0.804,0.419 L0.769,0.419,0.763,0.425 M0.289,0.474 C0.289,0.495,0.289,0.498,0.293,0.501 C0.296,0.505,0.299,0.505,0.32,0.505 L0.344,0.505,0.344,0.521 L0.344,0.536,0.32,0.536 C0.289,0.536,0.289,0.536,0.289,0.567 L0.289,0.591,0.273,0.591 L0.258,0.591,0.258,0.567 C0.258,0.536,0.258,0.536,0.226,0.536 L0.203,0.536,0.203,0.521 L0.203,0.505,0.226,0.505 C0.247,0.505,0.25,0.505,0.254,0.501 C0.257,0.498,0.258,0.495,0.258,0.474 L0.258,0.45,0.273,0.45 L0.289,0.45,0.289,0.474 M0.82,0.474 C0.82,0.495,0.82,0.498,0.824,0.501 C0.827,0.505,0.83,0.505,0.851,0.505 L0.874,0.505,0.874,0.521 L0.874,0.536,0.851,0.536 C0.83,0.536,0.827,0.537,0.824,0.54 C0.82,0.544,0.82,0.547,0.82,0.567 L0.82,0.591,0.804,0.591 L0.788,0.591,0.788,0.567 C0.788,0.547,0.788,0.544,0.785,0.54 C0.781,0.537,0.778,0.536,0.757,0.536 L0.734,0.536,0.734,0.521 L0.734,0.505,0.757,0.505 C0.778,0.505,0.781,0.505,0.785,0.501 C0.788,0.498,0.788,0.495,0.788,0.474 L0.788,0.45,0.804,0.45 L0.82,0.45,0.82,0.474 M0.098,0.689 C0.095,0.691,0.094,0.695,0.094,0.7 C0.094,0.717,0.084,0.716,0.234,0.716 C0.385,0.716,0.375,0.717,0.375,0.7 C0.375,0.684,0.385,0.685,0.234,0.685 C0.104,0.685,0.101,0.685,0.098,0.689 M0.628,0.689 C0.626,0.691,0.625,0.695,0.625,0.7 C0.625,0.717,0.615,0.716,0.765,0.716 C0.916,0.716,0.906,0.717,0.906,0.7 C0.906,0.684,0.916,0.685,0.765,0.685 C0.635,0.685,0.632,0.685,0.628,0.689 M0.098,0.782 C0.095,0.785,0.094,0.789,0.094,0.794 C0.094,0.81,0.089,0.81,0.195,0.81 C0.302,0.81,0.297,0.81,0.297,0.794 C0.297,0.778,0.302,0.778,0.195,0.778 C0.104,0.778,0.101,0.778,0.098,0.782 M0.628,0.782 C0.626,0.785,0.625,0.789,0.625,0.794 C0.625,0.811,0.615,0.81,0.765,0.81 C0.916,0.81,0.906,0.811,0.906,0.794 C0.906,0.777,0.916,0.778,0.765,0.778 C0.635,0.778,0.632,0.778,0.628,0.782 M0.098,0.876 C0.095,0.879,0.094,0.883,0.094,0.888 C0.094,0.904,0.084,0.903,0.234,0.903 C0.385,0.903,0.375,0.904,0.375,0.888 C0.375,0.871,0.385,0.872,0.234,0.872 C0.104,0.872,0.101,0.872,0.098,0.876 M0.628,0.876 C0.626,0.879,0.625,0.883,0.625,0.888 C0.625,0.904,0.621,0.903,0.717,0.903 L0.801,0.903,0.806,0.899 C0.812,0.893,0.811,0.882,0.805,0.876 C0.799,0.87,0.635,0.87,0.628,0.876"
                          />
                        </clipPath>
                      </svg>

                      <span
                        className={`nav_name ${
                          settingsPage == "SpecificationsPage" ? "active" : ""
                        }`}
                        id="nav-text"
                      >
                        Visit
                      </span>
                    </a>
                    {/* <a
                      href="#"
                      className={"nav_link "}
                      onClick={() => setSettingsPage("ConnectionsPage")}
                    >
                      <FontAwesomeIcon
                        icon="exclamation-circle"
                        className={"nav-icon "}
                        size="2x"
                      />
                      <span
                        className={`nav_name ${
                          settingsPage == "ConnectionsPage" ? "active" : ""
                        }`}
                        id="nav-text"
                      >
                        Connections
                      </span>
                    </a> */}
                    <a
                      href="#"
                      className={"nav_link "}
                      onClick={() => setSettingsPage("AboutPage")}
                    >
                      <FontAwesomeIcon
                        icon="exclamation-circle"
                        className={"nav-icon "}
                        size="2x"
                      />
                      <span
                        className={`nav_name ${
                          settingsPage == "AboutPage" ? "active" : ""
                        }`}
                        id="nav-text"
                      >
                        About
                      </span>
                    </a>
                    <a
                      href="#"
                      className={"nav_link "}
                      onClick={() => setSettingsPage("SupportPage")}
                    >
                      <FontAwesomeIcon
                        icon="universal-access"
                        className={"nav-icon "}
                        size="2x"
                      />
                      <span
                        className={`nav_name ${
                          settingsPage == "SupportPage" ? "active" : ""
                        }`}
                        id="nav-text"
                      >
                        Support
                      </span>
                    </a>
                  </div>
                </div>
                <a
                  className="nav_link_bottom"
                  onClick={() => {
                    localStorage.removeItem("subscribed");
                    localStorage.removeItem("token");
                    ipcRenderer.send("logout");
                    props.setSubscribed(false);
                  }}
                >
                  <FontAwesomeIcon
                    icon="power-off"
                    className="nav-icon"
                    size="2x"
                  />
                  <span className="nav_name" id="nav-text">
                    Log out
                  </span>
                </a>
              </nav>
            </div>
            {pageToReturn()}
          </div>
        </Modal.Body>
      </AutoHeight>
    </Modal>
  );
}

export default SettingsModal;
