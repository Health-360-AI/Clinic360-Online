import React from "react";
import TagBadge from "../../common/TagBadge";

function Prescription({ selectedVisit }) {
  return (
    <div className="row justify-content-center p-0 m-0">
      <div className="col-12 text-center mb-2">
        <h2 className="visit-header">Prescription</h2>
      </div>
      <div className="col-12">
        <div className="row mb-2 text-start visit-general">
          <div className="col-1 offset-2">
            <p className="mt-2">Dx: </p>
          </div>
          <div className="col-6 ps-0 pe-4">
            <p className="mt-2">{selectedVisit.diagnosis_name}</p>
          </div>
        </div>
      </div>
      <div className="col-12 mb-4">
        <div className="row justify-content-center">
          <div className="col-6">
            {selectedVisit.trade_drugs.map((trade_drug, index) => {
              return (
                <div className="row" key={trade_drug.drug_id}>
                  <div className="col-8">
                    <div className="row">
                      <div className="col-4 ps-4">
                        <TagBadge text={trade_drug.drug_name} />
                      </div>
                      <label
                        htmlFor="trade_drug_times"
                        className="col-1 offset-4 col-form-label text-center mb-2 text-related ps-0 pe-0"
                      >
                        Times
                      </label>
                      <div className="col-3">
                        <p>{trade_drug.times_name}</p>
                      </div>
                      <label
                        htmlFor="trade_drug_period"
                        className="col-1 col-form-label text-center mb-2 text-related ps-0 pe-0"
                      >
                        For
                      </label>
                      <div className="col-2">
                        <p>{trade_drug.period}</p>
                      </div>
                      <label
                        htmlFor="trade_drug_period"
                        className="col-1 col-form-label text-center mb-2 text-related ps-0 pe-0"
                      >
                        Duration
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}

            {selectedVisit.scientific_drugs.map((scientific_drug, index) => {
              return (
                <div className="row" key={scientific_drug.drug_id}>
                  <div className="col-8">
                    <div className="row">
                      <div className="col-4 ps-4">
                        <TagBadge text={scientific_drug.drug_name} />
                      </div>
                      <label
                        htmlFor="scientific_drug_dose"
                        className="col-1 col-form-label text-center mb-2 text-related ps-0 pe-0"
                      >
                        Dose
                      </label>
                      <div className="col-3">
                        <p>{scientific_drug.dose}</p>
                      </div>
                      <label
                        htmlFor="scientific_drug_type"
                        className="col-1 col-form-label text-center mb-2 text-related ps-0 pe-0"
                      >
                        Type
                      </label>
                      <div className="col-3">
                        <p>{scientific_drug.type_name}</p>
                      </div>
                      <label
                        htmlFor="scientific_drug_times"
                        className="col-1 offset-4 col-form-label text-center mb-2 text-related ps-0 pe-0"
                      >
                        Times
                      </label>
                      <div className="col-3">
                        <p>{scientific_drug.times_name}</p>
                      </div>
                      <label
                        htmlFor="scientific_drug_period"
                        className="col-1 col-form-label text-center mb-2 text-related ps-0 pe-0"
                      >
                        For
                      </label>
                      <div className="col-2">
                        <p>{scientific_drug.period}</p>
                      </div>
                      <label
                        htmlFor="scientific_drug_period"
                        className="col-1 col-form-label text-center mb-2 text-related ps-0 pe-0"
                      >
                        Duration
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="row justify-content-center">
              <label
                htmlFor="note"
                className="col-12 col-form-label text-center mb-2 label-font-size"
              >
                Note
              </label>
              <div className="col-12 text-center">
                <p>{selectedVisit.prescription_note}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prescription;
