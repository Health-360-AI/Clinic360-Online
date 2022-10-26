import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const HEALTH360_GATEWAY_V = process.env.HEALTH360_GATEWAY_V;

export default function ForgotPasswordModal(props) {
  const [email, setEmail] = useState("");

  const forgotPassword = async () => {
    try {
      const response = await fetch(
        `${HEALTH360_GATEWAY_V}/users/forgot-password?email=${email}`,
        {
          method: "POST",
        }
      );
      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData.message);
        props.onHide();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
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
          Forgot Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-start">
        <div className="row justify-content-center">
          <label
            htmlFor="type"
            className="col-2 col-form-label text-center mb-2 text-white modal-text-form"
          >
            Email
          </label>
          <div className="col-6">
            <input
              id="email"
              type="text"
              className="form-control form-background"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
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
              forgotPassword();
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
