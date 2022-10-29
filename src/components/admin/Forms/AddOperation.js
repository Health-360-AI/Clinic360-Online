import React, { useState, useEffect, Fragment } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import AsyncCreatableSelect from "react-select/async-creatable";
import CreatableSelect from "react-select/creatable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import FileModal from "../../common/FileModal";
import { ipcRenderer } from "electron";
import scan from "./VisitComponents/scan";

const fs = require("fs");

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

function AddOperation({
  page,
  patient,
  dataToChange,
  transcript,
  listening,
  resetTranscript,
  loadingSpeechRecognition,
  startListening,
  SpeechRecognition,
}) {
  const [surgeries, setSurgeries] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [places, setPlaces] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [invx, setInvx] = useState({ id: 0, name: "", fileModalShow: false });
  const anesthesias = [
    { id: "General", name: "General" },
    { id: "Local", name: "Local" },
    { id: "Lumbar", name: "Lumbar" },
    { id: "Others", name: "Others" },
  ];
  const [dataToSend, setDataToSend] = useState({
    id: "",
    patient_id: patient.id,
    surgery_id: null,
    diagnosis_id: null,
    anesthetist: null,
    anesthesia: null,
    date_operation: null,
    summary: "",
    cost: null,
    assistant: null,
  });
  // console.log(dataToChange);
  const [showDelete, setShowDelete] = useState(true);

  const [saving, setSaving] = useState(false);
  useEffect(() => {
    getDiseases();
    getSurgeries();
    getPlaces();
    if (dataToChange) {
      if (Object.keys(dataToChange).length != 0) {
        setDataToSend(dataToChange);
        if (dataToChange.diagnosis) {
          setDiseases([
            {
              id: dataToChange.diagnosis_id,
              name: dataToChange.diagnosis.name,
            },
            ...diseases,
          ]);
        }
        if (dataToChange.surgery) {
          setSurgeries([
            {
              id: dataToChange.surgery,
              name: dataToChange.surgery.name,
            },
            ...surgeries,
          ]);
        }
      }
    }
  }, []);
  useEffect(() => {
    const scann = (e, d, dataToSend, info, index) => {
      console.log(d, dataToSend, info);
      if (d == 1) {
        let photoss = photos;
        if (JSON.parse(fs.readFileSync(Settings, "utf8")).scanType) {
          fs.readFile(info, (err, data) => {
            photoss = photoss.concat({
              image: new Blob([data], { type: "application/pdf" }),
              received: true,
            });
            setPhotos(photoss);
            setShowDelete(false);
          });
        } else {
          fs.readFile(info, (err, data) => {
            photoss = photoss.concat({
              image: new Blob([data], { type: "image/jpeg" }),
              received: true,
            });
            setPhotos(photoss);
            setShowDelete(false);
          });
        }
      }
    };
    ipcRenderer.on("scan-response", scann);
    return () => ipcRenderer.off("scan-response", scann);
  }, [photos]);
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
      if (callback) {
        callback(responseData.diseases);
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

  const getPlaces = async () => {
    try {
      const response = await fetch(`${apiUrl}/places`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const responseData = await response.json();
      setPlaces(responseData.places);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCreateSurgery = async (name) => {
    try {
      const response = await fetch(`${apiUrl}/surgeries`, {
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
      return responseData.surgery_id;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSurgeryChange = async (item, action) => {
    if (action.action == "select-option") {
      setDataToSend({
        ...dataToSend,
        surgery_id: item.id,
        summary: item.template,
      });
    } else if (action.action == "create-option") {
      const surgery_id = await handleCreateSurgery(item.value);
      setSurgeries([...surgeries, { id: surgery_id, name: item.value }]);
      setDataToSend({
        ...dataToSend,
        surgery_id,
        summary: "",
      });
    } else if (action.action == "clear") {
      setDataToSend({
        ...dataToSend,
        surgery_id: null,
        summary: "",
      });
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

  const handleCreatePlaces = async (name) => {
    try {
      const response = await fetch(`${apiUrl}/places`, {
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
      return responseData.place_id;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditTemplate = async () => {
    if (dataToSend.surgery_id) {
      try {
        const response = await fetch(
          `${apiUrl}/surgeries/${dataToSend.surgery_id}?template=${dataToSend.summary}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const responseData = await response.json();
        if (responseData.success) {
          toast.success("Success");
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      toast.error("Please Choose a Surgery");
    }
  };
  const handleDiseaseChange = async (item, action) => {
    if (action.action == "select-option") {
      setDataToSend({
        ...dataToSend,
        diagnosis_id: item.id,
      });
    } else if (action.action == "create-option") {
      const diagnosis_id = await handleCreateDisease(item.value);
      setDiseases([...diseases, { id: diagnosis_id, name: item.value }]);
      setDataToSend({
        ...dataToSend,
        diagnosis_id,
      });
    } else if (action.action == "clear") {
      setDataToSend({
        ...dataToSend,
        diagnosis_id: null,
      });
    }
  };
  const handlePlaceChange = async (item, action) => {
    if (action.action == "select-option") {
      setDataToSend({
        ...dataToSend,
        place_id: item.id,
      });
    } else if (action.action == "create-option") {
      const place_id = await handleCreatePlaces(item.value);
      getPlaces();
      setDataToSend({
        ...dataToSend,
        place_id,
      });
    } else if (action.action == "clear") {
      setDataToSend({
        ...dataToSend,
        place_id: null,
      });
    }
  };
  const handleMultipleFilesReading = async (file) => {
    return new Promise((resolve, reject) => {
      let fr = new FileReader();

      fr.onload = async function (event) {
        resolve({
          image: await (await fetch(event.target.result)).blob(),
          received: true,
        });
      };
      fr.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e) => {
    let nee = photos;
    let files = e.target.files; //FileList object
    Promise.all(Array.from(files).map(handleMultipleFilesReading))
      .then((urls) => {
        nee = nee.concat(...urls);

        setShowDelete(false);

        setPhotos(nee);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getFilesNum = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/operations/${dataToSend.id}/files`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            CacheControl: "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: 0,
          },
          cache: "reload",
        }
      );

      const responseData = await response.json();
      let result = [];
      for (let i = 0; i < responseData.num_files + 1; i++) {
        result = result.concat({ image: await getFile(i), num: i });
      }
      console.log(responseData);
      setPhotos(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getFile = async (num) => {
    try {
      const response = await fetch(
        `${apiUrl}/operations/${dataToSend.id}/files?num=${num}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            CacheControl: "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: 0,
          },
          cache: "reload",
        }
      );
      const responsePhoto = await response.blob();
      if (response.code == 500) {
        throw new Error(response);
      }
      return responsePhoto;
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleAnesthetistChange = (e) => {
    setDataToSend({ ...dataToSend, anesthetist: e.target.value });
  };
  const handleDateChange = (e) => {
    setDataToSend({ ...dataToSend, date_operation: e.target.value });
  };
  const handleFinishedDateChange = (e) => {
    setDataToSend({ ...dataToSend, finished_date: e.target.value });
  };
  const handleAnesthesiaChange = async (item, action) => {
    if (action.action == "select-option") {
      setDataToSend({
        ...dataToSend,
        anesthesia: item.id,
      });
    } else if (action.action == "clear") {
      setDataToSend({
        ...dataToSend,
        anesthesia: null,
      });
    }
  };
  const handleSummarySpeech = () => {
    setDataToSend({
      ...dataToSend,
      summary:
        (dataToSend.summary != null ? dataToSend.summary : "") +
        " " +
        transcript,
    });
    resetTranscript();
  };
  const handleSummaryChange = (e) => {
    setDataToSend({ ...dataToSend, summary: e.target.value });
    resetTranscript();
  };
  const handleCostChange = (e) =>
    setDataToSend({ ...dataToSend, cost: e.target.value });
  const handleAssistantChange = (e) =>
    setDataToSend({ ...dataToSend, assistant: e.target.value });

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

  const [date, setDate] = useState(toLocalISOString(new Date()).slice(0, 10));
  const saveSurgery = async () => {
    try {
      setSaving(true);
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/operations` +
          `${dataToSend.id != "" ? "/" + dataToSend.id : ""}`,
        {
          method: dataToSend.id != "" ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ ...dataToSend, pending: 0 }),
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      if (photos != []) {
        let formData;
        formData = new FormData();
        photos.map(
          (photo) =>
            photo.received &&
            formData.append(
              "files",
              photo.image,
              photo.image.type.split("/")[1]
            )
        );
        // for (const property in photos) {
        //   console.log(`${property}: ${photos[property]}`);

        // }

        for (let pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        const responseImg = await fetch(
          `${apiUrl}/patients/files/${patient.id}?operation_id=${responseData.operation_id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
        );
        const responseBlob = await responseImg.json();
        console.log(responseBlob);
      }
      toast.success("Surgery Was Added Successfully");
      page();
    } catch (error) {
      console.log(error.message);
      setSaving(false);
      toast.error("Saving Failed");
    }
  };
  const pendSurgery = async () => {
    try {
      setSaving(true);
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/operations` +
          `${dataToSend.id != "" ? "/" + dataToSend.id : ""}`,
        {
          method: dataToSend.id != "" ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ ...dataToSend, pending: 1 }),
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      if (photos != []) {
        let formData;
        formData = new FormData();
        photos.map(
          (photo) =>
            photo.received &&
            formData.append(
              "files",
              photo.image,
              photo.image.type.split("/")[1]
            )
        );
        // for (const property in photos) {
        //   console.log(`${property}: ${photos[property]}`);

        // }

        for (let pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        const responseImg = await fetch(
          `${apiUrl}/patients/files/${patient.id}?operation_id=${responseData.operation_id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
        );
        const responseBlob = await responseImg.json();
        console.log(responseBlob);
      }
      toast.success("Surgery Was Added Successfully");
      setPhotos([]);
      page();
    } catch (error) {
      console.log(error.message);
      setSaving(false);
      toast.error("Saving Failed");
    }
  };
  const transcribingSummary = () => {
    if (listening & (dataToSend.summary == "")) {
      return transcript;
    } else if (listening & (dataToSend.summary != "")) {
      return dataToSend.summary + " " + transcript;
    } else {
      return dataToSend.summary;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (dataToSend.summary == "" || dataToSend.surgery_id == null) {
      toast.error("Missing Surgery or Summary");
    } else {
      saveSurgery();
    }
  };
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Scan
    </Tooltip>
  );
  const startScanning = () => {
    let filePath;
    if (JSON.parse(fs.readFileSync(Settings, "utf8")).scanType) {
      filePath = scan.scan(null, null, 1);
    } else {
      filePath = scan.scan();
    }
    ipcRenderer.send("image-view-single", filePath, dataToSend);
  };
  const handleFileRemoval = async (ff) => {
    try {
      let formData;
      formData = new FormData();
      formData.append("files_loc", ff);
      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      const responseImg = await fetch(
        `${apiUrl}/patients/files/${patient.id}?operation_id=${dataToSend.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );
      const responseBlob = await responseImg.json();
      console.log(responseBlob);
      getFilesNum();
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeFile = (file_to_remove, photo_index) => {
    let nee;
    if (dataToSend.files_loc) {
      nee = [...dataToSend.files_loc];
    } else {
      nee = [];
    }
    console.log(dataToSend.files_loc);
    if (file_to_remove != undefined) {
      // nee.push(file_to_remove);
      handleFileRemoval(file_to_remove);
    }
  };
  return (
    <section className="main pt-5">
      {listening && <h5 className="microphone-using">Microphone is ON</h5>}
      {invx.fileModalShow && (
        <FileModal
          show={invx.fileModalShow}
          onHide={() => setInvx({ ...invx, fileModalShow: false })}
          name={invx.name}
          photos={photos}
          removeFile={removeFile}
          showDelete={showDelete}
        />
      )}
      <div className="row m-0 justify-content-center">
        <div className="col-12">
          <div className="row pr-2 pl-2 mb-5 pb-4">
            <div className="col-11 offset-1">
              <h2 className="mt-4 mb-2 text-black header-text">Add Surgery</h2>
            </div>
            <div className="col-12 font-add">
              <form onSubmit={handleSubmit} className="row">
                <div className="col-5">
                  <div className="form-group row">
                    <label
                      htmlFor="surgery"
                      className="col-6 col-form-label offset-6 text-start mb-2"
                    >
                      Surgery *
                    </label>
                    <div className="col-6 offset-6 font-normal">
                      <AsyncCreatableSelect
                        id="surgery"
                        className="react-select-container"
                        classNamePrefix="react-select"
                        isClearable={true}
                        onChange={handleSurgeryChange}
                        getOptionLabel={(option) =>
                          option.__isNew__ ? option.label : option.name
                        }
                        getOptionValue={(option) =>
                          option.__isNew__ ? option.value : option.id
                        }
                        value={surgeries.filter(
                          (surgery) => surgery.id == dataToSend.surgery_id
                        )}
                        loadOptions={getSurgeries}
                        defaultOptions={surgeries}
                      />
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
                      <AsyncCreatableSelect
                        id="disease"
                        className="react-select-container"
                        classNamePrefix="react-select"
                        isClearable={true}
                        onChange={handleDiseaseChange}
                        getOptionLabel={(option) =>
                          option.__isNew__ ? option.label : option.name
                        }
                        getOptionValue={(option) =>
                          option.__isNew__ ? option.value : option.id
                        }
                        value={diseases.filter(
                          (disease) => disease.id == dataToSend.diagnosis_id
                        )}
                        loadOptions={getDiseases}
                        defaultOptions={diseases}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="anesthetist"
                      className="col-6 col-form-label offset-6 text-start mt-2 mb-2"
                    >
                      Anesthetist
                    </label>
                    <div className="col-6 offset-6">
                      <input
                        id="anesthetist"
                        type="text"
                        onChange={handleAnesthetistChange}
                        className="form-control form-background"
                        value={dataToSend.anesthetist}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="date"
                      className="col-6 offset-6 col-form-label text-start mt-2 mb-2"
                    >
                      Date
                    </label>
                    <div className="col-6 offset-6">
                      <input
                        id="date"
                        type="date"
                        className="form-control form-background"
                        onChange={handleDateChange}
                        value={dataToSend.date_operation}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="finished_date"
                      className="col-6 offset-6 col-form-label text-start mt-2 mb-2"
                    >
                      Finished Date
                    </label>
                    <div className="col-6 offset-6">
                      <input
                        id="finished_date"
                        type="date"
                        className="form-control form-background"
                        onChange={handleFinishedDateChange}
                        value={dataToSend.finished_date}
                      />
                    </div>
                  </div>
                </div>
                <h5 className="col-2 mt-5 pt-3">
                  {surgeries.filter(
                    (surgery) => surgery.id == dataToSend.surgery_id
                  )[0] &&
                    surgeries.filter(
                      (surgery) => surgery.id == dataToSend.surgery_id
                    )[0].code &&
                    `ICD-10 Code: ` +
                      surgeries.filter(
                        (surgery) => surgery.id == dataToSend.surgery_id
                      )[0].code}
                </h5>

                <div className="col-5">
                  <div className="form-group row">
                    <label
                      htmlFor="anesthesia"
                      className="col-12 col-form-label text-start mb-2"
                    >
                      Anesthesia
                    </label>
                    <div className="col-6 font-normal">
                      <Select
                        className="react-select-container"
                        classNamePrefix="react-select"
                        isClearable={true}
                        value={anesthesias.filter(
                          (anesthesia) => anesthesia.id == dataToSend.anesthesia
                        )}
                        onChange={handleAnesthesiaChange}
                        getOptionValue={(option) => option.id}
                        getOptionLabel={(option) => option.name}
                        options={anesthesias}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="assistant"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Assistant
                    </label>
                    <div className="col-6">
                      <input
                        id="assistant"
                        type="text"
                        onChange={handleAssistantChange}
                        className="form-control form-background"
                        value={dataToSend.assistant}
                      ></input>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="cost"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Cost
                    </label>
                    <div className="col-6">
                      <input
                        id="cost"
                        type="number"
                        onChange={handleCostChange}
                        className="form-control form-background"
                        value={dataToSend.cost}
                      ></input>
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
                      <CreatableSelect
                        id="place"
                        className="react-select-container"
                        classNamePrefix="react-select"
                        isClearable={true}
                        onChange={handlePlaceChange}
                        getOptionLabel={(option) =>
                          option.__isNew__ ? option.label : option.name
                        }
                        getOptionValue={(option) =>
                          option.__isNew__ ? option.value : option.id
                        }
                        value={places.filter(
                          (place) => place.id == dataToSend.place_id
                        )}
                        options={places}
                      />
                    </div>
                  </div>
                  <form
                    className={`form-group row`}
                    name={`patient-files`}
                    id={`patient-files`}
                    // style={{ display: !item.uploaded && "none" }}
                  >
                    <label
                      className="col-12 col-form-label text-start mt-2 mb-2"
                      onClick={() => {
                        setInvx({
                          id: dataToSend.id,
                          name: dataToSend.name,
                          fileModalShow: true,
                        });
                        setPhotos(photos ? photos : []);
                        if (showDelete) {
                          getFilesNum();
                        }
                      }}
                    >
                      Files
                    </label>
                    <div className="col-6">
                      <input
                        type="file"
                        name="file"
                        placeholder="already Added"
                        className="form-control form-background"
                        required
                        dir="rtl"
                        draggable
                        onChange={(e) => handleFileChange(e)}
                        multiple
                      ></input>
                    </div>
                    <button
                      className="col-1 mt-1 add-button-in-visit font-normal"
                      onClick={() => {
                        setInvx({
                          id: dataToSend.id,
                          name: dataToSend.name,
                          fileModalShow: true,
                        });
                        setPhotos(photos ? photos : []);
                        if (showDelete) {
                          getFilesNum();
                        }
                      }}
                      type="button"
                    >
                      View
                    </button>
                    <div className="col-1">
                      <div className="row">
                        <div className="col-6">
                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 300, hide: 350 }}
                            overlay={renderTooltip}
                          >
                            <svg
                              className="scanner-btn"
                              viewBox="0, 0, 400,400"
                              onClick={() => startScanning()}
                            >
                              <path
                                className="scanner-btn-path"
                                d="M139.063 33.925 C 134.040 35.712,126.563 44.395,126.639 48.353 C 126.726 52.957,345.732 237.907,352.057 238.719 C 356.771 239.325,364.687 229.198,364.687 222.563 C 364.687 201.559,226.128 77.462,166.406 44.977 C 146.379 34.083,142.744 32.614,139.063 33.925 M39.343 252.628 C 27.094 258.664,21.205 281.626,25.726 305.722 C 27.079 312.935,37.155 322.938,44.444 324.305 L 50.000 325.348 50.000 333.839 C 50.000 340.770,50.704 343.034,53.835 346.165 L 57.670 350.000 200.000 350.000 L 342.330 350.000 346.165 346.165 C 349.296 343.034,350.000 340.770,350.000 333.839 L 350.000 325.348 355.556 324.305 C 362.845 322.938,372.921 312.935,374.274 305.722 C 378.838 281.394,372.856 258.475,360.399 252.564 C 352.147 248.648,47.296 248.709,39.343 252.628 M83.665 266.335 C 91.415 274.086,85.923 287.500,75.000 287.500 C 68.576 287.500,62.500 281.424,62.500 275.000 C 62.500 268.576,68.576 262.500,75.000 262.500 C 78.044 262.500,81.247 263.918,83.665 266.335 M121.165 266.335 C 123.582 268.753,125.000 271.956,125.000 275.000 C 125.000 278.044,123.582 281.247,121.165 283.665 C 118.747 286.082,115.544 287.500,112.500 287.500 C 109.456 287.500,106.253 286.082,103.835 283.665 C 101.418 281.247,100.000 278.044,100.000 275.000 C 100.000 271.956,101.418 268.753,103.835 266.335 C 106.253 263.918,109.456 262.500,112.500 262.500 C 115.544 262.500,118.747 263.918,121.165 266.335 M158.665 266.335 C 161.082 268.753,162.500 271.956,162.500 275.000 C 162.500 278.044,161.082 281.247,158.665 283.665 C 156.247 286.082,153.044 287.500,150.000 287.500 C 146.956 287.500,143.753 286.082,141.335 283.665 C 138.918 281.247,137.500 278.044,137.500 275.000 C 137.500 271.956,138.918 268.753,141.335 266.335 C 143.753 263.918,146.956 262.500,150.000 262.500 C 153.044 262.500,156.247 263.918,158.665 266.335 "
                              ></path>
                            </svg>
                          </OverlayTrigger>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="form-group row justify-content-center">
                  <label
                    htmlFor="summary"
                    className="col-7 col-form-label text-center mt-2 mb-2"
                  >
                    Summary
                  </label>
                  <div className="col-7 ms-4 position-relative">
                    <textarea
                      id="summary"
                      placeholder="Summary"
                      className="form-control form-background textarea-hopi"
                      onChange={handleSummaryChange}
                      value={transcribingSummary()}
                      required
                    ></textarea>
                    {loadingSpeechRecognition ? (
                      ""
                    ) : (
                      <div
                        className="microphone-div font-normal"
                        onClick={() => {
                          if (!listening) {
                            startListening();
                          } else {
                            SpeechRecognition.abortListening();
                            handleSummarySpeech();
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          icon="microphone"
                          size="2x"
                          className="microphone"
                        />
                      </div>
                    )}
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-5">
                  </div>
                  <div className="col-2"></div>
                  <div className="col-5">
                  </div>
                </div> */}
                <div className="form-group row justify-content-center">
                  <div className="col-2 ms-5 mt-4">
                    <button
                      type="button"
                      className="btn btn-block w-100 btn-secondary"
                      onClick={pendSurgery}
                    >
                      Add to Pending
                    </button>
                  </div>
                  <div className="col-3 mt-4">
                    {!saving ? (
                      <button
                        type="submit"
                        className="btn btn-block w-100 btn-primary"
                      >
                        {dataToSend.id != "" ? "Update" : "Add"} Finished
                        Operation
                      </button>
                    ) : (
                      <button
                        disabled
                        className="btn btn-block w-100 btn-primary"
                      >
                        Saving...
                      </button>
                    )}
                  </div>
                  <div className="col-2 ms-5 mt-4">
                    <button
                      type="button"
                      className="btn btn-block w-100 btn-secondary"
                      onClick={handleEditTemplate}
                    >
                      Edit Template
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddOperation;
