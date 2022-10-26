import React, { useState, useEffect, Fragment } from "react";
import Loading from "../common/Loading";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../common/Pagination";
import ConfirmModal from "../common/ConfirmModal";
import TicketVisitModal from "../common/TicketVisitModal";
import DORModal from "../common/DORModal";
import {
  Menu,
  Item,
  Separator,
  Submenu,
  MenuProvider,
  useContextMenu,
  theme,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { toast } from "react-toastify";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const smalltalk = require("smalltalk");

const apiUrl = process.env.API_URL;
const popperConfig = {
  strategy: "fixed",
};
function Patients({
  setPatient,
  handlePatientButton,
  setDataToChange,
  handleEditPatientButton,
  handleVisitsButton,
  handleVisitsTableButton,
  handleBMITrackerButton,
  handleAddOperationButton,
  handleOperationsButton,
  setDataToSend,
  dataToSend,
  patient,
  handleEditVisitButton,
  setSpeech,
  speech,
  setSubscribed,
  setRemaining,
  socket,
  state,
  setState,
  getPatients,
}) {
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    id: "",
  });
  const [dorModal, setDORModal] = useState({
    show: false,
    id: "",
    dor: null,
  });
  const [ticketModalShow, setTicketModalShow] = useState({
    show: false,
    nutrition: 0,
  });

  const [searchType, setSearchType] = useState("1");

  const { show } = useContextMenu({ id: "maue" });
  function handleContextMenu(event) {
    event.preventDefault();
    show({
      event,
      props: {
        key: "value",
      },
    });
  }
  function displayMenu(e, ii) {
    // pass the item id so the `onClick` on the `Item` has access to it
    show(e, { props: { patient: ii } });
  }

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };
  const handleDORChange = (e) =>
    setDORModal({ ...dorModal, dor: e.target.value });

  const getVisits = async (patient) => {
    try {
      const response = await fetch(`${apiUrl}/patients/${patient.id}/visits`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const responseData = await response.json();
      if (responseData.visits.length == 0) {
        smalltalk.alert("Warning", "This Patient Have No Visits!").then(() => {
          console.log("ok");
        });
      } else {
        setPatient(patient);
        handleVisitsButton();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSearch = (p) => {
    if (["1", "2", "3", "13"].includes(searchType)) {
      if (searchType == "1") {
        return searchFetch(p, "search", state.search);
      } else if (searchType == "2") {
        return searchFetch(p, "return_visit", state.search);
      } else if (searchType == "3") {
        return searchFetch(p, "referral", state.search);
      } else if (searchType == "13") {
        return searchFetch(p, "identifier", state.search);
      }
    } else {
      if (searchType == "4") {
        return searchFetchStats(p, "icd10_code", state.search);
      } else if (searchType == "5") {
        return searchFetchStats(p, "symptom", state.search);
      } else if (searchType == "6") {
        return searchFetchStats(p, "disease", state.search);
      } else if (searchType == "7") {
        return searchFetchStats(p, "investigation", state.search);
      } else if (searchType == "8") {
        return searchFetchStats(p, "drug_name", state.search);
      } else if (searchType == "9") {
        return searchFetchStats(p, "past_surgery", state.search);
      } else if (searchType == "10") {
        return searchFetchStats(p, "last_visit", state.search);
      } else if (searchType == "11") {
        return searchFetchStats(p, "address", state.search);
      } else if (searchType == "12") {
        return searchFetchStats(p, "phone", state.search);
      }
    }
  };
  const handleSearchChange = (e) => {
    setState({ ...state, search: e.target.value });
  };
  const searchFetch = async (p, sType, value) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients?page=${p}&${sType}=${value}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const responseData = await response.json();
      if (responseData.success) {
        setState({
          ...state,
          patients: responseData.patients,
          loading: false,
          currentPage: responseData.page,
          totalPages: responseData.total_pages,
        });
      } else {
        setState({
          ...state,
          loading: false,
        });
        toast.warn("Write something to search");
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
      });
      toast.error("Write something to search");
      console.log(error.message);
    }
  };
  const searchFetchStats = async (p, sType, value) => {
    try {
      const response = await fetch(
        `${apiUrl}/stats?page=${p}&${sType}=${value}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const responseData = await response.json();
      if (responseData.success) {
        setState({
          ...state,
          patients: responseData.patients,
          loading: false,
          currentPage: responseData.page,
          totalPages: responseData.total_pages,
        });
      } else {
        setState({
          ...state,
          loading: false,
        });
        toast.warn("Write something to search");
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
      });
      toast.error("Write something to search");
      console.log(error.message);
    }
  };
  const handleDeleteButton = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/patients/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const responseData = await response.json();
      toast.success("Patient Deleted Successfully");
      getPatients();
    } catch (error) {
      console.log(error.message);
    }
  };
  const saveDOR = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/patients/${id}/return_visit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ date: dorModal.dor }),
      });

      const responseData = await response.json();
      getPatients();
      toast.success("تم الحفظ بنجاح");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSearchButton = (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });
    if (searchType == "1") {
      searchFetch(1, "search", state.search);
    } else if (searchType == "2") {
      searchFetch(1, "return_visit", state.search);
    } else if (searchType == "3") {
      searchFetch(1, "referral", state.search);
    } else if (searchType == "4") {
      searchFetchStats(1, "icd10_code", state.search);
    } else if (searchType == "5") {
      searchFetchStats(1, "symptom", state.search);
    } else if (searchType == "6") {
      searchFetchStats(1, "disease", state.search);
    } else if (searchType == "7") {
      searchFetchStats(1, "investigation", state.search);
    } else if (searchType == "8") {
      searchFetchStats(1, "drug_name", state.search);
    } else if (searchType == "9") {
      searchFetchStats(1, "past_surgery", state.search);
    } else if (searchType == "10") {
      searchFetchStats(1, "last_visit", state.search);
    } else if (searchType == "11") {
      searchFetchStats(1, "address", state.search);
    } else if (searchType == "12") {
      searchFetchStats(1, "phone", state.search);
    } else if (searchType == "13") {
      searchFetch(1, "identifier", state.search);
    } else {
      getPatients();
    }
  };

  // const handleAddVisit = (id) => {
  //   props.handleAddVisitButton(id);
  // };

  const searchBar = () => {
    if (searchType == "0") {
      return (
        <div className="col-3 mt-2">
          <p className="form-control text">Search by</p>
        </div>
      );
    } else if (searchType == "1") {
      return (
        <div className="col-3 mt-2 mb-3">
          <input
            type="text"
            className="form-control text"
            id="searchPatient"
            onChange={handleSearchChange}
            placeholder="Name"
          ></input>
        </div>
      );
    } else if (searchType == "2") {
      return (
        <Fragment>
          <div className="col-3 mt-2 mb-3">
            <input
              type="date"
              className="form-control text"
              id="searchDate"
              onChange={handleSearchChange}
            ></input>
          </div>
        </Fragment>
      );
    } else if (searchType == "3") {
      return (
        <div className="col-3 mt-2 mb-3">
          <input
            type="text"
            className="form-control text"
            id="searchPatient"
            onChange={handleSearchChange}
            placeholder="Referral"
          ></input>
        </div>
      );
    } else if (searchType == "4") {
      return (
        <div className="col-3 mt-2 mb-3">
          <input
            type="text"
            className="form-control text"
            id="searchICD-10"
            onChange={handleSearchChange}
            placeholder="ICD-10"
          ></input>
        </div>
      );
    } else if (searchType == "5") {
      return (
        <div className="col-3 mt-2 mb-3">
          <input
            type="text"
            className="form-control text"
            id="searchSymptom"
            onChange={handleSearchChange}
            placeholder="Symptom"
          ></input>
        </div>
      );
    } else if (searchType == "6") {
      return (
        <div className="col-3 mt-2 mb-3">
          <input
            type="text"
            className="form-control text"
            id="searchDisease"
            onChange={handleSearchChange}
            placeholder="Disease"
          ></input>
        </div>
      );
    } else if (searchType == "7") {
      return (
        <div className="col-3 mt-2 mb-3">
          <input
            type="text"
            className="form-control text"
            id="searchInvestigation"
            onChange={handleSearchChange}
            placeholder="Investigation"
          ></input>
        </div>
      );
    } else if (searchType == "8") {
      return (
        <div className="col-3 mt-2 mb-3">
          <input
            type="text"
            className="form-control text"
            id="searchDrug"
            onChange={handleSearchChange}
            placeholder="Drug"
          ></input>
        </div>
      );
    } else if (searchType == "9") {
      return (
        <div className="col-3 mt-2 mb-3">
          <input
            type="text"
            className="form-control text"
            id="searchSurgery"
            onChange={handleSearchChange}
            placeholder="Surgery"
          ></input>
        </div>
      );
    } else if (searchType == "10") {
      return (
        <Fragment>
          <div className="col-3 mt-2 mb-3">
            <input
              type="date"
              className="form-control text"
              id="searchLastVisit"
              onChange={handleSearchChange}
            ></input>
          </div>
        </Fragment>
      );
    } else if (searchType == "11") {
      return (
        <Fragment>
          <div className="col-3 mt-2 mb-3">
            <input
              type="text"
              className="form-control text"
              id="searchAddress"
              onChange={handleSearchChange}
            ></input>
          </div>
        </Fragment>
      );
    } else if (searchType == "12") {
      return (
        <Fragment>
          <div className="col-3 mt-2 mb-3">
            <input
              type="number"
              className="form-control text"
              id="searchPhone"
              onChange={handleSearchChange}
            ></input>
          </div>
        </Fragment>
      );
    } else if (searchType == "13") {
      return (
        <Fragment>
          <div className="col-3 mt-2 mb-3">
            <input
              type="number"
              className="form-control text"
              id="searchPatientId"
              onChange={handleSearchChange}
            ></input>
          </div>
        </Fragment>
      );
    }
  };

  return (
    <section className="main pt-5">
      <ConfirmModal
        show={confirmModal.show}
        onHide={() =>
          setConfirmModal({
            ...confirmModal,
            show: false,
            id: "",
          })
        }
        confirm={handleDeleteButton}
        id={confirmModal.id}
      />
      <TicketVisitModal
        show={ticketModalShow.show}
        onHide={() => setTicketModalShow({ show: false, nutrition: 0 })}
        nutrition={ticketModalShow.nutrition}
        setDataToSend={setDataToSend}
        dataToSend={dataToSend}
        patient={patient}
        handleEditVisitButton={handleEditVisitButton}
        setDataToChange={setDataToChange}
        setSpeech={setSpeech}
        speech={speech}
        socket={socket}
      />
      <DORModal
        show={dorModal.show}
        onHide={() => setDORModal({ show: false, id: "", dor: null })}
        dorModal={dorModal}
        setDORModal={setDORModal}
        handleDORChange={handleDORChange}
        saveDOR={saveDOR}
      />
      <div className="row m-0 justify-content-center">
        <div className="col-12">
          <div className="row pe-2 ps-2 mb-5">
            <div className="col-12">
              <form className="row mt-4" onSubmit={handleSearchButton}>
                <div className="col-3">
                  <h2 className="text">Patients</h2>
                </div>
                <div className="col-2 mt-2">
                  <div className="row">
                    <div className="col-4">
                      <button
                        type="button"
                        onClick={getPatients}
                        className="btn btn-secondary text"
                      >
                        All
                      </button>
                    </div>
                    <div className="col-8">
                      <button
                        type="button"
                        onClick={() => {
                          searchFetchStats(1, "today_visits", true);
                          setSearchType("11");
                        }}
                        className="btn btn-secondary text"
                      >
                        Today Visits
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-2 mt-2">
                  <select
                    id="searchType"
                    onChange={handleSearchTypeChange}
                    className="form-select"
                    value={searchType}
                  >
                    <option value="1" defaultValue>
                      Name
                    </option>
                    <option value="13">Patient ID</option>
                    <option value="10">Last Visit</option>
                    <option value="11">Address</option>
                    <option value="12">Phone</option>
                    <option value="2">Return Date</option>
                    <option value="3">Referral</option>
                    <option value="4">ICD-10</option>
                    <option value="5">Symptom</option>
                    <option value="6">Disease</option>
                    <option value="7">Investigation</option>
                    <option value="8">Drug name</option>
                    <option value="9">Past Surgical Hx</option>
                  </select>
                </div>
                {searchBar()}
                <div className="col-2 text mt-2">
                  <button type="submit" className="btn btn-secondary">
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover text">
                  <thead className="thead-dark">
                    <tr>
                      <th className="id-width">NO</th>
                      <th className="">ID</th>
                      <th className="name-width">Name</th>
                      <th className="age-width">Age</th>
                      <th className="gender-width">Gender</th>
                      <th className="job-width">Job</th>
                      <th className="province-width">Province</th>
                      <th className="address-width">Address</th>
                      <th className="phone-width">Phone No.</th>
                      <th className="phone-width">Referral</th>
                      <th className="weight-width">Weight</th>
                      <th className="height-width">Height</th>
                      <th className="height-width">BMI</th>
                      <th className="marital-width">Marital Status</th>
                      <th className="">Date of Return</th>
                      <th className="no-visits-width">Total Visits</th>
                      <th className="last-visit-width">Last Visit</th>
                      <th className="history-width">History</th>
                      <th className="surgical-width">Surgical History</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  {state.loading == true ? (
                    <Loading />
                  ) : (
                    <tbody>
                      {state.patients.map((patient, index) => {
                        return (
                          <>
                            <tr
                              key={patient.id}
                              className="font-weight-bold"
                              onContextMenu={(e) => displayMenu(e, patient)}
                              onDoubleClick={() => {
                                setPatient(patient);
                                handleVisitsTableButton();
                              }}
                              // onClick={() => {
                              //   props.setPatient(patient);
                              //   props.handlePatientButton();
                              // }}
                            >
                              <td className="id-width">
                                {(state.currentPage - 1) * 50 + (index + 1)}
                              </td>
                              <td className="">{patient.identifier}</td>
                              <td className="name-width">{patient.name}</td>
                              <td className="age-width">{patient.age}</td>
                              <td className="gender-width">{patient.gender}</td>
                              <td className="job-width">{patient.job}</td>
                              <td className="province-width">
                                {patient.province}
                              </td>
                              <td className="address-width">
                                {patient.address}
                              </td>
                              <td className="phone-width">
                                {patient.phone_number}
                              </td>
                              <td className="phone-width">
                                {patient.referral}
                              </td>
                              <td className="weight-width">{patient.weight}</td>
                              <td className="height-width">{patient.height}</td>
                              <td className="height-width">{patient.bmi}</td>
                              <td className="marital-width">
                                {patient.marital_status}
                              </td>
                              <td className="">{patient.return_visit}</td>
                              <td className="no-visits-width">
                                {patient.visits_number}
                              </td>
                              <td className="last-visit-width">
                                {patient.last_visit}
                              </td>
                              <td className="history-width">
                                {patient.past_medical
                                  .toString()
                                  .split(",")
                                  .join(", ")}
                              </td>
                              <td className="surgical-width">
                                {patient.past_surgery
                                  .toString()
                                  .split(",")
                                  .join(", ")}
                              </td>
                              <td>
                                <Dropdown>
                                  <Dropdown.Toggle
                                  // variant="success"
                                  // id="dropdown-basic"
                                  >
                                    <FontAwesomeIcon icon="ellipsis-v" />
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu popperConfig={popperConfig}>
                                    <Dropdown.Item
                                      onClick={() => {
                                        setPatient(patient);
                                        handlePatientButton();
                                      }}
                                    >
                                      View Patient
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => {
                                        setDataToChange(patient);
                                        handleEditPatientButton();
                                      }}
                                    >
                                      Edit Patient
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                      onClick={() => {
                                        setTicketModalShow({
                                          show: true,
                                          nutrition: 0,
                                        });
                                        setPatient(patient);
                                      }}
                                    >
                                      Add Visit
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => {
                                        getVisits(patient);
                                      }}
                                    >
                                      Show All Visits
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => {
                                        setPatient(patient);
                                        handleVisitsTableButton();
                                      }}
                                    >
                                      Visits Summary Table
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={(e) => {
                                        setDORModal({
                                          ...dorModal,
                                          show: true,
                                          id: patient.id,
                                          dor: patient.return_visit,
                                        });
                                      }}
                                    >
                                      Set Return Visit
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                      onClick={() => {
                                        setPatient(patient);
                                        handleBMITrackerButton();
                                      }}
                                    >
                                      BMI Tracker
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                      onClick={() => {
                                        setPatient(patient);
                                        handleAddOperationButton();
                                      }}
                                    >
                                      Add Operation
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => {
                                        setPatient(patient);
                                        handleOperationsButton();
                                      }}
                                    >
                                      Show All Operations
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                      onClick={(e) => {
                                        setConfirmModal({
                                          ...confirmModal,
                                          show: true,
                                          id: patient.id,
                                        });
                                      }}
                                    >
                                      Delete Patient
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
            <div className="col-12" dir="rtl">
              <Pagination
                totalPages={state.totalPages}
                currentPage={state.currentPage}
                pageNeighbours={1}
                pageChange={(p) => getSearch(p)}
              />
            </div>
          </div>
        </div>
      </div>
      <Menu id="maue">
        <Item
          onClick={({ props }) => {
            setPatient(props.patient);
            handlePatientButton();
          }}
        >
          View Patient
        </Item>
        <Item
          onClick={({ props }) => {
            setDataToChange(props.patient);
            handleEditPatientButton();
          }}
        >
          Edit Patient
        </Item>
        <Separator />
        <Item
          onClick={({ props }) => {
            setTicketModalShow({ show: true, nutrition: 0 });
            setPatient(props.patient);
          }}
        >
          Add Visit
        </Item>
        <Item
          onClick={({ props }) => {
            getVisits(props.patient);
          }}
        >
          Show All Visits
        </Item>
        <Item
          onClick={({ props }) => {
            setPatient(props.patient);
            handleVisitsTableButton();
          }}
        >
          Visits Summary Table
        </Item>
        <Item
          onClick={({ props }) => {
            setDORModal({
              ...dorModal,
              show: true,
              id: props.patient.id,
              dor: props.patient.return_visit,
            });
          }}
        >
          Set Return Visit
        </Item>
        <Separator />
        <Item
          onClick={({ props }) => {
            setPatient(props.patient);
            handleBMITrackerButton();
          }}
        >
          BMI Tracker
        </Item>
        <Separator />
        <Item
          onClick={({ props }) => {
            setPatient(props.patient);
            handleAddOperationButton();
          }}
        >
          Add Operation
        </Item>
        <Item
          onClick={({ props }) => {
            setPatient(props.patient);
            handleOperationsButton();
          }}
        >
          Show All Operations
        </Item>
        <Separator />
        <Item
          onClick={({ props }) => {
            setConfirmModal({
              ...confirmModal,
              show: true,
              id: props.patient.id,
            });
          }}
        >
          Delete Patient
        </Item>
      </Menu>
    </section>
  );
}

export default Patients;
