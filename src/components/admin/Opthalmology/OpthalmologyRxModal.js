import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

export default function OpthalmologyRxModal({
  show,
  onHide,
  dataToSend,
  setDataToSend,
}) {
  const handle_oculus_sinister_sphere_rx = (e) => {
    setDataToSend({ ...dataToSend, oculus_sinister_sphere_rx: e.target.value });
  };
  const handle_oculus_sinister_cylinder_rx = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_sinister_cylinder_rx: e.target.value,
    });
  };
  const handle_oculus_sinister_axis_rx = (e) => {
    setDataToSend({ ...dataToSend, oculus_sinister_axis_rx: e.target.value });
  };
  const handle_oculus_sinister_add_rx = (e) => {
    setDataToSend({ ...dataToSend, oculus_sinister_add_rx: e.target.value });
  };
  const handle_oculus_dextrus_sphere_rx = (e) => {
    setDataToSend({ ...dataToSend, oculus_dextrus_sphere_rx: e.target.value });
  };
  const handle_oculus_dextrus_cylinder_rx = (e) => {
    setDataToSend({
      ...dataToSend,
      oculus_dextrus_cylinder_rx: e.target.value,
    });
  };
  const handle_oculus_dextrus_axis_rx = (e) => {
    setDataToSend({ ...dataToSend, oculus_dextrus_axis_rx: e.target.value });
  };
  const handle_oculus_dextrus_add_rx = (e) => {
    setDataToSend({ ...dataToSend, oculus_dextrus_add_rx: e.target.value });
  };
  const handle_oculus_ipd_rx = (e) => {
    setDataToSend({ ...dataToSend, oculus_ipd_rx: e.target.value });
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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Rx</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-start">
        <div className="row justify-content-center">
          <table className="table table-striped table-bordered table-hover text">
            <thead className="thead-dark">
              <tr>
                <th className="">Rx</th>
                <th className="">Sphere</th>
                <th className="">Cylinder</th>
                <th className="">Axis</th>
                <th className="">Add</th>
                <th className="">IPD</th>
              </tr>
            </thead>
            <tbody>
              <tr className="font-weight-bold">
                <td className="">OD</td>
                <td className="">
                  <input
                    id="oculus_dextrus_sphere_rx"
                    type="text"
                    className="form-control form-background"
                    onChange={handle_oculus_dextrus_sphere_rx}
                    value={dataToSend.oculus_dextrus_sphere_rx}
                  />
                </td>
                <td className="">
                  <input
                    id="oculus_dextrus_cylinder_rx"
                    type="text"
                    className="form-control form-background"
                    onChange={handle_oculus_dextrus_cylinder_rx}
                    value={dataToSend.oculus_dextrus_cylinder_rx}
                  />
                </td>
                <td className="">
                  <input
                    id="oculus_dextrus_axis_rx"
                    type="text"
                    className="form-control form-background"
                    onChange={handle_oculus_dextrus_axis_rx}
                    value={dataToSend.oculus_dextrus_axis_rx}
                  />
                </td>
                <td className="">
                  <input
                    id="oculus_dextrus_add_rx"
                    type="text"
                    className="form-control form-background"
                    onChange={handle_oculus_dextrus_add_rx}
                    value={dataToSend.oculus_dextrus_add_rx}
                  />
                </td>
                <td rowspan="2">
                  <input
                    id="ipd_rx"
                    type="text"
                    className="form-control form-background"
                    style={{ height: "90px" }}
                    onChange={handle_oculus_ipd_rx}
                    value={dataToSend.oculus_ipd_rx}
                  />
                </td>
              </tr>
              <tr className="font-weight-bold">
                <td className="">OS</td>
                <td className="">
                  <input
                    id="oculus_sinister_sphere_rx"
                    type="text"
                    className="form-control form-background"
                    onChange={handle_oculus_sinister_sphere_rx}
                    value={dataToSend.oculus_sinister_sphere_rx}
                  />
                </td>
                <td className="">
                  <input
                    id="oculus_sinister_cylinder_rx"
                    type="text"
                    className="form-control form-background"
                    onChange={handle_oculus_sinister_cylinder_rx}
                    value={dataToSend.oculus_sinister_cylinder_rx}
                  />
                </td>
                <td className="">
                  <input
                    id="oculus_sinister_axis_rx"
                    type="text"
                    className="form-control form-background"
                    onChange={handle_oculus_sinister_axis_rx}
                    value={dataToSend.oculus_sinister_axis_rx}
                  />
                </td>
                <td className="">
                  <input
                    id="oculus_sinister_add_rx"
                    type="text"
                    className="form-control form-background"
                    onChange={handle_oculus_sinister_add_rx}
                    value={dataToSend.oculus_sinister_add_rx}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer
        className="m-0 align-items-center justify-content-center"
        dir="ltr"
      >
        {/* <div className="">
          <Button
            onClick={() => {
              onHide();
            }}
            className="btn btn-secondary"
          >
            Don't Save
          </Button>
        </div> */}
        <div className="">
          <Button
            onClick={() => {
              onHide();
            }}
            className="btn btn-primary"
          >
            Print
          </Button>
        </div>
        <div className="">
          <Button
            onClick={() => {
              onHide();
            }}
            className="btn btn-success"
          >
            Save
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
