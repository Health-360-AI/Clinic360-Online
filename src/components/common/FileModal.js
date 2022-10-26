import { ipcRenderer } from "electron";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmModalInside from "./ConfirmModalInside";

export default function FileModal(props) {
  // useEffect(() => {
  //   if (props.photo instanceof Blob) {
  //     document.getElementById("invx-img").src = URL.createObjectURL(
  //       props.photo
  //     );
  //   }
  // });
  // useEffect(() => {
  //   props.photos.map((photo, index) => {
  //     !["image/png", "image/jpeg", "image/gif"].includes(photo.image.type) &&
  // window.open(URL.createObjectURL(photo.image));
  //   });
  // }, []);
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    num: "",
    index: "",
    invx_index: "",
    type: "",
  });
  const renderPhotos = (source, index, invx_index) => {
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
        {props.showDelete && (
          <FontAwesomeIcon
            icon="times-circle"
            size="2x"
            className="delete-button-morehx"
            onClick={() =>
              setConfirmModal({
                ...confirmModal,
                show: true,
                num: source.num,
                index: index,
                invx_index: invx_index,
                type: props.type,
              })
            }
          ></FontAwesomeIcon>
        )}
      </>
    );
  };
  const renderFiles = (source, index, invx_index) => {
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
          {props.showDelete && (
            <div className="col-1">
              <FontAwesomeIcon
                icon="times-circle"
                size="2x"
                className="delete-button-morehx"
                style={{ width: "25px", height: "25px" }}
                onClick={() => {
                  setConfirmModal({
                    ...confirmModal,
                    show: true,
                    num: source.num,
                    index: index,
                    invx_index: invx_index,
                    type: props.type,
                  });
                  // props.removeFile(source.num, index, invx_index, props.type)
                }}
              ></FontAwesomeIcon>
            </div>
          )}
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
      <ConfirmModalInside
        show={confirmModal.show}
        onHide={() =>
          setConfirmModal({
            ...confirmModal,
            show: false,
            num: "",
            index: "",
            invx_index: "",
            type: "",
          })
        }
        confirmModal={confirmModal}
        confirm={props.removeFile}
      />
      <Modal.Body className="text-right">
        {props.photos.map((photo, index) => {
          if (
            ["image/png", "image/jpeg", "image/gif"].includes(photo.image.type)
          ) {
            return renderPhotos(photo, index, props.index);
          } else {
            return renderFiles(photo, index, props.index);
          }
        })}
      </Modal.Body>
    </Modal>
  );
}
