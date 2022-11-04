import React, { useState, Fragment, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import { Modal, Button } from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";
import Main from "./Main";
import Patients from "./Patients";
import PendingVisits from "./PendingVisits";
import Drugs from "./Drugs";
import AddPatient from "./Forms/AddPatient";
import AddDrug from "./Forms/AddDrug";
import AddVisit from "./Forms/AddVisit";
import PatientVisits from "./PatientVisits";
import AddOperation from "./Forms/AddOperation";
import PatientOperations from "./PatientOperations";
import LatestPending from "./LatestPending";
import EditGeneral from "./Settings/EditGeneral";
import BMITracker from "./BMITracker";
import createSpeechServicesPonyfill from "web-speech-cognitive-services";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import VisitsTable from "./VisitsTable";
import Finance from "./Finance";
import Patient from "./Patient";
import { VisitModal } from "./VisitModal";
import Operations from "./Operations";
import Appointments from "./Appointments";
import PatientVisitsModal from "./PatientVisitsModal";
// import WholeVisitReportModal from "./WholeVisitReportModal";

const SUBSCRIPTION_KEY = "14236151a8714df4b0c777157ed4c3d5";
const REGION = "eastus";
const TOKEN_ENDPOINT = `https://${REGION}.api.cognitive.microsoft.com/sts/v1.0/issuetoken`;

const apiUrl = process.env.API_URL;

function admin({
  setSubscribed,
  page,
  setPage,
  setRemaining,
  socket,
  socketGateway,
}) {
  const [patientsState, setPatientsState] = useState({
    patients: [
      {
        id: 0,
        name: "محمد علي محمد",
        age: 20,
        gender: "Male",
        job: "نجار",
        province: "بغداد",
        address: "القاهرة",
        phone: "07702773462",
        marital_status: "اعزب",
        visits_number: 10,
        last_visit: "2021-10-28",
        past_medical: [],
        past_surgery: ["Gastrectomy"],
      },
    ],
    search: "",
    currentPage: 1,
    totalPages: 1,
    loading: true,
  });
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [loadingSpeechRecognition, setLoadingSpeechRecognition] =
    useState(true);
  const [pendingVisits, setPendingVisits] = useState([]);
  const [unfinishedVisits, setUnfinishedVisit] = useState([]);

  const startListening = () =>
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
      // language: "ar-AE",
    });

  const loadSpeechRecognition = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: { "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY },
    });
    const authorizationToken = await response.text();
    const { SpeechRecognition: AzureSpeechRecognition } =
      createSpeechServicesPonyfill({
        credentials: {
          region: REGION,
          authorizationToken,
        },
      });
    SpeechRecognition.applyPolyfill(AzureSpeechRecognition);
    setLoadingSpeechRecognition(false);
  };
  const getPatients = async () => {
    try {
      const response = await fetch(`${apiUrl}/patients`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const responseData = await response.json();
      setPatientsState({
        ...patientsState,
        patients: responseData.patients,
        loading: false,
        totalPages: responseData.total_pages,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const emitSocket = () => {
    socket.emit("pending-visits", {
      token: `${localStorage.getItem("token")}`,
      role: 0,
      page: 1,
      size: 100,
      search: null,
    });
    socket.emit("unfinished-visits", {
      token: `${localStorage.getItem("token")}`,
      role: 0,
      page: 1,
      size: 100,
      search: null,
    });
  };
  useEffect(() => {
    loadSpeechRecognition();
    let timer = setInterval(() => {
      loadSpeechRecognition();
    }, 1000 * 60 * 14);

    getPatients();
    socket.emit("pending-visits", {
      token: `${localStorage.getItem("token")}`,
      role: 0,
      page: 1,
      size: 100,
      search: null,
    });
    socket.emit("unfinished-visits", {
      token: `${localStorage.getItem("token")}`,
      role: 0,
      page: 1,
      size: 100,
      search: null,
    });
    socket.on("receive-pending-visits", (data) => {
      setPendingVisits(data.pending_visits);
    });
    socket.on("receive-unfinished-visits", (data) => {
      console.log(data);
      setUnfinishedVisit(data.unfinished_visits);
    });
    return () => {
      if (timer !== null) clearInterval(timer);
    };
  }, []);
  const [specifications, setSpecifications] = useState({
    ros: false,
    morehx: false,
    examination: false,
    labs: false,
    scores: false,
    summery_report: false,
  });
  const [dataToChange, setDataToChange] = useState({});
  const [patient, setPatient] = useState({});
  const [speech, setSpeech] = useState({
    listeningToNote: false,
    listeningToHOPI: false,
    listeningToSummery: false,
    chief_complaint_note: "",
    hopi: "",
    summary: "",
  });
  const [showBack, setShowBack] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const [dataToSend, setDataToSend] = useState({
    visit_id: 0,
    chief_complaint: null,
    prescription_note: null,
    symptoms: [],
    past_medical_history: [],
    past_surgical_history: [],
    family_history: [],
    smoking_history: { pack_year: 0 },
    alcohol_history: { type: "", concentration: 0, volume: 0 },
    drug_history: [],
    allergies: [],
    hr: null,
    dbp: null,
    sbp: null,
    rr: null,
    temp: null,
    spo2: null,
    positive_signs: [],
    relative_negatives: [],
    investigations: [],
    summery: "",
    report: "",
    diagnosis_id: null,
    scientific_drugs: [],
    trade_drugs: [],
  });

  const handleMainButton = () => {
    setPage("Main");
    setDataToChange({});
    setDataToSend({
      visit_id: 0,
      chief_complaint: null,
      prescription_note: null,
      symptoms: [],
      past_medical_history: [],
      past_surgical_history: [],
      family_history: [],
      smoking_history: { pack_year: 0 },
      alcohol_history: { type: "", concentration: 0, volume: 0 },
      drug_history: [],
      allergies: [],
      hr: null,
      dbp: null,
      sbp: null,
      rr: null,
      temp: null,
      spo2: null,
      positive_signs: [],
      relative_negatives: [],
      investigations: [],
      summery: "",
      report: "",
      diagnosis_id: null,
      scientific_drugs: [],
      trade_drugs: [],
    });
    setSpeech({
      listeningToNote: false,
      listeningToHOPI: false,
      listeningToSummery: false,
      chief_complaint_note: "",
      hopi: "",
      summary: "",
    });
  };
  // useEffect(() => {
  //   const getInfo = async () => {
  //     try {
  //       const response = await fetch(`${apiUrl}/general-info`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       const responseData = await response.json();
  //       if (!responseData.success) {
  //         setPage("GeneralPage");
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   getInfo();
  // }, []);
  const handlePatientsButton = () => {
    setDataToChange({});
    setPage("Patients");
  };

  const handlePatientButton = () => {
    setDataToChange({});
    setPage("Patient");
  };

  const handlePendingButton = () => {
    setDataToChange({});
    setPage("PendingVisits");
  };

  const handleDrugsButton = () => {
    setDataToChange({});
    setPage("Drugs");
  };

  const handleVisitsButton = () => {
    setDataToChange({});
    setPage("PatientVisits");
  };

  const handlePatientOperationsButton = () => {
    setDataToChange({});
    setPage("PatientOperations");
  };

  const handleAddPatientButton = () => {
    setDataToChange({});
    setPage("AddPatient");
  };

  const handleEditPatientButton = () => {
    setPage("AddPatient");
  };

  const handleAddDrugButton = () => {
    setPage("AddDrug");
    setDataToChange({});
  };

  const handleEditDrugButton = () => {
    setPage("AddDrug");
  };

  const handleAddVisitButton = () => {
    setDataToChange({});
    setPage("AddVisit");
  };

  const handleEditVisitButton = () => {
    setPage("AddVisit");
  };

  const handleAddOperationButton = () => {
    setDataToChange({});
    setPage("AddOperation");
  };

  const handleEditOperationButton = () => {
    setPage("AddOperation");
  };

  const handleBMITrackerButton = () => {
    setPage("BMITracker");
  };

  const handleVisitsTableButton = () => {
    setPage("VisitsTable");
  };

  const handleFinanceButton = () => {
    setPage("Finance");
  };

  const handleOperationsButton = () => {
    setDataToChange({});
    setPage("Operations");
  };

  const handleAppointmentsButton = () => {
    setDataToChange({});
    setPage("Appointments");
  };

  const [visitModal, setVisitModal] = useState({
    show: false,
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
  const [showPatientVisitsModal, setShowPatientVisitsModal] = useState(false);
  const [showPatientInfoModal, setShowPatientInfoModal] = useState(false);
  const [showWholeVisitReportModal, setShowWholeVisitReportModal] =
    useState(false);
  const AdminNavbarFunction = () => {
    return (
      <AdminNavbar
        handleMainButton={handleMainButton}
        handlePatientsButton={handlePatientsButton}
        handleAddPatientButton={handleAddPatientButton}
        handleAddDrugButton={handleAddDrugButton}
        handlePendingButton={handlePendingButton}
        handleDrugsButton={handleDrugsButton}
        handleFinanceButton={handleFinanceButton}
        handleOperationsButton={handleOperationsButton}
        handleAppointmentsButton={handleAppointmentsButton}
        setSubscribed={setSubscribed}
        specifications={specifications}
        setSpecifications={setSpecifications}
        setRemaining={setRemaining}
        abortListening={SpeechRecognition.abortListening}
        setShowPending={setShowPending}
      />
    );
  };

  function pad(x, width = 2, char = "0") {
    return String(x).padStart(width, char);
  }
  function toLocalISOString(dt) {
    const offset = dt.getTimezoneOffset();
    const absOffset = Math.abs(offset);
    const offHours = Math.floor(absOffset / 60);
    const offStr = pad(offHours) + ":" + pad(absOffset - offHours * 60);
    return [
      String(dt.getFullYear()),
      "-",
      pad(dt.getMonth() + 1),
      "-",
      pad(dt.getDate()),
      "T",
      pad(dt.getHours()),
      ":",
      pad(dt.getMinutes()),
      ":",
      pad(dt.getSeconds()),
      ".",
      dt.getMilliseconds(),
      offset <= 0 ? "+" : "-",
      offStr,
    ].join("");
  }
  if (page == "Main") {
    return (
      <Fragment>
        <>
          <div className="row m-0">
            {JSON.parse(localStorage.getItem("remaining")) >= 1 ? (
              <>
                <LatestPending
                  handleEditVisitButton={handleEditVisitButton}
                  setPatient={setPatient}
                  speech={speech}
                  setSpeech={setSpeech}
                  dataToSend={dataToSend}
                  dataToChange={dataToChange}
                  setDataToSend={setDataToSend}
                  setDataToChange={setDataToChange}
                  patient={patient}
                  transcript={transcript}
                  listening={listening}
                  resetTranscript={resetTranscript}
                  loadingSpeechRecognition={loadingSpeechRecognition}
                  startListening={startListening}
                  abortListening={SpeechRecognition.abortListening}
                  toLocalISOString={toLocalISOString}
                  visitModal={visitModal}
                  setVisitModal={setVisitModal}
                  socket={socket}
                  pendingVisits={pendingVisits}
                  unfinishedVisits={unfinishedVisits}
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
                  abortListening={SpeechRecognition.abortListening}
                  patient={patient}
                  toLocalISOString={toLocalISOString}
                  visit={visitModal.visit}
                  dataToChange={dataToChange}
                  visitModal={visitModal}
                  setVisitModal={setVisitModal}
                  SpeechRecognition={SpeechRecognition}
                  socket={socket}
                  socketGateway={socketGateway}
                  setSubscribed={setSubscribed}
                  getPatients={getPatients}
                />
                <div
                  className={"width-others-wide ms-auto main-view"}
                  id="main-view"
                >
                  <Main
                    handleOperationsButton={handleOperationsButton}
                    setShowPending={setShowPending}
                    emitSocket={emitSocket}
                  />
                </div>
              </>
            ) : (
              <div
                className="row justify-content-center align-content-center m-0"
                style={{ height: "100vh" }}
              >
                <h3 className="col-3">
                  Subscription is Ended, please renew your subscription in the
                  settings
                </h3>
              </div>
            )}
          </div>
          {AdminNavbarFunction()}
        </>
      </Fragment>
    );
  } else if (page == "Patients") {
    return (
      <Fragment>
        <Patients
          handleEditPatientButton={handleEditPatientButton}
          handleAddVisitButton={handleAddVisitButton}
          handleEditVisitButton={handleEditVisitButton}
          handleVisitsButton={handleVisitsButton}
          handleAddOperationButton={handleAddOperationButton}
          handleOperationsButton={handlePatientOperationsButton}
          setPatient={setPatient}
          patient={patient}
          toLocalISOString={toLocalISOString}
          dataToSend={dataToSend}
          setDataToSend={setDataToSend}
          setDataToChange={setDataToChange}
          handleBMITrackerButton={handleBMITrackerButton}
          handleVisitsTableButton={handleVisitsTableButton}
          speech={speech}
          setSpeech={setSpeech}
          handlePatientButton={handlePatientButton}
          setSubscribed={setSubscribed}
          setRemaining={setRemaining}
          socket={socket}
          state={patientsState}
          setState={setPatientsState}
          getPatients={getPatients}
        />
        {AdminNavbarFunction()}
      </Fragment>
    );
  } else if (page == "Patient") {
    return (
      <Fragment>
        <Patient
          handleEditPatientButton={handleEditPatientButton}
          handleAddVisitButton={handleAddVisitButton}
          handleEditVisitButton={handleEditVisitButton}
          handleVisitsButton={handleVisitsButton}
          handleAddOperationButton={handleAddOperationButton}
          handleOperationsButton={handlePatientOperationsButton}
          setPatient={setPatient}
          patient={patient}
          toLocalISOString={toLocalISOString}
          dataToSend={dataToSend}
          setDataToSend={setDataToSend}
          setDataToChange={setDataToChange}
          handleBMITrackerButton={handleBMITrackerButton}
          setShowBack={setShowBack}
          handleVisitsTableButton={handleVisitsTableButton}
          speech={speech}
          setSpeech={setSpeech}
          showTop={true}
        />
        {AdminNavbarFunction()}
      </Fragment>
    );
  } else if (page == "PendingVisits") {
    return (
      <Fragment>
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
          abortListening={SpeechRecognition.abortListening}
          patient={patient}
          toLocalISOString={toLocalISOString}
          visit={visitModal.visit}
          dataToChange={dataToChange}
          visitModal={visitModal}
          setVisitModal={setVisitModal}
          SpeechRecognition={SpeechRecognition}
          socket={socket}
          socketGateway={socketGateway}
          setSubscribed={setSubscribed}
          getPatients={getPatients}
        />
        <PendingVisits
          handleEditVisitButton={handleEditVisitButton}
          setPatient={setPatient}
          speech={speech}
          setSpeech={setSpeech}
          dataToSend={dataToSend}
          setDataToSend={setDataToSend}
          setDataToChange={setDataToChange}
          socket={socket}
          pendingVisits={pendingVisits}
          unfinishedVisits={unfinishedVisits}
          visitModal={visitModal}
          setVisitModal={setVisitModal}
        />
        {AdminNavbarFunction()}
      </Fragment>
    );
  } else if (page == "Drugs") {
    return (
      <Fragment>
        <Drugs
          setDataToChange={setDataToChange}
          page={handleMainButton}
          handleEditDrugButton={handleEditDrugButton}
        />
        {AdminNavbarFunction()}
      </Fragment>
    );
  } else if (page == "AddPatient") {
    return (
      <Fragment>
        <AddPatient
          page={handleMainButton}
          dataToChange={dataToChange}
          getPatients={getPatients}
        />
        {AdminNavbarFunction()}
      </Fragment>
    );
  } else if (page == "AddDrug") {
    return (
      <Fragment>
        <AddDrug page={handleMainButton} dataToChange={dataToChange} />
        {AdminNavbarFunction()}
      </Fragment>
    );
  } else if (page == "AddVisit") {
    return (
      <Fragment>
        <PatientVisitsModal
          patient={patient}
          show={showPatientVisitsModal}
          onHide={() => setShowPatientVisitsModal(false)}
        />
        {/* <WholeVisitReportModal
          dataToSend={dataToSend}
          setDataToSend={setDataToSend}
          dataToChange={dataToChange}
          show={showWholeVisitReportModal}
          onHide={() => setShowWholeVisitReportModal(false)}
        /> */}

        <Modal
          show={showPatientInfoModal}
          onHide={() => setShowPatientInfoModal(false)}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className=""
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Patient Full Info
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-start">
            <Patient patient={patient} showTop={false} />
          </Modal.Body>
        </Modal>
        <AddVisit
          patient={patient}
          page={handleMainButton}
          toLocalISOString={toLocalISOString}
          speech={speech}
          setSpeech={setSpeech}
          dataToSend={dataToSend}
          setDataToSend={setDataToSend}
          dataToChange={dataToChange}
          setDataToChange={setDataToChange}
          specifications={specifications}
          transcript={transcript}
          listening={listening}
          resetTranscript={resetTranscript}
          loadingSpeechRecognition={loadingSpeechRecognition}
          startListening={startListening}
          SpeechRecognition={SpeechRecognition}
          socket={socket}
          socketGateway={socketGateway}
          setShowPatientVisitsModal={() => setShowPatientVisitsModal(true)}
          setShowPatientInfoModal={() => setShowPatientInfoModal(true)}
          setShowWholeVisitReportModal={() =>
            setShowWholeVisitReportModal(true)
          }
          setSubscribed={setSubscribed}
          getPatients={getPatients}
        />
      </Fragment>
    );
  } else if (page == "PatientVisits") {
    return (
      <Fragment>
        <PatientVisits
          patient={patient}
          setDataToChange={setDataToChange}
          setDataToSend={setDataToSend}
          handleEditVisitButton={handleEditVisitButton}
          speech={speech}
          setSpeech={setSpeech}
          showBack={showBack}
          handlePatientButton={handlePatientButton}
        />
        {AdminNavbarFunction()}
      </Fragment>
    );
  } else if (page == "PatientOperations") {
    return (
      <Fragment>
        <PatientOperations
          patient={patient}
          setDataToChange={setDataToChange}
          setDataToSend={setDataToSend}
          handleEditOperationButton={handleEditOperationButton}
          showBack={showBack}
          handlePatientButton={handlePatientButton}
        />
        {AdminNavbarFunction()}
      </Fragment>
    );
  } else if (page == "AddOperation") {
    return (
      <Fragment>
        <AddOperation
          patient={patient}
          page={handleMainButton}
          toLocalISOString={toLocalISOString}
          speech={speech}
          setSpeech={setSpeech}
          dataToChange={dataToChange}
          setDataToChange={setDataToChange}
          transcript={transcript}
          listening={listening}
          resetTranscript={resetTranscript}
          loadingSpeechRecognition={loadingSpeechRecognition}
          startListening={startListening}
          SpeechRecognition={SpeechRecognition}
          getPatients={getPatients}
        />
        {AdminNavbarFunction()}
      </Fragment>
    );
  } else if (page == "GeneralPage") {
    return (
      <Fragment>
        <div
          className="d-flex justify-content-center align-items-center main pb-5"
          style={{ height: "100vh" }}
        >
          <div className="w-50">
            <EditGeneral handleGeneralPage={() => setPage("Main")} />
          </div>
        </div>
      </Fragment>
    );
  } else if (page == "BMITracker") {
    return (
      <Fragment>
        <BMITracker
          patient={patient}
          showBack={showBack}
          handlePatientButton={handlePatientButton}
        />
        {AdminNavbarFunction()}
      </Fragment>
    );
  } else if (page == "VisitsTable") {
    return (
      <Fragment>
        <VisitsTable
          patient={patient}
          speech={speech}
          setSpeech={setSpeech}
          transcript={transcript}
          listening={listening}
          resetTranscript={resetTranscript}
          loadingSpeechRecognition={loadingSpeechRecognition}
          startListening={startListening}
          abortListening={SpeechRecognition.abortListening}
          toLocalISOString={toLocalISOString}
        />
        {AdminNavbarFunction()}
      </Fragment>
    );
  } else if (page == "Finance") {
    return (
      <Fragment>
        <Finance />
        {AdminNavbarFunction()}
      </Fragment>
    );
  } else if (page == "Operations") {
    return (
      <Fragment>
        <Operations
          showPending={showPending}
          handleEditOperationButton={handleEditOperationButton}
          setDataToChange={setDataToChange}
          setPatient={setPatient}
        />
        {AdminNavbarFunction()}
      </Fragment>
    );
  } else if (page == "Appointments") {
    return (
      <Fragment>
        <Appointments toLocalISOString={toLocalISOString} />
        {AdminNavbarFunction()}
      </Fragment>
    );
  }
}

export default admin;
