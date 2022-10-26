import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";

const apiUrl = process.env.API_URL;

export default function TicketModal(props) {
  const [dataToSend, setDataToSend] = useState({
    id: "",
    state: "",
    price: null,
  });
  const [saving, setSaving] = useState(false);
  const states = [
    { id: 0, name: "Free Return" },
    { id: 1, name: "Paid" },
    { id: 2, name: "Not-Paid" },
  ];
  const handlePriceChange = (e) =>
    setDataToSend({ ...dataToSend, price: e.target.value });
  const handleStateChange = async (item, action) => {
    if (action.action == "select-option") {
      setDataToSend({ ...dataToSend, state: item.id });
    } else if (action.action == "clear") {
      setDataToSend({ ...dataToSend, state: null });
    }
  };

  useEffect(() => {
    if (Object.keys(props.dataToChange).length != 0) {
      setDataToSend(props.dataToChange);
    }
  }, [props.show]);

  const saveTicket = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${dataToSend.patient_id}/visits/${dataToSend.visit_id}/price`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            state: dataToSend.state,
            price: dataToSend.state == 0 ? null : dataToSend.price,
          }),
        }
      );
      const responseData = await response.json();
      props.getMain();
      props.getTickets();
      if (props.getPatientsTicket) {
        props.getPatientsTicket();
      }
      toast.success("Saved Successfully");
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
          Edit Ticket
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
              value={states.filter((s) => s.id == dataToSend.state)}
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
              value={dataToSend.price}
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
              if (dataToSend.state != null) {
                saveTicket();
                props.onHide();
              } else {
                toast.error("Please Choose A State");
              }
            }}
            className="modal-add-nav"
          >
            Edit Ticket
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
