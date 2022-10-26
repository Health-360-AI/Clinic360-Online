import React, { useState, useEffect, Fragment } from "react";
import Loading from "../common/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import printJS from "print-js";
import ReactToPrint from "react-to-print";
import PrintRx from "./Forms/VisitComponents/PrintRx";
import { ipcRenderer } from "electron";

let fs = require("fs");
const apiUrl = process.env.API_URL;
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

function PatientOperations({
  handleEditOperationButton,
  setDataToChange,
  setDataToSend,
  patient,
  showBack,
  handlePatientButton,
}) {
  const [loading, setLoading] = useState(false);
  const [operations, setOperations] = useState([]);
  const [selectedOperation, setSelectedOperation] = useState({
    id: 0,
    surgery_id: null,
    surgery_name: "",
    assistant: "",
    anesthetist: "",
    anesthesia: "",
    summary: "",
    diagnosis_id: null,
    diagnosis_name: "",
    date: "",
    cost: "",
  });

  const [bgPhoto, setBgPhoto] = useState({});

  const getBgPhoto = async () => {
    try {
      const response = await fetch(`${apiUrl}/visits/prescription-header`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const responsePhoto = await response.blob();
      if (response.status != 200) {
        throw new Error();
      }
      setBgPhoto(
        URL.createObjectURL(new Blob([responsePhoto], { type: "image/jpeg" }))
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const [headerPhoto, setHeaderPhoto] = useState({});
  const getHeaderPhoto = async () => {
    try {
      const response = await fetch(`${apiUrl}/visits/prescription-header`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const responsePhoto = await response.blob();
      if (response.status != 200) {
        throw new Error();
      }
      setHeaderPhoto(new Blob([responsePhoto], { type: "image/jpeg" }));
    } catch (error) {
      console.log(error.message);
    }
  };
  const [footerPhoto, setFooterPhoto] = useState({});

  const getFooterPhoto = async () => {
    try {
      const response = await fetch(`${apiUrl}/visits/prescription-footer`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const responsePhoto = await response.blob();
      if (response.status != 200) {
        throw new Error();
      }
      setFooterPhoto(new Blob([responsePhoto], { type: "image/jpeg" }));
    } catch (error) {
      console.log(error.message);
    }
  };
  const [component1Ref, setComponent1Ref] = useState(null);
  const printTrigger = () => {
    return (
      <button className="col-2 ms-4 btn btn-primary rounded-pill" type="button">
        Print
      </button>
    );
  };
  const getOperation = async (operation) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/operations/${operation.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      setSelectedOperation(responseData.operation);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getOperations = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/operations`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const responseData = await response.json();
      setOperations(responseData.operations);
      if (responseData.operations.length != 0) {
        getOperation(responseData.operations[0]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getOperations();
    getBgPhoto();
    getHeaderPhoto();
    getFooterPhoto();
  }, []);

  const handleDeleteButton = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/operations/${selectedOperation.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const responseData = await response.json();
    } catch (error) {
      console.log(error.message);
    }
  };

  const pp = (target) => {
    return new Promise(() => {
      let data = target.contentWindow.document.documentElement.outerHTML;
      let blob = new Blob([data], { type: "text/html;charset=utf-8" });
      let url = URL.createObjectURL(blob);
      ipcRenderer.send("printComponent", url);
      // printJS({
      //   printable: "print-rx",
      //   type: "html",
      //   style: [
      //     `@page {
      //     size: ${JSON.parse(fs.readFileSync(Settings, "utf8")).pageSize};
      //     margin-top:0mm;
      //     margin-left: ${
      //       JSON.parse(fs.readFileSync(Settings, "utf8")).sideMargins
      //     }mm;
      //     margin-right: ${
      //       JSON.parse(fs.readFileSync(Settings, "utf8")).sideMargins
      //     }mm;
      //   } body {
      //     margin-top:${JSON.parse(fs.readFileSync(Settings, "utf8")).topMargin}mm;
      //   }`,
      //   ],

      //   targetStyles: ["*"],
      // });
    });
  };
  const editOperation = (e) => {
    e.preventDefault();
    console.log(selectedOperation);
    setDataToChange(selectedOperation);
    handleEditOperationButton();
  };
  return (
    <section className="main pt-5">
      <div className="row m-0 justify-content-center">
        {showBack && (
          <div className="col-2 back-button">
            <button className="btn btn-secondary" onClick={handlePatientButton}>
              <FontAwesomeIcon icon="arrow-left" size="2x" />
            </button>
          </div>
        )}
        <div style={{ display: "none" }}>
          <PrintRx
            scientific_drugs={[]}
            trade_drugs={[]}
            patient={patient}
            date={selectedOperation.date}
            diagnonis={""}
            note={selectedOperation.summary}
            refd={setComponent1Ref}
            bgPhoto={bgPhoto}
            headerPhoto={headerPhoto}
            footerPhoto={footerPhoto}
            showDx={false}
            tMargin={JSON.parse(fs.readFileSync(Settings, "utf8")).topMargin}
            sMargin={
              JSON.parse(fs.readFileSync(Settings, "utf8")).sideMargins + "mm"
            }
            width={
              JSON.parse(fs.readFileSync(Settings, "utf8")).pageSize == "A5"
                ? "146mm"
                : "208mm"
            }
            height={
              JSON.parse(fs.readFileSync(Settings, "utf8")).pageSize == "A5"
                ? "208mm"
                : "295mm"
            }
            method={
              JSON.parse(fs.readFileSync(Settings, "utf8")).printingMethod
            }
            fontSize={JSON.parse(fs.readFileSync(Settings, "utf8")).fontSize}
            bMarginDrug={
              JSON.parse(fs.readFileSync(Settings, "utf8")).bMarginDrug + "mm"
            }
          />
        </div>
        <div className="col-12 pe-2 ps-2 mt-4">
          <h2 className="ps-3">Operations of Patients</h2>
        </div>
        <div className="col-12 text-center">
          <h2> General Info. </h2>
        </div>
        <div className="col-12 text-center">
          <div className="row mt-3 text-center visit-general">
            <div className="col-2 offset-2">
              <p>Name: {patient.name}</p>
            </div>
            <div className="col-2">
              <p>Gender: {patient.gender}</p>
            </div>
            <div className="col-2">
              <p>Age: {patient.age}</p>
            </div>
            <div className="col-2">
              <p>Province: {patient.province}</p>
            </div>
            <div className="col-2"></div>
            <div className="col-2 offset-2">
              <p>Marital Status: {patient.marital_status}</p>
            </div>
            <div className="col-2">
              <p>Phone: {patient.phone_number}</p>
            </div>
            <div className="col-2">
              <p>Job: {patient.job}</p>
            </div>
            <div className="col-2">
              <p>Address: {patient.address}</p>
            </div>
          </div>
        </div>
        <div className="col-12 text-center">
          <div className="row ms-1 me-1 pt-2 justify-content-center">
            {loading == true ? (
              <Loading />
            ) : (
              operations.map((operation, index) => {
                return (
                  <div className="col-2" key={operation.id}>
                    {selectedOperation.id == operation.id ? (
                      <h6 className="visits-badge active">
                        {" "}
                        Operation {operation.surgery_name}:{" "}
                        {operation.date_operation}{" "}
                      </h6>
                    ) : (
                      <h6
                        className="visits-badge"
                        onClick={() => getOperation(operation)}
                      >
                        {" "}
                        Operation {operation.surgery_name}:{" "}
                        {operation.date_operation}{" "}
                      </h6>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="col-12 font-add">
          <div className="row">
            <div className="col-5">
              <div className="form-group row">
                <label
                  htmlFor="surgery"
                  className="col-6 col-form-label offset-6 text-start mb-2"
                >
                  Surgery
                </label>
                <div className="col-6 offset-6 font-normal">
                  <p>{selectedOperation.surgery_name}</p>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="disease"
                  className="col-6 col-form-label offset-6 text-start mt-2 mb-2"
                >
                  Disease
                </label>
                <div className="col-6 offset-6 font-normal">
                  <p>{selectedOperation.diagnosis_name}</p>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="anesthetist"
                  className="col-6 col-form-label offset-6 text-start mt-2 mb-2"
                >
                  Anesthetist
                </label>
                <div className="col-6 offset-6 font-normal">
                  <p>{selectedOperation.anesthetist}</p>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="anesthetist"
                  className="col-6 col-form-label offset-6 text-start mt-2 mb-2"
                >
                  Finished Date
                </label>
                <div className="col-6 offset-6 font-normal">
                  <p>{selectedOperation.finished_date}</p>
                </div>
              </div>
            </div>
            <div className="col-2"></div>

            <div className="col-5">
              <div className="form-group row">
                <label
                  htmlFor="anesthesia"
                  className="col-12 col-form-label text-start mb-2"
                >
                  Anesthesia
                </label>
                <div className="col-6 font-normal">
                  <p>{selectedOperation.anesthesia}</p>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="assistant"
                  className="col-12 col-form-label text-start mt-2 mb-2"
                >
                  Assistant
                </label>
                <div className="col-6 font-normal">
                  <p>{selectedOperation.assistant}</p>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="cost"
                  className="col-12 col-form-label text-start mt-2 mb-2"
                >
                  Cost
                </label>
                <div className="col-6 font-normal">
                  <p>{selectedOperation.cost}</p>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="place"
                  className="col-12 col-form-label text-start mt-2 mb-2"
                >
                  Place
                </label>
                <div className="col-6 font-normal">
                  <p>{selectedOperation.place_name}</p>
                </div>
              </div>
            </div>
            <div className="form-group row justify-content-center">
              <label
                htmlFor="summary"
                className="col-7 col-form-label text-center mt-2 mb-2"
              >
                Summary
              </label>
              <div className="col-7 ms-4 position-relative font-normal">
                <p style={{ whiteSpace: "break-spaces" }}>
                  {selectedOperation.summary}
                </p>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="row pb-5 mb-2">
              <div className="col-12">
                <div className="row justify-content-center">
                  <ReactToPrint
                    content={() => component1Ref}
                    documentTitle="First component"
                    trigger={printTrigger}
                    print={pp}
                  />
                  <button
                    className="col-2 ms-4 btn btn-secondary rounded-pill"
                    onClick={editOperation}
                  >
                    Edit Operation
                  </button>
                  <button
                    className="col-2 ms-4 btn btn-danger rounded-pill"
                    onClick={handleDeleteButton}
                  >
                    Delete Operation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PatientOperations;
