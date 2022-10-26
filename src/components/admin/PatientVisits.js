import React, { useState, useEffect, Fragment } from "react";
import Loading from "../common/Loading";
import FileModal from "../common/FileModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrintRx from "./Forms/VisitComponents/PrintRx";
// import printJS from "print-js";
import ConfirmModal from "../common/ConfirmModal";
import ReactToPrint from "react-to-print";
import { ipcRenderer } from "electron";
import Start from "./VisitsComponents/Start";
import ROS from "./VisitsComponents/ROS";
import MoreHx from "./VisitsComponents/MoreHx";
import Examination from "./VisitsComponents/Examination";
import Labs from "./VisitsComponents/Labs";
import Summary_Report from "./VisitsComponents/Summary_Report";
import Prescription from "./VisitsComponents/Prescription";

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

function Visits({
  patient,
  setDataToChange,
  setDataToSend,
  handleEditVisitButton,
  setSpeech,
  speech,
  showBack,
  handlePatientButton,
}) {
  const [loading, setLoading] = useState(false);
  const [visits, setVisits] = useState([]);
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    id: "",
  });
  const [invx, setInvx] = useState({ id: 0, name: "", fileModalShow: false });
  const [photos, setPhotos] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState({
    id: 0,
    chief_complaint_id: 0,
    chief_complaint_name: "",
    chief_complaint_note: "",
    prescription_note: "",
    symptoms: [],
    past_medical_history: [],
    past_surgical_history: [],
    family_history: [],
    smoking_history: { pack_year: 0 },
    alcohol_history: { type: "", concentration: 0, volume: 0 },
    drug_history: [],
    allergies: [],
    hr: 0,
    dbp: 0,
    sbp: 0,
    rr: 0,
    temp: 0,
    spo2: 0,
    positive_signs: [],
    relative_negatives: [],
    investigations: [],
    summary: "",
    report: "",
    diagnosis_id: null,
    diagnosis_name: "",
    scientific_drugs: [],
    trade_drugs: [],
  });
  const [ros, setROSs] = useState([]);
  const [showDx, setShowDx] = useState(false);

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
  const getVisit = async (visit) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${visit.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      responseData.investigations.map((item) => {
        item["photos"] = [];
        item["files_loc"] = [];
      });
      setSelectedVisit({
        ...responseData,

        smoking_history: {
          pack_year:
            responseData.smoking_history != null
              ? responseData.smoking_history.pack_year
              : null,
        },
        alcohol_history: {
          type:
            responseData.alcohol_history != null
              ? responseData.alcohol_history.type
              : null,
          concentration:
            responseData.alcohol_history != null
              ? responseData.alcohol_history.concentration
              : null,
          volume:
            responseData.alcohol_history != null
              ? responseData.alcohol_history.volume
              : null,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const setROS = (ros) => {
    setROSs(ros);
  };
  const getVisits = async () => {
    try {
      const response = await fetch(`${apiUrl}/patients/${patient.id}/visits`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const responseData = await response.json();
      setVisits(responseData.visits);
      if (responseData.visits.length != 0) {
        getVisit(responseData.visits[responseData.visits.length - 1]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getVisits();
    const getROS = async () => {
      try {
        const response = await fetch(`${apiUrl}/ros`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const responseData = await response.json();
        responseData.systems.map((system) => (system["see"] = false));
        setROSs(
          patient.gender == "Male"
            ? responseData.systems.filter((system) => system.system_id != 9)
            : responseData.systems
        );
      } catch (error) {
        console.log(error.message);
      }
    };
    getROS();
    getBgPhoto();
    getHeaderPhoto();
    getFooterPhoto();
  }, []);
  const findSystem = (system_id) => {
    return ros.findIndex((s) => s.system_id == system_id);
  };

  const handleSeeSystem = (system_id) => {
    const index = findSystem(system_id);
    let nee = [...ros];
    nee[index] = { ...nee[index], see: !nee[index].see };
    setROS(nee);
  };
  const getInvxNum = async (invx_id, index) => {
    try {
      const response = await fetch(`${apiUrl}/labs/${invx_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const responseData = await response.json();
      let result = [];
      for (let i = 0; i < responseData.num_files + 1; i++) {
        result = result.concat({ image: await getFile(invx_id, i), num: i });
      }
      setPhotos(result);
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(photos);
  const getFile = async (invx_id, num) => {
    try {
      const response = await fetch(`${apiUrl}/labs/${invx_id}?num=${num}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const responsePhoto = await response.blob();
      if (response.code == 500) {
        throw new Error(response);
      }
      return responsePhoto;
    } catch (error) {
      console.log(error.message);
    }
  };

  const editVisit = (e) => {
    e.preventDefault();
    setDataToChange({ id: selectedVisit.id });
    setDataToSend({
      visit_id: selectedVisit.id,
      chief_complaint_id: selectedVisit.chief_complaint_id,
      prescription_note: selectedVisit.prescription_note,
      symptoms: selectedVisit.symptoms,
      lmp: selectedVisit.lmp,
      edd: selectedVisit.edd,
      gravidity: selectedVisit.gravidity,
      parity: selectedVisit.parity,
      abortion: selectedVisit.abortion,
      abortion_note: selectedVisit.abortion_note,
      last_ultrasound: selectedVisit.last_ultrasound,
      last_ultrasound_note: selectedVisit.last_ultrasound_note,
      gestational_age: selectedVisit.gestational_age,
      epigastric_radius: selectedVisit.epigastric_radius,
      umbilical_radius: selectedVisit.umbilical_radius,
      hypogastric_radius: selectedVisit.hypogastric_radius,
      pelvic_radius: selectedVisit.pelvic_radius,
      thigh_radius: selectedVisit.thigh_radius,
      metabolism: selectedVisit.metabolism,
      fats_percentage: selectedVisit.fats_percentage,
      muscles_percentage: selectedVisit.muscles_percentage,
      calories: selectedVisit.calories,
      body_age: selectedVisit.body_age,
      organic_fats: selectedVisit.organic_fats,
      past_medical_history: selectedVisit.past_medical_history,
      past_surgical_history: selectedVisit.past_surgical_history,
      family_history: selectedVisit.family_history,
      smoking_history: {
        pack_year:
          selectedVisit.smoking_history != null
            ? selectedVisit.smoking_history.pack_year
            : null,
      },
      alcohol_history: {
        type:
          selectedVisit.alcohol_history != null
            ? selectedVisit.alcohol_history.type
            : null,
        concentration:
          selectedVisit.alcohol_history != null
            ? selectedVisit.alcohol_history.concentration
            : null,
        volume:
          selectedVisit.alcohol_history != null
            ? selectedVisit.alcohol_history.volume
            : null,
      },
      drug_history: selectedVisit.drug_history,
      allergies: selectedVisit.allergies,
      hr: selectedVisit.hr,
      sbp: selectedVisit.sbp,
      dbp: selectedVisit.dbp,
      rr: selectedVisit.rr,
      temp: selectedVisit.temp,
      spo2: selectedVisit.spo2,
      positive_signs: selectedVisit.positive_signs,
      relative_negatives: selectedVisit.relative_negatives,
      investigations: selectedVisit.investigations,
      report: selectedVisit.report,
      report_id: selectedVisit.report_id,
      lang: selectedVisit.lang == "ar" ? "ar" : "en",
      referral_to: selectedVisit.referral_to,
      diagnosis_id: selectedVisit.diagnosis_id,
      diagnosis_name: selectedVisit.diagnosis_name,
      scientific_drugs: selectedVisit.scientific_drugs,
      trade_drugs: selectedVisit.trade_drugs,
    });
    setSpeech({
      ...speech,
      chief_complaint_note: selectedVisit.chief_complaint_note,
      hopi: selectedVisit.hopi,
      summary: selectedVisit.summary,
    });
    handleEditVisitButton();
  };
  const deleteVisit = async () => {
    try {
      const response = await fetch(`${apiUrl}/visits/${selectedVisit.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const responseData = await response.json();
      getVisits();
    } catch (error) {
      console.log(error.message);
    }
  };
  const showing = (system_id) => {
    return (
      <div
        className="systems-angle mb-4"
        onClick={() => handleSeeSystem(system_id)}
      >
        <FontAwesomeIcon
          icon={ros[findSystem(system_id)].see ? "angle-up" : "angle-down"}
          size="2x"
          color="#008DFF"
          className={
            ros[findSystem(system_id)].see ? "rotateLeft" : "rotateRight"
          }
        />
      </div>
    );
  };
  const [seeMoreHx, setSeeMoreHx] = useState({
    past_medical_hx: false,
    past_surgical_hx: false,
    family_hx: false,
    smoking_hx: false,
    alcohol_hx: false,
    drug_hx: false,
    allergies: false,
  });
  const [component1Ref, setComponent1Ref] = useState(null);
  const printTrigger = () => {
    return (
      <button className="col-2 ms-4 btn btn-primary rounded-pill">Print</button>
    );
  };
  const [component2Ref, setComponent2Ref] = useState(null);
  const printReportTrigger = () => {
    return (
      <div className="col-12 mb-5 mt-2">
        <div className="row justify-content-center">
          <div className="col-1 mb-3">
            <button className="btn btn-primary">Print Report</button>
          </div>
        </div>
      </div>
    );
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
  return (
    <section className="main pt-5">
      <div style={{ display: "none" }}>
        <PrintRx
          scientific_drugs={selectedVisit.scientific_drugs}
          trade_drugs={selectedVisit.trade_drugs}
          patient={patient}
          date={selectedVisit.date}
          diagnonis={selectedVisit.diagnosis_name}
          bgPhoto={bgPhoto}
          headerPhoto={headerPhoto}
          footerPhoto={footerPhoto}
          showDx={showDx}
          refd={setComponent1Ref}
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
          method={JSON.parse(fs.readFileSync(Settings, "utf8")).printingMethod}
          fontSize={JSON.parse(fs.readFileSync(Settings, "utf8")).fontSize}
        />
        <PrintRx
          scientific_drugs={[]}
          trade_drugs={[]}
          patient={patient}
          date={selectedVisit.date}
          diagnonis={""}
          note={selectedVisit.report}
          bgPhoto={bgPhoto}
          headerPhoto={headerPhoto}
          footerPhoto={footerPhoto}
          showDx={false}
          refd={setComponent2Ref}
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
          method={JSON.parse(fs.readFileSync(Settings, "utf8")).printingMethod}
          fontSize={JSON.parse(fs.readFileSync(Settings, "utf8")).fontSize}
        />
      </div>
      <ConfirmModal
        show={confirmModal.show}
        onHide={() =>
          setConfirmModal({
            ...confirmModal,
            show: false,
            id: "",
          })
        }
        confirm={deleteVisit}
        id={confirmModal.id}
      />
      <div className="row m-0">
        {showBack && (
          <div className="col-2 back-button">
            <button className="btn btn-secondary" onClick={handlePatientButton}>
              <FontAwesomeIcon icon="arrow-left" size="2x" />
            </button>
          </div>
        )}
        <div className="col-12 pe-2 ps-2 mt-4">
          <h2 className="ps-3">Visits of Patient</h2>
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
        {invx.fileModalShow && (
          <FileModal
            show={invx.fileModalShow}
            onHide={() => setInvx({ ...invx, fileModalShow: false })}
            name={invx.name}
            photos={photos}
          />
        )}
        <div className="col-12 text-center">
          <div className="row ms-1 me-1 justify-content-center">
            {loading == true ? (
              <Loading />
            ) : (
              visits.map((visit, index) => {
                return (
                  <div className="col-2" key={visit.id}>
                    {selectedVisit.id == visit.id ? (
                      <h6 className="visits-badge active">
                        Visit {index + 1}: {visit.date}
                      </h6>
                    ) : (
                      <h6
                        className="visits-badge"
                        onClick={() => getVisit(visit)}
                      >
                        Visit {index + 1}: {visit.date}
                      </h6>
                    )}
                  </div>
                );
              })
            )}
          </div>
          <Start selectedVisit={selectedVisit} />
          <ROS ros={ros} showing={showing} selectedVisit={selectedVisit} />
          {(selectedVisit.past_medical_history ||
            selectedVisit.past_surgical_history ||
            selectedVisit.family_history ||
            selectedVisit.alcohol_history ||
            selectedVisit.drug_history ||
            selectedVisit.allergies) && (
            <MoreHx
              selectedVisit={selectedVisit}
              seeMoreHx={seeMoreHx}
              setSeeMoreHx={setSeeMoreHx}
            />
          )}
          <Examination selectedVisit={selectedVisit} />
          {selectedVisit.investigations &&
            !!selectedVisit.investigations.length && (
              <Labs
                selectedVisit={selectedVisit}
                setInvx={setInvx}
                getInvxNum={getInvxNum}
              />
            )}
          {(selectedVisit.summary || selectedVisit.report) && (
            <Summary_Report
              selectedVisit={selectedVisit}
              component2Ref={component2Ref}
              printReportTrigger={printReportTrigger}
              pp={pp}
            />
          )}
          <Prescription selectedVisit={selectedVisit} />
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
          <div className="row pb-5">
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
                  onClick={editVisit}
                >
                  Edit Visit
                </button>
                <button
                  className="col-2 ms-4 btn btn-danger rounded-pill"
                  onClick={(e) => {
                    setConfirmModal({
                      ...confirmModal,
                      show: true,
                      id: selectedVisit.id,
                    });
                  }}
                >
                  Delete Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Visits;
