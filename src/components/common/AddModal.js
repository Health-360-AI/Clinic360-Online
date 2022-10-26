import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function AddModal(props) {
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
        <Modal.Title id="contained-modal-title-vcenter">Add</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-right">
        <h4>What Do You Want to Add ?</h4>
      </Modal.Body>
      <Modal.Footer
        className="m-0 align-items-center justify-content-center"
        dir="ltr"
      >
        <div className="">
          <Button
            onClick={() => {
              props.abortListening();
              props.handleAddDrugButton();
              props.onHide();
            }}
            className="modal-add-nav"
          >
            Drug
          </Button>
        </div>
        <div className="">
          <Button
            onClick={() => {
              props.abortListening();
              props.handleAddPatientButton();
              props.onHide();
            }}
            className="modal-add-nav"
          >
            Patient
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
