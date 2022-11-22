import React, { useState, useEffect, Fragment } from "react";
import Loading from "../common/Loading";
import ConfirmModal from "../common/ConfirmModal";
import { toast } from "react-toastify";
import { VisitModal } from "./VisitModal";
import FileModal from "../common/FileModal";
import { Modal } from "react-bootstrap";
import FileModalView from "../common/FileModalView";
import OpthalmologyHx from "./OpthalmologyView/OpthalmologyHx";
import OpthalmologyVA from "./OpthalmologyView/OpthalmologyVA";
import OpthalmologyRxModal from "./OpthalmologyView/OpthalmologyRxModal";
import OpthalmologyExamination from "./OpthalmologyView/OpthalmologyExamination";

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

function VisitsTable({
  patient,
  speech,
  setSpeech,
  transcript,
  listening,
  resetTranscript,
  loadingSpeechRecognition,
  startListening,
  abortListening,
  toLocalISOString,
}) {
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    id: "",
  });
  const [visitModal, setVisitModal] = useState({
    show: false,
    visit: {
      visit_id: "",
      chief_complaint_id: null,

      prescription_note: "",
      diagnosis_id: null,
      scientific_drugs: [],
      trade_drugs: [],
    },
  });
  const [family_members, setFamilyMembers] = useState([]);

  const [showOpthalmologyHxModal, setShowOpthalmologyHxModal] = useState(false);
  const [showOpthalmologyVAModal, setShowOpthalmologyVAModal] = useState(false);
  const [showOpthalmologyRxModal, setShowOpthalmologyRxModal] = useState(false);
  const [
    showOpthalmologyExaminationModal,
    setShowOpthalmologyExaminationModal,
  ] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState([]);
  const [dataToChange, setDataToChange] = useState({ id: "" });

  const [invx, setInvx] = useState({ id: 0, name: "", fileModalShow: false });
  const [photos, setPhotos] = useState([]);
  const getInvxNum = async (invx_id, index) => {
    try {
      const response = await fetch(`${apiUrl}/labs/${invx_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          CacheControl: "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: 0,
        },
        cache: "reload",
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
          CacheControl: "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: 0,
        },
        cache: "reload",
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
      responseData.investigations.map((item) => (item["photos"] = []));
      return responseData;
    } catch (error) {
      console.log(error.message);
    }
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
      let visitss = responseData.visits;
      if (responseData.visits.length != 0) {
        for (let i = 0; i < responseData.visits.length; i++) {
          let receivedV = await getVisit(responseData.visits[i]);
          console.log(receivedV);
          visitss[i] = { ...receivedV };
        }
      }
      setVisits(visitss);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getFamilyMembers = async () => {
    try {
      const response = await fetch(`${apiUrl}/family-members`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const responseData = await response.json();
      setFamilyMembers(responseData.family_members);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getVisits();

    getFamilyMembers();
    setLoading(false);
  }, []);

  const postVisit = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/patients/${id}/visits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ date }),
      });
      const responseData = await response.json();
      props.setDataToSend({
        ...props.dataToSend,
        visit_id: responseData.visit_id,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteVisit = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/visits/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const responseData = await response.json();
      getVisits();
      toast.success("Deleted Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(visitModal);
  return (
    <section className="main pt-5">
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
      <VisitModal
        show={visitModal.show}
        onHide={() => {
          setDataToChange({ id: "" });
          setVisitModal({
            ...visitModal,
            show: false,
            id: "",
            visit: {
              visit_id: "",
              chief_complaint_id: null,
              investigations: [],
              prescription_note: "",
              diagnosis_id: null,
              scientific_drugs: [],
              trade_drugs: [],
            },
          });
        }}
        speech={speech}
        setSpeech={setSpeech}
        transcript={transcript}
        listening={listening}
        resetTranscript={resetTranscript}
        loadingSpeechRecognition={loadingSpeechRecognition}
        startListening={startListening}
        abortListening={abortListening}
        patient={patient}
        toLocalISOString={toLocalISOString}
        visit={visitModal.visit}
        dataToChange={dataToChange}
        getVisits={getVisits}
        fromSummaryTable={true}
      />
      {invx.fileModalShow && (
        <FileModalView
          show={invx.fileModalShow}
          onHide={() => setInvx({ ...invx, fileModalShow: false })}
          name={invx.name}
          photos={photos}
        />
      )}

      <Modal
        show={showOpthalmologyHxModal}
        onHide={() => {
          setShowOpthalmologyHxModal(false);
        }}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className=""
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Opthalmology Hx
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-start">
          <OpthalmologyHx
            {...visitModal.visit}
            family_members={family_members}
          />
        </Modal.Body>
      </Modal>
      <Modal
        show={showOpthalmologyVAModal}
        onHide={() => {
          setShowOpthalmologyVAModal(false);
        }}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className=""
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Opthalmology VA
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-start">
          <OpthalmologyVA {...visitModal.visit} />
        </Modal.Body>
      </Modal>
      <OpthalmologyRxModal
        show={showOpthalmologyRxModal}
        onHide={() => {
          setShowOpthalmologyRxModal(false);
        }}
        {...visitModal.visit}
      />
      <Modal
        show={showOpthalmologyExaminationModal}
        onHide={() => {
          setShowOpthalmologyExaminationModal(false);
        }}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className=""
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Opthalmology Examination
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-start">
          <OpthalmologyExamination {...visitModal.visit} />
        </Modal.Body>
      </Modal>
      <div className="row m-0 justify-content-center">
        <div className="col-12">
          <div className="row pe-2 ps-2 mb-2">
            <div className="col-12">
              <div className="row mt-4 mb-3">
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
              </div>
            </div>
            <div className="col-12 m-0">
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover text">
                  <thead className="thead-dark">
                    <tr>
                      <th className="id-width">ID</th>
                      <th className="name-width">Date</th>
                      <th className="age-width">Chief Complaint</th>
                      <th className="gender-width">Note</th>
                      <th className="job-width">History of Present Illness</th>
                      <th className="">Investigations</th>
                      {JSON.parse(fs.readFileSync(Settings, "utf8"))
                        .opthalmology ? (
                        <th className="">Opthalmology Exam</th>
                      ) : (
                        ""
                      )}
                      <th className="province-width">Diagnosis</th>
                      <th className="address-width">Trade Names</th>
                      <th className="phone-width">Scientific Names</th>
                      <th className="gender-width">Prescription Note</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  {loading == true ? (
                    <Loading />
                  ) : (
                    <tbody>
                      {visits.map((visit, index) => {
                        return (
                          <tr key={visit.id} className="font-weight-bold">
                            <td className="id-width">{index + 1}</td>
                            <td className="name-width">{visit.date}</td>
                            <td className="">{visit.chief_complaint_name}</td>
                            <td className="gender-width">
                              {visit.chief_complaint_note}
                            </td>
                            <td className="job-width">{visit.hopi}</td>
                            <td className="">
                              {visit.investigations.map((lab, index) => {
                                return (
                                  <p
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setInvx({
                                        id: lab.invx_id,
                                        name: lab.name,
                                        fileModalShow: true,
                                      });
                                      getInvxNum(lab.id, index);
                                    }}
                                  >{`${index + 1}- ${lab.name}\n`}</p>
                                );
                              })}
                            </td>
                            {JSON.parse(fs.readFileSync(Settings, "utf8"))
                              .opthalmology ? (
                              <td className="text-center">
                                <button
                                  className="btn btn-secondary m-1"
                                  onClick={(e) => {
                                    setDataToChange({ id: visit.id });
                                    setVisitModal({
                                      ...visitModal,
                                      visit,
                                    });
                                    setShowOpthalmologyHxModal(true);
                                  }}
                                >
                                  Hx
                                </button>
                                <button
                                  className="btn btn-secondary m-1"
                                  onClick={(e) => {
                                    setDataToChange({ id: visit.id });
                                    setVisitModal({
                                      ...visitModal,
                                      visit,
                                    });
                                    setShowOpthalmologyVAModal(true);
                                  }}
                                >
                                  VA
                                </button>
                                <br />
                                <button
                                  className="btn btn-secondary m-1"
                                  onClick={(e) => {
                                    setDataToChange({ id: visit.id });
                                    setVisitModal({
                                      ...visitModal,
                                      visit,
                                    });
                                    setShowOpthalmologyExaminationModal(true);
                                  }}
                                >
                                  Exam
                                </button>
                                <button
                                  className="btn btn-secondary m-1"
                                  onClick={(e) => {
                                    setDataToChange({ id: visit.id });
                                    setVisitModal({
                                      ...visitModal,
                                      visit,
                                    });
                                    setShowOpthalmologyRxModal(true);
                                  }}
                                >
                                  Rx
                                </button>
                              </td>
                            ) : (
                              ""
                            )}
                            <td className="province-width">
                              {visit.diagnosis_name}
                            </td>
                            <td className="address-width">
                              {visit.trade_drugs.map((drug, index) => {
                                return `${index + 1}- ${drug.drug_name}, ${
                                  drug.times_name
                                } for ${drug.period} \n`;
                              })}
                            </td>
                            <td className="phone-width">
                              {visit.scientific_drugs.map((drug, index) => {
                                return `${index + 1}- ${drug.drug_name}, ${
                                  drug.type_name
                                }, ${drug.times_name} for ${drug.period} \n`;
                              })}
                            </td>
                            <td className="gender-width">
                              {visit.prescription_note}
                            </td>
                            <td className="text-center">
                              <button
                                className="btn btn-secondary"
                                onClick={(e) => {
                                  setDataToChange({ id: visit.id });
                                  setVisitModal({
                                    ...visitModal,
                                    show: true,
                                    visit,
                                  });
                                }}
                              >
                                Edit
                              </button>
                            </td>
                            <td className="text-center">
                              <button
                                className="btn btn-danger"
                                onClick={(e) => {
                                  setConfirmModal({
                                    ...confirmModal,
                                    show: true,
                                    id: visit.id,
                                  });
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3 mb-5 pb-3">
          <button
            className="btn btn-primary w-100"
            onClick={(e) => {
              setDataToChange({ id: "" });
              setVisitModal({
                ...visitModal,
                show: true,
                visit: {
                  visit_id: "",
                  chief_complaint_id: null,
                  investigations: [],
                  prescription_note: "",
                  diagnosis_id: null,
                  scientific_drugs: [],
                  trade_drugs: [],
                  family_history: [],
                  past_surgical_history: [],
                },
              });
            }}
          >
            Add Visit
          </button>
        </div>
      </div>
    </section>
  );
}

export default VisitsTable;
