import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import ConfirmModal from "../../../common/ConfirmModal";
import ReportEditModal from "./ReportEditModal";
const apiUrl = process.env.API_URL;

export default function ChiefComplaints(props) {
  const [chiefComplaints, setChiefComplaints] = useState([]);
  const [chiefComplaintsEditModal, setChiefComplaintsEditModal] = useState({
    show: false,
    id: "",
    name: "",
  });
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    id: "",
  });

  const getChiefComplaints = async (search, callback) => {
    try {
      const response = await fetch(
        `${apiUrl}/chief-complaints${
          search != " " && search != undefined ? "?search=" + search : ""
        }`,
        {
          method: "GET",
        }
      );
      const responseData = await response.json();
      setChiefComplaints(responseData.chief_complaints);
      if (callback) {
        callback(responseData.chief_complaints);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getChiefComplaints();
  }, [props.show]);
  const deleteChiefComplaint = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/chief-complaints/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer`,
        },
      });

      const responseData = await response.json();
      getChiefComplaints();
      toast.success("Deleted Successfully");
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
          Chief Complaints
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-start">
        <ConfirmModal
          show={confirmModal.show}
          onHide={() =>
            setConfirmModal({
              ...confirmModal,
              show: false,
              id: "",
            })
          }
          confirm={deleteChiefComplaint}
          id={confirmModal.id}
        />
        <ReportEditModal
          show={chiefComplaintsEditModal.show}
          onHide={() =>
            setChiefComplaintsEditModal({
              ...chiefComplaintsEditModal,
              show: false,
            })
          }
          dataToChange={{
            ...chiefComplaintsEditModal,
            id: chiefComplaintsEditModal.id,
            name: chiefComplaintsEditModal.name,
          }}
          getChiefComplaints={getChiefComplaints}
        />
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover text">
            <thead className="thead-dark">
              <tr>
                <th className="id-width">ID</th>
                <th className="">Name</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {chiefComplaints.map((chiefComplaint, index) => {
                return (
                  <tr key={chiefComplaint.id} className="font-weight-bold">
                    <td className="id-width">{index + 1}</td>
                    <td className="">{chiefComplaint.name}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-secondary"
                        onClick={(e) => {
                          setChiefComplaintsEditModal({
                            ...chiefComplaintsEditModal,
                            show: true,
                            id: chiefComplaint.id,
                            name: chiefComplaint.name,
                          });
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-danger"
                        onClick={(e) => {
                          setConfirmModal({
                            ...confirmModal,
                            show: true,
                            id: chiefComplaint.id,
                          });
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer
        className="m-0 align-items-center justify-content-center"
        dir="ltr"
      >
        <div className="">
          <Button
            onClick={() => {
              setChiefComplaintsEditModal({
                show: true,
              });
            }}
            className="modal-add-nav"
          >
            Add Chief Complaint
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
