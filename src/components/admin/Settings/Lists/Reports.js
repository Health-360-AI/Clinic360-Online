import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import ConfirmModal from "../../../common/ConfirmModal";
import ReportEditModal from "./ReportEditModal";
const apiUrl = process.env.API_URL;

export default function Reports(props) {
  const [reports, setReports] = useState([]);
  const [reportEditModal, setReportEditModal] = useState({
    show: false,
    id: "",
    title: "",
    lang: "",
    template: "",
  });
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    id: "",
  });

  const getReports = async (search, callback) => {
    try {
      const response = await fetch(
        `${apiUrl}/reports${
          search != " " && search != undefined ? "?search=" + search : ""
        }`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      setReports(responseData.reports);
      if (callback) {
        callback(responseData.reports);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getReports();
  }, [props.show]);
  const deleteReport = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/reports/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const responseData = await response.json();
      getReports();
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
        <Modal.Title id="contained-modal-title-vcenter">Reports</Modal.Title>
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
          confirm={deleteReport}
          id={confirmModal.id}
        />
        <ReportEditModal
          show={reportEditModal.show}
          onHide={() => setReportEditModal({ ...reportEditModal, show: false })}
          dataToChange={{
            ...reportEditModal,
            id: reportEditModal.id,
            title: reportEditModal.title,
            lang: reportEditModal.lang,
            template: reportEditModal.template,
          }}
          getReports={getReports}
        />
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover text">
            <thead className="thead-dark">
              <tr>
                <th className="id-width">ID</th>
                <th className="">Title</th>
                <th className="">Language</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => {
                return (
                  <tr key={report.id} className="font-weight-bold">
                    <td className="id-width">{index + 1}</td>
                    <td className="">{report.title}</td>
                    <td className="">
                      {report.lang == "en" ? "English" : "Arabic"}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-secondary"
                        onClick={(e) => {
                          setReportEditModal({
                            ...reportEditModal,
                            show: true,
                            id: report.id,
                            title: report.title,
                            lang: report.lang,
                            template: report.template,
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
                            id: report.id,
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
              setReportEditModal({
                show: true,
                lang: "en",
              });
            }}
            className="modal-add-nav"
          >
            Add Report Template
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
