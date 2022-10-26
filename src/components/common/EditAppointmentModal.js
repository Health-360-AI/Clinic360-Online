import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import AsyncSelect from "react-select/async";

const apiUrl = process.env.API_URL;

export default function EditAppointmentModal(props) {
  const [dataToSend, setDataToSend] = useState({
    id: "",
    title: "",
    patient_id: null,
  });
  const [saving, setSaving] = useState(false);
  const [patients, setPatients] = useState([]);
  const handleTitleChange = (e) =>
    setDataToSend({ ...dataToSend, title: e.target.value });
  const handlePatientChange = async (item, action) => {
    console.log(item, action);
    if (action.action == "select-option") {
      setDataToSend({ ...dataToSend, patient_id: item.id });
    } else if (action.action == "clear") {
      setDataToSend({ ...dataToSend, patient_id: null });
    }
  };

  const getPatients = async (search, callback) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients-name-number${
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
      setPatients(responseData.patients);
      if (callback) {
        callback(responseData.patients);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (Object.keys(props.dataToChange).length != 0) {
      if (props.dataToChange.patient_id) {
        setPatients([
          ...patients,
          {
            id: props.patient.patient_id,
            name: props.patient.patient_name,
          },
        ]);
      }
      setDataToSend(props.dataToChange);
    }
  }, [props.show]);

  const saveAppointment = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/appointments${
          props.dataToChange.id ? `/${dataToSend.id}` : ""
        }`,
        {
          method: props.dataToChange.id ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            start: props.editAppointmentModal.start,
            end: props.editAppointmentModal.end,
            all_day: props.editAppointmentModal.all_day,
            title: dataToSend.title,
            patient_id: dataToSend.patient_id,
          }),
        }
      );
      const responseData = await response.json();
      props.calendar.refetchEvents();
      toast.success("Saved Successfully");
    } catch (error) {
      console.log(error.message);
      toast.error("Failed");
    }
  };
  const deleteAppointment = async () => {
    try {
      const response = await fetch(`${apiUrl}/appointments/${dataToSend.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const responseData = await response.json();
      props.calendar.refetchEvents();
      toast.success("Deleted Successfully");
    } catch (error) {
      console.log(error.message);
      toast.error("Failed");
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className=""
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Appointments
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-start">
        <div className="form-group row justify-content-center">
          <label
            htmlFor="title"
            className="col-2 col-form-label text-center mb-2 text-white modal-text-form"
          >
            Title
          </label>
          <div className="col-6">
            <input
              id="title"
              type="text"
              placeholder="Title"
              className="form-control text"
              onChange={handleTitleChange}
              value={dataToSend.title}
              required
            ></input>
          </div>
        </div>
        <div className="form-group row justify-content-center mb-0 mt-2">
          <label
            htmlFor="patient"
            className="col-2 col-form-label text-center text-white modal-text-form"
          >
            Patient
          </label>
          <div className="col-6 font-normal">
            <AsyncSelect
              inputId="patient"
              className="react-select-container"
              classNamePrefix="react-select"
              isClearable={true}
              value={patients.filter(
                (patient) => patient.id == dataToSend.patient_id
              )}
              onChange={handlePatientChange}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
              loadOptions={getPatients}
              defaultOptions={patients}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer
        className="m-0 align-items-center justify-content-center"
        dir="ltr"
      >
        {props.dataToChange.id ? (
          <>
            <div className="">
              <Button
                onClick={async () => {
                  saveAppointment();
                  props.onHide();
                }}
                className="modal-add-nav"
              >
                Edit Appointment
              </Button>
            </div>
            <div className="">
              <Button
                onClick={async () => {
                  deleteAppointment();
                  props.onHide();
                }}
                className="btn btn-danger"
              >
                Delete Appointment
              </Button>
            </div>
          </>
        ) : (
          <div className="">
            <Button
              onClick={async () => {
                saveAppointment();
                props.onHide();
              }}
              className="modal-add-nav"
            >
              Save Appointment
            </Button>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
}
