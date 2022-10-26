import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Line } from "react-chartjs-2";

const lineOptions = {
  radius: 5,
  hitRadius: 20,
  hoverRadius: 12,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  maintainAspectRatio: false,
};
export default function BMITrackerModal({ patient, show, onHide, apiUrl }) {
  const [main, setMain] = useState([]);

  const getBMI = async () => {
    try {
      const response = await fetch(`${apiUrl}/patients/${patient.id}/bmi`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const responseData = await response.json();
      setMain(responseData.bmi);
      setBMI({
        labels: responseData.bmi.map((item) => {
          return item.date;
        }),
        datasets: [
          {
            label: "BMI Tracker",
            data: responseData.bmi.map((item) => {
              return item.bmi;
            }),
            fill: false,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgba(255, 99, 132, 0.2)",
          },
        ],
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBMI();
  }, [patient]);

  const BMISend = async (weight, height) => {
    try {
      const response = await fetch(`${apiUrl}/patients/${patient.id}/bmi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          weight,
          height,
        }),
      });

      const responseData = await response.json();
      getBMI();
    } catch (error) {
      console.log(error.message);
    }
  };

  const [BMI, setBMI] = useState({
    labels: main.labels,
    datasets: [
      {
        label: "BMI Tracker",
        data: main.data,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  });
  const handleBMIAdd = async () => {
    setMain([...main, { weight: "", height: "" }]);
  };

  const BMIDelete = async (id) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${patient.id}/bmi/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const responseData = await response.json();
      getBMI();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleBMIDelete = (index, id) => {
    const fh = [...main];
    fh.splice(index, 1);
    if (id) {
      BMIDelete(id);
    } else {
      setMain(fh);
    }
  };

  const handleWeightChange = (e, index) => {
    const fh = [...main];
    fh[index].weight = e.target.value;
    setMain(fh);
  };
  const handleHeightChange = (e, index) => {
    const fh = [...main];
    fh[index].height = e.target.value;
    setMain(fh);
  };
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
        <Modal.Title id="contained-modal-title-vcenter">BMITracker</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-start">
        <div className="row m-0">
          <div className="col-12 text-center">
            <h2> General Info. </h2>
          </div>
          <div className="col-12 text-center">
            <div className="row mt-3 text-center visit-general">
              <div className="col-2 offset-2">
                <p>Name: {patient.name}</p>
              </div>
              <div className="col-2">
                <p>Gender: {patient.gender}</p>
              </div>
              <div className="col-2">
                <p>Age: {patient.age}</p>
              </div>
              <div className="col-2">
                <p>Province: {patient.province}</p>
              </div>
              <div className="col-2"></div>
              <div className="col-2 offset-2">
                <p>Marital Status: {patient.marital_status}</p>
              </div>
              <div className="col-2">
                <p>Phone: {patient.phone_number}</p>
              </div>
              <div className="col-2">
                <p>Job: {patient.job}</p>
              </div>
              <div className="col-2">
                <p>Address: {patient.address}</p>
              </div>
            </div>
          </div>
          <div className="col-5 mt-3">
            <div className="form-group row m-0 justify-content-center">
              <h3 className="col-12">BMI</h3>
              {main.map((item, index) => {
                return (
                  <div className="col-12 mb-3" key={index}>
                    <div className="row m-0 justify-content-center">
                      {item.id ? (
                        <>
                          <div className="col-12">
                            <div className="row">
                              <label
                                htmlFor="weight"
                                className="col-3 col-form-label text-start mt-2 mb-2"
                              >
                                Weight
                              </label>
                              <div className="col-9">
                                <input
                                  id="weight"
                                  type="number"
                                  onChange={(e) => handleWeightChange(e, index)}
                                  className="form-control form-background"
                                  value={item.weight}
                                  disabled
                                ></input>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row">
                              <label
                                htmlFor="height"
                                className="col-3 col-form-label text-start mt-2 mb-2"
                              >
                                Height
                              </label>
                              <div className="col-9">
                                <input
                                  id="height"
                                  type="number"
                                  onChange={(e) => handleHeightChange(e, index)}
                                  className="form-control form-background"
                                  value={item.height}
                                  disabled
                                ></input>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-12">
                            <div className="row">
                              <label
                                htmlFor="weight"
                                className="col-3 col-form-label text-start mt-2 mb-2"
                              >
                                Weight
                              </label>
                              <div className="col-9">
                                <input
                                  id="weight"
                                  type="number"
                                  onChange={(e) => handleWeightChange(e, index)}
                                  className="form-control form-background"
                                  value={item.weight}
                                  required
                                ></input>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row">
                              <label
                                htmlFor="height"
                                className="col-3 col-form-label text-start mt-2 mb-2"
                              >
                                Height
                              </label>
                              <div className="col-9">
                                <input
                                  id="height"
                                  type="number"
                                  onChange={(e) => handleHeightChange(e, index)}
                                  className="form-control form-background"
                                  value={item.height}
                                  required
                                ></input>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      <div className="col-12">
                        <div className="row">
                          <label
                            htmlFor="bmi"
                            className="col-3 col-form-label text-start mt-2 mb-2"
                          >
                            BMI
                          </label>
                          <div className="col-9">
                            <input
                              id="bmi"
                              type="number"
                              className="form-control form-background"
                              value={item.bmi}
                              disabled
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="row">
                          <label
                            htmlFor="state"
                            className="col-3 col-form-label text-start mt-2 mb-2"
                          >
                            State
                          </label>
                          <div className="col-9">
                            <input
                              id="state"
                              type="text"
                              className="form-control form-background"
                              value={item.state}
                              disabled
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="col-4 mt-3">
                        <button
                          className="btn btn-danger w-100"
                          onClick={() => handleBMIDelete(index, item.id)}
                        >
                          Delete
                        </button>
                      </div>
                      <div className="col-4 mt-3">
                        <button
                          className="btn btn-success w-100"
                          onClick={() => BMISend(item.weight, item.height)}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="row justify-content-center">
              <div className="col-4 mt-4 mb-5">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleBMIAdd}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="col-5 mt-5 mb-5 h-100">
            <Line data={BMI} options={lineOptions} width={80} height={400} />
          </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer
        className="m-0 align-items-center justify-content-center"
        dir="ltr"
      >
        <div className="">
          <Button
            onClick={async () => {
              saveVitalSigns();
              onHide();
            }}
            className="modal-add-nav"
          >
            Save
          </Button>
        </div>
      </Modal.Footer> */}
    </Modal>
  );
}
