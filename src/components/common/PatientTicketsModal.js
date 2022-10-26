import { ipcRenderer } from "electron";
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import TicketModal from "./TicketModal";

const apiUrl = process.env.API_URL;

export default function PatientTicketsModal(props) {
  const [ticketModal, setTicketModal] = useState({ show: false });
  const [dataToChange, setDataToChange] = useState({});
  const [tickets, setTickets] = useState([]);
  const getTickets = async () => {
    try {
      const response = await fetch(`${apiUrl}/patients/${props.id}/tickets`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const responseData = await response.json();
      setTickets(responseData.visits_tickets);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (props.id) {
      getTickets();
    }
  }, [props.show]);
  const ticketState = (v) => {
    if (v == 0) {
      return "Free Return";
    } else if (v == 1) {
      return "Paid";
    } else if (v == 2) {
      return "Not-Paid";
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className=""
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Tickets of Patient {props.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-right">
        <div className="table-responsive">
          <TicketModal
            show={ticketModal.show}
            onHide={() =>
              setTicketModal({
                ...ticketModal,
                show: false,
              })
            }
            dataToChange={dataToChange}
            getTickets={getTickets}
            getMain={props.getMain}
            getPatientsTicket={props.getPatientsTicket}
          />
          <table className="table table-striped table-bordered table-hover text">
            <thead className="thead-dark">
              <tr>
                <th className="id-width">ID</th>
                <th className="">Date</th>
                <th className="gender-width">Ticket State</th>
                <th className="job-width">Price</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, index) => {
                return (
                  <tr key={ticket.visit_id} className="font-weight-bold">
                    <td className="id-width">{index + 1}</td>
                    <td className="">{ticket.date}</td>
                    <td className="gender-width">
                      {ticketState(ticket.state)}
                    </td>
                    <td className="job-width">{ticket.price}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-secondary"
                        onClick={(e) => {
                          setDataToChange({
                            visit_id: ticket.id,
                            patient_id: ticket.patient_id,
                            state: ticket.state,
                            price: ticket.price,
                          });
                          setTicketModal({
                            ...ticketModal,
                            show: true,
                          });
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Modal.Body>
    </Modal>
  );
}
