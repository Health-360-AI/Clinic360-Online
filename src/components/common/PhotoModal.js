import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function PhotoModal(props) {
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
          Header or Footer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-right">
        <img id="prescription-img" src={props.photo} width="400px" />
      </Modal.Body>
    </Modal>
  );
}
