import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PrintRx from "./Forms/VisitComponents/PrintRx";
import printJS from "print-js";
import FileModal from "../common/FileModal";
import AddOperationModal from "../common/AddOperationModal";
import { toast } from "react-toastify";
import { ipcRenderer } from "electron";
import ReactToPrint from "react-to-print";

import scan from "./Forms/VisitComponents/scan";
import DrugsInteractionModal from "./Forms/VisitComponents/DrugsInteractionModal";
import PharmaciesModal from "./Forms/VisitComponents/PharmaciesModal";
import Patient from "./Patient";

import PatientVisitsModal from "./PatientVisitsModal";
import VitalSignsModal from "./VitalSignsModal";
import BMITrackerModal from "./BMITrackerModal";
import Start from "./VisitModalComponents/Start";
import PrescriptionController from "./VisitModalComponents/PrescriptionController";
import InvestigationsController from "./VisitModalComponents/InvestigationsController";
import OpthalmologyRxModal from "./Opthalmology/OpthalmologyRxModal";
import OpthalmologyExaminationController from "./Opthalmology/OpthalmologyExaminationController";
import OpthalmologyHxController from "./Opthalmology/OpthalmologyHxController";
import OpthalmologyVAController from "./Opthalmology/OpthalmologyVAController";

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

export function VisitModal({
  show,
  onHide,
  speech,
  setSpeech,
  transcript,
  listening,
  resetTranscript,
  loadingSpeechRecognition,
  SpeechRecognition,
  startListening,
  abortListening,
  patient,
  toLocalISOString,
  dataToChange,
  visit,
  getVisits,
  socket,
  socketGateway,
  setSubscribed,
  getPatients,
  fromSummaryTable,
}) {
  const [dataToSend, setDataToSend] = useState({
    visit_id: "",
    chief_complaint_id: null,
    investigations: [],
    diagnosis_id: null,
    scientific_drugs: [],
    trade_drugs: [],
    prescription_note: "",
    hr: "",
    dbp: "",
    sbp: "",
    rr: "",
    temp: "",
    spo2: "",
  });

  const [date, setDate] = useState(toLocalISOString(new Date()).slice(0, 10));
  const [chief_complaints, setChiefComplaints] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [scientific_drugs, setScientificDrugs] = useState([]);
  const [trade_drugs, setTradeDrugs] = useState([]);
  const [types, setTypes] = useState([]);
  const [times, setTimes] = useState([]);

  const [showDx, setShowDx] = useState(false);
  const [investigations, setInvestigations] = useState([]);
  const [imaging, setImaging] = useState([]);

  const [surgeries, setSurgeries] = useState([]);

  const [family_members, setFamilyMembers] = useState([]);

  const [showDelete, setShowDelete] = useState(true);

  const [photos, setPhotos] = useState([]);
  const [operationModal, setOperationModal] = useState({
    show: false,
  });
  const [interactionData, setInteractionData] = useState({
    show: false,
    loading: false,
    multiInteractions: [],
  });
  const [pharmaciesModalShow, setPharmaciesModalShow] = useState(false);

  const [showPatientVisitsModal, setShowPatientVisitsModal] = useState(false);
  const [showPatientInfoModal, setShowPatientInfoModal] = useState(false);
  const [showVSModal, setShowVSModal] = useState(false);
  const [showBTModal, setShowBTModal] = useState(false);
  const [showOpthalmologyHxModal, setShowOpthalmologyHxModal] = useState(false);
  const [showOpthalmologyVAModal, setShowOpthalmologyVAModal] = useState(false);
  const [showOpthalmologyRxModal, setShowOpthalmologyRxModal] = useState(false);
  const [
    showOpthalmologyExaminationModal,
    setShowOpthalmologyExaminationModal,
  ] = useState(false);

  const [component1Ref, setComponent1Ref] = useState(null);
  const printTrigger = () => {
    return <Button className="btn btn-secondary w-100">Print</Button>;
  };
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
    // setDataToSend({ ...props });
    getChiefComplaints();
    getInvestigations();
    getDiseases();
    getScientificDrugs();
    getTradeDrugs();
    getTypes();
    getTimes();

    getSurgeries();

    getFamilyMembers();
    getBgPhoto();
    getHeaderPhoto();
    getFooterPhoto();
    if (dataToChange.id != "") {
      setDataToSend({
        ...visit,
        visit_id: dataToChange.id,
        chief_complaint_id: visit.chief_complaint_id,
        investigations: visit.investigations,
        diagnosis_id: visit.diagnosis_id,
        scientific_drugs: visit.scientific_drugs,
        prescription_note: visit.prescription_note,
        trade_drugs: visit.trade_drugs,
        hr: visit.hr,
        dbp: visit.dbp,
        sbp: visit.sbp,
        rr: visit.rr,
        temp: visit.temp,
        spo2: visit.spo2,
      });
      setSpeech({
        ...speech,
        chief_complaint_note: visit.chief_complaint_note,
        hopi: visit.hopi,
      });
    } else {
      setDataToSend({
        visit_id: "",
        chief_complaint_id: null,
        investigations: [],
        diagnosis_id: null,
        scientific_drugs: [],
        trade_drugs: [],
        prescription_note: "",
        hr: "",
        dbp: "",
        sbp: "",
        rr: "",
        temp: "",
        spo2: "",
        family_history: [],
        past_surgical_history: [],
      });
      setSpeech({
        ...speech,
        chief_complaint_note: "",
        hopi: "",
      });
    }
    setShowDelete(true);
  }, [show]);

  const startScanning = (index, type) => {
    let filePath = scan.scan();
    ipcRenderer.send("image-view", filePath, index, type);
  };

  useEffect(() => {
    const scann = (e, d, info, index, type) => {
      if (d == 1) {
        let invxx;
        console.log(type);
        if (type == "labs") {
          invxx = dataToSend.investigations.filter(
            (item) => item.type == 0 || item.type == null
          );
        } else {
          invxx = dataToSend.investigations.filter((item) => item.type == 1);
        }
        fs.readFile(
          info,
          (err, data) =>
            (invxx[index].photos = invxx[index].photos.concat({
              image: new Blob([data], { type: "image/jpeg" }),
              received: true,
            }))
        );
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
      if (visit.diagnosis_name) {
        setDiseases([
          {
            id: visit.diagnosis_id,
            name: visit.diagnosis_name,
          },
          ...responseData.diseases,
        ]);
      }
      if (callback) {
        if (visit.diagnosis_name) {
          callback([
            {
              id: visit.diagnosis_id,
              name: visit.diagnosis_name,
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

  const saveVisit = async () => {
    try {
      const response = await fetch(`${apiUrl}/patients/${patient.id}/visits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const responseData = await response.json();
      return responseData.visit_id;
    } catch (error) {
      console.log(error.message);
      toast.error("Failed");
    }
  };
  const saveStart = async (visit_id) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${visit_id}/start`,
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
    } catch (error) {
      console.log(error.message);
      toast.error("Failed");
    }
  };

  const [invx, setInvx] = useState({
    id: 0,
    name: "",
    fileModalShow: false,
    index: null,
    type: null,
  });
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
  const getInvxNum = async (invx_id) => {
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
  const handleFileRemoval = async (i, ff) => {
    let formData;
    formData = new FormData();

    formData.append("files_loc", ff);
    formData.append("visit_invx_id", dataToSend.investigations[i].id);

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
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      getInvxNum(dataToSend.investigations[i].id);
    } catch (error) {
      console.log(error.message);
    }
  };
  const removeFile = (file_to_remove, index, invx_index, type) => {
    let nee;
    if (type == "labs") {
      nee = dataToSend.investigations.filter(
        (item) => item.type == 0 || item.type == null
      );
    } else {
      nee = dataToSend.investigations.filter((item) => item.type == 1);
    }

    let neef;
    let pnee = photos;
    console.log(invx_index);
    console.log(dataToSend.investigations[invx_index].files_loc);
    if (dataToSend.investigations[invx_index].files_loc) {
      neef = dataToSend.investigations[invx_index].files_loc;
    } else {
      neef = [];
    }
    if (file_to_remove != undefined) {
      handleFileRemoval(invx_index, file_to_remove);
    }
  };
  const handleLabsDataSend = (visit_id) => {
    const handleMultipleSending = async (i) => {
      let formData;
      // console.log(typeof dataToSend.investigations[i].photos[0]);
      // console.log(dataToSend.investigations[i].photos[0]);
      formData = new FormData();
      dataToSend.investigations[i].photos.map(
        (photo) =>
          photo.received &&
          formData.append("file", photo.image, photo.image.type.split("/")[1])
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
          `${apiUrl}/patients/${patient.id}/visits/${visit_id}/labs`,
          {
            method:
              dataToSend.investigations[i].id != undefined ? "PATCH" : "POST",
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
  const savePrescription = async (visit_id) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${visit_id}/prescription`,
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
    } catch (error) {
      console.log(error.message);
      toast.error("Failed");
    }
  };
  const saveOpthalmologyHx = async (visit_id) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${visit_id}/ocular-hx`,
        {
          method: Object.keys(dataToChange).length != 0 ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            optical_hx_last_reflection: dataToSend.optical_hx_last_reflection,
            optical_hx_reflection_stability:
              dataToSend.optical_hx_reflection_stability,
            optical_hx_glasses_duration: dataToSend.optical_hx_glasses_duration,
            optical_hx_glasses_change_frequency:
              dataToSend.optical_hx_glasses_change_frequency,
            optical_hx_contact_lens_duration:
              dataToSend.optical_hx_contact_lens_duration,
            optical_hx_usage: dataToSend.optical_hx_usage,
            optical_hx_uses: dataToSend.optical_hx_uses,
            optical_hx_type: dataToSend.optical_hx_type,
            optical_hx_last_time_weared: dataToSend.optical_hx_last_time_weared,
            ocular_family_hx: dataToSend.family_history,
            ocular_surgical_hx: dataToSend.past_surgical_history,
          }),
        }
      );
      const responseData = await response.json();
    } catch (error) {
      console.log(error.message);
      toast.error("Failed");
    }
  };
  const saveOpthalmologyVA = async (visit_id) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${visit_id}/ocular-va-iop`,
        {
          method: Object.keys(dataToChange).length != 0 ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            oculus_sinister_sphere_auto_refraction:
              dataToSend.oculus_sinister_sphere_auto_refraction,
            oculus_sinister_cylinder_auto_refraction:
              dataToSend.oculus_sinister_cylinder_auto_refraction,
            oculus_sinister_axis_auto_refraction:
              dataToSend.oculus_sinister_axis_auto_refraction,
            oculus_dextrus_sphere_auto_refraction:
              dataToSend.oculus_dextrus_sphere_auto_refraction,
            oculus_dextrus_cylinder_auto_refraction:
              dataToSend.oculus_dextrus_cylinder_auto_refraction,
            oculus_dextrus_axis_auto_refraction:
              dataToSend.oculus_dextrus_axis_auto_refraction,
            oculus_sinister_k1: dataToSend.oculus_sinister_k1,
            oculus_sinister_k1_axis: dataToSend.oculus_sinister_k1_axis,
            oculus_sinister_k2: dataToSend.oculus_sinister_k2,
            oculus_sinister_k2_axis: dataToSend.oculus_sinister_k2_axis,
            oculus_dextrus_k1: dataToSend.oculus_dextrus_k1,
            oculus_dextrus_k1_axis: dataToSend.oculus_dextrus_k1_axis,
            oculus_dextrus_k2: dataToSend.oculus_dextrus_k2,
            oculus_dextrus_k2_axis: dataToSend.oculus_dextrus_k2_axis,
            oculus_sinister_corneal_astigmatism:
              dataToSend.oculus_sinister_corneal_astigmatism,
            oculus_dextrus_corneal_astigmatism:
              dataToSend.oculus_dextrus_corneal_astigmatism,
            oculus_sinister_ucva: dataToSend.oculus_sinister_ucva,
            oculus_dextrus_ucva: dataToSend.oculus_dextrus_ucva,
            oculus_sinister_pinhole: dataToSend.oculus_sinister_pinhole,
            oculus_dextrus_pinhole: dataToSend.oculus_dextrus_pinhole,
            oculus_sinister_visual_acuity_old:
              dataToSend.oculus_sinister_visual_acuity_old,
            oculus_sinister_sphere_old: dataToSend.oculus_sinister_sphere_old,
            oculus_sinister_cylinder_old:
              dataToSend.oculus_sinister_cylinder_old,
            oculus_sinister_axis_old: dataToSend.oculus_sinister_axis_old,
            oculus_dextrus_visual_acuity_old:
              dataToSend.oculus_dextrus_visual_acuity_old,
            oculus_dextrus_axis_old: dataToSend.oculus_dextrus_axis_old,
            oculus_dextrus_sphere_old: dataToSend.oculus_dextrus_sphere_old,
            oculus_dextrus_cylinder_old: dataToSend.oculus_dextrus_cylinder_old,
            oculus_sinister_visual_acuity_manifest_refraction:
              dataToSend.oculus_sinister_visual_acuity_manifest_refraction,
            oculus_sinister_sphere_manifest_refraction:
              dataToSend.oculus_sinister_sphere_manifest_refraction,
            oculus_sinister_cylinder_manifest_refraction:
              dataToSend.oculus_sinister_cylinder_manifest_refraction,
            oculus_sinister_axis_manifest_refraction:
              dataToSend.oculus_sinister_axis_manifest_refraction,
            oculus_dextrus_visual_acuity_manifest_refraction:
              dataToSend.oculus_dextrus_visual_acuity_manifest_refraction,
            oculus_dextrus_sphere_manifest_refraction:
              dataToSend.oculus_dextrus_sphere_manifest_refraction,
            oculus_dextrus_cylinder_manifest_refraction:
              dataToSend.oculus_dextrus_cylinder_manifest_refraction,
            oculus_dextrus_axis_manifest_refraction:
              dataToSend.oculus_dextrus_axis_manifest_refraction,
            oculus_sinister_visual_acuity_cyclorefraction:
              dataToSend.oculus_sinister_visual_acuity_cyclorefraction,
            oculus_sinister_sphere_cyclorefraction:
              dataToSend.oculus_sinister_sphere_cyclorefraction,
            oculus_sinister_cylinder_cyclorefraction:
              dataToSend.oculus_sinister_cylinder_cyclorefraction,
            oculus_sinister_axis_cyclorefraction:
              dataToSend.oculus_sinister_axis_cyclorefraction,
            oculus_dextrus_visual_acuity_cyclorefraction:
              dataToSend.oculus_dextrus_visual_acuity_cyclorefraction,
            oculus_dextrus_sphere_cyclorefraction:
              dataToSend.oculus_dextrus_sphere_cyclorefraction,
            oculus_dextrus_cylinder_cyclorefraction:
              dataToSend.oculus_dextrus_cylinder_cyclorefraction,
            oculus_dextrus_axis_cyclorefraction:
              dataToSend.oculus_dextrus_axis_cyclorefraction,
            oculus_sinister_near: dataToSend.oculus_sinister_near,
            oculus_dextrus_near: dataToSend.oculus_dextrus_near,
            oculus_ipd: dataToSend.oculus_ipd,
            oculus_sinister_iop_airpuff: dataToSend.oculus_sinister_iop_airpuff,
            oculus_sinister_iop_applantation:
              dataToSend.oculus_sinister_iop_applantation,
            oculus_sinister_iop_other: dataToSend.oculus_sinister_iop_other,
            oculus_dextrus_iop_airpuff: dataToSend.oculus_dextrus_iop_airpuff,
            oculus_dextrus_iop_applantation:
              dataToSend.oculus_dextrus_iop_applantation,
            oculus_dextrus_iop_other: dataToSend.oculus_dextrus_iop_other,
          }),
        }
      );
      const responseData = await response.json();
    } catch (error) {
      console.log(error.message);
      toast.error("Failed");
    }
  };
  const saveOpthalmologyRx = async (visit_id) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${visit_id}/ocular-rx`,
        {
          method: Object.keys(dataToChange).length != 0 ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            oculus_sinister_sphere_rx: dataToSend.oculus_sinister_sphere_rx,
            oculus_sinister_cylinder_rx: dataToSend.oculus_sinister_cylinder_rx,
            oculus_sinister_axis_rx: dataToSend.oculus_sinister_axis_rx,
            oculus_sinister_add_rx: dataToSend.oculus_sinister_add_rx,
            oculus_dextrus_sphere_rx: dataToSend.oculus_dextrus_sphere_rx,
            oculus_dextrus_cylinder_rx: dataToSend.oculus_dextrus_cylinder_rx,
            oculus_dextrus_axis_rx: dataToSend.oculus_dextrus_axis_rx,
            oculus_dextrus_add_rx: dataToSend.oculus_dextrus_add_rx,
            oculus_ipd_rx: dataToSend.oculus_ipd_rx,
          }),
        }
      );
      const responseData = await response.json();
    } catch (error) {
      console.log(error.message);
      toast.error("Failed");
    }
  };
  const saveOpthalmologyExamination = async (visit_id) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${visit_id}/ocular-examination`,
        {
          method: Object.keys(dataToChange).length != 0 ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            oculus_sinister_external: dataToSend.oculus_sinister_external,
            oculus_sinister_ant_segment: dataToSend.oculus_sinister_ant_segment,
            oculus_sinister_post_segment:
              dataToSend.oculus_sinister_post_segment,
            oculus_dextrus_external: dataToSend.oculus_dextrus_external,
            oculus_dextrus_ant_segment: dataToSend.oculus_dextrus_ant_segment,
            oculus_dextrus_post_segment: dataToSend.oculus_dextrus_post_segment,
            oculus_sinister_orbits: dataToSend.oculus_sinister_orbits,
            oculus_dextrus_orbits: dataToSend.oculus_dextrus_orbits,
            oculus_sinister_eyelids: dataToSend.oculus_sinister_eyelids,
            oculus_dextrus_eyelids: dataToSend.oculus_dextrus_eyelids,
            oculus_sinister_ocular_alignment_and_motility:
              dataToSend.oculus_sinister_ocular_alignment_and_motility,
            oculus_dextrus_ocular_alignment_and_motility:
              dataToSend.oculus_dextrus_ocular_alignment_and_motility,
            oculus_sinister_pupils: dataToSend.oculus_sinister_pupils,
            oculus_dextrus_pupils: dataToSend.oculus_dextrus_pupils,
            oculus_sinister_lacrimal_apparatus:
              dataToSend.oculus_sinister_lacrimal_apparatus,
            oculus_dextrus_lacrimal_apparatus:
              dataToSend.oculus_dextrus_lacrimal_apparatus,
            oculus_sinister_eyelashes_and_lid_margin:
              dataToSend.oculus_sinister_eyelashes_and_lid_margin,
            oculus_dextrus_eyelashes_and_lid_margin:
              dataToSend.oculus_dextrus_eyelashes_and_lid_margin,
            oculus_sinister_conjunctiva: dataToSend.oculus_sinister_conjunctiva,
            oculus_dextrus_conjunctiva: dataToSend.oculus_dextrus_conjunctiva,
            oculus_sinister_sclera: dataToSend.oculus_sinister_sclera,
            oculus_dextrus_sclera: dataToSend.oculus_dextrus_sclera,
            oculus_sinister_tear_film: dataToSend.oculus_sinister_tear_film,
            oculus_dextrus_tear_film: dataToSend.oculus_dextrus_tear_film,
            oculus_sinister_cornea: dataToSend.oculus_sinister_cornea,
            oculus_dextrus_cornea: dataToSend.oculus_dextrus_cornea,
            oculus_sinister_ant_chamber: dataToSend.oculus_sinister_ant_chamber,
            oculus_dextrus_ant_chamber: dataToSend.oculus_dextrus_ant_chamber,
            oculus_sinister_ant_chamber_angle:
              dataToSend.oculus_sinister_ant_chamber_angle,
            oculus_dextrus_ant_chamber_angle:
              dataToSend.oculus_dextrus_ant_chamber_angle,
            oculus_sinister_iris_and_pupil:
              dataToSend.oculus_sinister_iris_and_pupil,
            oculus_dextrus_iris_and_pupil:
              dataToSend.oculus_dextrus_iris_and_pupil,
            oculus_sinister_lens: dataToSend.oculus_sinister_lens,
            oculus_dextrus_lens: dataToSend.oculus_dextrus_lens,
            oculus_sinister_ant_vitreous:
              dataToSend.oculus_sinister_ant_vitreous,
            oculus_dextrus_ant_vitreous: dataToSend.oculus_dextrus_ant_vitreous,
            oculus_sinister_vitreous: dataToSend.oculus_sinister_vitreous,
            oculus_dextrus_vitreous: dataToSend.oculus_dextrus_vitreous,
            oculus_sinister_optic_disc: dataToSend.oculus_sinister_optic_disc,
            oculus_dextrus_optic_disc: dataToSend.oculus_dextrus_optic_disc,
            oculus_sinister_macula_and_fovea:
              dataToSend.oculus_sinister_macula_and_fovea,
            oculus_dextrus_macula_and_fovea:
              dataToSend.oculus_dextrus_macula_and_fovea,
            oculus_sinister_retinal_vasculature:
              dataToSend.oculus_sinister_retinal_vasculature,
            oculus_dextrus_retinal_vasculature:
              dataToSend.oculus_dextrus_retinal_vasculature,
            oculus_sinister_peripheral_retina:
              dataToSend.oculus_sinister_peripheral_retina,
            oculus_dextrus_peripheral_retina:
              dataToSend.oculus_dextrus_peripheral_retina,
          }),
        }
      );
      const responseData = await response.json();
    } catch (error) {
      console.log(error.message);
      toast.error("Failed");
    }
  };
  const handlePauseVisit = async (visit_id) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${visit_id}/pending`,
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
        `${apiUrl}/patients/${patient.id}/visits/${visit_id}/finished`,
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
      socket.emit("pending-visits", { page: 1, size: 100, search: null });
      socket.emit("unfinished-visits", { page: 1, size: 100, search: null });
      getPatients();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleEndVisit = async (visit_id) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${visit_id}/pending`,
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
        `${apiUrl}/patients/${patient.id}/visits/${visit_id}/finished`,
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
      const responseData2 = await response2.json();
      socket.emit("pending-visits", { page: 1, size: 100, search: null });
      socket.emit("unfinished-visits", { page: 1, size: 100, search: null });
      getPatients();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dataToChange.id != "") {
      saveStart(dataToChange.id);
      handleLabsDataSend(dataToChange.id);
      savePrescription(dataToChange.id);
      handleEndVisit(dataToChange.id);
      toast.success("Edited Successfully");
    } else {
      let visit_id = await saveVisit();
      saveStart(visit_id);
      handleLabsDataSend(visit_id);
      savePrescription(visit_id);
      saveOpthalmologyHx(visit_id);
      saveOpthalmologyVA(visit_id);
      saveOpthalmologyRx(visit_id);
      saveOpthalmologyExamination(visit_id);
      handleEndVisit(visit_id);
      toast.success("Added Successfully");
    }
    onHide();
    getVisits();
  };
  const handlePauseButton = async (e) => {
    e.preventDefault();
    if (dataToChange.id != "") {
      saveStart(dataToChange.id);
      handleLabsDataSend(dataToChange.id);
      savePrescription(dataToChange.id);
      handlePauseVisit(dataToChange.id);
      toast.success("Edited Paused Successfully");
    } else {
      let visit_id = await saveVisit();
      saveStart(visit_id);
      handleLabsDataSend(visit_id);
      savePrescription(visit_id);
      saveOpthalmologyHx(visit_id);
      saveOpthalmologyVA(visit_id);
      saveOpthalmologyRx(visit_id);
      saveOpthalmologyExamination(visit_id);
      handlePauseVisit(visit_id);
      toast.success("Added Paused Successfully");
    }
    onHide();
    getVisits();
  };
  const pp = (target) => {
    return new Promise(() => {
      let data = target.contentWindow.document.documentElement.outerHTML;
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
  const handleInteractionButton = async () => {
    try {
      let ids = [];
      for (let i = 0; i < dataToSend.scientific_drugs.length; i++) {
        ids.push(dataToSend.scientific_drugs[i].drug_id);
      }

      for (let i = 0; i < dataToSend.trade_drugs.length; i++) {
        if (dataToSend.trade_drugs[i].scientific_id) {
          ids.push(dataToSend.trade_drugs[i].scientific_id);
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
  return (
    <Modal show={show} onHide={onHide} size="xl" className="" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          {dataToChange.id != "" ? "Edit" : "Add"} Visit
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {invx.fileModalShow && (
          <FileModal
            show={invx.fileModalShow}
            onHide={() => setInvx({ ...invx, fileModalShow: false })}
            index={invx.index}
            name={invx.name}
            photos={photos}
            type={invx.type}
            removeFile={removeFile}
            showDelete={showDelete}
          />
        )}
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
          show={pharmaciesModalShow}
          onHide={() => setPharmaciesModalShow(false)}
          dataToSend={dataToSend}
          patient={patient}
          socketGateway={socketGateway}
          setSubscribed={setSubscribed}
        />
        <PatientVisitsModal
          patient={patient}
          show={showPatientVisitsModal}
          onHide={() => setShowPatientVisitsModal(false)}
        />
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
        <Modal
          show={showOpthalmologyHxModal}
          onHide={() => {
            if (dataToChange.id != "") {
              saveOpthalmologyHx(dataToChange.id);
            }
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
            <OpthalmologyHxController
              dataToSend={dataToSend}
              setDataToSend={setDataToSend}
              getDiseases={getDiseases}
              diseases={diseases}
              family_members={family_members}
              getSurgeries={getSurgeries}
              surgeries={surgeries}
            />
          </Modal.Body>
        </Modal>
        <Modal
          show={showOpthalmologyVAModal}
          onHide={() => {
            if (dataToChange.id != "") {
              saveOpthalmologyVA(dataToChange.id);
            }
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
            <OpthalmologyVAController
              dataToSend={dataToSend}
              setDataToSend={setDataToSend}
            />
          </Modal.Body>
        </Modal>
        <OpthalmologyRxModal
          show={showOpthalmologyRxModal}
          onHide={() => {
            if (dataToChange.id != "") {
              saveOpthalmologyRx(dataToChange.id);
            }
            setShowOpthalmologyRxModal(false);
          }}
          dataToSend={dataToSend}
          setDataToSend={setDataToSend}
        />
        <Modal
          show={showOpthalmologyExaminationModal}
          onHide={() => {
            if (dataToChange.id != "") {
              saveOpthalmologyExamination(dataToChange.id);
            }
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
            <OpthalmologyExaminationController
              dataToSend={dataToSend}
              setDataToSend={setDataToSend}
            />
          </Modal.Body>
        </Modal>
        <VitalSignsModal
          show={showVSModal}
          onHide={() => setShowVSModal(false)}
          dataToChange={dataToSend}
          patient={patient}
          apiUrl={apiUrl}
        />
        <BMITrackerModal
          show={showBTModal}
          onHide={() => setShowBTModal(false)}
          patient={patient}
          apiUrl={apiUrl}
        />
        <div style={{ display: "none" }}>
          <PrintRx
            scientific_drugs={dataToSend.scientific_drugs}
            trade_drugs={dataToSend.trade_drugs}
            patient={patient}
            date={date}
            diagnonis={
              diseases.filter(
                (disease) => disease.id == dataToSend.diagnosis_id
              ).length != 0 &&
              diseases.filter(
                (disease) => disease.id == dataToSend.diagnosis_id
              )[0].name
            }
            note={dataToSend.prescription_note}
            bgPhoto={bgPhoto}
            headerPhoto={headerPhoto}
            footerPhoto={footerPhoto}
            showDx={showDx}
            refd={setComponent1Ref}
            tMargin={JSON.parse(fs.readFileSync(Settings, "utf8")).topMargin}
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
        <div className="row justify-content-center p-0 m-0">
          {listening ? (
            <h5 className="microphone-using" style={{ top: "0" }}>
              Microphone is ON
            </h5>
          ) : (
            ""
          )}
          {/* {JSON.parse(localStorage.getItem("plan")) >= 2 && (
        <button
          className="col-1 btn btn-primary"
          onClick={() => {
            handleLabsSend();
          }}
        >
          Send To Laboratory
        </button>
      )} */}
          <Start
            dataToSend={dataToSend}
            setDataToSend={setDataToSend}
            speech={speech}
            setSpeech={setSpeech}
            getChiefComplaints={getChiefComplaints}
            chief_complaints={chief_complaints}
            resetTranscript={resetTranscript}
            loadingSpeechRecognition={loadingSpeechRecognition}
            transcript={transcript}
            listening={listening}
            startListening={startListening}
            abortListening={abortListening}
          />
          <InvestigationsController
            dataToSend={dataToSend}
            dataToChange={dataToChange}
            setDataToSend={setDataToSend}
            getInvestigations={getInvestigations}
            investigations={investigations}
            imaging={imaging}
            setInvx={setInvx}
            getInvxNum={getInvxNum}
            setShowDelete={setShowDelete}
            patient={patient}
            showDelete={showDelete}
            photos={photos}
            setPhotos={setPhotos}
            startScanning={startScanning}
          />
          <PrescriptionController
            dataToSend={dataToSend}
            setDataToSend={setDataToSend}
            getDiseases={getDiseases}
            setDiseases={setDiseases}
            diseases={diseases}
            getTradeDrugs={getTradeDrugs}
            trade_drugs={trade_drugs}
            getScientificDrugs={getScientificDrugs}
            scientific_drugs={scientific_drugs}
            date={date}
            patient={patient}
            showDx={showDx}
            setShowDx={setShowDx}
            getTimes={getTimes}
            times={times}
            getTypes={getTypes}
            types={types}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="m-0 justify-content-center">
        <div className="col-12">
          <div className="row justify-content-center">
            <div className="col-2">
              <Button
                onClick={(e) => {
                  handlePauseButton(e);
                }}
                className="btn btn-primary w-100"
                type="button"
              >
                Pause Visit
              </Button>
            </div>
            <div className="col-2">
              <ReactToPrint
                content={() => component1Ref}
                documentTitle="First component"
                trigger={printTrigger}
                print={pp}
              />
            </div>
            <div className="col-2">
              <Button
                onClick={() => {
                  setOperationModal({ show: true });
                }}
                className="btn btn-success w-100"
                type="button"
              >
                Add Operation
              </Button>
            </div>
            <div className="col-2">
              <Button
                onClick={handleInteractionButton}
                className="btn btn-success w-100"
              >
                Check interaction
              </Button>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="row justify-content-center">
            <div className="col-2">
              <Button
                onClick={() => {
                  setShowPatientInfoModal(true);
                }}
                className="btn btn-primary w-100"
              >
                Patient Info
              </Button>
            </div>
            {!fromSummaryTable && (
              <>
                <div className="col-2">
                  <Button
                    onClick={() => {
                      setShowPatientVisitsModal(true);
                    }}
                    className="btn btn-primary w-100"
                  >
                    Previous Visits
                  </Button>
                </div>
                <div className="col-2">
                  <Button
                    onClick={() => setShowVSModal(true)}
                    className="btn btn-secondary w-100"
                  >
                    Vital Signs
                  </Button>
                </div>
              </>
            )}
            {JSON.parse(fs.readFileSync(Settings, "utf8")).bmiTracker ? (
              <div className="col-2">
                <Button
                  onClick={() => setShowBTModal(true)}
                  className="btn btn-secondary w-100"
                >
                  BMI Tracker
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {JSON.parse(fs.readFileSync(Settings, "utf8")).opthalmology ? (
          <div className="col-12">
            <div className="row justify-content-center">
              <div className="col-2">
                <Button
                  onClick={() => {
                    setShowOpthalmologyHxModal(true);
                  }}
                  className="btn btn-primary w-100"
                >
                  Opthalmology Hx
                </Button>
              </div>
              <div className="col-2">
                <Button
                  onClick={() => {
                    setShowOpthalmologyVAModal(true);
                  }}
                  className="btn btn-primary w-100"
                >
                  Opthalmology VA
                </Button>
              </div>
              <div className="col-2">
                <Button
                  onClick={() => setShowOpthalmologyRxModal(true)}
                  className="btn btn-secondary w-100"
                >
                  Opthalmology Rx
                </Button>
              </div>
              <div className="col-2">
                <Button
                  onClick={() => setShowOpthalmologyExaminationModal(true)}
                  className="btn btn-secondary w-100"
                >
                  Opthalmology Ex.
                </Button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="col-12">
          <div className="row justify-content-center">
            <div className="col-2">
              <Button onClick={onHide} className="btn btn-danger w-100">
                Don't Save
              </Button>
            </div>
            <div className="col-2">
              <Button
                onClick={() => {
                  setPharmaciesModalShow(true);
                }}
                className="btn btn-primary w-100"
              >
                Send To Pharmacy
              </Button>
            </div>
            <div className="col-2">
              <Button
                onClick={(e) => {
                  handleSubmit(e);
                }}
                className="btn btn-danger w-100"
              >
                Finish Visit
              </Button>
            </div>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
