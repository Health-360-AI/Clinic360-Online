import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Loading from "../common/Loading";
import { VisitModal } from "./VisitModal";
import FileModal from "../common/FileModal";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Tippy from "@tippyjs/react";

const apiUrl = process.env.API_URL;

const VisitsStateColors = [
  {
    state: 0,
    color: "text-success",
  },
  {
    state: 1,
    color: "text-primary",
  },
  {
    state: 2,
    color: "",
  },
];

const getColor = (state) => {
  let x = VisitsStateColors.find((VisitState) => VisitState.state == state);
  if (x) {
    return x.color;
  }
};

function LatestPending({
  handleEditVisitButton,
  setPatient,
  speech,
  setSpeech,
  setDataToSend,
  setDataToChange,
  setVisitModal,
  visitModal,
  socket,
  pendingVisits,
  unfinishedVisits,
}) {
  const [loading, setLoading] = useState(false);
  const getVisit = async (pendingVisit) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${pendingVisit.patient_id}/visits/${pendingVisit.visit_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      responseData.investigations.map((item) => {
        item["photos"] = [];
      });
      setDataToSend({
        visit_id: pendingVisit.visit_id,
        chief_complaint_id: responseData.chief_complaint_id,
        prescription_note: responseData.prescription_note,
        symptoms: responseData.symptoms,
        lmp: responseData.lmp,
        edd: responseData.edd,
        gravidity: responseData.gravidity,
        parity: responseData.parity,
        abortion: responseData.abortion,
        abortion_note: responseData.abortion_note,
        last_ultrasound: responseData.last_ultrasound,
        last_ultrasound_note: responseData.last_ultrasound_note,
        gestational_age: responseData.gestational_age,
        epigastric_radius: responseData.epigastric_radius,
        umbilical_radius: responseData.umbilical_radius,
        hypogastric_radius: responseData.hypogastric_radius,
        pelvic_radius: responseData.pelvic_radius,
        thigh_radius: responseData.thigh_radius,
        metabolism: responseData.metabolism,
        fats_percentage: responseData.fats_percentage,
        muscles_percentage: responseData.muscles_percentage,
        calories: responseData.calories,
        body_age: responseData.body_age,
        organic_fats: responseData.organic_fats,
        past_medical_history: responseData.past_medical_history,
        past_surgical_history: responseData.past_surgical_history,
        family_history: responseData.family_history,
        smoking_history: {
          pack_year:
            responseData.smoking_history != null
              ? responseData.smoking_history.pack_year
              : null,
        },
        alcohol_history: {
          type:
            responseData.alcohol_history != null
              ? responseData.alcohol_history.type
              : null,
          concentration:
            responseData.alcohol_history != null
              ? responseData.alcohol_history.concentration
              : null,
          volume:
            responseData.alcohol_history != null
              ? responseData.alcohol_history.volume
              : null,
        },
        drug_history: responseData.drug_history,
        allergies: responseData.allergies,
        hr: responseData.hr,
        sbp: responseData.sbp,
        dbp: responseData.dbp,
        rr: responseData.rr,
        temp: responseData.temp,
        spo2: responseData.spo2,
        positive_signs: responseData.positive_signs,
        relative_negatives: responseData.relative_negatives,
        investigations: responseData.investigations,
        report: responseData.report,
        report_id: responseData.report_id,
        lang: responseData.lang == "ar" ? "ar" : "en",
        referral_to: responseData.referral_to,
        diagnosis_id: responseData.diagnosis_id,
        diagnosis_name: responseData.diagnosis_name,
        scientific_drugs: responseData.scientific_drugs,
        trade_drugs: responseData.trade_drugs,
      });
      setSpeech({
        ...speech,
        chief_complaint_note: responseData.chief_complaint_note,
        hopi: responseData.hopi,
        summary: responseData.summary,
      });
      return responseData;
    } catch (error) {
      console.log(error.message);
    }
  };
  const resumeVisit = async (pendingVisit) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${pendingVisit.patient_id}/visits/${pendingVisit.visit_id}/pending`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            pending_state: 0,
          }),
        }
      );
      const responseData = await response.json();
      setPatient({ ...pendingVisit, id: pendingVisit.patient_id });
      setDataToChange({ id: pendingVisit.visit_id });
      socket.emit("pending-visits", {
        token: `${localStorage.getItem("token")}`,
        role: 0,
        page: 1,
        size: 100,
        search: null,
      });
      socket.emit("unfinished-visits", {
        token: `${localStorage.getItem("token")}`,
        role: 0,
        page: 1,
        size: 100,
        search: null,
      });
      getVisit(pendingVisit).then(() => {
        handleEditVisitButton();
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const resumeShortVisit = async (pendingVisit) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients/${pendingVisit.patient_id}/visits/${pendingVisit.visit_id}/pending`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            pending_state: 0,
          }),
        }
      );
      const responseData = await response.json();
      setPatient({ ...pendingVisit, id: pendingVisit.patient_id });
      setDataToChange({ id: pendingVisit.visit_id });
      let xx = await getVisit(pendingVisit);
      socket.emit("pending-visits", {
        token: `${localStorage.getItem("token")}`,
        role: 0,
        page: 1,
        size: 100,
        search: null,
      });
      socket.emit("unfinished-visits", {
        token: `${localStorage.getItem("token")}`,
        role: 0,
        page: 1,
        size: 100,
        search: null,
      });
      setVisitModal({
        ...visitModal,
        show: true,
        visit: {
          visit_id: xx.id,
          chief_complaint_id: xx.chief_complaint_id,
          chief_complaint_note: xx.chief_complaint_note,
          hopi: xx.hopi,

          investigations: xx.investigations,

          prescription_note: xx.prescription_note,
          diagnosis_id: xx.diagnosis_id,
          diagnosis_name: xx.diagnosis_name,
          scientific_drugs: xx.scientific_drugs,
          trade_drugs: xx.trade_drugs,
          hr: xx.hr,
          dbp: xx.dbp,
          sbp: xx.sbp,
          rr: xx.rr,
          temp: xx.temp,
          spo2: xx.spo2,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      className="width-sidebar-wide sidebar leftfixed pt-5 mt-3 p-0 position-fixed overflow-auto" //
      id="side-bar"
    >
      <div className="col-12 ps-3 pb-3 pt-1 border-bottom">
        <h3>Pending Visits</h3>
      </div>
      <div className="col-12">
        {pendingVisits.slice(0, 10).map((pendingVisit) => {
          return (
            <div
              key={pendingVisit.visit_id}
              className="row m-0 font-weight-bold border-bottom mb-2 ps-3 pe-3 pt-2 pb-2"
            >
              <div className="col-6">
                <h6 className="color-pending-side-time">{pendingVisit.time}</h6>
                <h6 className={getColor(pendingVisit.state)}>
                  {pendingVisit.name}
                </h6>
              </div>
              <div className="col-2 pt-2 offset-2 text-center">
                <Tippy content={<span>Short Visit</span>}>
                  {/* <OverlayTrigger
                  placement="top"
                  delay={{ show: 300, hide: 300 }}
                  overlay={<Tooltip id={`tooltip-Short`}>Short Visit</Tooltip>}
                > */}
                  <button
                    className="btn-latest-pending p-0 m-0"
                    onClick={() => resumeShortVisit(pendingVisit)}
                  >
                    <FontAwesomeIcon
                      icon="bolt"
                      size="2x"
                      bounce
                      className="continue-visit-button"
                    />
                  </button>
                  {/* </OverlayTrigger> */}
                </Tippy>
              </div>
              <div className="col-2 pt-2 text-center">
                <Tippy content={<span>Long Visit</span>}>
                  {/* <OverlayTrigger
                  placement="top"
                  delay={{ show: 300, hide: 300 }}
                  overlay={<Tooltip id={`tooltip-Long`}>Long Visit</Tooltip>}
                > */}
                  <button
                    className="btn-latest-pending p-0"
                    onClick={() => resumeVisit(pendingVisit)}
                  >
                    <FontAwesomeIcon
                      icon="play-circle"
                      size="2x"
                      beat
                      className="continue-visit-button"
                    />
                  </button>
                  {/* </OverlayTrigger> */}
                </Tippy>
              </div>
            </div>
          );
        })}
      </div>
      <div className="col-12 ps-3 pb-3 pt-1 border-bottom">
        <h3>Not-Finished Visits</h3>
      </div>
      <div className="col-12">
        {unfinishedVisits.slice(0, 10).map((unfinishedVisit) => {
          return (
            <div
              key={unfinishedVisit.visit_id}
              className="row m-0 font-weight-bold border-bottom mb-2 ps-3 pe-3 pt-2 pb-2"
            >
              <div className="col-6">
                <h6 className="color-pending-side-time">
                  {unfinishedVisit.time}
                </h6>
                <h6 className={getColor(unfinishedVisit.state)}>
                  {unfinishedVisit.name}
                </h6>
              </div>
              <div className="col-2 pt-2 offset-2 text-center">
                <Tippy content={<span>Short Visit</span>}>
                  {/* <OverlayTrigger
                  placement="top"
                  delay={{ show: 300, hide: 300 }}
                  overlay={<Tooltip id={`tooltip-Short`}>Short Visit</Tooltip>}
                > */}
                  <button
                    className="btn-latest-pending p-0 m-0"
                    onClick={() => resumeShortVisit(unfinishedVisit)}
                  >
                    <FontAwesomeIcon
                      icon="bolt"
                      size="2x"
                      bounce
                      className="continue-visit-button"
                    />
                  </button>
                  {/* </OverlayTrigger> */}
                </Tippy>
              </div>
              <div className="col-2 pt-2 text-center">
                <Tippy content={<span>Long Visit</span>}>
                  {/* <OverlayTrigger
                  placement="top"
                  delay={{ show: 300, hide: 300 }}
                  overlay={<Tooltip id={`tooltip-Long`}>Long Visit</Tooltip>}
                > */}
                  <button
                    className="btn-latest-pending p-0"
                    onClick={() => resumeVisit(unfinishedVisit)}
                  >
                    <FontAwesomeIcon
                      icon="play-circle"
                      size="2x"
                      beat
                      className="continue-visit-button"
                    />
                  </button>
                  {/* </OverlayTrigger> */}
                </Tippy>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LatestPending;
