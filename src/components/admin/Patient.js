import React, { useState } from "react";
import { useEffect } from "react";
import FileModalView from "../common/FileModalView";

const apiUrl = process.env.API_URL;
function Patient({
  patient,
  setPatient,
  handleBMITrackerButton,
  handleVisitsButton,
  handleOperationsButton,
  setShowBack,
  showTop,
}) {
  const smokings = [
    { id: "0", name: "non-smoker" },
    { id: "1", name: "smoker" },
    { id: "2", name: "ex-smoker" },
    { id: "3", name: "passive-smoker" },
  ];
  const marital_statuses = [
    { id: "1", name: "Single" },
    { id: "2", name: "Married " },
    { id: "3", name: "Divorced" },
    { id: "4", name: "Widow" },
  ];
  const genders = [
    { id: "1", name: "Female" },
    { id: "2", name: "Male " },
    { id: "3", name: "Unknown" },
  ];

  const [invx, setInvx] = useState({ id: 0, name: "", fileModalShow: false });
  const [patientInfo, setPatientInfo] = useState({
    files_path: null,
    number_of_children: null,
    youngest_child_dob: null,
    smoker: null,
    note: null,
    phone_number: null,
    bmi: 0,
    pregnant: null,
    height: null,
    identifier: 7004,
    referral: null,
    job: "",
    ph: null,
    spouse_name: null,
    spouse_blood_group: null,
    dob: "2022-10-06",
    spouse_dob: null,
    blood_group: null,
    period_of_infertility: null,
    weight: null,
    address: "",
    have_children: null,
    date_of_1st_pregnancy: null,
    date_of_marriage: null,
    name: "",
    lab: null,
    return_visit: null,
    alcoholic: null,
    age: "0 months",
    allergies: [],
    last_visit: null,
    gender: "Male",
  });

  const [filesLength, setFilesLength] = useState(0);
  const [photos, setPhotos] = useState([]);

  const getPatientInfo = async () => {
    try {
      const response = await fetch(`${apiUrl}/patients/${patient.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const responseData = await response.json();
      setPatientInfo(responseData);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const ff = async () => {
      let fsf = await getFilesNum();
      setFilesLength(fsf ? fsf : 0);
    };
    getPatientInfo();
    ff();
  }, []);
  const getFilesNum = async () => {
    try {
      const response = await fetch(`${apiUrl}/patients/files/${patient.id}`, {
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
        result = result.concat({ image: await getFile(i), num: i });
      }
      setPhotos(result);
      return responseData.num_files + 1;
    } catch (error) {
      console.log(error.message);
    }
  };

  const getFile = async (num) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/files/${patient.id}?num=${num}`,
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
  return (
    <section className="main pt-5 pb-5">
      {invx.fileModalShow && (
        <FileModalView
          show={invx.fileModalShow}
          onHide={() => setInvx({ ...invx, fileModalShow: false })}
          name={invx.name}
          photos={photos}
        />
      )}
      <div
        className={`row m-0 d-flex justify-content-center ${
          showTop && "pt-5"
        } mt-2 pb-3`}
      >
        <div className={showTop ? "col-9" : "col-12"}>
          {showTop && (
            <div className="row justify-content-center mb-4">
              {/* <button
              className="col-2 btn btn-primary pause-visit-button"
              onClick={() => {
                // handlePrescriptionDataSend();
                // handlePauseVisit();
              }}
              type="button"
            >
              Add Visit
            </button> */}
              <button
                className="col-2 ms-4 btn btn-secondary end-visit-button"
                onClick={() => {
                  setShowBack(true);
                  setPatient(patient);
                  handleVisitsButton();
                }}
                type="button"
              >
                Show All Visits
              </button>
              {/* <button
              className="col-2 ms-4 btn btn-primary pause-visit-button"
              onClick={() => {}}
              type="button"
            >
              Add Operation
            </button> */}
              <button
                className="col-2 ms-4 btn btn-secondary end-visit-button"
                onClick={() => {
                  setShowBack(true);
                  setPatient(patient);
                  handleOperationsButton();
                }}
                type="button"
              >
                Show All Operations
              </button>
              <button
                className="col-2 ms-4 btn btn-primary pause-visit-button"
                onClick={() => {
                  setShowBack(true);
                  setPatient(patient);
                  handleBMITrackerButton();
                }}
                type="button"
              >
                BMI Tracker
              </button>
            </div>
          )}
          <div className="row">
            <div className="col-6">
              <div className="form-group row">
                <label
                  htmlFor=""
                  className="col-6 col-form-label text-start mb-2 label-font-size"
                >
                  Name
                </label>
                <div className="col-6 col-form-label label-font-size">
                  <p>{patientInfo.name}</p>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor=""
                  className="col-6 col-form-label text-start mb-2 label-font-size"
                >
                  Date of Birth
                </label>
                <div className="col-6 col-form-label label-font-size">
                  <p>{patientInfo.dob}</p>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor=""
                  className="col-6 col-form-label text-start mb-2 label-font-size"
                >
                  Gender
                </label>
                <div className="col-6 col-form-label label-font-size">
                  <p>{patientInfo.gender}</p>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor=""
                  className="col-6 col-form-label text-start mb-2 label-font-size"
                >
                  Phone No.
                </label>
                <div className="col-6 col-form-label label-font-size">
                  <p>{patientInfo.phone_number}</p>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor=""
                  className="col-6 col-form-label text-start mb-2 label-font-size"
                >
                  Referral
                </label>
                <div className="col-6 col-form-label label-font-size">
                  <p>{patientInfo.referral}</p>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor=""
                  className="col-6 col-form-label text-start mb-2 label-font-size"
                >
                  Blood Group
                </label>
                <div className="col-6 col-form-label label-font-size">
                  <p>{patientInfo.blood_group}</p>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor=""
                  className="col-6 col-form-label text-start mb-2 label-font-size"
                >
                  Smoking
                </label>
                <div className="col-6 col-form-label label-font-size">
                  <p>
                    {smokings.filter(
                      (smoke) => smoke.id == patientInfo.smoker
                    )[0] &&
                      smokings.filter(
                        (smoke) => smoke.id == patientInfo.smoker
                      )[0].name}
                  </p>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor=""
                  className="col-6 col-form-label text-start mb-2 label-font-size"
                >
                  Alcoholic
                </label>
                <div className="col-6 col-form-label label-font-size">
                  <p>{patientInfo.alcoholic == 1 ? "Yes" : "No"}</p>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor=""
                  className="col-6 col-form-label text-start mb-2 label-font-size"
                >
                  Job
                </label>
                <div className="col-6 col-form-label label-font-size">
                  <p>{patientInfo.job}</p>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor=""
                  className="col-6 col-form-label text-start mb-2 label-font-size"
                >
                  Weight
                </label>
                <div className="col-6 col-form-label label-font-size">
                  <p>{patientInfo.weight}</p>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor=""
                  className="col-6 col-form-label text-start mb-2 label-font-size"
                >
                  Height
                </label>
                <div className="col-6 col-form-label label-font-size">
                  <p>{patientInfo.height}</p>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor=""
                  className="col-6 col-form-label text-start mb-2 label-font-size"
                >
                  Allergies
                </label>
                <div className="col-6 col-form-label label-font-size">
                  <p>
                    {patientInfo.allergies.map((allergy, index) => {
                      return `${index + 1}- ${allergy.allergy_name}`;
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-12">
                  <div
                    className="card card-common bg-primary"
                    onClick={() => {
                      setInvx({
                        id: patientInfo.id,
                        name: patientInfo.name,
                        fileModalShow: true,
                      });
                      setPhotos(photos ? photos : []);
                      getFilesNum();
                    }}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div className="text-left text-white">
                          <h5>Files</h5>
                          <h3>{filesLength}</h3>
                        </div>
                        <i className="fas fa-user fa-3x text-danger"></i>
                      </div>
                    </div>
                    <div className="card-footer text-white text-end">
                      <i className="fas fa-sync mr-3"></i>
                      <span>Updated Now</span>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group row">
                    <label
                      htmlFor=""
                      className="col-6 col-form-label text-start mb-2 label-font-size"
                    >
                      Province
                    </label>
                    <div className="col-6 col-form-label label-font-size">
                      <p>{patientInfo.province}</p>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor=""
                      className="col-6 col-form-label text-start mb-2 label-font-size"
                    >
                      Address
                    </label>
                    <div className="col-6 col-form-label label-font-size">
                      <p>{patientInfo.address}</p>
                    </div>
                  </div>
                  {patientInfo.gender_id != "2" && (
                    <div className="form-group row">
                      <label
                        htmlFor=""
                        className="col-6 col-form-label text-start mb-2 label-font-size"
                      >
                        Pregnant
                      </label>
                      <div className="col-6 col-form-label label-font-size">
                        <p>{patientInfo.pregnant == 1 ? "Yes" : "No"}</p>
                      </div>
                    </div>
                  )}
                  <div className="form-group row">
                    <label
                      htmlFor=""
                      className="col-6 col-form-label text-start mb-2 label-font-size"
                    >
                      Marital Status
                    </label>
                    <div className="col-6 col-form-label label-font-size">
                      <p>{patientInfo.marital_status}</p>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor=""
                      className="col-6 col-form-label text-start mb-2 label-font-size"
                    >
                      Date of Marriage
                    </label>
                    <div className="col-6 col-form-label label-font-size">
                      <p>{patientInfo.date_of_marriage}</p>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor=""
                      className="col-6 col-form-label text-start mb-2 label-font-size"
                    >
                      Spouse Name
                    </label>
                    <div className="col-6 col-form-label label-font-size">
                      <p>{patientInfo.spouse_name}</p>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor=""
                      className="col-6 col-form-label text-start mb-2 label-font-size"
                    >
                      Spouse Date of Birth
                    </label>
                    <div className="col-6 col-form-label label-font-size">
                      <p>{patientInfo.spouse_dob}</p>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor=""
                      className="col-6 col-form-label text-start mb-2 label-font-size"
                    >
                      Spouse Blood Group
                    </label>
                    <div className="col-6 col-form-label label-font-size">
                      <p>{patientInfo.spouse_blood_group}</p>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor=""
                      className="col-6 col-form-label text-start mb-2 label-font-size"
                    >
                      Number of Children
                    </label>
                    <div className="col-6 col-form-label label-font-size">
                      <p>{patientInfo.number_of_children}</p>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor=""
                      className="col-6 col-form-label text-start mb-2 label-font-size"
                    >
                      Note
                    </label>
                    <div className="col-6 col-form-label label-font-size">
                      <p>{patientInfo.note}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Patient;
