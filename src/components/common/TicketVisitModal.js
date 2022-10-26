import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";

const apiUrl = process.env.API_URL;

export default function TicketVisitModal(props) {
  const [price, setPrice] = useState(null);
  const [state, setState] = useState(null);
  const states = [
    { id: 0, name: "Free Return" },
    { id: 1, name: "Paid" },
    { id: 2, name: "Not-Paid" },
  ];
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleStateChange = async (item, action) => {
    if (action.action == "select-option") {
      setState(item.id);
    } else if (action.action == "clear") {
      setState(null);
    }
  };
  const saveVisit = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${props.patient.id}/visits`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      return responseData.visit_id;
    } catch (error) {
      console.log(error.message);
      toast.error("Failed");
    }
  };

  const saveTicket = async (visit_id) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${props.patient.id}/visits/${visit_id}/price`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            state,
            price: state == 0 ? null : price,
          }),
        }
      );
      const responseData = await response.json();
      props.socket.emit("pending-visits", {
        token: `Bearer ${localStorage.getItem("token")}`,
        role: 0,
        page: 1,
        size: 100,
        search: null,
      });
      props.socket.emit("unfinished-visits", {
        token: `Bearer ${localStorage.getItem("token")}`,
        role: 0,
        page: 1,
        size: 100,
        search: null,
      });
    } catch (error) {
      console.log(error.message);
      toast.error("Failed");
    }
  };

  const getVisit = async (visit) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${props.patient.id}/visits/${visit.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error.message);
    }
  };
  const getVisits = async (id) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${props.patient.id}/visits`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      if (responseData.visits.length != 0) {
        let selectedVisit = await getVisit(
          responseData.visits[responseData.visits.length - 1]
        );
        console.log(selectedVisit);
        props.setDataToChange({ id: id });
        props.setDataToSend({
          visit_id: id,
          chief_complaint_id: selectedVisit.chief_complaint_id,
          symptoms: selectedVisit.symptoms,
          epigastric_radius: selectedVisit.epigastric_radius,
          umbilical_radius: selectedVisit.umbilical_radius,
          hypogastric_radius: selectedVisit.hypogastric_radius,
          pelvic_radius: selectedVisit.pelvic_radius,
          thigh_radius: selectedVisit.thigh_radius,
          metabolism: selectedVisit.metabolism,
          fats_percentage: selectedVisit.fats_percentage,
          muscles_percentage: selectedVisit.muscles_percentage,
          calories: selectedVisit.calories,
          body_age: selectedVisit.body_age,
          organic_fats: selectedVisit.organic_fats,
          past_medical_history: selectedVisit.past_medical_history,
          past_surgical_history: selectedVisit.past_surgical_history,
          family_history: selectedVisit.family_history,
          smoking_history: {
            pack_year:
              selectedVisit.smoking_history != null
                ? selectedVisit.smoking_history.pack_year
                : null,
          },
          alcohol_history: {
            type:
              selectedVisit.alcohol_history != null
                ? selectedVisit.alcohol_history.type
                : null,
            concentration:
              selectedVisit.alcohol_history != null
                ? selectedVisit.alcohol_history.concentration
                : null,
            volume:
              selectedVisit.alcohol_history != null
                ? selectedVisit.alcohol_history.volume
                : null,
          },
          drug_history: selectedVisit.drug_history,
          allergies: selectedVisit.allergies,
          hr: selectedVisit.hr,
          sbp: selectedVisit.sbp,
          dbp: selectedVisit.dbp,
          rr: selectedVisit.rr,
          temp: selectedVisit.temp,
          spo2: selectedVisit.spo2,
          positive_signs: selectedVisit.positive_signs,
          relative_negatives: selectedVisit.relative_negatives,
          investigations: selectedVisit.investigations,
          report: selectedVisit.report,
          report_id: selectedVisit.report_id,
          lang: selectedVisit.lang == "ar" ? "ar" : "en",
          referral_to: selectedVisit.referral_to,
          diagnosis_id: selectedVisit.diagnosis_id,
          scientific_drugs: selectedVisit.scientific_drugs,
          trade_drugs: selectedVisit.trade_drugs,
        });
        props.setSpeech({
          ...props.speech,
          note: selectedVisit.note,
          hopi: selectedVisit.hopi,
          summary: selectedVisit.summary,
        });
      }
    } catch (error) {
      console.log(error.message);
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
          Add Visit Ticket
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-start">
        <div className="form-group row justify-content-center">
          <label
            htmlFor="type"
            className="col-2 col-form-label text-center mb-2 text-white modal-text-form"
          >
            State
          </label>
          <div className="col-6 font-normal">
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              isClearable={true}
              value={states.filter((s) => s.id == state)}
              onChange={handleStateChange}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
              options={states}
            />
          </div>
        </div>
        <div className="form-group row justify-content-center mb-0 mt-2">
          <label
            htmlFor="price"
            className="col-2 col-form-label text-center text-white modal-text-form"
          >
            Price
          </label>
          <div className="col-6">
            <input
              id="price"
              type="number"
              placeholder="0"
              className="form-control text"
              onChange={handlePriceChange}
              value={price}
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
              if (state != null) {
                let visit_id = await saveVisit();
                saveTicket(visit_id);
                getVisits(visit_id);
                props.onHide();
                props.handleEditVisitButton();
              } else {
                toast.error("Please Choose A State");
              }
            }}
            className="modal-add-nav"
          >
            Add Visit
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
