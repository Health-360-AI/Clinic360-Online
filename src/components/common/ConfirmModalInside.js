import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

export default function ConfirmModal(props) {
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
          Confirmation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-start">
        <h4>Are you sure ?</h4>
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
            className="modal-add-nav"
          >
            No
          </Button>
        </div>
        <div className="">
          <Button
            onClick={() => {
              props.confirm(
                props.confirmModal.num,
                props.confirmModal.index,
                props.confirmModal.invx_index,
                props.confirmModal.type
              );
              props.onHide();
            }}
            className="btn btn-danger"
          >
            Yes
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
