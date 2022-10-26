import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const HEALTH360_GATEWAY_V = process.env.HEALTH360_GATEWAY_V;

export default function PharmaciesModal({
  show,
  onHide,
  patient,
  dataToSend,
  socketGateway,
  setSubscribed,
}) {
  const [pharmacies, setPharmacies] = useState([]);
  const getPharmacies = async () => {
    let userInfo = await getUserInfo();
    try {
      const response = await fetch(
        `${HEALTH360_GATEWAY_V}/users/get-pharmacies?token=${localStorage.getItem(
          "token"
        )}&doctor_id=${userInfo.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      if (responseData.success) {
        setPharmacies(responseData.pharmacies);
      } else if (responseData.error == "Signature has expired") {
        setSubscribed(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        `${HEALTH360_GATEWAY_V}/users/user-info?token=${localStorage.getItem(
          "token"
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      if (responseData.success) {
        return {
          id: responseData.doctor.id,
          name: responseData.doctor.name,
        };
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSendToPharmacy = async (id) => {
    let userInfo = await getUserInfo();
    socketGateway.emit("send_prescription_to_pharmacy", {
      token: `${localStorage.getItem("token")}`,
      rx: {
        id: patient.identifier,
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        province: patient.province,
        trade_drugs: dataToSend.trade_drugs,
        scientific_drugs: dataToSend.scientific_drugs,
        prescription_note: dataToSend.prescription_note,
        diagnosis_id: dataToSend.diagnosis_id,
        diagnosis_name: dataToSend.diagnosis_name,
        doctor_name: userInfo.name,
      },
      pharmacy_id: id,
    });
    toast.success("Sent Successfully");
  };
  useEffect(() => {
    getPharmacies();
  }, []);
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className=""
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Choose Pharmacy to Send
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-right">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover text">
            <thead className="thead-dark">
              <tr>
                <th className="id-width">No.</th>
                <th className="name-width">Name</th>
                <th className="age-width">Email</th>
                <th className="gender-width">Address</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {pharmacies.map((pharmacy, index) => {
                return (
                  <tr key={pharmacy.pharmacy.id} className="font-weight-bold">
                    <td className="id-width">{index + 1}</td>
                    <td className="name-width">{pharmacy.pharmacy.name}</td>
                    <td className="age-width">{pharmacy.pharmacy.email}</td>
                    <td className="gender-width">
                      {pharmacy.pharmacy.address}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          handleSendToPharmacy(pharmacy.pharmacy.id);
                        }}
                        className="btn btn-primary text-white"
                      >
                        Send
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Modal.Body>
    </Modal>
  );
}
