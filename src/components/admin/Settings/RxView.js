import { ipcRenderer } from "electron";
import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

export default function RxView({
  onHide,
  headerPhoto,
  refd,
  onMouseMove,
  width,
  height,
  setMarginTop,
  tMargin,
  leftMargin,
  rightMargin,
  fontSize,
  landscape,
}) {
  //   if (document.getElementById("header-img2") != null) {
  //     if (headerPhoto instanceof Blob) {
  //       document.getElementById("header-img2").src =
  //         URL.createObjectURL(headerPhoto);
  //     }
  //   }
  //   if (document.getElementById("footer-img2") != null) {
  //     if (footerPhoto instanceof Blob) {
  //       document.getElementById("footer-img2").src =
  //         URL.createObjectURL(footerPhoto);
  //     }
  //   }

  return (
    <Modal
      show={true}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className=""
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Specify the start of Rx by Click
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-right p-0">
        <div
          className="row m-0 p-0"
          id="print-rx"
          ref={refd}
          onMouseMove={onMouseMove}
          style={{
            width: landscape ? height : width,
            height: landscape ? width : height,
            background: `url(${headerPhoto}) 0% 0% / cover no-repeat`,
          }}
          onClick={setMarginTop}
        >
          <div className="col-12 p-0">
            <div
              className="row"
              style={{
                marginTop: tMargin,
                marginLeft: leftMargin,
                marginRight: rightMargin,
              }}
            >
              <h6
                className="col-6 p-0 text-start"
                dir="rtl"
                style={{ cursor: "default", fontSize: fontSize + "px" }}
              >
                [Start Here]
              </h6>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
