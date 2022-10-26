import React from "react";

function Top({ patient }) {
  console.log(patient);
  return (
    <section className="main pt-5">
      <div className="row m-0">
        {patient.pregnant == 1 && (
          <div className="top-alert bg-danger">
            <div className="row justify-content-center m-0">
              Patient is Pregnant
            </div>
          </div>
        )}
        {patient.allergies.map((allergy) => (
          <div className="top-alert bg-danger">
            <div className="row justify-content-center m-0">
              Patient is Allergic to {allergy.allergy_name}
            </div>
          </div>
        ))}
        <div className="col-12 pe-2 ps-2 mt-4">
          <h2 className="ps-3">Add Visit</h2>
        </div>
        <div className="col-12 text-center">
          <h2> General Info. </h2>
        </div>
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
    </section>
  );
}

export default Top;
