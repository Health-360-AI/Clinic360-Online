import React, { useState, useEffect } from "react";

const GeneralPage = ({ data, edit }) => {
  console.log(data);
  return (
    <div
      className={"width-others-wide ms-auto main-view fadeIn"}
      id="main-view"
    >
      <div className="row">
        <div className="col-12">
          <p className="pt-3">Name: {data.name}</p>
        </div>
        <div className="col-12">
          <p>Degrees: {data.degrees}</p>
        </div>
        <div className="col-12">
          <p>Department: {data.department}</p>
        </div>
        <div className="col-12">
          <p>Speciality: {data.speciality}</p>
        </div>
        <div className="col-12">
          <p>Email: {data.email}</p>
        </div>
        <div className="col-12">
          <p>Address: {data.address}</p>
        </div>
        <div className="col-12">
          <p>Time: {data.Time}</p>
        </div>
        <div className="col-12">
          <p>Working Days: {data.days}</p>
        </div>
        <div className="col-12">
          <p>Phone: {data.phone}</p>
        </div>
        <div className="col-12">
          <p>
            Status:{" "}
            {JSON.parse(localStorage.getItem("subscribed")) == true
              ? "Active"
              : "Not Active"}
          </p>
        </div>

        <div className="col-4 offset-4 mb-2">
          <button onClick={edit} className="btn btn-secondary text-white w-100">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralPage;
