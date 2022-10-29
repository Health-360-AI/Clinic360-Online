import React, { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import Loading from "../common/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import { toast } from "react-toastify";

const apiUrl = process.env.API_URL;

function Operations({
  showPending,
  setPatient,
  setDataToChange,
  handleEditOperationButton,
}) {
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const [pending, setPending] = useState(false);
  const [state, setState] = useState({
    patients: [
      {
        id: 0,
        name: "محمد علي محمد",
        age: 20,
        gender: "Male",
        job: "نجار",
        province: "بغداد",
        address: "القاهرة",
        phone: "07702773462",
        marital_status: "اعزب",
        visits_number: 10,
        last_visit: "2021-10-28",
        operations: [],
      },
    ],
    search: "",
    currentPage: 1,
    totalPages: 1,
    loading: true,
  });

  const getOperations = async () => {
    try {
      const response = await fetch(`${apiUrl}/operations`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const responseData = await response.json();
      responseData.patients.map((patient) => (patient["seeMore"] = false));
      setState({
        ...state,
        patients: responseData.patients,
        loading: false,
        totalPages: responseData.total_pages,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getPlaces();
    if (showPending) {
      searchFetch(1, "pending_state", Number(1));
      setPending(true);
    } else {
      setPending(false);
      getOperations();
    }
  }, []);
  const searchFetch = async (p, sType, value) => {
    try {
      const response = await fetch(
        `${apiUrl}/operations?page=${p}&${sType}=${value}`,
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
  const [searchType, setSearchType] = useState("0");

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearchChange = (e) => {
    setState({ ...state, search: e.target.value });
  };
  const see = (index) => {
    return state.patients[index].seeMore ? (
      <Fragment>
        <div className="row">
          <p className="col-sm-3 mb-0">السعر الكلي: {price}</p>
          <p className="col-sm-3">الطبيب: {doctor}</p>
          <p className="col-sm-3 mb-0">{company} :الشركة</p>
          <p className="col-sm-3">التعليق: {comment}</p>
        </div>
        <div className="row">
          <div className="col-10 offset-2 col-sm-11 offset-sm-1 col-lg-12 offset-lg-0 table-responsive">
            <table
              className="table table-striped table-bordered table-hover text"
              dir="rtl"
            >
              <thead className="thead-dark">
                <tr>
                  <th>المادة</th>
                  <th>الكمية</th>
                  <th>هدية</th>
                  <th>البونس</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  return (
                    <tr key={item.id} className="font-weight-bold">
                      <th>{item.item_name}</th>
                      <th>{item.quantity}</th>
                      <th>{item.gift == true ? "نعم" : "لا"}</th>
                      <td>{item.bonus}&#37;</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <p onClick={() => handleSeeMore(order_id)} className="see-more">
          اظهار القليل
        </p>
      </Fragment>
    ) : (
      <p onClick={() => handleSeeMore(order_id)} className="see-more">
        ...قراءة المزيد
      </p>
    );
  };
  const handleSeeMore = (index) => {
    let nee = [...state.patients];
    nee[index] = { ...nee[index], seeMore: !nee[index].seeMore };
    setState({ ...state, patients: seeMore });
  };
  const handleSearchButton = (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });
    if (searchType == "1") {
      searchFetch(1, "patient_name", state.search);
    } else if (searchType == "2") {
      searchFetch(1, "surgery", state.search);
    } else if (searchType == "3") {
      searchFetch(1, "place_id", state.search);
    } else if (searchType == "4") {
      searchFetch(1, "date_of_surgery", state.search);
    } else {
      getOperations();
    }
  };
  const getPlaces = async () => {
    try {
      const response = await fetch(`${apiUrl}/places`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const responseData = await response.json();
      // setData({ ...data, marital_statuses: responseData.marital_statuses });
      setPlaces(responseData.places);
    } catch (error) {
      console.log(error.message);
    }
  };
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
        <div className="col-3 mt-2 mb-3">
          <input
            type="text"
            className="form-control text"
            id="searchSurgery"
            onChange={handleSearchChange}
            placeholder="Suregry"
          ></input>
        </div>
      );
    } else if (searchType == "3") {
      return (
        <div className="col-3 mt-2 mb-3">
          <Select
            className="react-select-container font-normal"
            classNamePrefix="react-select"
            isClearable={true}
            value={places.filter((place) => place.id == state.search)}
            onChange={(item, action) => {
              if (action.action == "select-option") {
                setState({
                  ...state,
                  search: item.id,
                });
              } else if (action.action == "clear") {
                setState({
                  ...state,
                  search: null,
                });
              }
            }}
            getOptionValue={(option) => option.id}
            getOptionLabel={(option) => option.name}
            options={places}
          />
        </div>
      );
    } else if (searchType == "4") {
      return (
        <div className="col-3 mt-2 mb-3">
          <input
            type="date"
            className="form-control text"
            id="searchDate"
            onChange={handleSearchChange}
          ></input>
        </div>
      );
    }
  };
  return (
    <section className="main pt-5">
      <div className="row m-0 justify-content-center">
        <div className="col-12">
          <div className="row pe-2 ps-2 mb-5">
            <div className="col-12">
              <form className="row mt-4" onSubmit={handleSearchButton}>
                <div className="col-3">
                  <h2 className="text">Operations</h2>
                </div>
                <div className="col-1 mt-2">
                  <button
                    type="button"
                    onClick={getOperations}
                    className="btn btn-secondary text"
                  >
                    All
                  </button>
                </div>
                <div className="col-1">
                  <input
                    id="pregnant"
                    className="form-check-input mt-3"
                    type="checkbox"
                    checked={pending}
                    onChange={(e) => {
                      setPending(!pending);
                      searchFetch(1, "pending_state", Number(e.target.checked));
                    }}
                  />
                  <label
                    className="form-check-label col-form-label font-normal ps-2 mt-1"
                    htmlFor="pregnant"
                  >
                    Pending
                  </label>
                </div>
                <div className="col-2  mt-2">
                  <select
                    id="searchType"
                    onChange={handleSearchTypeChange}
                    className="form-select"
                  >
                    <option value="0" defaultValue>
                      Search by
                    </option>
                    <option value="1">Name</option>
                    <option value="2">Surgery</option>
                    <option value="3">Place</option>
                    <option value="4">Date of Surgery</option>
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
                <table className="table table-bordered table-hover text">
                  <thead className="thead-dark">
                    <tr>
                      <th className="id-width">ID</th>
                      <th className="name-width">Patient</th>
                      <th className="age-width">Age</th>
                      <th className="gender-width">Gender</th>
                      <th className="province-width">Province</th>
                      <th className="address-width">Address</th>
                      <th className="phone-width">Phone No.</th>
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
                              // onContextMenu={(e) => displayMenu(e, patient)}
                              // onDoubleClick={() => {
                              //   setPatient(patient);
                              //   handleVisitsTableButton();
                              // }}
                              // onClick={() => {
                              //   props.setPatient(patient);
                              //   props.handlePatientButton();
                              // }}
                            >
                              <td className="id-width">
                                {(state.currentPage - 1) * 50 + (index + 1)}
                              </td>
                              <td className="name-width">
                                <div className="row">
                                  <div className="col-2">
                                    <FontAwesomeIcon
                                      icon="caret-right"
                                      className="blue-bg"
                                      style={{ width: "30px", height: "30px" }}
                                      onClick={() => handleSeeMore(index)}
                                    />
                                  </div>
                                  <div className="col-10">{patient.name}</div>
                                </div>
                              </td>
                              <td className="age-width">{patient.age}</td>
                              <td className="gender-width">{patient.gender}</td>
                              <td className="province-width">
                                {patient.province}
                              </td>
                              <td className="province-width">
                                {patient.address}
                              </td>
                              <td className="phone-width">
                                {patient.phone_number}
                              </td>
                              {/* <td className="surgical-width">
                                {patient.past_surgery
                                  .toString()
                                  .split(",")
                                  .join(", ")}
                              </td> */}
                              <td>
                                {/* <Dropdown>
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
                                        handleOperationsButton();
                                      }}
                                    >
                                      Edit
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
                                      Delete Operation
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown> */}
                              </td>
                            </tr>
                            <td colspan="8">
                              <div className="row m-0 pt-0 p-3 justify-content-center">
                                <table className="table table-gray table-bordered table-hover text side-border-subtable">
                                  <thead>
                                    <tr>
                                      <th>NO.</th>
                                      <th>Surgery</th>
                                      <th>Diagnosis</th>
                                      <th>OP Date</th>
                                      <th>State</th>
                                      <th>Place</th>
                                      <th>&nbsp;</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {patient.operations.map(
                                      (operation, index) => {
                                        console.log(operation);
                                        return (
                                          <tr>
                                            <td>{index + 1}</td>
                                            <td>{operation.surgery.name}</td>
                                            <td>
                                              {operation.diagnosis
                                                ? operation.diagnosis.name
                                                : ""}
                                            </td>
                                            <td>{operation.date_operation}</td>
                                            <td>
                                              {operation.pending == "1"
                                                ? "Pending"
                                                : "Finished"}
                                            </td>
                                            <td>
                                              {operation.place
                                                ? operation.place.name
                                                : ""}
                                            </td>

                                            <td>
                                              <button
                                                onClick={() => {
                                                  setPatient(patient);
                                                  setDataToChange(operation);
                                                  handleEditOperationButton();
                                                }}
                                                className="btn btn-secondary text-white"
                                              >
                                                Edit
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </td>
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
                pageChange={searchFetch}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Menu id="maue">
        <Item
          onClick={({ props }) => {
            setPatient(props.patient);
            handleOperationsButton();
          }}
        >
          Edit
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
          Delete Operation
        </Item>
      </Menu> */}
    </section>
  );
}

export default Operations;
