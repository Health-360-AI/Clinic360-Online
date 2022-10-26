import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";

function AboutPage() {
  const [version, setVersion] = useState("Check First");
  useEffect(() => {
    ipcRenderer.on("get-latest-version", (e, info) => {
      setVersion(info);
    });
  });
  return (
    <div
      className={"width-others-wide ms-auto main-view pt-2 fadeIn"}
      id="main-view"
    >
      Clinic360 is a trademark of Health-360 inc. The first smart clinic
      management system in Iraq powered with Artificial Intelligence (AI) for
      Healthcare.
      <br />
      Made by Doctors For Doctors.
      <br />
      App Version: {process.env.REACT_APP_VERSION}
      <div className="col-4 offset-4 mb-2 mt-4">
        <button
          className="btn btn-success text-white w-100"
          onClick={() => ipcRenderer.send("check-for-updates")}
        >
          Check for Updates
        </button>
      </div>
      Latest Version: {version}
      <br />
      {version != "Check First"
        ? version != process.env.REACT_APP_VERSION &&
          "Please Wait until update is complete downloading"
        : ""}
    </div>
  );
}

export default AboutPage;
