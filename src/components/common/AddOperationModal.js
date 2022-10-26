import React from "react";
import { Modal, Button } from "react-bootstrap";
import AddOperation from "../admin/Forms/AddOperation";

export default function AddOperationModal({
  show,
  onHide,
  patient,
  dataToChange,
  transcript,
  listening,
  resetTranscript,
  loadingSpeechRecognition,
  startListening,
  SpeechRecognition,
  page,
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className=""
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Operation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-right">
        <AddOperation
          patient={patient}
          dataToChange={dataToChange}
          transcript={transcript}
          listening={listening}
          resetTranscript={resetTranscript}
          loadingSpeechRecognition={loadingSpeechRecognition}
          startListening={startListening}
          SpeechRecognition={SpeechRecognition}
          page={page}
        />
      </Modal.Body>
      <Modal.Footer
        className="m-0 align-items-center justify-content-center"
        dir="ltr"
      >
        {/* <div className="">
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
        </div> */}
      </Modal.Footer>
    </Modal>
  );
}
