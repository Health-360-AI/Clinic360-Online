import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Loading from "../common/Loading";
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

function PendingVisits({
  handleEditVisitButton,
  setPatient,
  speech,
  setSpeech,
  setDataToSend,
  dataToSend,
  setDataToChange,
  socket,
  pendingVisits,
  unfinishedVisits,
  visitModal,
  setVisitModal,
}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
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
  }, []);
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
      responseData.investigations.map((item) => (item["photos"] = []));
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
      // console.log(dataToSend);
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
          ...xx,
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
    <section className="main pt-5">
      <div className="row m-0">
        <div className="col-6">
          <div className="row pe-2 ps-2 mb-5">
            <div className="col-12">
              <div className="row mt-4 mb-3">
                <div className="col-4">
                  <h2 className="text">Pending Visits</h2>
                </div>
                {/* <div className="col-8">
                  <form>
                    <div className="form-group row mt-1">
                      <div className="col-3 offset-7">
                        <input
                          type="text"
                          className="form-control text"
                          id="searchName"
                          placeholder="Name"
                          //   onChange={handleSearchChange}
                        ></input>
                      </div>
                      <div className="col-2 offset-0 text">
                        <button
                          type="submit"
                          className="btn btn-secondary btn-sm mt-1"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </form>
                </div> */}
              </div>
            </div>
            <div className="col-12 pb-5">
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover text">
                  <thead className="thead-dark">
                    <tr>
                      <th className="">ID</th>
                      <th className="">Name</th>
                      <th className="">Date & Time</th>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  {loading == true ? (
                    <Loading />
                  ) : (
                    <tbody>
                      {pendingVisits.map((pendingVisit, index) => {
                        return (
                          <tr
                            key={pendingVisit.visit_id}
                            className="font-weight-bold"
                          >
                            <td className="">{index + 1}</td>
                            <td className={getColor(pendingVisit.state)}>
                              {pendingVisit.name}
                            </td>
                            <td className="">
                              {pendingVisit.date} - {pendingVisit.time}
                            </td>
                            <td>
                              <Tippy content={<span>Short Visit</span>}>
                                <FontAwesomeIcon
                                  icon="bolt"
                                  size="2x"
                                  className="continue-visit-button"
                                  onClick={() => resumeShortVisit(pendingVisit)}
                                />
                              </Tippy>
                            </td>
                            <td>
                              <FontAwesomeIcon
                                icon="play-circle"
                                size="2x"
                                className="continue-visit-button"
                                onClick={() => resumeVisit(pendingVisit)}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-6"
          style={{ borderLeft: "1px solid black", height: "100vh" }}
        >
          <div className="row pe-2 ps-2 mb-5">
            <div className="col-12">
              <div className="row mt-4 mb-3">
                <div className="col-4">
                  <h2 className="text">Not-Finished Visits</h2>
                </div>
                {/* <div className="col-8">
                  <form>
                    <div className="form-group row mt-1">
                      <div className="col-3 offset-7">
                        <input
                          type="text"
                          className="form-control text"
                          id="searchName"
                          placeholder="Name"
                          //   onChange={handleSearchChange}
                        ></input>
                      </div>
                      <div className="col-2 offset-0 text">
                        <button
                          type="submit"
                          className="btn btn-secondary btn-sm mt-1"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </form>
                </div> */}
              </div>
            </div>
            <div className="col-12 pb-5">
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover text">
                  <thead className="thead-dark">
                    <tr>
                      <th className="">ID</th>
                      <th className="">Name</th>
                      <th className="">Date & Time</th>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  {loading == true ? (
                    <Loading />
                  ) : (
                    <tbody>
                      {unfinishedVisits.map((pendingVisit, index) => {
                        return (
                          <tr
                            key={pendingVisit.visit_id}
                            className="font-weight-bold"
                          >
                            <td className="">{index + 1}</td>
                            <td className={getColor(pendingVisit.state)}>
                              {pendingVisit.name}
                            </td>
                            <td className="">
                              {pendingVisit.date} - {pendingVisit.time}
                            </td>
                            <td>
                              <Tippy content={<span>Short Visit</span>}>
                                <FontAwesomeIcon
                                  icon="bolt"
                                  size="2x"
                                  className="continue-visit-button"
                                  onClick={() => resumeShortVisit(pendingVisit)}
                                />
                              </Tippy>
                            </td>
                            <td>
                              <FontAwesomeIcon
                                icon="play-circle"
                                size="2x"
                                className="continue-visit-button"
                                onClick={() => resumeVisit(pendingVisit)}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PendingVisits;
