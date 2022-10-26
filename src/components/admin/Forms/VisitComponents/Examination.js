import React from "react";
import Item from "./Item";
import AsyncCreatableSelect from "react-select/async-creatable";

function Examination({
  handleHRChange,
  handleSBPChange,
  handleDBPChange,
  handleRRChange,
  handleTempChange,
  handleSPO2Change,
  handlePositiveSigns,
  handlePositiveSignsRemoval,
  handlePositiveSignsRelatedChange,
  handleRelativeNegatives,
  handleRelativeNegativesRemoval,
  handleRelativeNegativesRelatedChange,
  signs,
  systems,
  dataToSend,
  getSigns,
}) {
  return (
    <div className="row justify-content-center p-0 m-0 pb-5 mb-5">
      <div className="col-12 text-center mb-2">
        <h2 className="visit-header">Examination</h2>
      </div>
      <div className="col-12 text-center mb-2">
        <h4 className="visit-header">Vital Signs</h4>
      </div>
      <div className="col-12 mb-4">
        <div className="row justify-content-center">
          <div className="col-1">
            <div className="form-group row">
              <label
                htmlFor="hr"
                className="col-8 col-form-label text-start mt-2 mb-2"
              >
                HR
              </label>
              <div className="col-10">
                <input
                  id="hr"
                  type="number"
                  onChange={handleHRChange}
                  className="form-control form-background"
                  value={dataToSend.hr}
                ></input>
              </div>
            </div>
          </div>

          <div className="col-1">
            <div className="form-group row">
              <label
                htmlFor="sbp"
                className="col-8 col-form-label text-start mt-2 mb-2"
              >
                SBP
              </label>
              <div className="col-10">
                <input
                  id="sbp"
                  type="number"
                  onChange={handleSBPChange}
                  className="form-control form-background"
                  value={dataToSend.sbp}
                ></input>
              </div>
            </div>
          </div>

          <div className="col-1">
            <div className="form-group row">
              <label
                htmlFor="dbp"
                className="col-8 col-form-label text-start mt-2 mb-2"
              >
                DBP
              </label>
              <div className="col-10">
                <input
                  id="dbp"
                  type="number"
                  onChange={handleDBPChange}
                  className="form-control form-background"
                  value={dataToSend.dbp}
                  required
                ></input>
              </div>
            </div>
          </div>

          <div className="col-1">
            <div className="form-group row">
              <label
                htmlFor="rr"
                className="col-8 col-form-label text-start mt-2 mb-2"
              >
                RR
              </label>
              <div className="col-10">
                <input
                  id="rr"
                  type="number"
                  onChange={handleRRChange}
                  className="form-control form-background"
                  value={dataToSend.rr}
                  required
                ></input>
              </div>
            </div>
          </div>

          <div className="col-1">
            <div className="form-group row">
              <label
                htmlFor="temp"
                className="col-8 col-form-label text-start mt-2 mb-2"
              >
                Temp.
              </label>
              <div className="col-10">
                <input
                  id="temp"
                  type="number"
                  onChange={handleTempChange}
                  className="form-control form-background"
                  value={dataToSend.temp}
                  required
                ></input>
              </div>
            </div>
          </div>

          <div className="col-1">
            <div className="form-group row">
              <label
                htmlFor="height"
                className="col-8 col-form-label text-start mt-2 mb-2"
              >
                SPO<sub>2</sub>
              </label>
              <div className="col-10">
                <input
                  id="height"
                  type="number"
                  onChange={handleSPO2Change}
                  className="form-control form-background"
                  value={dataToSend.spo2}
                  required
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 text-center mb-2">
        <div className="row">
          <div className="col-6">
            <div className="row">
              <h4 className="col-12 visit-header mb-4">Positive Signs</h4>
            </div>
            <div className="form-group row">
              <label
                htmlFor="trade_name"
                className="col-2 offset-1 col-form-label text-center mb-2"
              >
                Sign
              </label>
              <div className="col-6 ps-0 pe-4">
                <AsyncCreatableSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  isClearable={true}
                  onChange={handlePositiveSigns}
                  getOptionLabel={(option) =>
                    option.__isNew__ ? option.label : option.name
                  }
                  getOptionValue={(option) =>
                    option.__isNew__ ? option.value : option.id
                  }
                  value={null}
                  loadOptions={getSigns}
                  defaultOptions={signs}
                />
              </div>
            </div>
            {dataToSend.positive_signs.map((item, index) => {
              return (
                <Item
                  divToShow="Related"
                  index={index}
                  tag={item.sign_name}
                  key={item.sign_id}
                  handleRemoval={handlePositiveSignsRemoval}
                  handleRelatedChange={handlePositiveSignsRelatedChange}
                  id={item.sign_id}
                  systems={systems}
                  system_id={item.system_id}
                />
              );
            })}
          </div>
          <div className="col-6">
            <div className="row">
              <h4 className="col-12 visit-header mb-4">Relative Negatives</h4>
            </div>
            <div className="form-group row">
              <label
                htmlFor="trade_name"
                className="col-2 offset-1 col-form-label text-center mb-2"
              >
                Sign
              </label>
              <div className="col-6 ps-0 pe-4">
                <AsyncCreatableSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  isClearable={true}
                  onChange={handleRelativeNegatives}
                  getOptionLabel={(option) =>
                    option.__isNew__ ? option.label : option.name
                  }
                  getOptionValue={(option) =>
                    option.__isNew__ ? option.value : option.id
                  }
                  value={null}
                  loadOptions={getSigns}
                  defaultOptions={signs}
                />
              </div>
            </div>
            {dataToSend.relative_negatives.map((item, index) => {
              return (
                <Item
                  divToShow="Related"
                  index={index}
                  tag={item.sign_name}
                  key={item.sign_id}
                  handleRemoval={handleRelativeNegativesRemoval}
                  handleRelatedChange={handleRelativeNegativesRelatedChange}
                  id={item.sign_id}
                  systems={systems}
                  system_id={item.system_id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Examination;
