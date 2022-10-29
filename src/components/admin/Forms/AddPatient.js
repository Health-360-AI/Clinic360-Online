import React, { useState, useEffect, Fragment } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import Item from "./VisitComponents/Item";
import CreatableSelect from "react-select/creatable";
import scan from "./VisitComponents/scan";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TagBadge from "../../common/TagBadge";
import FileModal from "../../common/FileModal";
import { ipcRenderer } from "electron";

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

function AddPatient({ page, dataToChange, getPatients, main }) {
  const [provincies, setProvincies] = useState([]);
  const [marital_statuses, setMaritalStatuses] = useState([]);
  const [genders, setGenders] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [showDelete, setShowDelete] = useState(true);

  const [invx, setInvx] = useState({ id: 0, name: "", fileModalShow: false });
  const smokings = [
    { id: "0", name: "non-smoker" },
    { id: "1", name: "smoker" },
    { id: "2", name: "ex-smoker" },
    { id: "3", name: "passive-smoker" },
  ];
  const [dataToSend, setDataToSend] = useState({
    identifier: null,
    name: "",
    province_id: null,
    province_option: "",
    marital_status_id: null,
    gender_id: null,
    dob: null,
    date_of_marriage: null,
    weight: null,
    height: null,
    phone_number: null,
    job: "",
    address: "",
    allergies: [],
    pregnant_id: null,
    alcoholic: null,
  });
  const [saving, setSaving] = useState(false);
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
  useEffect(() => {
    const getProvinces = async () => {
      try {
        const response = await fetch(`${apiUrl}/provinces`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const responseData = await response.json();
        // setData({ ...data, provinces: responseData.provinces });
        setProvincies(responseData.provinces);
      } catch (error) {
        console.log(error.message);
      }
    };
    getProvinces();

    const getMaritalStatuses = async () => {
      try {
        const response = await fetch(`${apiUrl}/marital-statuses`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const responseData = await response.json();
        // setData({ ...data, marital_statuses: responseData.marital_statuses });
        setMaritalStatuses(responseData.marital_statuses);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMaritalStatuses();

    const getGenders = async () => {
      try {
        const response = await fetch(`${apiUrl}/genders`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const responseData = await response.json();
        // setData({ ...data, marital_statuses: responseData.marital_statuses });
        setGenders(responseData.genders);
      } catch (error) {
        console.log(error.message);
      }
    };
    getGenders();

    getAllergies();
    if (Object.keys(dataToChange).length != 0) {
      setDataToSend({ ...dataToChange });
    } else {
      const getMain = async () => {
        try {
          const response = await fetch(`${apiUrl}/max-patients`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          let responseData = await response.json();
          setDataToSend({
            ...dataToSend,
            identifier: responseData.max_identifier + 1,
          });
        } catch (error) {
          console.log(error.message);
        }
      };
      getMain();
    }
  }, []);
  useEffect(() => {
    const scann = (e, d, dataToSend, info, index) => {
      console.log(d, dataToSend, info);
      if (d == 1) {
        let photoss = photos;
        fs.readFile(info, (err, data) => {
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
            photoss = photoss.concat({
              image: new Blob([data], { type: "image/jpeg" }),
              received: true,
            });
            console.log(photoss);
            setPhotos(photoss);
            setShowDelete(false);
          }
        });
      }
    };
    ipcRenderer.on("scan-response", scann);
    return () => ipcRenderer.off("scan-response", scann);
  }, [photos]);
  const handleCreateAllergies = async (name) => {
    try {
      const response = await fetch(`${apiUrl}/allergies`, {
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
      return responseData.allergy_id;
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleAllergies = async (item, action) => {
    if (action.action == "select-option") {
      setDataToSend({
        ...dataToSend,
        allergies: [
          ...dataToSend.allergies,
          { allergy_id: item.id, allergy_name: item.name, note: "" },
        ],
      });
    } else if (action.action == "create-option") {
      const allergy_id = await handleCreateAllergies(item.value);
      getAllergies();
      setDataToSend({
        ...dataToSend,
        allergies: [
          ...dataToSend.allergies,
          { allergy_id, allergy_name: item.value, note: "" },
        ],
      });
    }
  };
  const handleAllergiesRemoval = (id) => {
    setDataToSend({
      ...dataToSend,
      allergies: dataToSend.allergies.filter((item) => item.allergy_id != id),
    });
  };
  const handleAllergiesNoteChange = (e, index) => {
    const a = [...dataToSend.allergies];
    a[index].note = e.target.value;
    setDataToSend({
      ...dataToSend,
      allergies: a,
    });
  };
  const handleNameChange = (e) =>
    setDataToSend({ ...dataToSend, name: e.target.value });
  const handleIDChange = (e) =>
    setDataToSend({ ...dataToSend, identifier: e.target.value });
  const handleProvinceChange = (e) => {
    if (e == null) {
      setDataToSend({ ...dataToSend, province_id: 0, province_option: "" });
    } else {
      setDataToSend({
        ...dataToSend,
        province_id: e.id,
        province_option: e,
      });
    }
  };
  const handleMaritalStatusChange = (e) => {
    setDataToSend({ ...dataToSend, marital_status_id: e.target.value });
  };
  const handleGenderChange = (e) => {
    setDataToSend({ ...dataToSend, gender_id: e.target.value });
  };
  const handleDOBChange = (e) =>
    setDataToSend({ ...dataToSend, dob: e.target.value });
  const handleWeightChange = (e) =>
    setDataToSend({ ...dataToSend, weight: e.target.value });
  const handleHeightChange = (e) =>
    setDataToSend({ ...dataToSend, height: e.target.value });
  const handlePhoneChange = (e) =>
    setDataToSend({ ...dataToSend, phone_number: e.target.value });
  const handleJobChange = (e) =>
    setDataToSend({ ...dataToSend, job: e.target.value });
  const handleAddressChange = (e) =>
    setDataToSend({ ...dataToSend, address: e.target.value });
  const handleNoteChange = (e) =>
    setDataToSend({ ...dataToSend, note: e.target.value });

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
  // function dataURItoBlob(dataURI) {
  //   // convert base64 to raw binary data held in a string
  //   // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  //   var byteString = atob(dataURI.split(",")[1]);

  //   // separate out the mime component
  //   var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  //   // write the bytes of the string to an ArrayBuffer
  //   var ab = new ArrayBuffer(byteString.length);

  //   // create a view into the buffer
  //   var ia = new Uint8Array(ab);

  //   // set the bytes of the buffer to the correct values
  //   for (var i = 0; i < byteString.length; i++) {
  //     ia[i] = byteString.charCodeAt(i);
  //   }

  //   // write the ArrayBuffer to a blob, and you're done
  //   var blob = new Blob([ab], { type: mimeString });
  //   return blob;
  // }

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
        `${apiUrl}/patients/${dataToSend.id}/files`,
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
      setPhotos(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getFile = async (num) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${dataToSend.id}/files?num=${num}`,
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
  const [date, setDate] = useState(toLocalISOString(new Date()).slice(0, 10));
  const savePatient = async () => {
    try {
      setSaving(true);
      const response = await fetch(
        `${apiUrl}/patients` +
          `${dataToChange.id ? "/" + dataToChange.id : ""}`,
        {
          method: dataToChange.id ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ ...dataToSend, date: date }),
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      if (responseData.detail) {
        throw new Error(responseData.detail);
      }
      // photo.name.split("//")[2]
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
          `${apiUrl}/patients/${responseData.patient_id}/files`,
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
      dataToChange.id
        ? toast.success("Patient Was Edited Successfully")
        : toast.success("Patient Was Added Successfully");
      setPhotos([]);
      getPatients();
      page();
    } catch (error) {
      console.log(error.message);
      setSaving(false);
      toast.error("Saving Failed");
    }
  };
  const handleNameBlur = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/` + `${dataToSend.name}/check`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const responseData = await response.json();
      if (responseData.state) {
        toast.error("Patient Name Exist!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleIDBlur = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/identifier/` + `${dataToSend.identifier}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      if (responseData.state) {
        toast.error("Patient ID Exist!");
      }
    } catch (error) {
      console.log(error.message);
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
      const responseImg = await fetch(
        `${apiUrl}/patients/files/${dataToSend.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );
      const responseBlob = await responseImg.json();
      getFilesNum();
      console.log(responseBlob);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (dataToSend.gender_id == null) {
      toast.error("Missing Gender");
    } else {
      savePatient();
    }
  };
  return (
    <section className="main pt-5">
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
          <div className="row pr-2 pl-2 mb-5">
            <div className="col-11 offset-1">
              <h2 className="mt-4 mb-2 text-black header-text">
                {dataToChange.id ? "Update" : "Add"} Patient
              </h2>
            </div>
            <div className="col-12 font-add">
              <form onSubmit={handleSubmit} className="row">
                <div className="col-5">
                  <div className="form-group row">
                    <label
                      htmlFor="id"
                      className="col-6 col-form-label offset-6 text-start mb-2"
                    >
                      ID
                    </label>
                    <div className="col-6 offset-6">
                      <input
                        id="id"
                        type="number"
                        onChange={handleIDChange}
                        onBlur={handleIDBlur}
                        className="form-control form-background"
                        value={dataToSend.identifier}
                      ></input>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="name"
                      className="col-6 col-form-label offset-6 text-start mb-2"
                    >
                      Name *
                    </label>
                    <div className="col-6 offset-6">
                      <input
                        id="name"
                        autoComplete="on"
                        type="text"
                        placeholder="Name"
                        className="form-control form-background"
                        onChange={handleNameChange}
                        onBlur={handleNameBlur}
                        value={dataToSend.name}
                        required
                      ></input>
                    </div>
                  </div>

                  <div className="row">
                    <label
                      htmlFor="age"
                      className="col-6 offset-6 col-form-label text-start mt-2 mb-2"
                    >
                      Date of Birth *
                    </label>
                    <div className="col-6 offset-6">
                      <input
                        id="date"
                        type="date"
                        className="form-control form-background"
                        onChange={handleDOBChange}
                        value={dataToSend.dob}
                        required
                      />
                      {/* <DatePicker
                        id="date"
                        className="form-control form-background"
                        onChange={handleDOBChange}
                        selected={dataToSend.dob}
                        dateFormat="yyyy/MM/dd"
                        required
                        isClearable
                        allowSameDay
                      /> */}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="phone_number"
                      className="col-6 col-form-label offset-6 text-start mt-2 mb-2"
                    >
                      Phone No.
                    </label>
                    <div className="col-6 offset-6">
                      <input
                        id="phone_number"
                        type="text"
                        placeholder="07XX-XXXXXXX"
                        onChange={handlePhoneChange}
                        className="form-control form-background"
                        value={dataToSend.phone_number}
                      ></input>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="referral"
                      className="col-6 col-form-label offset-6 text-start mb-2"
                    >
                      Referral
                    </label>
                    <div className="col-6 offset-6">
                      <input
                        id="referral"
                        autoComplete="on"
                        type="text"
                        placeholder="Referral"
                        className="form-control form-background"
                        onChange={(e) =>
                          setDataToSend({
                            ...dataToSend,
                            referral: e.target.value,
                          })
                        }
                        value={dataToSend.referral}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="blood_g"
                      className="col-6 col-form-label offset-6 text-start mb-2"
                    >
                      Blood Group
                    </label>
                    <div className="col-6 offset-6">
                      <input
                        id="blood_g"
                        autoComplete="on"
                        type="text"
                        placeholder="Blood Group"
                        className="form-control form-background"
                        onChange={(e) =>
                          setDataToSend({
                            ...dataToSend,
                            blood_group: e.target.value,
                          })
                        }
                        value={dataToSend.blood_group}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="job"
                      className="col-6 col-form-label offset-6 text-start mt-2 mb-2"
                    >
                      Smoking
                    </label>
                    <div className="col-6 offset-6">
                      <Select
                        className="react-select-container font-normal"
                        classNamePrefix="react-select"
                        isClearable={true}
                        value={smokings.filter(
                          (smoking) => smoking.id == dataToSend.smoker
                        )}
                        onChange={(item, action) => {
                          if (action.action == "select-option") {
                            setDataToSend({
                              ...dataToSend,
                              smoker: item.id,
                            });
                          } else if (action.action == "clear") {
                            setDataToSend({
                              ...dataToSend,
                              smoker: null,
                            });
                          }
                        }}
                        getOptionValue={(option) => option.id}
                        getOptionLabel={(option) => option.name}
                        options={smokings}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-1 offset-6 pe-0 mt-3">
                      <input
                        id="alcoholic"
                        className="form-check-input"
                        type="checkbox"
                        checked={dataToSend.alcoholic == 1}
                        onChange={() =>
                          setDataToSend({
                            ...dataToSend,
                            alcoholic: !dataToSend.alcoholic,
                          })
                        }
                      />
                    </div>
                    <label
                      className="form-check-label col-form-label text-start mt-2 col-5 ps-0"
                      htmlFor="alcoholic"
                    >
                      Alcoholic
                    </label>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="job"
                      className="col-6 col-form-label offset-6 text-start mt-2 mb-2"
                    >
                      Job
                    </label>
                    <div className="col-6 offset-6">
                      <input
                        id="job"
                        type="text"
                        onChange={handleJobChange}
                        className="form-control form-background"
                        value={dataToSend.job}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-6 offset-6">
                      <div className="form-group row">
                        <label
                          htmlFor="weight"
                          className="col-4 col-form-label text-start mt-2 mb-2"
                        >
                          Weight
                        </label>
                        <div className="col-12">
                          <input
                            id="weight"
                            type="number"
                            onChange={handleWeightChange}
                            className="form-control form-background"
                            value={dataToSend.weight}
                          ></input>
                        </div>
                      </div>
                    </div>

                    <div className="col-6 offset-6">
                      <div className="form-group row">
                        <label
                          htmlFor="height"
                          className="col-4 col-form-label text-start mt-2 mb-2"
                        >
                          Height
                        </label>
                        <div className="col-12">
                          <input
                            id="height"
                            type="number"
                            onChange={handleHeightChange}
                            className="form-control form-background"
                            value={dataToSend.height}
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                  <form
                    className={`form-group row m-0 mt-4 
                      `}
                    name={`files`}
                    id={`files`}
                    // style={{ display: !item.uploaded && "none" }}
                  >
                    <label
                      className="col-6 offset-6 col-form-label text-start mb-2"
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
                    <div className="col-4 offset-6 mt-1">
                      <input
                        type="file"
                        name="files"
                        placeholder="already Added"
                        className="form-control form-background"
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
                  <div className="form-group row">
                    <label
                      htmlFor="allergies"
                      className="col-6 offset-6 col-form-label text-start mt-2 mb-2"
                    >
                      Allergies
                    </label>
                    <div className="col-6 offset-6">
                      <CreatableSelect
                        className="react-select-container font-normal"
                        classNamePrefix="react-select"
                        isClearable={true}
                        onChange={handleAllergies}
                        getOptionLabel={(option) =>
                          option.__isNew__ ? option.label : option.name
                        }
                        getOptionValue={(option) =>
                          option.__isNew__ ? option.value : option.id
                        }
                        value={null}
                        options={allergies}
                      />
                    </div>
                    {dataToSend.allergies.map((item, index) => {
                      return (
                        <>
                          <div className="col-2 offset-4 ps-0 pt-4 font-normal">
                            <TagBadge text={item.allergy_name} />
                          </div>
                          <label
                            htmlFor="note"
                            className="col-1 col-form-label text-center mb-2 visit-note pt-4"
                          >
                            Note
                          </label>
                          <div className="col-4 p-0 pt-4">
                            <input
                              id="note"
                              type="text"
                              placeholder="Note"
                              className="form-control form-background"
                              onChange={(e) =>
                                handleAllergiesNoteChange(e, index)
                              }
                              value={item.note}
                            ></input>
                          </div>
                          <div className="col-1 p-0 pt-3 ps-2">
                            <FontAwesomeIcon
                              icon="times-circle"
                              size="2x"
                              className="delete-button-morehx"
                              onClick={() =>
                                handleAllergiesRemoval(item.allergy_id)
                              }
                            ></FontAwesomeIcon>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="col-2"></div>

                <div className="col-5">
                  <div className="form-group row">
                    <label
                      htmlFor="provincy"
                      className="col-12 col-form-label text-start mb-2"
                    >
                      Province
                    </label>
                    <div className="col-6">
                      <Select
                        className="react-select-container font-normal"
                        classNamePrefix="react-select"
                        isClearable={true}
                        value={provincies.filter(
                          (province) => province.id == dataToSend.province_id
                        )}
                        onChange={handleProvinceChange}
                        getOptionValue={(option) => option.id}
                        getOptionLabel={(option) => option.name}
                        options={provincies}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="gender"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Gender *
                    </label>
                    <div className="col-6">
                      <select
                        id="gender"
                        onChange={handleGenderChange}
                        className="form-select form-background"
                        value={dataToSend.gender_id}
                        required
                      >
                        <option selected>Select</option>
                        {genders.map((gender) => (
                          <option key={gender.id} value={gender.id}>
                            {gender.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {dataToSend.gender_id == 1 && (
                      <>
                        <div className="col-1 pe-0">
                          <input
                            id="pregnant"
                            className="form-check-input"
                            type="checkbox"
                            checked={dataToSend.pregnant == 1}
                            onChange={() =>
                              setDataToSend({
                                ...dataToSend,
                                pregnant: !dataToSend.pregnant,
                              })
                            }
                          />
                        </div>
                        <label
                          className="form-check-label col-form-label pt-0 col-3 ps-0"
                          htmlFor="pregnant"
                        >
                          Pregnant
                        </label>
                      </>
                    )}
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="maritalStatus"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Marital Status
                    </label>
                    <div className="col-6">
                      <select
                        id="maritalStatus"
                        onChange={handleMaritalStatusChange}
                        className="form-select form-background"
                        value={dataToSend.marital_status_id}
                      >
                        <option selected>Select</option>
                        {marital_statuses.map((marital_status) => (
                          <option
                            key={marital_status.id}
                            value={marital_status.id}
                          >
                            {marital_status.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="dom"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Date of Marriage
                    </label>
                    <div className="col-6">
                      <input
                        id="dom"
                        type="date"
                        className="form-control form-background"
                        onChange={(e) =>
                          setDataToSend({
                            ...dataToSend,
                            date_of_marriage: e.target.value,
                          })
                        }
                        value={dataToSend.date_of_marriage}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="address"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Address
                    </label>
                    <div className="col-6">
                      <input
                        id="address"
                        type="text"
                        onChange={handleAddressChange}
                        placeholder="Address"
                        className="form-control form-background"
                        value={dataToSend.address}
                      ></input>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="spouse_name"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Spouse Name
                    </label>
                    <div className="col-6">
                      <input
                        id="spouse_name"
                        type="text"
                        placeholder="Name"
                        onChange={(e) =>
                          setDataToSend({
                            ...dataToSend,
                            spouse_name: e.target.value,
                          })
                        }
                        className="form-control form-background"
                        value={dataToSend.spouse_name}
                      ></input>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="spouse_dob"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Spouse Date of Birth
                    </label>
                    <div className="col-6">
                      <input
                        id="spouse_dob"
                        type="date"
                        className="form-control form-background"
                        onChange={(e) =>
                          setDataToSend({
                            ...dataToSend,
                            spouse_dob: e.target.value,
                          })
                        }
                        value={dataToSend.spouse_dob}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="spouse_blood_group"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Spouse Blood Group
                    </label>
                    <div className="col-6">
                      <input
                        id="spouse_blood_group"
                        type="text"
                        placeholder="Spouse Blood Group"
                        onChange={(e) =>
                          setDataToSend({
                            ...dataToSend,
                            spouse_blood_group: e.target.value,
                          })
                        }
                        className="form-control form-background"
                        value={dataToSend.spouse_blood_group}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="have_children"
                      className={`col-${
                        dataToSend.have_children == 1 ? 6 : 12
                      } col-form-label text-start mt-2 mb-2`}
                    >
                      Have Children
                    </label>

                    {dataToSend.have_children == 1 && (
                      <label
                        htmlFor="noc"
                        className="col-6 col-form-label text-start mt-2 mb-2"
                      >
                        Number of Children
                      </label>
                    )}
                    <div className="col-6">
                      <select
                        id="have_children"
                        onChange={(e) =>
                          setDataToSend({
                            ...dataToSend,
                            have_children: e.target.value,
                          })
                        }
                        className="form-select form-background"
                        value={dataToSend.have_children}
                      >
                        <option selected>Select</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                    </div>
                    {dataToSend.have_children == 1 && (
                      <div className="col-3">
                        <input
                          id="noc"
                          type="number"
                          placeholder="0"
                          onChange={(e) =>
                            setDataToSend({
                              ...dataToSend,
                              number_of_children: e.target.value,
                            })
                          }
                          className="form-control form-background"
                          value={dataToSend.noc}
                        ></input>
                      </div>
                    )}
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="youngest_child_dob"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Youngest Child Date of Birth
                    </label>
                    <div className="col-6">
                      <input
                        id="youngest_child_dob"
                        type="date"
                        className="form-control form-background"
                        onChange={(e) =>
                          setDataToSend({
                            ...dataToSend,
                            youngest_child_dob: e.target.value,
                          })
                        }
                        value={dataToSend.youngest_child_dob}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="note"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Note
                    </label>
                    <div className="col-6">
                      <textarea
                        id="note"
                        placeholder="Note"
                        className="form-control form-background textarea-note"
                        onChange={handleNoteChange}
                        value={dataToSend.note}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="form-group row justify-content-center mb-4">
                  <div className="col-3 mt-4">
                    {!saving ? (
                      <button
                        type="submit"
                        className="btn btn-block w-100 submit-button"
                      >
                        {dataToChange.id ? "Update" : "Add"} Patient
                      </button>
                    ) : (
                      <button
                        disabled
                        className="btn btn-block w-100 submit-button"
                      >
                        Saving...
                      </button>
                    )}
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

export default AddPatient;
