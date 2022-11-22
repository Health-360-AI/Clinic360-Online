import { ipcRenderer } from "electron";
import React, { useState, useEffect } from "react";

let fs = require("fs");
const path = require("path");

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

function SpecificationsPage({ specifications, setSpecifications }) {
  const [nutrition, setNutrition] = useState(
    JSON.parse(fs.readFileSync(Settings, "utf8")).nutrition
  );
  const [reportOnStart, setReportOnStart] = useState(
    JSON.parse(fs.readFileSync(Settings, "utf8")).reportOnStart
  );
  const [gynecological, setGynecological] = useState(
    JSON.parse(fs.readFileSync(Settings, "utf8")).gynecological
  );
  const [scanType, setScanType] = useState(
    JSON.parse(fs.readFileSync(Settings, "utf8")).scanType
  );
  const [opthalmology, setOpthalmology] = useState(
    JSON.parse(fs.readFileSync(Settings, "utf8")).opthalmology
  );
  const [bmiTracker, setBMITracker] = useState(
    JSON.parse(fs.readFileSync(Settings, "utf8")).bmiTracker
  );
  const [bert, setBert] = useState(
    JSON.parse(fs.readFileSync(Settings, "utf8")).bert
  );
  useEffect(() => {
    let sBert = () => {
      setBert(1);
    };
    ipcRenderer.on("change-bert", sBert);
    return () => ipcRenderer.off("change-bert", sBert);
  }, []);
  const handleNutritionChange = (e) => {
    let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
    content.nutrition = e.target.checked == true ? 1 : 0;
    //write file
    fs.writeFileSync(Settings, JSON.stringify(content));
    setNutrition(e.target.checked == true ? 1 : 0);
  };
  const handleReportOnStartChange = (e) => {
    let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
    content.reportOnStart = e.target.checked == true ? 1 : 0;
    //write file
    fs.writeFileSync(Settings, JSON.stringify(content));
    setReportOnStart(e.target.checked == true ? 1 : 0);
  };
  const handleGynecologicalChange = (e) => {
    let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
    content.gynecological = e.target.checked == true ? 1 : 0;
    //write file
    fs.writeFileSync(Settings, JSON.stringify(content));
    setGynecological(e.target.checked == true ? 1 : 0);
  };
  const handleScanTypeChange = (e) => {
    let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
    content.scanType = e.target.checked == true ? 1 : 0;
    //write file
    fs.writeFileSync(Settings, JSON.stringify(content));
    setScanType(e.target.checked == true ? 1 : 0);
  };
  const handleOpthalmologyChange = (e) => {
    let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
    content.opthalmology = e.target.checked == true ? 1 : 0;
    //write file
    fs.writeFileSync(Settings, JSON.stringify(content));
    setOpthalmology(e.target.checked == true ? 1 : 0);
  };
  const handleBMITrackerChange = (e) => {
    let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
    content.bmiTracker = e.target.checked == true ? 1 : 0;
    //write file
    fs.writeFileSync(Settings, JSON.stringify(content));
    setBMITracker(e.target.checked == true ? 1 : 0);
  };
  const handleRemoveBertButton = () => {
    let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
    content.bert = 0;
    //write file
    fs.writeFileSync(Settings, JSON.stringify(content));
    setBert(0);
  };
  return (
    <div
      className={"width-others-wide ms-auto main-view pt-3 fadeIn mb-3"}
      id="main-view"
    >
      <div className="row m-0 p-4">
        <div className="col-1 pe-0">
          <input
            id="nutrition"
            className="form-check-input"
            type="checkbox"
            checked={nutrition == 1 ? true : false}
            onChange={handleNutritionChange}
          />
        </div>
        <label
          className="form-check-label col-form-label pt-0 col-2 ps-0"
          htmlFor="nutrition"
        >
          Nutrition
        </label>
      </div>
      <div className="row m-0 p-4">
        <div className="col-1 pe-0">
          <input
            id="reportOnStart"
            className="form-check-input"
            type="checkbox"
            checked={reportOnStart == 1 ? true : false}
            onChange={handleReportOnStartChange}
          />
        </div>
        <label
          className="form-check-label col-form-label pt-0 col-5 ps-0"
          htmlFor="reportOnStart"
        >
          Report on Start of Visit
        </label>
      </div>
      <div className="row m-0 p-4">
        <div className="col-1 pe-0">
          <input
            id="gynecological"
            className="form-check-input"
            type="checkbox"
            checked={gynecological == 1 ? true : false}
            onChange={handleGynecologicalChange}
          />
        </div>
        <label
          className="form-check-label col-form-label pt-0 col-5 ps-0"
          htmlFor="gynecological"
        >
          Gynecological
        </label>
      </div>
      <div className="row m-0 p-4">
        <div className="col-1 pe-0">
          <input
            id="scanType"
            className="form-check-input"
            type="checkbox"
            checked={scanType == 1 ? true : false}
            onChange={handleScanTypeChange}
          />
        </div>
        <label
          className="form-check-label col-form-label pt-0 col-5 ps-0"
          htmlFor="scanType"
        >
          Scan As PDF
        </label>
      </div>
      <div className="row m-0 p-4">
        <div className="col-1 pe-0">
          <input
            id="opthalmology"
            className="form-check-input"
            type="checkbox"
            checked={opthalmology == 1 ? true : false}
            onChange={handleOpthalmologyChange}
          />
        </div>
        <label
          className="form-check-label col-form-label pt-0 col-5 ps-0"
          htmlFor="scanType"
        >
          Opthalmology
        </label>
      </div>
      <div className="row m-0 p-4">
        <div className="col-1 pe-0">
          <input
            id="bmiTracker"
            className="form-check-input"
            type="checkbox"
            checked={bmiTracker == 1 ? true : false}
            onChange={handleBMITrackerChange}
          />
        </div>
        <label
          className="form-check-label col-form-label pt-0 col-5 ps-0"
          htmlFor="scanType"
        >
          BMI Tracker
        </label>
      </div>
      {/* {bert ? (
        <div className="row m-0 p-4">
          <button
            className="m-3 btn btn-danger"
            onClick={handleRemoveBertButton}
          >
            Remove Next Word Predictor
          </button>
        </div>
      ) : (
        <div className="row m-0 p-4">
          <button
            className="m-3 btn btn-primary"
            onClick={() => ipcRenderer.send("download-next-word")}
          >
            Add AI Next Word Predictor
          </button>
        </div>
      )} */}
    </div>
  );
}

export default SpecificationsPage;
