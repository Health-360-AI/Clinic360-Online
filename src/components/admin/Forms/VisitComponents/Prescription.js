import React, { useEffect, useState } from "react";
import TagBadge from "../../../common/TagBadge";
import printJS from "print-js";
import PrintRx from "./PrintRx";
import CreatableSelect from "react-select/creatable";
import DrugsInteractionModal from "./DrugsInteractionModal";
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from "react-select/async-creatable";
import ReactToPrint from "react-to-print";
import AddOperationModal from "../../../common/AddOperationModal";
import { ipcRenderer } from "electron";
import PharmaciesModal from "./PharmaciesModal";

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
const apiUrl = process.env.API_URL;
function Prescription({
  toLocalISOString,
  scientific_drugs,
  trade_drugs,
  types,
  times,
  selected_trade_drugs,
  selected_scientific_drugs,
  note,
  handleEndVisit,
  handlePauseVisit,
  handleDxChange,
  patient,
  diseases,
  diagnosis_id,
  handleTradeDrugChange,
  handleTradeDrugTimesChange,
  handleTradeDrugPeriodChange,
  handleTradeDrugRemoval,
  handleScientificDrugChange,
  handleScientificDrugDoseChange,
  handleScientificDrugTypeChange,
  handleScientificDrugTimesChange,
  handleScientificDrugPeriodChange,
  handleScientificDrugRemoval,
  handleNoteChange,
  handlePrescriptionDataSend,
  getDiseases,
  getScientificDrugs,
  getTradeDrugs,

  loadingSpeechRecognition,
  startListening,
  SpeechRecognition,
  listening,
  transcript,
  resetTranscript,
  handleSendToPharmacy,
  dataToSend,
  socketGateway,
}) {
  const [date, setDate] = useState(toLocalISOString(new Date()).slice(0, 10));
  const [interactionData, setInteractionData] = useState({
    show: false,
    loading: false,
    multiInteractions: [],
  });
  const [operationModal, setOperationModal] = useState({
    show: false,
  });
  const [pharmaciesModal, setPharmaciesModal] = useState({
    show: false,
    rx: {},
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

  useEffect(() => {
    getBgPhoto();
    getHeaderPhoto();
    getFooterPhoto();
  }, []);

  const [showDx, setShowDx] = useState(false);
  console.log(selected_scientific_drugs);
  console.log(selected_trade_drugs);
  const handleInteractionButton = async (e) => {
    e.preventDefault();
    try {
      let ids = [];
      for (let i = 0; i < selected_scientific_drugs.length; i++) {
        ids.push(selected_scientific_drugs[i].drug_id);
      }

      for (let i = 0; i < selected_trade_drugs.length; i++) {
        if (selected_trade_drugs[i].scientific_id) {
          ids.push(selected_trade_drugs[i].scientific_id);
        }
      }
      const response = await fetch(`${apiUrl}/multi_drug_interaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ids,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        setInteractionData({
          show: true,
          loading: false,
          result: true,
          ...responseData,
        });
      } else {
        setInteractionData({
          ...interactionData,
          show: true,
          loading: false,
          result: false,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [component1Ref, setComponent1Ref] = useState(null);
  const printTrigger = () => {
    return (
      <button className="col-2 ms-4 add-button-in-visit" type="button">
        Print
      </button>
    );
  };
  const printRX = (target) => {
    return new Promise(() => {
      let data = target.contentWindow.document.documentElement.outerHTML;
      console.log(data);
      let blob = new Blob([data], { type: "text/html;charset=utf-8" });
      let url = URL.createObjectURL(blob);
      ipcRenderer.send(
        "printComponent",
        url,
        JSON.parse(fs.readFileSync(Settings, "utf8")).pageSize
      );
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
  return (
    <>
      <div style={{ display: "none" }}>
        <PrintRx
          scientific_drugs={selected_scientific_drugs}
          trade_drugs={selected_trade_drugs}
          patient={patient}
          date={date}
          diagnonis={
            diseases.filter((disease) => disease.id == diagnosis_id).length !=
              0 &&
            diseases.filter((disease) => disease.id == diagnosis_id)[0].name
          }
          note={note}
          bgPhoto={bgPhoto}
          headerPhoto={headerPhoto}
          footerPhoto={footerPhoto}
          showDx={showDx}
          refd={setComponent1Ref}
          tMargin={
            JSON.parse(fs.readFileSync(Settings, "utf8")).pageSize == "A5"
              ? JSON.parse(fs.readFileSync(Settings, "utf8")).topMargin
              : JSON.parse(fs.readFileSync(Settings, "utf8")).A4TopMargin
          }
          leftMargin={
            JSON.parse(fs.readFileSync(Settings, "utf8")).leftMargin + "mm"
          }
          rightMargin={
            JSON.parse(fs.readFileSync(Settings, "utf8")).rightMargin + "mm"
          }
          width={
            JSON.parse(fs.readFileSync(Settings, "utf8")).pageSize == "A5"
              ? "146mm"
              : "208mm"
          }
          landscape={JSON.parse(fs.readFileSync(Settings, "utf8")).landscape}
          height={
            JSON.parse(fs.readFileSync(Settings, "utf8")).pageSize == "A5"
              ? "208mm"
              : "295mm"
          }
          method={JSON.parse(fs.readFileSync(Settings, "utf8")).printingMethod}
          fontSize={JSON.parse(fs.readFileSync(Settings, "utf8")).fontSize}
          bMarginDrug={
            JSON.parse(fs.readFileSync(Settings, "utf8")).bMarginDrug + "mm"
          }
          rx={true}
        />
      </div>
      <div className="row justify-content-center p-0 m-0">
        <DrugsInteractionModal
          show={interactionData.show}
          onHide={() => setInteractionData({ ...interactionData, show: false })}
          interactionData={interactionData}
        />
        <AddOperationModal
          show={operationModal.show}
          onHide={() => setOperationModal({ ...operationModal, show: false })}
          patient={patient}
          transcript={transcript}
          listening={listening}
          resetTranscript={resetTranscript}
          loadingSpeechRecognition={loadingSpeechRecognition}
          startListening={startListening}
          SpeechRecognition={SpeechRecognition}
          page={() => setOperationModal({ ...operationModal, show: false })}
        />
        <PharmaciesModal
          show={pharmaciesModal.show}
          onHide={() => setPharmaciesModal({ ...pharmaciesModal, show: false })}
          dataToSend={dataToSend}
          patient={patient}
          socketGateway={socketGateway}
        />
        <div className="col-12 text-center mb-2">
          <h2 className="visit-header">Prescription</h2>
        </div>
        <div className="col-12 mb-4">
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6 p-0">
              <div
                className="row justify-content-center text-end mb-2 visit-general"
                // dir="rtl"
              >
                <div className="col-3 offset-1">
                  <p>التاريخ: {date}</p>
                </div>
                <div className="col-3 offset-3">
                  <p>الاسم: {patient.name}</p>
                </div>
                <div className="col-3"></div>
                <div className="col-3 offset-3">
                  <p>العمر: {patient.age}</p>
                </div>
              </div>
              <div className="row mb-2 text-start visit-general">
                <label
                  htmlFor="dx"
                  className="col-2 offset-1 col-form-label text-center"
                >
                  Dx:
                </label>
                <div className="col-6 ps-0 pe-4">
                  <AsyncCreatableSelect
                    inputId="dx"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    isClearable={true}
                    onChange={handleDxChange}
                    getOptionLabel={(option) =>
                      option.__isNew__ ? option.label : option.name
                    }
                    getOptionValue={(option) =>
                      option.__isNew__ ? option.value : option.id
                    }
                    value={diseases.filter(
                      (disease) => disease.id == diagnosis_id
                    )}
                    loadOptions={getDiseases}
                    defaultOptions={diseases}
                  />
                </div>

                <h5 className="col-3">
                  {diseases.filter(
                    (disease) => disease.id == diagnosis_id
                  )[0] &&
                    diseases.filter((disease) => disease.id == diagnosis_id)[0]
                      .code &&
                    `ICD-10 Code: ` +
                      diseases.filter(
                        (disease) => disease.id == diagnosis_id
                      )[0].code}
                </h5>
              </div>
              <div className="form-group row mb-2 text-start visit-general">
                <label
                  htmlFor="trade_name"
                  className="col-2 offset-1 col-form-label text-center mb-2"
                >
                  Trade Name
                </label>
                <div className="col-6 ps-0 pe-4">
                  <AsyncCreatableSelect
                    inputId="trade_name"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    isClearable={true}
                    value={null}
                    onChange={handleTradeDrugChange}
                    getOptionValue={(option) =>
                      option.__isNew__ ? option.value : option.id
                    }
                    getOptionLabel={(option) =>
                      option.__isNew__ ? option.label : option.name
                    }
                    loadOptions={getTradeDrugs}
                    defaultOptions={trade_drugs}
                  />
                </div>
              </div>

              {selected_trade_drugs.map((trade_drug, index) => {
                return (
                  <div className="row" key={index}>
                    <div className="col-8">
                      <div className="row">
                        <div className="col-4 offset-4 ps-4">
                          <TagBadge text={trade_drug.drug_name} />
                        </div>
                        <label
                          htmlFor="trade_drug_times"
                          className="col-1 col-form-label text-center mb-2 text-related ps-0 pe-0"
                        >
                          Times
                        </label>
                        <div className="col-3">
                          <CreatableSelect
                            className="react-select-container"
                            classNamePrefix="react-select"
                            isClearable={true}
                            onChange={(i, a) =>
                              handleTradeDrugTimesChange(i, a, index)
                            }
                            getOptionLabel={(option) =>
                              option.__isNew__ ? option.label : option.name
                            }
                            getOptionValue={(option) =>
                              option.__isNew__ ? option.value : option.id
                            }
                            value={times.filter(
                              (time) => time.id == trade_drug.times_id
                            )}
                            options={times}
                          />
                        </div>
                        <label
                          htmlFor="trade_drug_period"
                          className="col-1 offset-8 col-form-label text-center mb-2 text-related ps-0 pe-0"
                        >
                          Duration
                        </label>
                        <div className="col-3">
                          <input
                            id="trade_drug_period"
                            type="text"
                            placeholder=""
                            className="form-control form-background"
                            onChange={(e) =>
                              handleTradeDrugPeriodChange(e, index)
                            }
                            value={trade_drug.period}
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 mb-5">
                      <div className="row justify-content-center delete-button">
                        <button
                          className="col-6 btn btn-danger delete-button-in-visit"
                          onClick={(e) => handleTradeDrugRemoval(e, index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="form-group row mb-2 text-start visit-general">
                <label
                  htmlFor="scientific_name"
                  className="col-2 offset-1 col-form-label text-center mb-2"
                >
                  Scientific Name
                </label>
                <div className="col-6 ps-0 pe-4">
                  <AsyncSelect
                    inputId="scientific_name"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    isClearable={true}
                    value={null}
                    onChange={handleScientificDrugChange}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.name}
                    loadOptions={getScientificDrugs}
                    defaultOptions={scientific_drugs}
                  />
                </div>
              </div>

              {selected_scientific_drugs.map((scientific_drug, index) => {
                return (
                  <div className="row" key={index}>
                    <div className="col-8">
                      <div className="row">
                        <div className="col-4 ps-4">
                          <TagBadge text={scientific_drug.drug_name} />
                        </div>
                        <label
                          htmlFor="scientific_drug_dose"
                          className="col-1 col-form-label text-center mb-2 text-related ps-0 pe-0"
                        >
                          Dose
                        </label>
                        <div className="col-3">
                          <input
                            id="scientific_drug_dose"
                            type="text"
                            placeholder=""
                            className="form-control form-background"
                            onChange={(e) =>
                              handleScientificDrugDoseChange(e, index)
                            }
                            value={scientific_drug.dose}
                          ></input>
                        </div>
                        <label
                          htmlFor="scientific_drug_type"
                          className="col-1 col-form-label text-center mb-2 text-related ps-0 pe-0"
                        >
                          Type
                        </label>
                        <div className="col-3">
                          <CreatableSelect
                            className="react-select-container"
                            classNamePrefix="react-select"
                            isClearable={true}
                            onChange={(i, a) =>
                              handleScientificDrugTypeChange(i, a, index)
                            }
                            getOptionLabel={(option) =>
                              option.__isNew__ ? option.label : option.name
                            }
                            getOptionValue={(option) =>
                              option.__isNew__ ? option.value : option.id
                            }
                            value={types.filter(
                              (type) => type.id == scientific_drug.type_id
                            )}
                            options={types}
                          />
                        </div>
                        <label
                          htmlFor="scientific_drug_times"
                          className="col-1 offset-4 col-form-label text-center mb-2 text-related ps-0 pe-0"
                        >
                          Times
                        </label>
                        <div className="col-3">
                          <CreatableSelect
                            className="react-select-container"
                            classNamePrefix="react-select"
                            isClearable={true}
                            onChange={(i, a) =>
                              handleScientificDrugTimesChange(i, a, index)
                            }
                            getOptionLabel={(option) =>
                              option.__isNew__ ? option.label : option.name
                            }
                            getOptionValue={(option) =>
                              option.__isNew__ ? option.value : option.id
                            }
                            value={times.filter(
                              (time) => time.id == scientific_drug.times_id
                            )}
                            options={times}
                          />
                        </div>
                        <label
                          htmlFor="scientific_drug_period"
                          className="col-1 col-form-label text-center mb-2 text-related ps-0 pe-0"
                        >
                          For
                        </label>
                        <div className="col-2">
                          <input
                            id="scientific_drug_period"
                            type="text"
                            placeholder=""
                            className="form-control form-background"
                            onChange={(e) =>
                              handleScientificDrugPeriodChange(e, index)
                            }
                            value={scientific_drug.period}
                          ></input>
                        </div>
                        <label
                          htmlFor="scientific_drug_period"
                          className="col-1 col-form-label text-center mb-2 text-related ps-0 pe-0"
                        >
                          Duration
                        </label>
                      </div>
                    </div>
                    <div className="col-4 mb-5">
                      <div className="row justify-content-center delete-button">
                        <button
                          className="col-6 btn btn-danger delete-button-in-visit"
                          onClick={(e) => handleScientificDrugRemoval(e, index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="row mb-4">
                <label
                  htmlFor="note"
                  className="col-2 offset-1 col-form-label text-center mb-2 mt-1"
                >
                  Note
                </label>
                <div className="col-6 ps-0">
                  <textarea
                    id="note"
                    placeholder="Note"
                    className="form-control form-background textarea-note"
                    onChange={handleNoteChange}
                    value={note}
                  ></textarea>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className={"form-check mb-2 checkboxes col-6"}>
                  <input
                    id="dxshow"
                    className="form-check-input"
                    type="checkbox"
                    checked={showDx}
                    onChange={() => setShowDx(!showDx)}
                  />
                  <label className="form-check-label" htmlFor="dxshow">
                    Show Diagnosis on Print
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="row justify-content-center">
                    <button
                      className="col-2 btn btn-secondary pause-visit-button"
                      onClick={() => {
                        handlePrescriptionDataSend();
                        handlePauseVisit();
                      }}
                      type="button"
                    >
                      Pause Visit
                    </button>
                    <ReactToPrint
                      content={() => component1Ref}
                      documentTitle="First component"
                      trigger={printTrigger}
                      print={printRX}
                    />
                    <button
                      className="col-2 ms-4 btn btn-danger end-visit-button"
                      onClick={() => {
                        handlePrescriptionDataSend();
                        handleEndVisit();
                      }}
                      type="button"
                    >
                      End Visit
                    </button>
                    <button
                      className="col-2 ms-4 btn btn-success"
                      onClick={() => {
                        setOperationModal({ show: true });
                      }}
                      type="button"
                    >
                      Add Operation
                    </button>
                    <button
                      className="col-2 ms-4 btn btn-primary"
                      onClick={() => {
                        setPharmaciesModal({
                          show: true,
                        });
                      }}
                      type="button"
                    >
                      Send To Pharmacy
                    </button>
                    <button
                      className="col-2 ms-4 btn btn-success"
                      onClick={handleInteractionButton}
                      type="button"
                    >
                      Check for interaction
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Prescription;
