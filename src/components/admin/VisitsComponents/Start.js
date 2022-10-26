import React from "react";
import GyneComponent from "./GyneComponent";
import NutritionComponent from "./NutritionComponent";

let fs = require("fs");
const path = require("path");

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

function Start({ selectedVisit }) {
  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <div className="form-group row">
          <label
            htmlFor=""
            className="col-6 col-form-label offset-4 text-start mb-2 label-font-size"
          >
            Chief Complaint
          </label>
          <div className="col-6 offset-4">
            <p>{selectedVisit.chief_complaint_name}</p>
          </div>
          <label
            htmlFor="note"
            className="col-6 col-form-label offset-4 text-start mb-2 label-font-size mt-1"
          >
            Note
          </label>
          <div className="col-6 offset-4 position-relative">
            <p>{selectedVisit.chief_complaint_note}</p>
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="form-group row">
          <label
            htmlFor="trade_name"
            className="col-6 col-form-label offset-3 text-start mb-2 label-font-size"
          >
            History of Present illness
          </label>
          <div className="col-6 offset-3 position-relative">
            <p>{selectedVisit.hopi}</p>
          </div>
        </div>
      </div>
      {JSON.parse(fs.readFileSync(Settings, "utf8")).gynecological ? (
        <GyneComponent
          lmp={selectedVisit.lmp}
          edd={selectedVisit.edd}
          gestational_age={selectedVisit.gestational_age}
          gravidity={selectedVisit.gravidity}
          parity={selectedVisit.parity}
          abortion={selectedVisit.abortion}
          abortion_note={selectedVisit.abortion_note}
          last_ultrasound={selectedVisit.last_ultrasound}
          last_ultrasound_note={selectedVisit.last_ultrasound_note}
        />
      ) : (
        ""
      )}
      {JSON.parse(fs.readFileSync(Settings, "utf8")).nutrition ? (
        <NutritionComponent
          epigastric_radius={selectedVisit.epigastric_radius}
          umbilical_radius={selectedVisit.umbilical_radius}
          hypogastric_radius={selectedVisit.hypogastric_radius}
          pelvic_radius={selectedVisit.pelvic_radius}
          thigh_radius={selectedVisit.thigh_radius}
          metabolism={selectedVisit.metabolism}
          fats_percentage={selectedVisit.fats_percentage}
          muscles_percentage={selectedVisit.muscles_percentage}
          calories={selectedVisit.calories}
          body_age={selectedVisit.body_age}
          organic_fats={selectedVisit.organic_fats}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Start;
