import React from "react";
import Item from "../Forms/VisitComponents/Item";
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from "react-select/async-creatable";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function OpthalmologyHx({
  handleOpticalHxLastReflection,
  optical_hx_last_reflection,
  optical_hx_reflection_stability,
  optical_hx_glasses_duration,
  optical_hx_glasses_change_frequency,
  optical_hx_contact_lens_duration,
  optical_hx_usage,
  optical_hx_uses,
  optical_hx_type,
  optical_hx_last_time_weared,
  handleOpticalHxReflectionStability,
  handleOpticalHxGlassesDuration,
  handleOpticalHxChangeFrequency,
  handleOpticalHxContactLensDuration,
  handleOpticalHxUsage,
  handleOpticalHxUses,
  handleOpticalHxType,
  handleOpticalHxLastTimeWeared,
  getDiseases,
  diseases,
  family_members,
  handleOcularFamilyHx,
  family_history,
  handleFamilyHxRemoval,
  handleRelativeChange,
  getSurgeries,
  surgeries,
  handleOcularSurgicalHx,
  past_surgical_history,
  handleOcularSurgicalHxRemoval,
  handleOcularSurgicalHxNoteChange,
  seeMoreHx,
  setSeeMoreHx,
  showing,
}) {
  return (
    <div className="row justify-content-center p-0 m-0 pb-5 mb-5">
      <div className="col-12 text-center">
        <h2 className="visit-header">Opthalmology Hx.</h2>
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-3 offset-2 text-center mb-2">
            <h4 className="visit-header">Optical History</h4>
            <TransitionGroup
              className={
                seeMoreHx.optical_hx ? `morehx-transition` : `ros-ntransition`
              }
            >
              {seeMoreHx.optical_hx && (
                <CSSTransition
                  timeout={1000}
                  classNames="item"
                  unmountOnExit={true}
                >
                  <div className="form-group row justify-content-center mb-3">
                    <label
                      htmlFor="optical_hx_last_reflection"
                      className="col-6 col-form-label mb-2 opthalmology-font-size"
                    >
                      Last reflection
                    </label>
                    <div className="col-4 pt-2">
                      <input
                        type="text"
                        className="form-control form-background"
                        onChange={handleOpticalHxLastReflection}
                        value={optical_hx_last_reflection}
                      />
                    </div>
                    <label
                      htmlFor="optical_hx_reflection_stability"
                      className="col-6 col-form-label mb-2 opthalmology-font-size"
                    >
                      Stability of reflection
                    </label>
                    <div className="col-4 pt-2">
                      <input
                        type="text"
                        className="form-control form-background"
                        onChange={handleOpticalHxReflectionStability}
                        value={optical_hx_reflection_stability}
                      />
                    </div>
                  </div>
                </CSSTransition>
              )}
            </TransitionGroup>
            {showing(seeMoreHx.optical_hx, "optical_hx")}
          </div>
          <div className="col-3 offset-2 text-center mb-2">
            <h4 className="visit-header">Glasses</h4>
            <TransitionGroup
              className={
                seeMoreHx.glasses ? `morehx-transition` : `ros-ntransition`
              }
            >
              {seeMoreHx.glasses && (
                <CSSTransition
                  timeout={1000}
                  classNames="item"
                  unmountOnExit={true}
                >
                  <div className="form-group row justify-content-center mb-3">
                    <label
                      htmlFor="optical_hx_glasses_duration"
                      className="col-6 col-form-label mb-2 opthalmology-font-size"
                    >
                      Duration
                    </label>
                    <div className="col-4 pt-2">
                      <input
                        type="text"
                        className="form-control form-background"
                        onChange={handleOpticalHxGlassesDuration}
                        value={optical_hx_glasses_duration}
                      />
                    </div>
                    <label
                      htmlFor="optical_hx_glasses_change_frequency"
                      className="col-6 col-form-label mb-2 opthalmology-font-size"
                    >
                      Frequency of change
                    </label>
                    <div className="col-4 pt-2">
                      <input
                        type="text"
                        className="form-control form-background"
                        onChange={handleOpticalHxChangeFrequency}
                        value={optical_hx_glasses_change_frequency}
                      />
                    </div>
                  </div>
                </CSSTransition>
              )}
            </TransitionGroup>
            {showing(seeMoreHx.glasses, "glasses")}
          </div>
          <div className="col-3 offset-2 text-center mb-2">
            <h4 className="visit-header">Contact lens</h4>
            <TransitionGroup
              className={
                seeMoreHx.contact_lens ? `morehx-transition` : `ros-ntransition`
              }
            >
              {seeMoreHx.contact_lens && (
                <CSSTransition
                  timeout={1000}
                  classNames="item"
                  unmountOnExit={true}
                >
                  <div className="form-group row justify-content-center mb-3">
                    <label
                      htmlFor="optical_hx_contact_lens_duration"
                      className="col-6 col-form-label mb-2 opthalmology-font-size"
                    >
                      Duration of use
                    </label>
                    <div className="col-4 pt-2">
                      <input
                        type="text"
                        className="form-control form-background"
                        onChange={handleOpticalHxContactLensDuration}
                        value={optical_hx_contact_lens_duration}
                      />
                    </div>
                    <label
                      htmlFor="optical_hx_glasses_change_frequency"
                      className="col-4 col-form-label mb-2 opthalmology-font-size"
                    >
                      Usage
                    </label>
                    <div className="col-4 pt-3 form-check">
                      <input
                        type="radio"
                        name="cosmetic"
                        id="cosmetic"
                        className="form-check-input"
                        value="0"
                        checked={optical_hx_usage == 0}
                        onChange={handleOpticalHxUsage}
                      />
                      <label class="form-check-label" for="cosmetic">
                        Cosmetic
                      </label>
                    </div>
                    <div className="col-4 pt-3 form-check">
                      <input
                        type="radio"
                        name="optical"
                        id="optical"
                        className="form-check-input"
                        value="1"
                        checked={optical_hx_usage == 1}
                        onChange={handleOpticalHxUsage}
                      />

                      <label class="form-check-label" for="optical">
                        Optical
                      </label>
                    </div>

                    <label
                      htmlFor="optical_hx_uses"
                      className="col-6 col-form-label mb-2 opthalmology-font-size"
                    >
                      Uses
                    </label>
                    <div className="col-4 pt-2">
                      <select
                        id="optical_hx_uses"
                        onChange={handleOpticalHxUses}
                        className="form-select"
                        value={optical_hx_uses}
                      >
                        <option value="0" defaultValue>
                          Select
                        </option>
                        <option value="1">nearsightedness</option>
                        <option value="2">farsightedness</option>
                        <option value="3">astigmatism</option>
                      </select>
                    </div>
                    <label
                      htmlFor="optical_hx_type"
                      className="col-6 col-form-label mb-2 opthalmology-font-size"
                    >
                      Type
                    </label>
                    <div className="col-4 pt-2">
                      <select
                        id="optical_hx_type"
                        onChange={handleOpticalHxType}
                        className="form-select"
                        value={optical_hx_type}
                      >
                        <option value="0" defaultValue>
                          Select
                        </option>
                        <option value="1">Soft</option>
                        <option value="2">Rigid Gas Permeable (RGP)</option>
                        <option value="3">Extended Wear</option>
                        <option value="4">
                          Disposable (Replacement Schedule)
                        </option>
                        <option value="5">Lens Comparison</option>
                        <option value="6">Orthokeratology (Ortho-K)</option>
                      </select>
                    </div>
                    <label
                      htmlFor="optical_hx_last_time_weared"
                      className="col-6 col-form-label mb-2 opthalmology-font-size"
                    >
                      Last time weared
                    </label>
                    <div className="col-4 pt-2">
                      <input
                        type="text"
                        className="form-control form-background"
                        onChange={handleOpticalHxLastTimeWeared}
                        value={optical_hx_last_time_weared}
                      />
                    </div>
                  </div>
                </CSSTransition>
              )}
            </TransitionGroup>
            {showing(seeMoreHx.contact_lens, "contact_lens")}
          </div>
          <div className="col-3 offset-2 text-center mb-2">
            <h4 className="visit-header">Family Ocular History</h4>
            <TransitionGroup
              className={
                seeMoreHx.family_ocular_hx
                  ? `morehx-transition`
                  : `ros-ntransition`
              }
            >
              {seeMoreHx.family_ocular_hx && (
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
                          onChange={handleOcularFamilyHx}
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
                    {family_history.map((item, index) => {
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
            {showing(seeMoreHx.family_ocular_hx, "family_ocular_hx")}
          </div>
          <div className="col-3 offset-2 text-center">
            <h4 className="visit-header">Ocular Surgical History</h4>
            <TransitionGroup
              className={
                seeMoreHx.ocular_surgical_hx
                  ? `morehx-transition`
                  : `ros-ntransition`
              }
            >
              {seeMoreHx.ocular_surgical_hx && (
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
                          onChange={handleOcularSurgicalHx}
                          getOptionValue={(option) => option.id}
                          getOptionLabel={(option) => option.name}
                          value={null}
                          loadOptions={getSurgeries}
                          defaultOptions={surgeries}
                        />
                      </div>
                    </div>
                    {past_surgical_history.map((item, index) => {
                      return (
                        <Item
                          divToShow="Note"
                          index={index}
                          tag={item.surgery_name}
                          key={item.surgery_id}
                          handleRemoval={handleOcularSurgicalHxRemoval}
                          id={item.surgery_id}
                          handleNoteChange={handleOcularSurgicalHxNoteChange}
                          note={item.note}
                        />
                      );
                    })}
                  </>
                </CSSTransition>
              )}
            </TransitionGroup>
            {showing(seeMoreHx.ocular_surgical_hx, "ocular_surgical_hx")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpthalmologyHx;
