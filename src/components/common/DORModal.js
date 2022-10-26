import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

export default function DORModal(props) {
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
          Date of Return
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-start">
        <div className="row justify-content-center">
          <div className="col-6">
            <input
              id="date"
              type="date"
              className="form-control form-background"
              onChange={props.handleDORChange}
              value={props.dorModal.dor}
              //   required
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer
        className="m-0 align-items-center justify-content-center"
        dir="ltr"
      >
        <div className="">
          <Button
            onClick={() => {
              props.onHide();
            }}
            className="btn btn-secondary"
          >
            No
          </Button>
        </div>
        <div className="">
          <Button
            onClick={() => {
              props.saveDOR(props.dorModal.id);
              props.onHide();
            }}
            className="btn btn-success"
          >
            Yes
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
