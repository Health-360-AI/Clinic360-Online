import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Loading from "../common/Loading";
import FileModal from "../common/FileModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ipcRenderer } from "electron";
import Start from "./VisitsComponents/Start";
import ROS from "./VisitsComponents/ROS";
import MoreHx from "./VisitsComponents/MoreHx";
import Examination from "./VisitsComponents/Examination";
import Labs from "./VisitsComponents/Labs";
import Summary_Report from "./VisitsComponents/Summary_Report";
import Prescription from "./VisitsComponents/Prescription";
const apiUrl = process.env.API_URL;

export default function PatientVisitsModal({ show, onHide, patient }) {
  const [loading, setLoading] = useState(false);
  const [visits, setVisits] = useState([]);

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
      responseData.investigations.map((item) => {
        item["photos"] = [];
        item["files_loc"] = [];
      });
      setSelectedVisit(responseData);
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
      responseData.visits.pop();
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
  }, [show]);
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
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className=""
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Previous Visits
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-start">
        <div className="row justify-content-center">
          <div className="row m-0">
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
            </div>
          </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer
        className="m-0 align-items-center justify-content-center"
        dir="ltr"
      >
        <div className="">
          <Button
            onClick={() => {
              onHide();
            }}
            className="btn btn-secondary"
          >
            No
          </Button>
        </div>
        <div className="">
          <Button
            onClick={() => {
              onHide();
            }}
            className="btn btn-success"
          >
            Yes
          </Button>
        </div>
      </Modal.Footer> */}
    </Modal>
  );
}
