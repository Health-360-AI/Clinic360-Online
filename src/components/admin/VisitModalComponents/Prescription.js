import React from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import CreatableSelect from "react-select/creatable";
import TagBadge from "../../common/TagBadge";
import AsyncSelect from "react-select/async";

function Prescription({
  diseases,
  getDiseases,
  getTradeDrugs,
  trade_drugs,
  getScientificDrugs,
  scientific_drugs,
  handleDxChange,
  handleTradeDrugChange,
  handleTradeDrugTimesChange,
  handleTradeDrugPeriodChange,
  handleTradeDrugRemoval,
  handleScientificDrugChange,
  handleScientificDrugDoseChange,
  handleScientificDrugTypeChange,
  handleScientificDrugTimesChange,
  handleScientificDrugPeriodChange,
  handleScientificDrugRemoval,
  handlePrescriptionNoteChange,
  date,
  patient,
  dataToSend,
  showDx,
  setShowDx,times,
  types
}) {
  return (
    <>
      <div className="col-12 text-center mb-2 mt-4">
        <h2 className="visit-header">Prescription</h2>
      </div>
      <div className="col-12 mb-1">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-7 p-0">
            <div
              className="row justify-content-center text-end mb-2 visit-general"
              // dir="rtl"
            >
              <div className="col-4">
                <p>التاريخ: {date}</p>
              </div>
              <div className="col-5 offset-1">
                <p>الاسم: {patient.name}</p>
              </div>
              <div className="col-3"></div>
              <div className="col-3 offset-3">
                <p>العمر: {patient.age}</p>
              </div>
            </div>
            <div className="row mb-2 text-center visit-general">
              <div className="col-3 mb-1">
                <p className="mt-2">Dx:</p>
              </div>
              <div className="col-6 ps-0 pe-4">
                <AsyncCreatableSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  isClearable={true}
                  onChange={handleDxChange}
                  getOptionLabel={(option) =>
                    option.__isNew__ ? option.label : option.name
                  }
                  getOptionValue={(option) =>
                    option.__isNew__ ? option.value : option.id
                  }
                  value={diseases.filter(
                    (disease) => disease.id == dataToSend.diagnosis_id
                  )}
                  loadOptions={getDiseases}
                  defaultOptions={diseases}
                />
              </div>

              <h6 className="col-3 pt-2">
                {diseases.filter(
                  (disease) => disease.id == dataToSend.diagnosis_id
                )[0] &&
                  diseases.filter(
                    (disease) => disease.id == dataToSend.diagnosis_id
                  )[0].code &&
                  `ICD-10 Code: ` +
                    diseases.filter(
                      (disease) => disease.id == dataToSend.diagnosis_id
                    )[0].code}
              </h6>
            </div>
            <div className="form-group row mb-2 text-start visit-general">
              <label
                htmlFor="trade_name"
                className="col-3 col-form-label text-center mb-2"
              >
                Trade Name
              </label>
              <div className="col-8 ps-0 pe-4">
                <AsyncCreatableSelect
                  inputId="trade_name"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  isClearable={true}
                  value={null}
                  onChange={handleTradeDrugChange}
                  getOptionValue={(option) =>
                    option.__isNew__ ? option.value : option.id
                  }
                  getOptionLabel={(option) =>
                    option.__isNew__ ? option.label : option.name
                  }
                  loadOptions={getTradeDrugs}
                  defaultOptions={trade_drugs}
                />
              </div>
            </div>

            {dataToSend.trade_drugs.map((trade_drug, index) => {
              return (
                <div className="row" key={index}>
                  <div className="col-8">
                    <div className="row">
                      <div className="col-4 ps-4">
                        <TagBadge text={trade_drug.drug_name} />
                      </div>
                      <label
                        htmlFor="trade_drug_times"
                        className="col-2 col-form-label text-center mb-2 text-related ps-0 pe-0"
                      >
                        Times
                      </label>
                      <div className="col-6">
                        <CreatableSelect
                          className="react-select-container"
                          classNamePrefix="react-select"
                          isClearable={true}
                          onChange={(i, a) =>
                            handleTradeDrugTimesChange(i, a, index)
                          }
                          getOptionLabel={(option) =>
                            option.__isNew__ ? option.label : option.name
                          }
                          getOptionValue={(option) =>
                            option.__isNew__ ? option.value : option.id
                          }
                          value={times.filter(
                            (time) => time.id == trade_drug.times_id
                          )}
                          options={times}
                        />
                      </div>
                      <label
                        htmlFor="trade_drug_period"
                        className="col-2 offset-4 col-form-label text-center mb-2 text-related ps-0 pe-0"
                      >
                        Duration
                      </label>
                      <div className="col-6">
                        <input
                          id="trade_drug_period"
                          type="text"
                          placeholder=""
                          className="form-control form-background"
                          onChange={(e) =>
                            handleTradeDrugPeriodChange(e, index)
                          }
                          value={trade_drug.period}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 mb-5">
                    <div className="row justify-content-center delete-button">
                      <button
                        className="col-6 btn btn-danger delete-button-in-visit"
                        onClick={(e) => handleTradeDrugRemoval(e, index)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="form-group row mb-2 text-start visit-general">
              <label
                htmlFor="scientific_name"
                className="col-3 col-form-label text-center mb-2"
              >
                Scientific Name
              </label>
              <div className="col-8 ps-0 pe-4">
                <AsyncSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  isClearable={true}
                  value={null}
                  onChange={handleScientificDrugChange}
                  getOptionLabel={(option) =>
                    option.__isNew__ ? option.label : option.name
                  }
                  getOptionValue={(option) =>
                    option.__isNew__ ? option.value : option.id
                  }
                  loadOptions={getScientificDrugs}
                  defaultOptions={scientific_drugs}
                />
              </div>
            </div>

            {dataToSend.scientific_drugs.map((scientific_drug, index) => {
              return (
                <div className="row" key={index}>
                  <div className="col-8">
                    <div className="row">
                      <div className="col-4 ps-4">
                        <TagBadge text={scientific_drug.drug_name} />
                      </div>
                      <label
                        htmlFor="scientific_drug_dose"
                        className="col-2 col-form-label text-center mb-2 text-related ps-0 pe-0"
                      >
                        Dose
                      </label>
                      <div className="col-6">
                        <input
                          id="scientific_drug_dose"
                          type="text"
                          placeholder=""
                          className="form-control form-background"
                          onChange={(e) =>
                            handleScientificDrugDoseChange(e, index)
                          }
                          value={scientific_drug.dose}
                        ></input>
                      </div>
                      <label
                        htmlFor="scientific_drug_type"
                        className="col-2 offset-4 col-form-label text-center mb-2 text-related ps-0 pe-0"
                      >
                        Type
                      </label>
                      <div className="col-6">
                        <CreatableSelect
                          className="react-select-container"
                          classNamePrefix="react-select"
                          isClearable={true}
                          onChange={(i, a) =>
                            handleScientificDrugTypeChange(i, a, index)
                          }
                          getOptionLabel={(option) =>
                            option.__isNew__ ? option.label : option.name
                          }
                          getOptionValue={(option) =>
                            option.__isNew__ ? option.value : option.id
                          }
                          value={types.filter(
                            (type) => type.id == scientific_drug.type_id
                          )}
                          options={types}
                        />
                      </div>
                      <label
                        htmlFor="scientific_drug_times"
                        className="col-2 offset-4 col-form-label text-center mb-2 text-related ps-0 pe-0"
                      >
                        Times
                      </label>
                      <div className="col-6">
                        <CreatableSelect
                          className="react-select-container"
                          classNamePrefix="react-select"
                          isClearable={true}
                          onChange={(i, a) =>
                            handleScientificDrugTimesChange(i, a, index)
                          }
                          getOptionLabel={(option) =>
                            option.__isNew__ ? option.label : option.name
                          }
                          getOptionValue={(option) =>
                            option.__isNew__ ? option.value : option.id
                          }
                          value={times.filter(
                            (time) => time.id == scientific_drug.times_id
                          )}
                          options={times}
                        />
                      </div>
                      <label
                        htmlFor="scientific_drug_period"
                        className="col-2 offset-4 col-form-label text-center mb-2 text-related ps-0 pe-0"
                      >
                        For
                      </label>
                      <div className="col-4">
                        <input
                          id="scientific_drug_period"
                          type="text"
                          placeholder=""
                          className="form-control form-background"
                          onChange={(e) =>
                            handleScientificDrugPeriodChange(e, index)
                          }
                          value={scientific_drug.period}
                        ></input>
                      </div>
                      <label
                        htmlFor="scientific_drug_period"
                        className="col-2 col-form-label text-center mb-2 text-related ps-0 pe-0"
                      >
                        Duration
                      </label>
                    </div>
                  </div>
                  <div className="col-4 mb-5">
                    <div className="row justify-content-center delete-button">
                      <button
                        className="col-6 btn btn-danger delete-button-in-visit"
                        onClick={(e) => handleScientificDrugRemoval(e, index)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="row mb-2">
              <label
                htmlFor="note"
                className="col-3 col-form-label text-center mb-2 mt-1"
              >
                Note
              </label>
              <div className="col-8 ps-0">
                <textarea
                  id="note"
                  placeholder="Note"
                  className="form-control form-background textarea-note"
                  onChange={handlePrescriptionNoteChange}
                  value={dataToSend.prescription_note}
                ></textarea>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className={"form-check mb-2 checkboxes col-6"}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={showDx}
                  onChange={() => setShowDx(!showDx)}
                />
                <label className="form-check-label">
                  Show Diagnosis on Print
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Prescription;
