import { ipcRenderer } from "electron";
import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";

// import MeasurementSegment from "../growth-chart/components/MeasurementSegment";

const apiUrl = process.env.API_URL;

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

const barOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  maintainAspectRatio: false,
};

function Main({ handleOperationsButton, setShowPending }) {
  const [main, setMain] = useState({
    total_patients: 0,
    new_patients: 0,
    attended_patients: 0,
    pending_patients: 0,
    pending_operations: 0,
    unfinished_visits: 0,
    female_percentage: 0,
    male_percentage: 0,
    visits_year: { labels: [], data: [] },
    top_diseases: { labels: [], data: [] },
    top_chief_complaints: { labels: [], data: [] },
  });

  useEffect(() => {
    const getMain = async () => {
      try {
        const response = await fetch(`${apiUrl}/main`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        let responseData = await response.json();
        responseData.top_diseases.labels = responseData.top_diseases.labels.map(
          (label) => {
            return label.slice(0, 15);
          }
        );
        responseData.top_chief_complaints.labels =
          responseData.top_chief_complaints.labels.map((label) => {
            return label.slice(0, 15);
          });
        setMain({
          ...main,
          total_patients: responseData.total_patients,
          new_patients: responseData.new_patients,
          attended_patients: responseData.attended_patients,
          pending_patients: responseData.pending_patients,
          pending_operations: responseData.pending_operations,
          unfinished_visits: responseData.unfinished_visits,
          female_percentage: responseData.female_percentage,
          male_percentage: responseData.male_percentage,
          visits_year: responseData.visits_year,
          top_diseases: responseData.top_diseases,
          top_chief_complaints: responseData.top_chief_complaints,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    getMain();
  }, []);
  let visits_year = {
    labels: main.visits_year.labels,
    datasets: [
      {
        label: "Visits Per Month" + ` (${main.visits_year.note})`,
        data: main.visits_year.data,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  let top_diseases = {
    labels: main.top_diseases.labels,
    datasets: [
      {
        label: "Top 10 Diseases",
        data: main.top_diseases.data,
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  let top_chief_complaints = {
    labels: main.top_chief_complaints.labels,
    datasets: [
      {
        label: "Top 10 Chief Complaints",
        data: main.top_chief_complaints.data,
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="main pt-5 pb-5">
      {/* <MeasurementSegment /> */}
      <div className="row m-0 d-flex justify-content-center pb-3">
        <div className="col-10">
          <div className="row pt-2 pr-2 pl-2 mt-3 mb-5">
            <div className="col-3 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Total Patients</h5>
                      <h3>{main.total_patients}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-3 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>New Patients</h5>
                      <h3>{main.new_patients}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-3 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Attended Patients</h5>
                      <h3>{main.attended_patients}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-3 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Pending Visits</h5>
                      <h3>{main.pending_patients}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div
              className="col-3 p-2"
              onClick={() => {
                setShowPending(true);
                handleOperationsButton();
              }}
            >
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Pending Operations</h5>
                      <h3>{main.pending_operations}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-3 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Not-Finished Visits</h5>
                      <h3>{main.unfinished_visits}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-3 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Male Percentage</h5>
                      <h3>{main.male_percentage}%</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-3 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Female Percentage</h5>
                      <h3>{main.female_percentage}%</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-0 d-flex justify-content-center">
          <div className="col-6">
            <Line
              data={visits_year}
              options={lineOptions}
              width={80}
              height={400}
            />
          </div>
        </div>
        <div className="row m-0 d-flex justify-content-center">
          <div className="col-4">
            <Bar
              data={top_diseases}
              options={barOptions}
              width={100}
              height={400}
            />
          </div>
          <div className="col-2"></div>
          <div className="col-4">
            <Bar
              data={top_chief_complaints}
              options={barOptions}
              width={80}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;
