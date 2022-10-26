import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Sides(props) {
  console.log(props);
  return (
    <>
      {props.pageToView == "Prescription" ? (
        ""
      ) : (
        <div className="row">
          <button
            className="btn btn-secondary col-1 pause-side"
            onClick={() => {
              props.abortListening();
              props.handleRightSideRequest();
              props.handlePauseVisit();
            }}
          >
            <FontAwesomeIcon icon="pause-circle" className="pt-3" size="5x" />
            <p>Pause Visit</p>
          </button>
          {props.showPreviousVisitsButton && (
            <button
              className="btn btn-success col-1 old-visits-bottom"
              onClick={() => {
                props.setShowPatientVisitsModal();
              }}
            >
              <p className="mb-0">Previous Visits</p>
            </button>
          )}
          <button
            className="btn btn-primary col-1 patient-info-bottom"
            onClick={() => {
              props.setShowPatientInfoModal();
            }}
          >
            <p className="mb-0">Patient Info</p>
          </button>
          {/* <button
            className="btn btn-primary col-1 visit-report-bottom"
            onClick={() => {
              props.handleVisitReport();
            }}
          >
            <p className="mb-0">Whole Visit Report</p>
          </button> */}
        </div>
      )}
      {props.pageToView == "Start" ? (
        ""
      ) : (
        <div
          className="row left-side-box"
          onClick={() => {
            props.abortListening();
            props.handleRightSideRequest();
            props.handleLeftSideButton();
          }}
        >
          <div className="col-3">
            <FontAwesomeIcon
              icon="angle-left"
              color="#008DFF"
              size="2x"
              className="angle-left-icon"
            />
          </div>
          <div className="col-9 text-center pt-3 pe-4">
            <p>{props.leftSideText}</p>
          </div>
        </div>
      )}

      {props.pageToView == "Prescription" ? (
        ""
      ) : (
        <>
          <button
            className="row right-side-box"
            onClick={() => {
              props.abortListening();
              props.handleRightSideButton();
              props.handleRightSideRequest();
            }}
          >
            <div className="col-9 text-center pt-3">
              <p>{props.rightSideText}</p>
            </div>
            <div className="col-3">
              <FontAwesomeIcon
                icon="angle-right"
                color="#008DFF"
                size="2x"
                className="angle-right-icon"
              />
            </div>
          </button>
          {props.pageToView == "Summery_Report" ? (
            ""
          ) : (
            <button
              className="btn btn-block btn-secondary prescription-side"
              onClick={() => {
                props.abortListening();
                props.handleRightSideRequest();
                props.handlePrescriptionButton();
              }}
            >
              Go to Prescription
            </button>
          )}
        </>
      )}
    </>
  );
}

export default Sides;
