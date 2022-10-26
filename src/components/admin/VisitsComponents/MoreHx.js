import React from "react";
import VisitViewItem from "./VisitViewItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function MoreHx({ seeMoreHx, setSeeMoreHx, selectedVisit }) {
  return (
    <div className="row justify-content-center p-0 m-0">
      <div className="col-12 text-center">
        <h2 className="visit-header">More Hx.</h2>
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-3 offset-2 text-center mb-2">
            <h4 className="visit-header">Past Medical History</h4>
            {seeMoreHx.past_medical_hx ? (
              <>
                {selectedVisit.past_medical_history.map((item, index) => {
                  return (
                    <VisitViewItem
                      divToShow="Note"
                      index={index}
                      tag={item.disease_name}
                      key={item.disease_id}
                      id={item.disease_id}
                      note={item.note}
                    />
                  );
                })}
                <div
                  className="systems-angle mb-4"
                  onClick={() =>
                    setSeeMoreHx({
                      ...seeMoreHx,
                      past_medical_hx: false,
                    })
                  }
                >
                  <FontAwesomeIcon icon="angle-up" size="2x" color="#008DFF" />
                </div>
              </>
            ) : (
              <div
                className="systems-angle mb-4"
                onClick={() =>
                  setSeeMoreHx({ ...seeMoreHx, past_medical_hx: true })
                }
              >
                <FontAwesomeIcon icon="angle-down" size="2x" color="#008DFF" />
              </div>
            )}
          </div>
          <div className="col-3 offset-2 text-center mb-2">
            <h4 className="visit-header">Past Surgical History</h4>
            {seeMoreHx.past_surgical_hx ? (
              <>
                {selectedVisit.past_surgical_history.map((item, index) => {
                  return (
                    <VisitViewItem
                      divToShow="Note"
                      index={index}
                      tag={item.surgery_name}
                      key={item.surgery_id}
                      id={item.surgery_id}
                      note={item.note}
                    />
                  );
                })}
                <div
                  className="systems-angle mb-4"
                  onClick={() =>
                    setSeeMoreHx({
                      ...seeMoreHx,
                      past_surgical_hx: false,
                    })
                  }
                >
                  <FontAwesomeIcon icon="angle-up" size="2x" color="#008DFF" />
                </div>
              </>
            ) : (
              <div
                className="systems-angle mb-4"
                onClick={() =>
                  setSeeMoreHx({ ...seeMoreHx, past_surgical_hx: true })
                }
              >
                <FontAwesomeIcon icon="angle-down" size="2x" color="#008DFF" />
              </div>
            )}
          </div>
          <div className="col-3 offset-2 text-center mb-2">
            <h4 className="visit-header">Family History</h4>
            {seeMoreHx.family_hx ? (
              <>
                {selectedVisit.family_history.map((item, index) => {
                  return (
                    <VisitViewItem
                      divToShow="Relative"
                      index={index}
                      tag={item.disease_name}
                      key={item.disease_id}
                      id={item.disease_id}
                      relative_id={item.relative_id}
                      family_member={item.relative_name}
                    />
                  );
                })}
                <div
                  className="systems-angle mb-4"
                  onClick={() =>
                    setSeeMoreHx({ ...seeMoreHx, family_hx: false })
                  }
                >
                  <FontAwesomeIcon icon="angle-up" size="2x" color="#008DFF" />
                </div>
              </>
            ) : (
              <div
                className="systems-angle mb-4"
                onClick={() => setSeeMoreHx({ ...seeMoreHx, family_hx: true })}
              >
                <FontAwesomeIcon icon="angle-down" size="2x" color="#008DFF" />
              </div>
            )}
          </div>
          <div className="col-3 offset-2 text-center mb-2">
            <h4 className="visit-header">Smoking History</h4>
            {seeMoreHx.smoking_hx ? (
              <>
                <div className="form-group row justify-content-center mb-3">
                  <div className="col-10">
                    <div className="row mt-2">
                      <label className="col-4 col-form-label">Pack/Year</label>
                      <p className="col-12 col-form-label">
                        {selectedVisit.smoking_history.pack_year}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="systems-angle mb-4"
                  onClick={() =>
                    setSeeMoreHx({ ...seeMoreHx, smoking_hx: false })
                  }
                >
                  <FontAwesomeIcon icon="angle-up" size="2x" color="#008DFF" />
                </div>
              </>
            ) : (
              <div
                className="systems-angle mb-4"
                onClick={() => setSeeMoreHx({ ...seeMoreHx, smoking_hx: true })}
              >
                <FontAwesomeIcon icon="angle-down" size="2x" color="#008DFF" />
              </div>
            )}
          </div>
          <div className="col-3 offset-2 text-center mb-2">
            <h4 className="visit-header">Alcohol History</h4>
            {seeMoreHx.alcohol_hx ? (
              <>
                <div className="form-group row justify-content-center mb-3">
                  <div className="col-10">
                    <div className="row">
                      <label className="col-4 col-form-label">Type</label>
                      <div className="col-8">
                        <p>{selectedVisit.alcohol_history.type}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-10">
                    <div className="row mt-2">
                      <label className="col-4 col-form-label">
                        Concentration
                      </label>
                      <div className="col-8">
                        <p>{selectedVisit.alcohol_history.concentration}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-10">
                    <div className="row mt-2">
                      <label className="col-4 col-form-label">Volume</label>
                      <div className="col-8">
                        <p>{selectedVisit.alcohol_history.volume}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="systems-angle mb-4"
                  onClick={() =>
                    setSeeMoreHx({ ...seeMoreHx, alcohol_hx: false })
                  }
                >
                  <FontAwesomeIcon icon="angle-up" size="2x" color="#008DFF" />
                </div>
              </>
            ) : (
              <div
                className="systems-angle mb-4"
                onClick={() => setSeeMoreHx({ ...seeMoreHx, alcohol_hx: true })}
              >
                <FontAwesomeIcon icon="angle-down" size="2x" color="#008DFF" />
              </div>
            )}
          </div>
          <div className="col-3 offset-2 text-center">
            <h4 className="visit-header">Drug History</h4>
            {seeMoreHx.drug_hx ? (
              <>
                {selectedVisit.drug_history.map((item, index) => {
                  return (
                    <VisitViewItem
                      divToShow="Dose"
                      index={index}
                      tag={item.drug_name}
                      key={item.drug_id}
                      id={item.drug_id}
                      dose={item.dose}
                    />
                  );
                })}
                <div
                  className="systems-angle mb-4"
                  onClick={() => setSeeMoreHx({ ...seeMoreHx, drug_hx: false })}
                >
                  <FontAwesomeIcon icon="angle-up" size="2x" color="#008DFF" />
                </div>
              </>
            ) : (
              <div
                className="systems-angle mb-4"
                onClick={() => setSeeMoreHx({ ...seeMoreHx, drug_hx: true })}
              >
                <FontAwesomeIcon icon="angle-down" size="2x" color="#008DFF" />
              </div>
            )}
          </div>
          <div className="col-3 offset-2 text-center mb-2">
            <h4 className="visit-header">Allergies</h4>
            {seeMoreHx.allergies ? (
              <>
                {selectedVisit.allergies.map((item, index) => {
                  return (
                    <VisitViewItem
                      divToShow="Note"
                      index={index}
                      tag={item.allergy_name}
                      key={item.allergy_id}
                      id={item.allergy_id}
                      note={item.note}
                    />
                  );
                })}
                <div
                  className="systems-angle mb-4"
                  onClick={() =>
                    setSeeMoreHx({ ...seeMoreHx, allergies: false })
                  }
                >
                  <FontAwesomeIcon icon="angle-up" size="2x" color="#008DFF" />
                </div>
              </>
            ) : (
              <div
                className="systems-angle mb-4"
                onClick={() => setSeeMoreHx({ ...seeMoreHx, allergies: true })}
              >
                <FontAwesomeIcon icon="angle-down" size="2x" color="#008DFF" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoreHx;
