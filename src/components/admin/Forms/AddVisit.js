import React, { useState, useEffect } from "react";
import Top from "./VisitComponents/Top";
import Sides from "./VisitComponents/Sides";
import Scores from "./VisitComponents/Scores";
import { ipcRenderer } from "electron";
import scan from "./VisitComponents/scan";
import { toast } from "react-toastify";
import StartController from "./VisitComponents/StartController";
import ROSController from "./VisitComponents/ROSController";
import MoreHxController from "./VisitComponents/MoreHxController";
import ExaminationController from "./VisitComponents/ExaminationController";
import LabsController from "./VisitComponents/LabsController";
import Summary_ReportController from "./VisitComponents/Summary_ReportController";
import PrescriptionController from "./VisitComponents/PrescriptionController";
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

function AddVisit({
  patient,
  page,
  toLocalISOString,
  speech,
  setSpeech,
  dataToSend,
  setDataToSend,
  dataToChange,
  specifications,
  transcript,
  listening,
  resetTranscript,
  loadingSpeechRecognition,
  startListening,
  SpeechRecognition,
  socket,
  socketGateway,
  setShowPatientVisitsModal,
  setShowPatientInfoModal,
  setShowWholeVisitReportModal,
  setSubscribed,
  getPatients,
}) {
  const [pageToView, setPageToView] = useState("Start");
  const [chief_complaints, setChiefComplaints] = useState([]);
  const [ros, setROSs] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [surgeries, setSurgeries] = useState([]);
  const [scientific_drugs, setScientificDrugs] = useState([]);
  const [trade_drugs, setTradeDrugs] = useState([]);
  const [types, setTypes] = useState([]);
  const [times, setTimes] = useState([]);
  const [family_members, setFamilyMembers] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [signs, setSigns] = useState([]);
  const [systems, setSystems] = useState([]);
  const [investigations, setInvestigations] = useState([]);
  const [imaging, setImaging] = useState([]);
  const [reports, setReports] = useState([]);

  const [showDelete, setShowDelete] = useState(true);
  const [showPreviousVisitsButton, setShowPreviousVisitsButton] =
    useState(false);

  const [photos, setPhotos] = useState([]);

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

  const getChiefComplaints = async () => {
    try {
      const response = await fetch(`${apiUrl}/chief-complaints`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const responseData = await response.json();
      setChiefComplaints(responseData.chief_complaints);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDiseases = async (search, callback) => {
    try {
      const response = await fetch(
        `${apiUrl}/diseases${
          search != " " && search != undefined ? "?search=" + search : ""
        }`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      setDiseases(responseData.diseases);
      if (dataToSend.diagnosis_name) {
        setDiseases([
          {
            id: dataToSend.diagnosis_id,
            name: dataToSend.diagnosis_name,
          },
          ...responseData.diseases,
        ]);
      }
      if (callback) {
        if (dataToSend.diagnosis_name) {
          callback([
            {
              id: dataToSend.diagnosis_id,
              name: dataToSend.diagnosis_name,
            },
            ...responseData.diseases,
          ]);
        } else {
          callback(responseData.diseases);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSurgeries = async (search, callback) => {
    try {
      const response = await fetch(
        `${apiUrl}/surgeries${
          search != " " && search != undefined ? "?search=" + search : ""
        }`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      setSurgeries(responseData.surgeries);
      if (callback) {
        callback(responseData.surgeries);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getReports = async (search, callback) => {
    try {
      const response = await fetch(
        `${apiUrl}/reports${
          search != " " && search != undefined ? "?search=" + search : ""
        }`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      setReports(responseData.reports);
      if (callback) {
        callback(responseData.reports);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getScientificDrugs = async (search, callback) => {
    try {
      const response = await fetch(
        `${apiUrl}/scientific-drugs${
          search != " " && search != undefined ? "?search=" + search : ""
        }`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      setScientificDrugs(responseData.scientific_drugs);
      if (callback) {
        callback(responseData.scientific_drugs);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTradeDrugs = async (search, callback) => {
    try {
      const response = await fetch(
        `${apiUrl}/trade-drugs${
          search != " " && search != undefined ? "?search=" + search : ""
        }`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      setTradeDrugs(responseData.trade_drugs);
      if (callback) {
        callback(responseData.trade_drugs);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTypes = async () => {
    try {
      const response = await fetch(`${apiUrl}/types`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const responseData = await response.json();
      setTypes(responseData.types);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTimes = async () => {
    try {
      const response = await fetch(`${apiUrl}/times`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const responseData = await response.json();
      setTimes(responseData.times);
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

  const getAllergies = async () => {
    try {
      const response = await fetch(`${apiUrl}/allergies`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const responseData = await response.json();
      setAllergies(responseData.allergies);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSigns = async (search, callback) => {
    try {
      const response = await fetch(
        `${apiUrl}/signs${
          search != " " && search != undefined ? "?search=" + search : ""
        }`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      setSigns(responseData.signs);
      if (callback) {
        callback(responseData.signs);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSystems = async () => {
    try {
      const response = await fetch(`${apiUrl}/systems`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const responseData = await response.json();
      setSystems(responseData.systems);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getInvestigations = async () => {
    try {
      const response = await fetch(`${apiUrl}/investigations`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const responseData = await response.json();
      setInvestigations(
        responseData.investigations.filter(
          (item) => item.type == 0 || item.type == null
        )
      );
      setImaging(responseData.investigations.filter((item) => item.type == 1));
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
      if (responseData.visits.length > 1) {
        setShowPreviousVisitsButton(true);
      } else {
        setShowPreviousVisitsButton(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getChiefComplaints();
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
        responseData.systems.map((system) => (system["isMounted"] = false));
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
    getDiseases();
    getSurgeries();
    getScientificDrugs();
    getTradeDrugs();
    getTypes();
    getTimes();
    getFamilyMembers();
    getAllergies();
    getSigns();
    getSystems();
    getInvestigations();
    getReports();
    getBgPhoto();
    getHeaderPhoto();
    getFooterPhoto();
  }, []);
  useEffect(() => {
    const scann = (e, d, info, index, type) => {
      if (d == 1) {
        let invxx;
        if (type == "labs") {
          invxx = dataToSend.investigations.filter(
            (item) => item.type == 0 || item.type == null
          );
        } else {
          invxx = dataToSend.investigations.filter((item) => item.type == 1);
        }
        if (JSON.parse(fs.readFileSync(Settings, "utf8")).scanType) {
          fs.readFile(
            info,
            (err, data) =>
              (invxx[index].photos = invxx[index].photos.concat({
                image: new Blob([data], { type: "application/pdf" }),
                received: true,
              }))
          );
        } else {
          fs.readFile(
            info,
            (err, data) =>
              (invxx[index].photos = invxx[index].photos.concat({
                image: new Blob([data], { type: "image/jpeg" }),
                received: true,
              }))
          );
        }
        invxx[index].uploaded = 1;
        invxx[index].received = true;
        if (type == "labs") {
          invxx.push(
            ...dataToSend.investigations.filter((item) => item.type == 1)
          );
        } else {
          invxx.push(
            ...dataToSend.investigations.filter(
              (item) => item.type == 0 || item.type == null
            )
          );
        }
        setShowDelete(false);
        setDataToSend({ ...dataToSend, investigations: invxx });
      }
    };
    ipcRenderer.on("scan-response", scann);
    return () => ipcRenderer.off("scan-response", scann);
  }, [dataToSend]);
  const handlePauseVisit = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${
          Object.keys(dataToChange).length != 0
            ? dataToChange.id
            : dataToSend.visit_id
        }/finished`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            pending_state: 0,
          }),
        }
      );
      const responseData = await response.json();
      const response2 = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${
          Object.keys(dataToChange).length != 0
            ? dataToChange.id
            : dataToSend.visit_id
        }/pending`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            pending_state: 0,
          }),
        }
      );
      const responseData2 = await response2.json();
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
      getPatients();
      page();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleEndVisit = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${
          Object.keys(dataToChange).length != 0
            ? dataToChange.id
            : dataToSend.visit_id
        }/finished`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            pending_state: 1,
          }),
        }
      );
      const responseData = await response.json();
      const response2 = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${
          Object.keys(dataToChange).length != 0
            ? dataToChange.id
            : dataToSend.visit_id
        }/pending`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            pending_state: 0,
          }),
        }
      );
      const responseData2 = await response2.json();
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
      getPatients();
      page();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleStartButton = () => {
    setPageToView("Start");
  };
  // +
  // `${dataToSend.id != "" ? "/" + dataToSend.id : ""}`
  // dataToSend.id != "" ? "PATCH" :

  const handleNuritionDataSend = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${
          Object.keys(dataToChange).length != 0
            ? dataToChange.id
            : dataToSend.visit_id
        }/nutrition`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            nutrition: 1,
            epigastric_radius: dataToSend.epigastric_radius,
            umbilical_radius: dataToSend.umbilical_radius,
            hypogastric_radius: dataToSend.hypogastric_radius,
            pelvic_radius: dataToSend.pelvic_radius,
            thigh_radius: dataToSend.thigh_radius,
            metabolism: dataToSend.metabolism,
            fats_percentage: dataToSend.fats_percentage,
            muscles_percentage: dataToSend.muscles_percentage,
            calories: dataToSend.calories,
            body_age: dataToSend.body_age,
            organic_fats: dataToSend.organic_fats,
          }),
        }
      );
      console.log(dataToSend.epigastric_radius);
      const responseData = await response.json();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleGynecologicalDataSend = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${
          Object.keys(dataToChange).length != 0
            ? dataToChange.id
            : dataToSend.visit_id
        }/gynecological`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            lmp: dataToSend.lmp,
            edd: dataToSend.edd,
            gravidity: dataToSend.gravidity,
            parity: dataToSend.parity,
            abortion: dataToSend.abortion,
            abortion_note: dataToSend.abortion_note,
            last_ultrasound: dataToSend.last_ultrasound,
            last_ultrasound_note: dataToSend.last_ultrasound_note,
            gestational_age: dataToSend.gestational_age,
          }),
        }
      );
      console.log(dataToSend.epigastric_radius);
      const responseData = await response.json();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleStartDataSend = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${
          Object.keys(dataToChange).length != 0
            ? dataToChange.id
            : dataToSend.visit_id
        }/start`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            symptom_id: dataToSend.chief_complaint_id,
            chief_complaint_note: speech.chief_complaint_note,
            hopi: speech.hopi,
          }),
        }
      );
      const responseData = await response.json();
      if (JSON.parse(fs.readFileSync(Settings, "utf8")).nutrition) {
        handleNuritionDataSend();
      }
      if (JSON.parse(fs.readFileSync(Settings, "utf8")).gynecological) {
        handleGynecologicalDataSend();
      }
      if (JSON.parse(fs.readFileSync(Settings, "utf8")).reportOnStart) {
        handleSummaryReportDataSend();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleROSButton = () => {
    setPageToView("ROS");
  };
  const handleROSDataSend = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${
          Object.keys(dataToChange).length != 0
            ? dataToChange.id
            : dataToSend.visit_id
        }/ros`,
        {
          method: Object.keys(dataToChange).length != 0 ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            symptoms: dataToSend.symptoms,
          }),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleMoreHxButton = () => {
    setPageToView("MoreHx");
  };
  const handleAllergiesSend = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/allergies`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(dataToSend.allergies),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleMoreHxDataSend = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${
          Object.keys(dataToChange).length != 0
            ? dataToChange.id
            : dataToSend.visit_id
        }/morehx`,
        {
          method: Object.keys(dataToChange).length != 0 ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            past_medical_history: dataToSend.past_medical_history,
            past_surgical_history: dataToSend.past_surgical_history,
            family_history: dataToSend.family_history,
            drug_history: dataToSend.drug_history,
            smoking_history: dataToSend.smoking_history,
            alcohol_history: dataToSend.alcohol_history,
          }),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      handleAllergiesSend();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleExaminationButton = () => {
    setPageToView("Examination");
  };
  const handleExaminationDataSend = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${
          Object.keys(dataToChange).length != 0
            ? dataToChange.id
            : dataToSend.visit_id
        }/examination`,
        {
          method: Object.keys(dataToChange).length != 0 ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            positive_signs: dataToSend.positive_signs,
            relative_negatives: dataToSend.relative_negatives,
          }),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error.message);
    }
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${
          Object.keys(dataToChange).length != 0
            ? dataToChange.id
            : dataToSend.visit_id
        }/vital-signs`,
        {
          method: Object.keys(dataToChange).length != 0 ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            HR: dataToSend.hr,
            DBP: dataToSend.dbp,
            SBP: dataToSend.sbp,
            RR: dataToSend.rr,
            T: dataToSend.temp,
            Spo2: dataToSend.spo2,
          }),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleLabsButton = () => {
    setPageToView("Labs");
  };

  const startScanning = (index, type) => {
    let filePath;
    if (JSON.parse(fs.readFileSync(Settings, "utf8")).scanType) {
      filePath = scan.scan(null, null, 1);
    } else {
      filePath = scan.scan();
    }
    ipcRenderer.send("image-view", filePath, index, type);
  };

  const handleLabsDataSend = () => {
    const handleMultipleSending = async (i) => {
      let formData;
      // console.log(typeof dataToSend.investigations[i].photos[0]);
      // console.log(dataToSend.investigations[i].photos[0]);
      formData = new FormData();
      dataToSend.investigations[i].photos.map(
        (photo) =>
          photo.received &&
          formData.append("files", photo.image, photo.image.type.split("/")[1])
      );

      formData.append("invx_id", dataToSend.investigations[i].invx_id);
      formData.append("visit_invx_id", dataToSend.investigations[i].id);
      if (dataToSend.investigations[i].received) {
        formData.append("uploaded", dataToSend.investigations[i].uploaded);
      }
      if (dataToSend.investigations[i].note_added) {
        formData.append("note", dataToSend.investigations[i].note);
      }

      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      try {
        const response = await fetch(
          `${apiUrl}/patients/${patient.id}/visits/${
            Object.keys(dataToChange).length != 0
              ? dataToChange.id
              : dataToSend.visit_id
          }/labs`,
          {
            method:
              dataToSend.investigations[i].id != undefined ? "PATCH" : "POST",
            // headers: { "Content-Type": "multipart/form-data" },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
        );
        const responseData = await response.json();
        console.log(responseData);
        let invxx = dataToSend.investigations;
        invxx[i].received = false;
        invxx[i].files_loc = undefined;
        setDataToSend({ ...dataToSend, investigations: invxx });
      } catch (error) {
        console.log(error.message);
      }
    };
    for (let i = 0; i < dataToSend.investigations.length; i++) {
      handleMultipleSending(i);
    }
  };

  const handleLabsSend = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${
          Object.keys(dataToChange).length != 0
            ? dataToChange.id
            : dataToSend.visit_id
        }/clinic-labs`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ investigations: dataToSend.investigations }),
        }
      );
      const responseData = await response.json();
      toast.success("Success");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSummaryReportButton = () => {
    setPageToView("Summary_Report");
  };
  const handleSummaryReportDataSend = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${
          Object.keys(dataToChange).length != 0
            ? dataToChange.id
            : dataToSend.visit_id
        }/summary-report`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            summary: speech.summary,
            report: dataToSend.report,
            lang: dataToSend.lang,
            report_id: dataToSend.report_id,
            referral_to: dataToSend.referral_to,
          }),
        }
      );
      const responseData = await response.json();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handlePrescriptionButton = () => {
    setPageToView("Prescription");
  };
  const handlePrescriptionDataSend = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${
          Object.keys(dataToChange).length != 0
            ? dataToChange.id
            : dataToSend.visit_id
        }/prescription`,
        {
          method: Object.keys(dataToChange).length != 0 ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            diagnosis_id: dataToSend.diagnosis_id,
            trade_drugs: dataToSend.trade_drugs,
            scientific_drugs: dataToSend.scientific_drugs,
            prescription_note: dataToSend.prescription_note,
          }),
        }
      );
      const responseData = await response.json();
      console.log(response);
      console.log(responseData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePharmacySend = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${
          Object.keys(dataToChange).length != 0
            ? dataToChange.id
            : dataToSend.visit_id
        }/pharmacy-connected`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            diagnosis_id: dataToSend.diagnosis_id,
            trade_drugs: dataToSend.trade_drugs,
            scientific_drugs: dataToSend.scientific_drugs,
          }),
        }
      );
      const responseData = await response.json();
      toast.success("Sent Successfully");
    } catch (error) {
      console.log(error.message);
      toast.success("Failed");
    }
  };

  const handleCreateDisease = async (name) => {
    try {
      const response = await fetch(`${apiUrl}/diseases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
        }),
      });
      const responseData = await response.json();
      return responseData.disease_id;
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleScoresButton = () => {
    setPageToView("Scores");
  };

  const pp = (target) => {
    return new Promise(() => {
      let data = target.contentWindow.document.documentElement.outerHTML;
      console.log(data);
      let blob = new Blob([data], { type: "text/html;charset=utf-8" });
      let url = URL.createObjectURL(blob);
      ipcRenderer.send("printComponent", url);
    });
  };

  const AccordingToSpecifications = () => {
    let handleLeftSideButton = () => {};
    let leftSideText = "";
    let handleRightSideButton = () => {};
    let handleRightSideRequest = () => {};
    let rightSideText = "";
    if (pageToView == "Start") {
      if (!specifications.ros) {
        handleRightSideButton = handleROSButton;
        handleRightSideRequest = handleStartDataSend;
        rightSideText = "Review of Systems";
        return {
          handleRightSideButton,
          handleRightSideRequest,
          rightSideText,
        };
      } else if (!specifications.morehx) {
        handleRightSideButton = handleMoreHxButton;
        handleRightSideRequest = handleStartDataSend;
        rightSideText = "More Hx.";
        return {
          handleRightSideButton,
          handleRightSideRequest,
          rightSideText,
        };
      } else if (!specifications.examination) {
        handleRightSideButton = handleExaminationButton;
        handleRightSideRequest = handleStartDataSend;
        rightSideText = "Examination";
        return {
          handleRightSideButton,
          handleRightSideRequest,
          rightSideText,
        };
      } else if (!specifications.labs) {
        handleRightSideButton = handleLabsButton;
        handleRightSideRequest = handleStartDataSend;
        rightSideText = "Labs";
        return {
          handleRightSideButton,
          handleRightSideRequest,
          rightSideText,
        };
      } else if (!specifications.scores) {
        handleRightSideButton = handleScoresButton;
        handleRightSideRequest = handleStartDataSend;
        rightSideText = "Scores";
        return {
          handleRightSideButton,
          handleRightSideRequest,
          rightSideText,
        };
      } else {
        handleRightSideButton = handleSummaryReportButton;
        handleRightSideRequest = handleStartDataSend;
        rightSideText = "Summary & Report";
        return {
          handleRightSideButton,
          handleRightSideRequest,
          rightSideText,
        };
      }
    }
    if (pageToView == "ROS") {
      if (!specifications.moreHx) {
        handleLeftSideButton = handleStartButton;
        leftSideText = "Start";
        handleRightSideButton = handleMoreHxButton;
        handleRightSideRequest = handleROSDataSend;
        rightSideText = "More Hx.";
        return {
          handleLeftSideButton,
          leftSideText,
          handleRightSideButton,
          handleRightSideRequest,
          rightSideText,
        };
      } else if (!specifications.examination) {
        handleLeftSideButton = handleStartButton;
        leftSideText = "Start";
        handleRightSideButton = handleExaminationButton;
        handleRightSideRequest = handleROSDataSend;
        rightSideText = "Examination";
        return {
          handleLeftSideButton,
          leftSideText,
          handleRightSideButton,
          handleRightSideRequest,
          rightSideText,
        };
      } else if (!specifications.labs) {
        handleLeftSideButton = handleStartButton;
        leftSideText = "Start";
        handleRightSideButton = handleLabsButton;
        handleRightSideRequest = handleROSDataSend;
        rightSideText = "Labs";
        return {
          handleLeftSideButton,
          leftSideText,
          handleRightSideButton,
          handleRightSideRequest,
          rightSideText,
        };
      } else if (!specifications.scores) {
        handleLeftSideButton = handleStartButton;
        leftSideText = "Start";
        handleRightSideButton = handleScoresButton;
        handleRightSideRequest = handleROSDataSend;
        rightSideText = "Scores";
        return {
          handleLeftSideButton,
          leftSideText,
          handleRightSideButton,
          handleRightSideRequest,
          rightSideText,
        };
      } else {
        handleLeftSideButton = handleStartButton;
        leftSideText = "Start";
        handleRightSideButton = handleSummaryReportButton;
        handleRightSideRequest = handleROSDataSend;
        rightSideText = "Summary & Report";
        return {
          handleLeftSideButton,
          leftSideText,
          handleRightSideButton,
          handleRightSideRequest,
          rightSideText,
        };
      }
    }
  };
  if (pageToView == "Start") {
    return (
      <>
        <Sides
          handlePauseVisit={handlePauseVisit}
          handlePrescriptionButton={handlePrescriptionButton}
          pageToView={pageToView}
          listening={listening}
          abortListening={SpeechRecognition.abortListening}
          setShowPatientVisitsModal={setShowPatientVisitsModal}
          showPreviousVisitsButton={showPreviousVisitsButton}
          setShowPatientInfoModal={setShowPatientInfoModal}
          handleVisitReport={setShowWholeVisitReportModal}
          {...AccordingToSpecifications()}
        />
        <Top patient={patient} />

        {listening ? (
          <h5 className="microphone-using">Microphone is ON</h5>
        ) : (
          ""
        )}
        <form className="row m-0 mt-4 mb-5 pb-5">
          <StartController
            loadingSpeechRecognition={loadingSpeechRecognition}
            startListening={startListening}
            abortListening={SpeechRecognition.abortListening}
            listening={listening}
            dataToSend={dataToSend}
            transcript={transcript}
            speech={speech}
            setSpeech={setSpeech}
            chief_complaints={chief_complaints}
            startNote={speech.note}
            hopi={speech.hopi}
            nutrition={JSON.parse(fs.readFileSync(Settings, "utf8")).nutrition}
            setDataToSend={setDataToSend}
            resetTranscript={resetTranscript}
            dataToChange={dataToChange}
            getChiefComplaints={getChiefComplaints}
            patient={patient}
            gynecological={
              JSON.parse(fs.readFileSync(Settings, "utf8")).gynecological
            }
          />
          {JSON.parse(fs.readFileSync(Settings, "utf8")).reportOnStart && (
            <div className="pt-4">
              <Summary_ReportController
                loadingSpeechRecognition={loadingSpeechRecognition}
                startListening={startListening}
                abortListening={SpeechRecognition.abortListening}
                listening={listening}
                transcript={transcript}
                speech={speech}
                setSpeech={setSpeech}
                summary={speech.summary}
                report={dataToSend.report}
                dataToSend={dataToSend}
                bgPhoto={bgPhoto}
                headerPhoto={headerPhoto}
                footerPhoto={footerPhoto}
                toLocalISOString={toLocalISOString}
                patient={patient}
                pp={pp}
                resetTranscript={resetTranscript}
                setDataToSend={setDataToSend}
                reports={reports}
                getReports={getReports}
              />
            </div>
          )}
        </form>
      </>
    );
  } else if (pageToView == "ROS") {
    return (
      <>
        <Sides
          handlePauseVisit={handlePauseVisit}
          pageToView={pageToView}
          handlePrescriptionButton={handlePrescriptionButton}
          listening={listening}
          abortListening={SpeechRecognition.abortListening}
          setShowPatientVisitsModal={setShowPatientVisitsModal}
          showPreviousVisitsButton={showPreviousVisitsButton}
          setShowPatientInfoModal={setShowPatientInfoModal}
          handleVisitReport={setShowWholeVisitReportModal}
          {...AccordingToSpecifications()}
        />
        <Top patient={patient} />

        <form className="row m-0 mt-4 mb-5 pb-5">
          <ROSController
            ros={ros}
            checkedROS={dataToSend.symptoms}
            setROSs={setROSs}
            dataToSend={dataToSend}
            setDataToSend={setDataToSend}
          />
        </form>
      </>
    );
  } else if (pageToView == "MoreHx") {
    return (
      <>
        <Sides
          handlePauseVisit={handlePauseVisit}
          handleLeftSideButton={handleROSButton}
          leftSideText={"Review of Systems"}
          handleRightSideButton={handleExaminationButton}
          rightSideText={"Examination"}
          handleRightSideRequest={handleMoreHxDataSend}
          pageToView={pageToView}
          handlePrescriptionButton={handlePrescriptionButton}
          listening={listening}
          abortListening={SpeechRecognition.abortListening}
          setShowPatientVisitsModal={setShowPatientVisitsModal}
          showPreviousVisitsButton={showPreviousVisitsButton}
          setShowPatientInfoModal={setShowPatientInfoModal}
          handleVisitReport={setShowWholeVisitReportModal}
        />
        <Top patient={patient} />

        <form className="row m-0 mt-4 mb-5 pb-5">
          <MoreHxController
            handleCreateDisease={handleCreateDisease}
            diseases={diseases}
            surgeries={surgeries}
            drugs={scientific_drugs}
            allergies={allergies}
            family_members={family_members}
            dataToSend={dataToSend}
            setDataToSend={setDataToSend}
            getScientificDrugs={getScientificDrugs}
            getSurgeries={getSurgeries}
            getDiseases={getDiseases}
            getAllergies={getAllergies}
          />
        </form>
      </>
    );
  } else if (pageToView == "Examination") {
    return (
      <>
        <Sides
          handlePauseVisit={handlePauseVisit}
          handleLeftSideButton={handleMoreHxButton}
          leftSideText={"More Hx."}
          handleRightSideButton={handleLabsButton}
          rightSideText={"Labs"}
          handleRightSideRequest={handleExaminationDataSend}
          pageToView={pageToView}
          handlePrescriptionButton={handlePrescriptionButton}
          listening={listening}
          abortListening={SpeechRecognition.abortListening}
          setShowPatientVisitsModal={setShowPatientVisitsModal}
          setShowPatientInfoModal={setShowPatientInfoModal}
          showPreviousVisitsButton={showPreviousVisitsButton}
          handleVisitReport={setShowWholeVisitReportModal}
        />
        <Top patient={patient} />

        <form className="row m-0 mt-4 mb-5 pb-5">
          <ExaminationController
            signs={signs}
            systems={systems}
            dataToSend={dataToSend}
            getSigns={getSigns}
            setDataToSend={setDataToSend}
          />
        </form>
      </>
    );
  } else if (pageToView == "Labs") {
    return (
      <>
        <Sides
          handlePauseVisit={handlePauseVisit}
          handleLeftSideButton={handleExaminationButton}
          leftSideText={"Examination"}
          handleRightSideButton={handleScoresButton}
          rightSideText={"Scores"}
          handleRightSideRequest={handleLabsDataSend}
          pageToView={pageToView}
          handlePrescriptionButton={handlePrescriptionButton}
          listening={listening}
          abortListening={SpeechRecognition.abortListening}
          setShowPatientVisitsModal={setShowPatientVisitsModal}
          setShowPatientInfoModal={setShowPatientInfoModal}
          showPreviousVisitsButton={showPreviousVisitsButton}
          handleVisitReport={setShowWholeVisitReportModal}
        />
        <Top patient={patient} />

        <LabsController
          investigations={investigations}
          imaging={imaging}
          dataToSend={dataToSend}
          photos={photos}
          setPhotos={setPhotos}
          startScanning={startScanning}
          setDataToSend={setDataToSend}
          getInvestigations={getInvestigations}
          handleLabsSend={handleLabsSend}
          patient={patient}
          dataToChange={dataToChange}
          setShowDelete={setShowDelete}
          showDelete={showDelete}
        />
      </>
    );
  } else if (pageToView == "Scores") {
    return (
      <>
        <Sides
          handlePauseVisit={handlePauseVisit}
          handleLeftSideButton={handleLabsButton}
          leftSideText={"Labs"}
          handleRightSideButton={handleSummaryReportButton}
          rightSideText={"Summary And Report"}
          pageToView={pageToView}
          handleRightSideRequest={() => {}}
          handlePrescriptionButton={handlePrescriptionButton}
          listening={listening}
          abortListening={SpeechRecognition.abortListening}
          setShowPatientVisitsModal={setShowPatientVisitsModal}
          setShowPatientInfoModal={setShowPatientInfoModal}
          showPreviousVisitsButton={showPreviousVisitsButton}
        />
        <Scores />
      </>
    );
  } else if (pageToView == "Summary_Report") {
    return (
      <>
        <Sides
          handlePauseVisit={handlePauseVisit}
          handleLeftSideButton={handleScoresButton}
          leftSideText={"Scores"}
          handleRightSideButton={handlePrescriptionButton}
          rightSideText={"Prescription"}
          handleRightSideRequest={handleSummaryReportDataSend}
          handlePrescriptionButton={handlePrescriptionButton}
          pageToView={pageToView}
          listening={listening}
          abortListening={SpeechRecognition.abortListening}
          setShowPatientVisitsModal={setShowPatientVisitsModal}
          setShowPatientInfoModal={setShowPatientInfoModal}
          showPreviousVisitsButton={showPreviousVisitsButton}
          handleVisitReport={setShowWholeVisitReportModal}
        />
        <Top patient={patient} />

        {listening ? (
          <h5 className="microphone-using">Microphone is ON</h5>
        ) : (
          ""
        )}
        <form className="row m-0 mt-4 mb-5">
          {JSON.parse(fs.readFileSync(Settings, "utf8")).reportOnStart ? (
            <h1 className="text-center pt-5">
              You Already Filled Report and Summary in Start
            </h1>
          ) : (
            <Summary_ReportController
              loadingSpeechRecognition={loadingSpeechRecognition}
              startListening={startListening}
              abortListening={SpeechRecognition.abortListening}
              listening={listening}
              transcript={transcript}
              speech={speech}
              setSpeech={setSpeech}
              summary={speech.summary}
              report={dataToSend.report}
              dataToSend={dataToSend}
              bgPhoto={bgPhoto}
              headerPhoto={headerPhoto}
              footerPhoto={footerPhoto}
              toLocalISOString={toLocalISOString}
              patient={patient}
              pp={pp}
              resetTranscript={resetTranscript}
              setDataToSend={setDataToSend}
              reports={reports}
              getReports={getReports}
            />
          )}
        </form>
      </>
    );
  } else if (pageToView == "Prescription") {
    return (
      <>
        <Sides
          handleRightSideRequest={handlePrescriptionDataSend}
          handleLeftSideButton={handleSummaryReportButton}
          leftSideText={"Summary And Report"}
          pageToView={pageToView}
          abortListening={SpeechRecognition.abortListening}
          setShowPatientVisitsModal={setShowPatientVisitsModal}
          setShowPatientInfoModal={setShowPatientInfoModal}
          showPreviousVisitsButton={showPreviousVisitsButton}
          handleVisitReport={setShowWholeVisitReportModal}
        />
        <Top patient={patient} />

        <form className="row m-0 mt-4 mb-5">
          <PrescriptionController
            toLocalISOString={toLocalISOString}
            scientific_drugs={scientific_drugs}
            trade_drugs={trade_drugs}
            types={types}
            times={times}
            dataToSend={dataToSend}
            setDataToSend={setDataToSend}
            selected_trade_drugs={dataToSend.trade_drugs}
            selected_scientific_drugs={dataToSend.scientific_drugs}
            diseases={diseases}
            diagnosis_id={dataToSend.diagnosis_id}
            setDiseases={setDiseases}
            handlePauseVisit={handlePauseVisit}
            handleEndVisit={handleEndVisit}
            patient={patient}
            handlePrescriptionDataSend={handlePrescriptionDataSend}
            getDiseases={getDiseases}
            getScientificDrugs={getScientificDrugs}
            getTradeDrugs={getTradeDrugs}
            handlePharmacySend={handlePharmacySend}
            headerPhoto={headerPhoto}
            footerPhoto={footerPhoto}
            pp={pp}
            loadingSpeechRecognition={loadingSpeechRecognition}
            startListening={startListening}
            SpeechRecognition={SpeechRecognition}
            listening={listening}
            transcript={transcript}
            resetTranscript={resetTranscript}
            handleCreateDisease={handleCreateDisease}
            getTimes={getTimes}
            getTypes={getTypes}
            socketGateway={socketGateway}
            setSubscribed={setSubscribed}
          />
        </form>
      </>
    );
  }
}

export default AddVisit;
