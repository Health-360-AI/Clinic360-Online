import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import Item from "./Item";
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from "react-select/async-creatable";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function MoreHx({
  handlePastMedicalHx,
  handlePastMedicalHxRemoval,
  handlePastMedicalHxNoteChange,
  handlePastSurgicalHx,
  handlePastSurgicalHxRemoval,
  handlePastSurgicalHxNoteChange,
  handleFamilyHx,
  handleFamilyHxRemoval,
  handleRelativeChange,
  handleDrugHx,
  handleDrugHxRemoval,
  handleDoseChange,
  handleAllergies,
  handleAllergiesRemoval,
  handleAllergiesNoteChange,
  diseases,
  family_members,
  surgeries,
  drugs,
  allergies,
  dataToSend,
  setDataToSend,
  getDiseases,
  getSurgeries,
  getScientificDrugs,
  seeMoreHx,
  cig,
  years,
  calculatePackYear,
  handleCigarettesChange,
  handleYearsChange,
  handleAlcoholTypeChange,
  handleAlcoholConcentrationChange,
  handleAlcoholVolumeChange,
  handleSeeSystem,
  showing,
}) {
  return (
    <div className="row justify-content-center p-0 m-0 pb-5 mb-5">
      <div className="col-12 text-center">
        <h2 className="visit-header">More Hx.</h2>
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-3 offset-2 text-center mb-2">
            <h4 className="visit-header">Past Medical History</h4>
            <TransitionGroup
              className={
                seeMoreHx.past_medical_hx
                  ? `morehx-transition`
                  : `ros-ntransition`
              }
            >
              {seeMoreHx.past_medical_hx && (
                <CSSTransition
                  timeout={1000}
                  classNames="item"
                  unmountOnExit={true}
                >
                  <>
                    <div className="form-group row justify-content-center mb-3">
                      <div className="col-10">
                        <AsyncCreatableSelect
                          className="react-select-container"
                          classNamePrefix="react-select"
                          isClearable={true}
                          onChange={handlePastMedicalHx}
                          getOptionLabel={(option) =>
                            option.__isNew__ ? option.label : option.name
                          }
                          getOptionValue={(option) =>
                            option.__isNew__ ? option.value : option.id
                          }
                          value={null}
                          loadOptions={getDiseases}
                          defaultOptions={diseases}
                        />
                      </div>
                    </div>
                    {dataToSend.past_medical_history.map((item, index) => {
                      return (
                        <Item
                          divToShow="Note"
                          index={index}
                          tag={item.disease_name}
                          key={item.disease_id}
                          handleRemoval={handlePastMedicalHxRemoval}
                          id={item.disease_id}
                          handleNoteChange={handlePastMedicalHxNoteChange}
                          note={item.note}
                        />
                      );
                    })}
                  </>
                </CSSTransition>
              )}
            </TransitionGroup>
            {showing(seeMoreHx.past_medical_hx, "past_medical_hx")}
          </div>
          <div className="col-3 offset-2 text-center mb-2">
            <h4 className="visit-header">Past Surgical History</h4>
            <TransitionGroup
              className={
                seeMoreHx.past_surgical_hx
                  ? `morehx-transition`
                  : `ros-ntransition`
              }
            >
              {seeMoreHx.past_surgical_hx && (
                <CSSTransition
                  timeout={1000}
                  classNames="item"
                  unmountOnExit={true}
                >
                  <>
                    <div className="form-group row justify-content-center mb-3">
                      <div className="col-10">
                        <AsyncCreatableSelect
                          className="react-select-container"
                          classNamePrefix="react-select"
                          isClearable={true}
                          onChange={handlePastSurgicalHx}
                          getOptionLabel={(option) =>
                            option.__isNew__ ? option.label : option.name
                          }
                          getOptionValue={(option) =>
                            option.__isNew__ ? option.value : option.id
                          }
                          value={null}
                          loadOptions={getSurgeries}
                          defaultOptions={surgeries}
                        />
                      </div>
                    </div>
                    {dataToSend.past_surgical_history.map((item, index) => {
                      return (
                        <Item
                          divToShow="Note"
                          index={index}
                          tag={item.surgery_name}
                          key={item.surgery_id}
                          handleRemoval={handlePastSurgicalHxRemoval}
                          id={item.surgery_id}
                          handleNoteChange={handlePastSurgicalHxNoteChange}
                          note={item.note}
                        />
                      );
                    })}
                  </>
                </CSSTransition>
              )}
            </TransitionGroup>
            {showing(seeMoreHx.past_surgical_hx, "past_surgical_hx")}
          </div>
          <div className="col-3 offset-2 text-center mb-2">
            <h4 className="visit-header">Family History</h4>
            <TransitionGroup
              className={
                seeMoreHx.family_hx ? `morehx-transition` : `ros-ntransition`
              }
            >
              {seeMoreHx.family_hx && (
                <CSSTransition
                  timeout={1000}
                  classNames="item"
                  unmountOnExit={true}
                >
                  <>
                    <div className="form-group row justify-content-center mb-3">
                      <div className="col-10">
                        <CreatableSelect
                          className="react-select-container"
                          classNamePrefix="react-select"
                          isClearable={true}
                          onChange={handleFamilyHx}
                          getOptionLabel={(option) =>
                            option.__isNew__ ? option.label : option.name
                          }
                          getOptionValue={(option) =>
                            option.__isNew__ ? option.value : option.id
                          }
                          value={null}
                          options={diseases}
                        />
                      </div>
                    </div>
                    {dataToSend.family_history.map((item, index) => {
                      return (
                        <>
                          <Item
                            divToShow="Relative"
                            index={index}
                            tag={item.disease_name}
                            key={index}
                            handleRemoval={handleFamilyHxRemoval}
                            id={item.disease_id}
                            family_members={family_members}
                            handleRelativeChange={handleRelativeChange}
                            relative_id={item.relative_id}
                          />
                          {item.relative_id ? (
                            ""
                          ) : (
                            <p>
                              Please Select A Relative or it will not be saved
                            </p>
                          )}
                        </>
                      );
                    })}
                  </>
                </CSSTransition>
              )}
            </TransitionGroup>
            {showing(seeMoreHx.family_hx, "family_hx")}
          </div>
          <div className="col-3 offset-2 text-center">
            <h4 className="visit-header">Drug History</h4>
            <TransitionGroup
              className={
                seeMoreHx.drug_hx ? `morehx-transition` : `ros-ntransition`
              }
            >
              {seeMoreHx.drug_hx && (
                <CSSTransition
                  timeout={1000}
                  classNames="item"
                  unmountOnExit={true}
                >
                  <>
                    <div className="form-group row justify-content-center mb-3">
                      <div className="col-10">
                        <AsyncSelect
                          className="react-select-container"
                          classNamePrefix="react-select"
                          isClearable={true}
                          onChange={handleDrugHx}
                          getOptionValue={(option) => option.id}
                          getOptionLabel={(option) => option.name}
                          value={null}
                          loadOptions={getScientificDrugs}
                          defaultOptions={drugs}
                        />
                      </div>
                    </div>
                    {dataToSend.drug_history.map((item, index) => {
                      return (
                        <Item
                          divToShow="Dose"
                          index={index}
                          tag={item.drug_name}
                          key={item.drug_id}
                          handleRemoval={handleDrugHxRemoval}
                          id={item.drug_id}
                          handleDoseChange={handleDoseChange}
                          dose={item.dose}
                        />
                      );
                    })}
                  </>
                </CSSTransition>
              )}
            </TransitionGroup>
            {showing(seeMoreHx.drug_hx, "drug_hx")}
          </div>
          <div className="col-3 offset-2 text-center mb-2">
            <h4 className="visit-header">Smoking History</h4>

            <TransitionGroup
              className={
                seeMoreHx.smoking_hx ? `morehx-transition` : `ros-ntransition`
              }
            >
              {seeMoreHx.smoking_hx && (
                <CSSTransition
                  timeout={1000}
                  classNames="item"
                  unmountOnExit={true}
                >
                  <div className="form-group row justify-content-center mb-3">
                    <div className="col-10">
                      <div className="row">
                        <label className="col-4 col-form-label mt-1">
                          Cigarettes Per Day
                        </label>
                        <div className="col-8">
                          <input
                            type="number"
                            className="form-control form-background mt-3"
                            onChange={handleCigarettesChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-10">
                      <div className="row mt-2">
                        <label className="col-4 col-form-label">Years</label>
                        <div className="col-8">
                          <input
                            type="number"
                            onChange={handleYearsChange}
                            className="form-control form-background"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-10">
                      <div className="row mt-2">
                        <label className="col-4 col-form-label">
                          Pack/Year
                        </label>
                        <div className="col-8">
                          <button
                            onClick={calculatePackYear}
                            className="btn btn-primary"
                          >
                            Calculate Pack/Year
                          </button>
                        </div>
                        <p className="col-12 col-form-label">
                          {dataToSend.smoking_history.pack_year}
                        </p>
                      </div>
                    </div>
                  </div>
                </CSSTransition>
              )}
            </TransitionGroup>
            {showing(seeMoreHx.smoking_hx, "smoking_hx")}
          </div>
          <div className="col-3 offset-2 text-center mb-2">
            <h4 className="visit-header">Alcohol History</h4>
            <TransitionGroup
              className={
                seeMoreHx.alcohol_hx ? `morehx-transition` : `ros-ntransition`
              }
            >
              {seeMoreHx.alcohol_hx && (
                <CSSTransition
                  timeout={1000}
                  classNames="item"
                  unmountOnExit={true}
                >
                  <div className="form-group row justify-content-center mb-3">
                    <div className="col-10">
                      <div className="row">
                        <label className="col-4 col-form-label">Type</label>
                        <div className="col-8">
                          <input
                            className="form-control form-background"
                            type="text"
                            onChange={handleAlcoholTypeChange}
                            value={dataToSend.alcohol_history.type}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-10">
                      <div className="row mt-2">
                        <label className="col-4 col-form-label">
                          Concentration
                        </label>
                        <div className="col-8">
                          <input
                            className="form-control form-background"
                            type="number"
                            onChange={handleAlcoholConcentrationChange}
                            value={dataToSend.alcohol_history.concentration}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-10">
                      <div className="row mt-2">
                        <label className="col-4 col-form-label">Volume</label>
                        <div className="col-8">
                          <input
                            className="form-control form-background"
                            type="number"
                            onChange={handleAlcoholVolumeChange}
                            value={dataToSend.alcohol_history.volume}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CSSTransition>
              )}
            </TransitionGroup>
            {showing(seeMoreHx.alcohol_hx, "alcohol_hx")}
          </div>
          <div className="col-3 offset-2 text-center mb-2">
            <h4 className="visit-header">Allergies</h4>
            <TransitionGroup
              className={
                seeMoreHx.allergies ? `morehx-transition` : `ros-ntransition`
              }
            >
              {seeMoreHx.allergies && (
                <CSSTransition
                  timeout={1000}
                  classNames="item"
                  unmountOnExit={true}
                >
                  <>
                    <div className="form-group row justify-content-center mb-3">
                      <div className="col-10">
                        <CreatableSelect
                          className="react-select-container"
                          classNamePrefix="react-select"
                          isClearable={true}
                          onChange={handleAllergies}
                          getOptionLabel={(option) =>
                            option.__isNew__ ? option.label : option.name
                          }
                          getOptionValue={(option) =>
                            option.__isNew__ ? option.value : option.id
                          }
                          value={null}
                          options={allergies}
                        />
                      </div>
                    </div>
                    {dataToSend.allergies.map((item, index) => {
                      return (
                        <Item
                          divToShow="Note"
                          index={index}
                          tag={item.allergy_name}
                          key={item.allergy_id}
                          handleRemoval={handleAllergiesRemoval}
                          id={item.allergy_id}
                          note={item.note}
                          handleNoteChange={handleAllergiesNoteChange}
                        />
                      );
                    })}
                  </>
                </CSSTransition>
              )}
            </TransitionGroup>
            {showing(seeMoreHx.allergies, "allergies")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoreHx;
