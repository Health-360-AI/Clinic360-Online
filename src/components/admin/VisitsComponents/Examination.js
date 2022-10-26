import React from "react";
import VisitViewItem from "./VisitViewItem";

function Examination({ selectedVisit }) {
  return (
    <div className="row justify-content-center p-0 m-0">
      <div className="col-12 text-center mb-2">
        <h2 className="visit-header">Examination</h2>
      </div>
      {(selectedVisit.hr ||
        selectedVisit.rr ||
        selectedVisit.sbp ||
        selectedVisit.dbp ||
        selectedVisit.temp ||
        selectedVisit.spo2) && (
        <>
          <div className="col-12 text-center mb-2">
            <h4 className="visit-header">Vital Signs</h4>
          </div>
          <div className="col-12 mb-4">
            <div className="row justify-content-center">
              <div className="col-1">
                <div className="form-group row">
                  <label
                    htmlFor="hr"
                    className="col-8 col-form-label text-start mt-2 mb-2"
                  >
                    HR
                  </label>
                  <div className="col-10">
                    <p>{selectedVisit.hr}</p>
                  </div>
                </div>
              </div>

              <div className="col-1">
                <div className="form-group row">
                  <label
                    htmlFor="sbp"
                    className="col-8 col-form-label text-start mt-2 mb-2"
                  >
                    SBP
                  </label>
                  <div className="col-10">
                    <p>{selectedVisit.sbp}</p>
                  </div>
                </div>
              </div>

              <div className="col-1">
                <div className="form-group row">
                  <label
                    htmlFor="dbp"
                    className="col-8 col-form-label text-start mt-2 mb-2"
                  >
                    DBP
                  </label>
                  <div className="col-10">
                    <p>{selectedVisit.dbp}</p>
                  </div>
                </div>
              </div>

              <div className="col-1">
                <div className="form-group row">
                  <label
                    htmlFor="rr"
                    className="col-8 col-form-label text-start mt-2 mb-2"
                  >
                    RR
                  </label>
                  <div className="col-10">
                    <p>{selectedVisit.rr}</p>
                  </div>
                </div>
              </div>

              <div className="col-1">
                <div className="form-group row">
                  <label
                    htmlFor="temp"
                    className="col-8 col-form-label text-start mt-2 mb-2"
                  >
                    Temp.
                  </label>
                  <div className="col-10">
                    <p>{selectedVisit.temp}</p>
                  </div>
                </div>
              </div>

              <div className="col-1">
                <div className="form-group row">
                  <label
                    htmlFor="height"
                    className="col-8 col-form-label text-start mt-2 mb-2"
                  >
                    SPO<sub>2</sub>
                  </label>
                  <div className="col-10">
                    <p>{selectedVisit.spo2}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {((selectedVisit.positive_signs &&
        !!selectedVisit.positive_signs.length) ||
        (selectedVisit.relative_negatives &&
          !!selectedVisit.relative_negatives.length)) && (
        <div className="col-12 text-center mb-2">
          <div className="row">
            <div className="col-6">
              <div className="row">
                <h4 className="col-12 visit-header mb-4">Positive Signs</h4>
              </div>
              {selectedVisit.positive_signs.map((item, index) => {
                return (
                  <VisitViewItem
                    divToShow="Related"
                    index={index}
                    tag={item.sign_name}
                    key={item.sign_id}
                    id={item.sign_id}
                    system={item.system_name}
                  />
                );
              })}
            </div>
            <div className="col-6">
              <div className="row">
                <h4 className="col-12 visit-header mb-4">Relative Negatives</h4>
              </div>
              {selectedVisit.relative_negatives.map((item, index) => {
                return (
                  <VisitViewItem
                    divToShow="Related"
                    index={index}
                    tag={item.sign_name}
                    key={item.sign_id}
                    id={item.sign_id}
                    system={item.system_name}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Examination;
