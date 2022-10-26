import { ipcRenderer } from "electron";
import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
let child_process = require("child_process");

export default function FileModalView(props) {
  // useEffect(() => {
  //   if (props.photo instanceof Blob) {
  //     document.getElementById("invx-img").src = URL.createObjectURL(
  //       props.photo
  //     );
  //   }
  // });
  //   useEffect(() => {
  //     props.photos.map((photo, index) => {
  //       !["image/png", "image/jpeg", "image/gif"].includes(photo.image.type) &&
  //         window.open(URL.createObjectURL(photo.image));
  //     });
  //   }, []);
  const renderPhotos = (source, index) => {
    return (
      <>
        <img
          src={URL.createObjectURL(source.image)}
          alt=""
          key={index}
          id="invx-img"
          width="400px"
          onDoubleClick={() =>
            ipcRenderer.send(
              "image-view-url",
              URL.createObjectURL(source.image)
            )
          }
        />
      </>
    );
  };
  const renderFiles = (source, index) => {
    return (
      <>
        {/* <img
          src={URL.createObjectURL(source.image)}
          alt=""
          key={index}
          id="invx-img"
          width="400px"
          onDoubleClick={() =>
            ipcRenderer.send(
              "image-view-url",
              URL.createObjectURL(source.image)
            )
          }
        /> */}
        <div className="row">
          <p
            onClick={() => window.open(URL.createObjectURL(source.image))}
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
            className="col-2"
          >
            {index + 1}- {source.image.type}
          </p>
        </div>
      </>
    );
  };
  return (
    <Modal
      show={true}
      onHide={props.onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className=""
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Files of {props.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-right">
        {props.photos.map((photo, index) => {
          if (
            ["image/png", "image/jpeg", "image/gif"].includes(photo.image.type)
          ) {
            return renderPhotos(photo, index);
          } else {
            return renderFiles(photo, index);
          }
        })}
      </Modal.Body>
    </Modal>
  );
}
