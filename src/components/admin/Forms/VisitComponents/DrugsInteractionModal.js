import React from "react";
import { Modal, Button } from "react-bootstrap";
import Loading from "../../../common/Loading";

export default function DrugsInteractionModal({
  show,
  interactionData,
  onHide,
}) {
  const interaction = (drug) => {
    if (
      drug.severity.match(new RegExp("Serious", "i")) ||
      drug.severity.match(new RegExp("Contraindicated", "i"))
    ) {
      return (
        <>
          <div className="badge bg-danger">
            <h3>{drug.severity}</h3>
          </div>
          <h4 className="">subject: {drug.subject}</h4>
          <h4 className="">object: {drug.object}</h4>
          <h6 className="">{drug.text}</h6>
        </>
      );
    } else {
      return (
        <>
          <div className="badge bg-secondary">
            <h3>{drug.severity}</h3>
          </div>
          <h4 className="">subject: {drug.subject}</h4>
          <h4 className="">object: {drug.object}</h4>
          <h6 className="">{drug.text}</h6>
        </>
      );
    }
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className=""
    >
      {interactionData.loading == true ? (
        <Loading />
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Drugs Interaction
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-right">
            {interactionData.result ? (
              interactionData.multiInteractions.length == 0 ? (
                <div className="badge bg-success">
                  <h3>No Interaction Found</h3>
                </div>
              ) : (
                interactionData.multiInteractions.map((drug) =>
                  interaction(drug)
                )
              )
            ) : (
              <div className="badge bg-danger">
                <h5>Error Check Connection or Add more Drugs</h5>
              </div>
            )}
          </Modal.Body>
        </>
      )}
    </Modal>
  );
}
