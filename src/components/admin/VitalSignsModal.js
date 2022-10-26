import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

export default function VitalSignsModal({
  patient,
  show,
  onHide,
  apiUrl,
  dataToChange,
}) {
  const [dataToSend, setDataToSend] = useState({
    visit_id: "",
    hr: "",
    dbp: "",
    sbp: "",
    rr: "",
    temp: "",
    spo2: "",
  });
  const handleHRChange = (e) =>
    setDataToSend({
      ...dataToSend,
      hr: e.target.value == "" ? null : e.target.value,
    });
  const handleSBPChange = (e) =>
    setDataToSend({
      ...dataToSend,
      sbp: e.target.value == "" ? null : e.target.value,
    });
  const handleDBPChange = (e) =>
    setDataToSend({
      ...dataToSend,
      dbp: e.target.value == "" ? null : e.target.value,
    });
  const handleRRChange = (e) =>
    setDataToSend({
      ...dataToSend,
      rr: e.target.value == "" ? null : e.target.value,
    });
  const handleTempChange = (e) =>
    setDataToSend({
      ...dataToSend,
      temp: e.target.value == "" ? null : e.target.value,
    });
  const handleSPO2Change = (e) =>
    setDataToSend({
      ...dataToSend,
      spo2: e.target.value == "" ? null : e.target.value,
    });
  useEffect(() => {
    setDataToSend({
      hr: dataToChange.hr,
      dbp: dataToChange.dbp,
      sbp: dataToChange.sbp,
      rr: dataToChange.rr,
      temp: dataToChange.temp,
      spo2: dataToChange.spo2,
    });
  }, [dataToChange]);
  const saveVitalSigns = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/visits/${dataToChange.visit_id}/vital-signs`,
        {
          method: "PATCH",
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
      console.log(dataToSend);
      const responseData = await response.json();
      if (responseData.success) {
        toast.success("Added Successfully");
      } else {
        throw new Error("Error");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Failed");
    }
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className=""
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Vital Signs
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-start">
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
        <div className="form-group row justify-content-center">
          <label
            htmlFor="hr"
            className="col-2 col-form-label text-center mb-2 text-white modal-text-form"
          >
            HR
          </label>
          <div className="col-6 font-normal">
            <input
              id="hr"
              type="number"
              onChange={handleHRChange}
              className="form-control form-background"
              value={dataToSend.hr}
            ></input>
          </div>
        </div>
        <div className="form-group row justify-content-center">
          <label
            htmlFor="sbp"
            className="col-2 col-form-label text-center mb-2 text-white modal-text-form"
          >
            SBP
          </label>
          <div className="col-6 font-normal">
            <input
              id="sbp"
              type="number"
              onChange={handleSBPChange}
              className="form-control form-background"
              value={dataToSend.sbp}
            ></input>
          </div>
        </div>
        <div className="form-group row justify-content-center">
          <label
            htmlFor="dbp"
            className="col-2 col-form-label text-center mb-2 text-white modal-text-form"
          >
            DBP
          </label>
          <div className="col-6 font-normal">
            <input
              id="dbp"
              type="number"
              onChange={handleDBPChange}
              className="form-control form-background"
              value={dataToSend.dbp}
              required
            ></input>
          </div>
        </div>
        <div className="form-group row justify-content-center">
          <label
            htmlFor="rr"
            className="col-2 col-form-label text-center mb-2 text-white modal-text-form"
          >
            RR
          </label>
          <div className="col-6 font-normal">
            <input
              id="rr"
              type="number"
              onChange={handleRRChange}
              className="form-control form-background"
              value={dataToSend.rr}
              required
            ></input>
          </div>
        </div>
        <div className="form-group row justify-content-center">
          <label
            htmlFor="temp"
            className="col-2 col-form-label text-center mb-2 text-white modal-text-form"
          >
            Temp.
          </label>
          <div className="col-6 font-normal">
            <input
              id="temp"
              type="number"
              onChange={handleTempChange}
              className="form-control form-background"
              value={dataToSend.temp}
              required
            ></input>
          </div>
        </div>
        <div className="form-group row justify-content-center">
          <label
            htmlFor="spo2"
            className="col-2 col-form-label text-center mb-2 text-white modal-text-form"
          >
            SPO<sub>2</sub>
          </label>
          <div className="col-6 font-normal">
            <input
              id="spo2"
              type="number"
              onChange={handleSPO2Change}
              className="form-control form-background"
              value={dataToSend.spo2}
              required
            ></input>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer
        className="m-0 align-items-center justify-content-center"
        dir="ltr"
      >
        <div className="">
          <Button
            onClick={async () => {
              saveVitalSigns();
              onHide();
            }}
            className="modal-add-nav"
          >
            Save
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
