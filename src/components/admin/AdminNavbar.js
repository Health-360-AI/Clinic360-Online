import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState, useEffect } from "react";
import AddModal from "../common/AddModal";
import SettingsModal from "./SettingsModal";
import Tippy from "@tippyjs/react";

import { OverlayTrigger, Tooltip } from "react-bootstrap";

function AdminNavbar(props) {
  const [addModalShow, setAddModalShow] = useState(false);
  const [settingsModalShow, setSettingsModalShow] = useState(false);
  // const history = useHistory();
  // const [activeTabs, setActiveTabs] = useState(name);
  // useEffect(() => {
  //   switch (activeTabs) {
  //     case "home":
  //       // history.push("/");
  //       handleMainButton();
  //       break;
  //     case "patients":
  //       // history.push("/patients");
  //       handlePatientsButton();
  //       break;
  //     case "pending":
  //       // history.push("/pending");
  //       break;
  //     case "add":
  //       // history.push("/add");
  //       break;
  //     case "user":
  //       // history.push("/user");
  //       break;
  //     case "settings":
  //       // history.push("/settings");
  //       break;
  //     default:
  //       // history.push("/");
  //       handleMainButton();
  //       break;
  //   }
  // }, [activeTabs]);
  // handleMainButton();
  // const RenderTooltip = (props) => (

  // );
  return (
    <div className="bottom-nav">
      <AddModal
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
        handleAddPatientButton={props.handleAddPatientButton}
        handleAddDrugButton={props.handleAddDrugButton}
        abortListening={props.abortListening}
      />
      <SettingsModal
        show={settingsModalShow}
        onHide={() => setSettingsModalShow(false)}
        setSubscribed={props.setSubscribed}
        specifications={props.specifications}
        setSpecifications={props.setSpecifications}
        setRemaining={props.setRemaining}
      />
      <div className="side-icons">
        <Tippy content={<span>Main</span>}>
          {/* <button>My button</button> */}
          {/* <OverlayTrigger
          placement="top"
          delay={{ show: 300, hide: 350 }}
          overlay={<Tooltip id={`tooltip-Main`}>Main</Tooltip>}
        > */}
          <div
            className="bn-tab ms-4"
            onClick={() => {
              props.abortListening();
              props.handleMainButton();
            }}
          >
            <a className="home ps-0">
              <svg width="23" height="23" viewBox="0 0 38.717 38.717">
                <path d="M0,33.877H38.717v4.84H0ZM0,16.939H38.717v12.1H0ZM16.939,0H38.717V12.1H16.939ZM0,0H12.1V12.1H0Z" />
              </svg>
            </a>
          </div>
        </Tippy>
        {/* </OverlayTrigger> */}
        {JSON.parse(localStorage.getItem("remaining")) >= 1 && (
          <>
            <Tippy content={<span>Patients</span>}>
              {/* <OverlayTrigger
              placement="top"
              delay={{ show: 300, hide: 350 }}
              overlay={<Tooltip id={`tooltip-Patients`}>Patients</Tooltip>}
            > */}
              <div
                className="bn-tab"
                onClick={() => {
                  props.abortListening();
                  props.handlePatientsButton();
                }}
              >
                <a className="patients">
                  <svg width="23" height="23" viewBox="0 0 36.818 44.232">
                    <g id="svgg" transform="translate(-33.071 0.25)">
                      <path
                        d="M48.517.2c-8.635,3.55-6.293,16.21,3,16.21,9.373,0,11.626-12.99,2.824-16.283A10.431,10.431,0,0,0,48.517.2M45.942,18.266c-2.383.561-5.141,3.345-9.306,9.393-4.917,7.141-4.739,12.9.483,15.553l1.33.675,14.843.047,14.843.047.639-.671c.973-1.023,1.13-1.818,1.114-5.638-.038-9.182-3.219-17.406-7.419-19.181-.83-.351-4.739-.575-4.739-.272,0,.252,1.2,4.967,2.136,8.4l.754,2.762.965.122c5.538.7,6.11,8.419.754,10.174l-1.242.407H42.452l-.891-.47a5.276,5.276,0,0,1-2.784-4.385c-.133-2.051.174-2.669,3.485-7,3.776-4.939,6.084-7.981,6.311-8.317.138-.205.468-.657.734-1a3.636,3.636,0,0,0,.482-.734,15.262,15.262,0,0,0-3.847.084m8.609,4.257c-.265.926-.826,2.849-1.249,4.273-2.45,8.267-2.408,9.982.284,11.417,1.053.562,7.714.48,8.89-.109a3.763,3.763,0,0,0,1.284-5.575c-.818-1.236-1.634-1.544-4.332-1.642-2.127-.077-2.216-.095-2.216-.451,0-.2-.427-2.411-.95-4.9s-.95-4.569-.95-4.613c0-.534-.379.264-.762,1.6"
                        transform="translate(0 0)"
                      />
                    </g>
                  </svg>
                </a>
              </div>
              {/* </OverlayTrigger> */}
            </Tippy>
            <Tippy content={<span>Pending Visits</span>}>
              {/* <OverlayTrigger
              placement="top"
              delay={{ show: 300, hide: 350 }}
              overlay={<Tooltip id={`tooltip-Pending`}>Pending Visits</Tooltip>}
            > */}
              <div
                className="bn-tab"
                onClick={() => {
                  props.abortListening();
                  props.handlePendingButton();
                }}
              >
                <a className="pending pe-0">
                  <svg width="23" height="23" viewBox="0 0 43.466 43.289">
                    <path
                      d="M26.024,10.381A21.868,21.868,0,0,0,12.88,44.465c2.685,3.754,4.713,4.826,6.355,3.359,1.3-1.161,1.105-2.287-.738-4.287a16.883,16.883,0,0,1,21.971-25.48l1.1.818-1.388,1.446c-2.588,2.7-2.344,2.931,4.877,4.685,8.314,2.021,8,2.318,6.016-5.66-1.806-7.271-2.23-7.737-4.738-5.2l-1.222,1.237-1.507-1.144a22.7,22.7,0,0,0-17.585-3.863m2.911,9.811-.745.665-.068,5.6c-.085,6.992-.41,6.283,4.225,9.229,4.6,2.923,5.778,3.133,6.775,1.206.884-1.709.351-2.5-3.148-4.69l-2.855-1.786-.07-4.778-.07-4.778-.745-.665a2.318,2.318,0,0,0-3.3,0M40.685,45.3c-2.771,2.038-.738,5.813,2.331,4.327,1.4-.677,1.936-1.419,1.936-2.67,0-2.216-2.3-3.108-4.267-1.658M23.6,47.9c-2.281.993-1.817,3.96.73,4.667,2.228.619,3.517-.231,3.517-2.317,0-1.829-2.4-3.155-4.247-2.35m9.084.614c-2.8.809-1.744,5,1.189,4.7,2.274-.235,3.322-1.282,3-3-.307-1.636-2.01-2.327-4.189-1.7"
                      transform="translate(-8.78 -9.941)"
                    />
                  </svg>
                </a>
              </div>
              {/* </OverlayTrigger> */}
            </Tippy>
            <Tippy content={<span>Pending Visits</span>}>
              {/* <OverlayTrigger
              placement="top"
              delay={{ show: 300, hide: 350 }}
              overlay={
                <Tooltip id={`tooltip-Appointments`}>Appointments</Tooltip>
              }
            > */}
              <div
                className="bn-tab me-3"
                onClick={() => {
                  props.abortListening();
                  props.handleAppointmentsButton();
                }}
              >
                <a className="drugs ps-0">
                  <FontAwesomeIcon
                    icon="calendar-alt"
                    style={{ width: "32px", height: "32px" }}
                  />
                </a>
              </div>
              {/* </OverlayTrigger> */}
            </Tippy>
            {/* <OverlayTrigger
              placement="top"
              delay={{ show: 300, hide: 350 }}
              overlay={<Tooltip id={`tooltip-Pending`}>Visits</Tooltip>}
            >
              <div
                className="bn-tab me-3"
                onClick={() => {
                  props.abortListening();
                  props.handleVisitsButton();
                }}
              >
                <a className="pending pe-0">
                  <svg
                    id="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    viewBox="0, 0, 400,400"
                  >
                    <g id="svgg">
                      <path
                        id="path0"
                        d="M176.000 5.206 C 111.147 22.558,88.775 107.040,136.417 154.677 C 179.331 197.585,253.224 185.885,279.629 132.000 C 313.972 61.914,251.184 -14.909,176.000 5.206 M211.600 44.400 C 213.028 45.828,214.000 52.711,214.000 61.400 L 214.000 76.000 227.618 76.000 C 246.114 76.000,248.389 77.940,247.613 93.056 L 247.000 105.000 231.500 105.584 L 216.000 106.168 216.000 119.702 C 216.000 138.106,214.045 140.388,198.944 139.613 L 187.000 139.000 186.419 122.500 L 185.838 106.000 169.989 106.000 C 151.952 106.000,150.000 104.461,150.000 90.245 C 150.000 79.340,155.028 76.000,171.445 76.000 L 184.000 76.000 184.000 63.445 C 184.000 46.357,187.193 42.000,199.713 42.000 C 204.931 42.000,210.280 43.080,211.600 44.400 M37.275 80.815 C -2.052 95.417,9.091 154.000,51.194 154.000 C 98.788 154.000,101.789 83.507,54.392 78.866 C 48.882 78.327,41.807 79.132,37.275 80.815 M335.310 80.917 C 319.952 86.393,312.000 98.669,312.000 116.902 C 312.000 162.242,376.193 168.484,386.199 124.116 C 392.717 95.216,363.876 70.732,335.310 80.917 M34.963 176.787 C 16.025 185.039,13.000 194.711,13.000 247.000 C 13.000 315.110,17.147 320.000,74.920 320.000 L 108.000 320.000 108.000 355.887 C 108.000 398.879,107.496 398.000,132.135 398.000 C 155.589 398.000,155.000 399.358,155.000 345.286 C 155.000 282.402,149.595 273.826,109.013 272.324 L 88.238 271.555 87.619 234.115 L 87.000 196.675 81.232 189.120 C 71.095 175.841,50.024 170.224,34.963 176.787 M331.607 177.969 C 327.541 180.178,321.691 185.291,318.607 189.330 L 313.000 196.675 312.379 234.338 L 311.758 272.000 295.379 272.011 C 251.544 272.041,244.000 283.289,244.000 348.616 C 244.000 397.655,244.166 398.000,267.700 398.000 C 292.529 398.000,292.000 398.916,292.000 355.887 L 292.000 320.000 325.080 320.000 C 366.251 320.000,379.935 314.190,385.501 294.346 C 389.208 281.127,387.217 201.367,383.000 194.212 C 372.272 176.007,348.847 168.603,331.607 177.969 M122.000 225.000 L 122.000 244.000 151.000 244.000 L 180.000 244.000 180.000 321.000 L 180.000 398.000 200.000 398.000 L 220.000 398.000 220.000 321.000 L 220.000 244.000 249.000 244.000 L 278.000 244.000 278.000 225.000 L 278.000 206.000 200.000 206.000 L 122.000 206.000 122.000 225.000 "
                      ></path>
                    </g>
                  </svg>
                </a>
              </div>
            </OverlayTrigger> */}
          </>
        )}
      </div>

      <div className="center-icon">
        {JSON.parse(localStorage.getItem("remaining")) >= 1 && (
          <Tippy content={<span>Add</span>}>
            {/* <OverlayTrigger
            placement="top"
            delay={{ show: 300, hide: 350 }}
            overlay={<Tooltip id={`tooltip-Add`}>Add</Tooltip>}
          > */}
            <div
              className="bn-tab"
              onClick={() => {
                props.abortListening();
                setAddModalShow(true);
              }}
            >
              <a>
                <svg
                  className="add"
                  width="40"
                  height="40"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" />
                </svg>
              </a>
            </div>
            {/* </OverlayTrigger> */}
          </Tippy>
        )}
      </div>

      <div className="side-icons">
        {/* <div className="bn-tab">
          <a className="user" onClick={props.handleUserButton}>
            <svg width="20" height="20" viewBox="0 0 38.717 38.717">
              <g
                id="Group_31"
                data-name="Group 31"
                transform="translate(-774.24 -842.439)"
              >
                <ellipse
                  id="Ellipse_3"
                  data-name="Ellipse 3"
                  className="cls-1"
                  cx="9.679"
                  cy="9.679"
                  rx="9.679"
                  ry="9.679"
                  transform="translate(783.919 842.439)"
                />
                <path
                  id="Path_6"
                  data-name="Path 6"
                  className="cls-1"
                  d="M19.358,10C8.711,10,0,14.356,0,19.679v4.84H38.717v-4.84C38.717,14.356,30.006,10,19.358,10Z"
                  transform="translate(774.24 856.637)"
                />
              </g>
            </svg>
          </a>
        </div> */}
        {JSON.parse(localStorage.getItem("remaining")) >= 1 && (
          <Tippy content={<span>Operations</span>}>
            {/* <OverlayTrigger
            placement="top"
            delay={{ show: 300, hide: 350 }}
            overlay={<Tooltip id={`tooltip-Operations`}>Operations</Tooltip>}
          > */}
            <div
              className="bn-tab ms-4"
              onClick={() => {
                props.abortListening();
                props.setShowPending(false);
                props.handleOperationsButton();
              }}
            >
              <a className="drugs ps-0">
                <svg
                  id="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="45"
                  height="45"
                  viewBox="0, 0, 400,400"
                >
                  <g id="svgg">
                    <path
                      id="path0"
                      d="M359.479 82.474 C 357.003 83.192,349.968 87.369,306.800 113.756 C 255.648 145.022,228.010 161.932,175.843 193.879 C 148.009 210.924,148.026 210.416,175.101 217.187 C 195.242 222.224,194.019 222.189,192.431 217.689 C 188.380 206.207,191.829 195.532,201.296 190.249 C 206.591 187.294,231.459 184.032,264.800 181.919 C 274.830 181.284,270.588 183.329,303.200 163.403 C 317.940 154.397,340.416 140.677,353.147 132.915 C 382.217 115.188,385.797 111.763,386.952 100.572 C 388.333 87.187,374.552 78.108,359.479 82.474 M246.800 87.195 C 211.254 88.696,175.458 92.957,168.603 96.502 C 160.921 100.474,139.407 144.697,125.646 184.800 C 119.907 201.525,136.913 214.550,153.672 206.265 C 167.455 199.452,192.388 166.495,200.822 143.940 C 202.204 140.247,202.922 139.229,203.888 139.600 C 204.581 139.866,214.880 140.282,226.774 140.525 L 248.400 140.966 266.400 129.852 C 276.300 123.739,291.510 114.432,300.200 109.169 C 308.890 103.906,315.891 99.240,315.759 98.800 C 315.313 97.320,300.456 90.431,294.381 88.888 C 286.829 86.968,268.007 86.299,246.800 87.195 M337.597 151.818 C 326.379 158.319,316.077 164.309,314.705 165.130 C 313.333 165.950,311.636 167.922,310.934 169.513 C 304.971 183.030,298.655 185.889,270.000 188.039 C 202.305 193.119,196.478 194.879,197.835 209.842 C 200.574 240.053,249.125 254.271,295.121 238.334 C 303.150 235.552,304.215 235.504,310.013 237.674 C 321.079 241.814,337.505 256.201,346.800 269.896 C 358.059 286.483,371.329 296.437,384.606 298.252 L 389.600 298.935 389.582 228.868 L 389.563 158.800 374.293 149.600 C 365.894 144.540,358.791 140.310,358.508 140.199 C 358.225 140.088,348.815 145.317,337.597 151.818 M120.298 234.955 C 91.544 252.588,48.382 279.000,29.198 290.700 C 16.323 298.552,12.376 302.490,10.562 309.292 C 9.821 312.070,23.695 317.886,33.277 318.814 C 49.615 320.397,61.900 316.281,81.967 302.499 C 90.785 296.443,103.997 287.422,111.326 282.454 C 123.443 274.239,124.771 273.106,125.971 269.964 C 127.355 266.341,135.198 261.146,165.200 243.980 C 182.442 234.114,183.483 233.422,182.174 232.689 C 181.505 232.315,176.873 230.535,171.879 228.733 C 166.886 226.931,158.974 224.075,154.298 222.387 L 145.796 219.318 120.298 234.955 M192.330 236.787 C 174.772 246.159,161.194 254.247,160.946 255.481 C 160.807 256.177,161.858 259.189,163.283 262.173 C 176.758 290.411,204.691 279.021,206.870 244.400 L 207.323 237.200 204.191 234.664 L 201.060 232.128 192.330 236.787 M214.574 247.000 C 213.639 249.090,212.634 252.400,212.340 254.356 C 211.617 259.177,209.344 265.586,206.847 269.847 L 204.782 273.372 206.399 278.607 C 215.371 307.657,242.794 293.966,244.594 259.538 L 245.016 251.476 235.908 249.311 C 230.899 248.120,224.640 246.260,222.000 245.177 C 215.957 242.698,216.565 242.548,214.574 247.000 "
                    ></path>
                  </g>
                </svg>
              </a>
            </div>
            {/* </OverlayTrigger> */}
          </Tippy>
        )}
        <Tippy content={<span>Drugs</span>}>
          {/* <OverlayTrigger
          placement="top"
          delay={{ show: 300, hide: 350 }}
          overlay={<Tooltip id={`tooltip-Drugs`}>Drugs</Tooltip>}
        > */}
          <div
            className="bn-tab ms-4"
            onClick={() => {
              props.abortListening();
              props.handleDrugsButton();
            }}
          >
            <a className="drugs ps-0">
              <FontAwesomeIcon
                icon="pills"
                style={{ width: "32px", height: "32px" }}
              />
            </a>
          </div>
          {/* </OverlayTrigger> */}
        </Tippy>
        <Tippy content={<span>Finance</span>}>
          {/* <OverlayTrigger
          placement="top"
          delay={{ show: 300, hide: 350 }}
          overlay={<Tooltip id={`tooltip-Finance`}>Finance</Tooltip>}
        > */}
          <div
            className="bn-tab ms-2"
            onClick={() => {
              props.abortListening();
              props.handleFinanceButton();
            }}
          >
            <a className="finance ps-0">
              <FontAwesomeIcon
                icon="file-invoice-dollar"
                style={{ width: "30px", height: "30px" }}
              />
            </a>
          </div>
          {/* </OverlayTrigger> */}
        </Tippy>
        <Tippy content={<span>Settings</span>}>
          {/* <OverlayTrigger
          placement="top"
          delay={{ show: 300, hide: 350 }}
          overlay={<Tooltip id={`tooltip-Settings`}>Settings</Tooltip>}
        > */}
          <div
            className="bn-tab me-3"
            onClick={() => setSettingsModalShow(true)}
          >
            <a className="settings pe-0">
              <svg width="23" height="23" viewBox="0 0 36.781 38.717">
                <path
                  id="Path_104"
                  data-name="Path 104"
                  className="cls-1"
                  d="M278.149,24.2a4.84,4.84,0,1,0-4.84-4.84A4.854,4.854,0,0,0,278.149,24.2ZM268.227,8.711a13.647,13.647,0,0,1,5.807-3.146L275.971,0h4.84l1.936,5.566a16.9,16.9,0,0,1,5.808,3.146l5.807-1.21,2.42,4.356-3.872,4.356a13.8,13.8,0,0,1,.242,3.146c0,.968-.242,2.178-.242,3.146l3.872,4.356-2.42,4.356-5.807-1.21a13.647,13.647,0,0,1-5.808,3.146l-1.936,5.566h-4.84l-1.936-5.566a16.9,16.9,0,0,1-5.807-3.146l-5.808,1.21L260,26.86l3.872-4.356a13.8,13.8,0,0,1-.242-3.146c0-.968.242-2.178.242-3.146L260,11.857,262.42,7.5Z"
                  transform="translate(-260)"
                />
              </svg>
            </a>
          </div>
          {/* </OverlayTrigger> */}
        </Tippy>
      </div>
      <svg height="0" width="0" style={{ position: "absolute" }}>
        <clipPath id="bottomNavbar-path" clipPathUnits="objectBoundingBox">
          <path
            id="Path_105"
            data-name="Path 105"
            d="M1,0.874 V1 H0 V0.874 A0.122,0.874,0,0,1,0.122,0 H0.878 A0.122,0.874,0,0,1,1,0.874"
          />
        </clipPath>
      </svg>
    </div>
  );
}

export default AdminNavbar;
