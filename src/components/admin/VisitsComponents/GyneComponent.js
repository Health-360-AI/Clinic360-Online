import React from "react";

function GyneComponent({
  lmp,
  edd,
  gestational_age,
  gravidity,
  parity,
  abortion,
  abortion_note,
  last_ultrasound,
  last_ultrasound_note,
}) {
  return (
    <div className="col-8">
      <div className="row m-0 pt-5 pb-5 justify-content-center">
        <h2 className="text-center">Gynecological Info.</h2>
        <div className="col-4">
          <div className="form-group row mt-2">
            <label
              htmlFor="lmp"
              className="col-6 col-form-label text-start mb-2"
            >
              Last Mestrual Period
            </label>
            <div className="col-6 mt-2">
              <p>{lmp}</p>
            </div>
          </div>
          <div className="form-group row mt-2">
            <label
              htmlFor="edd"
              className="col-6 col-form-label text-start mb-2"
            >
              Expected Date of Delivery
            </label>
            <div className="col-6 mt-2">
              <p>{edd}</p>
            </div>
          </div>
          <div className="form-group row mt-2">
            <label
              htmlFor="gestational_age"
              className="col-6 col-form-label text-start mb-2"
            >
              Gestational Age
            </label>
            <div className="col-6 mt-2">
              <p>{gestational_age}</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group row mt-2">
            <label
              htmlFor="gravidity"
              className="col-6 col-form-label text-start mb-2"
            >
              Gravidity
            </label>
            <div className="col-6 mt-2">
              <p>{gravidity}</p>
            </div>
          </div>
          <div className="form-group row mt-2">
            <label
              htmlFor="parity"
              className="col-6 col-form-label text-start mb-2"
            >
              Parity
            </label>
            <div className="col-6 mt-2">
              <p>{parity}</p>
            </div>
          </div>
          <div className="form-group row mt-2">
            <label
              htmlFor="abortion"
              className="col-6 col-form-label text-start mb-2"
            >
              Abortion
            </label>
            <div className="col-6 mt-2">
              <p>{abortion}</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group row mt-2">
            <label
              htmlFor="abortion_note"
              className="col-6 col-form-label text-start mb-2"
            >
              Abortion Note
            </label>
            <div className="col-6 mt-2">
              <p>{abortion_note}</p>
            </div>
          </div>
          <div className="form-group row mt-2">
            <label
              htmlFor="last_ultrasound"
              className="col-6 col-form-label text-start mb-2"
            >
              Last Ultrasound
            </label>
            <div className="col-6 mt-2">
              <p>{last_ultrasound}</p>
            </div>
          </div>
          <div className="form-group row mt-2">
            <label
              htmlFor="last_ultrasound_note"
              className="col-6 col-form-label text-start mb-2"
            >
              Last Ultrasound Note
            </label>
            <div className="col-6 mt-2">
              <p>{last_ultrasound_note}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GyneComponent;
