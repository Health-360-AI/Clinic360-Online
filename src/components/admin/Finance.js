import React, { useState, useEffect } from "react";
import Pagination from "../common/Pagination";
import { Line } from "react-chartjs-2";
import TicketModal from "../common/TicketModal";
import PatientTicketsModal from "../common/PatientTicketsModal";
import AddExpenseModal from "../common/AddExpenseModal";
import ConfirmModal from "../common/ConfirmModal";
import { toast } from "react-toastify";

const apiUrl = process.env.API_URL;

const lineOptions = {
  radius: 5,
  hitRadius: 20,
  hoverRadius: 12,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  maintainAspectRatio: false,
};

function Finance() {
  const [main, setMain] = useState({
    total_income: 0,
    yearly_income: 0,
    monthly_income: 0,
    daily_income: 0,
    net_total: 0,
    net_yearly: 0,
    net_monthly: 0,
    net_daily: 0,
    total_expenses: 0,
    total_yearly_expenses: 0,
    total_monthly_expenses: 0,
    total_daily_expenses: 0,
    unpaid_total_expenses: 0,
    unpaid_yearly_expenses: 0,
    unpaid_monthly_expenses: 0,
    unpaid_daily_expenses: 0,
    paid_total_expenses: 0,
    paid_yearly_expenses: 0,
    paid_monthly_expenses: 0,
    paid_daily_expenses: 0,
    places: [],
    free_return_visits: 0,
    paid_tickets: 0,
    unpaid_tickets: 0,
    operations_total: 0,
    operations_income: 0,
    monthly_income_statistics: { labels: [], data: [] },
  });
  const [ticketModal, setTicketModal] = useState({ show: false });
  const [addExpenseModal, setAddExpenseModal] = useState({ show: false });
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    id: "",
  });
  const [patientTicketsModal, setPatientTicketsModal] = useState({
    show: false,
    id: null,
    name: "",
  });
  const [dataToChange, setDataToChange] = useState({});
  const [tickets, setTickets] = useState({
    patients: [],
    search: "",
    currentPage: 1,
    totalPages: 1,
  });
  const [expenses, setExpenses] = useState({
    expenses: [],
    search: "",
    currentPage: 1,
    totalPages: 1,
  });
  const expense_states = [
    { id: "0", name: "Un-Paid" },
    { id: "1", name: "Paid" },
  ];

  const states = [
    { id: 0, name: "Free Return" },
    { id: 1, name: "Paid" },
    { id: 2, name: "Not-Paid" },
  ];

  const [searchTypeTickets, setSearchTypeTickets] = useState("1");
  const [searchTypeExpenses, setSearchTypeExpenses] = useState("1");
  const getMain = async () => {
    try {
      const response = await fetch(`${apiUrl}/finance`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const responseData = await response.json();
      setMain({
        ...main,
        total_income: responseData.total_income,
        yearly_income: responseData.yearly_income,
        monthly_income: responseData.monthly_income,
        daily_income: responseData.daily_income,
        net_total: responseData.net_total,
        net_yearly: responseData.net_yearly,
        net_monthly: responseData.net_monthly,
        net_daily: responseData.net_daily,
        total_expenses: responseData.total_expenses,
        total_yearly_expenses: responseData.total_yearly_expenses,
        total_monthly_expenses: responseData.total_monthly_expenses,
        total_daily_expenses: responseData.total_daily_expenses,
        unpaid_total_expenses: responseData.unpaid_total_expenses,
        unpaid_yearly_expenses: responseData.unpaid_yearly_expenses,
        unpaid_monthly_expenses: responseData.unpaid_monthly_expenses,
        unpaid_daily_expenses: responseData.unpaid_daily_expenses,
        paid_total_expenses: responseData.paid_total_expenses,
        paid_yearly_expenses: responseData.paid_yearly_expenses,
        paid_monthly_expenses: responseData.paid_monthly_expenses,
        paid_daily_expenses: responseData.paid_daily_expenses,
        places: responseData.places,
        free_return_visits: responseData.free_return_visits,
        paid_tickets: responseData.paid_tickets,
        unpaid_tickets: responseData.unpaid_tickets,
        operations_total: responseData.operations_total,
        operations_income: responseData.operations_income,
        monthly_income_statistics: responseData.monthly_income_statistics,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const getTickets = async () => {
    try {
      const response = await fetch(`${apiUrl}/patients-ticket`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const responseData = await response.json();
      setTickets({
        patients: responseData.patients,
        search: "",
        currentPage: responseData.page,
        totalPages: responseData.total_pages,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const getExpenses = async () => {
    try {
      const response = await fetch(`${apiUrl}/expenses`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const responseData = await response.json();

      setExpenses({
        expenses: responseData.expenses,
        search: "",
        currentPage: responseData.page,
        totalPages: responseData.total_pages,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getMain();
    getTickets();
    getExpenses();
  }, []);

  const handleSearchTicketsChange = (e) => {
    setTickets({ ...tickets, search: e.target.value });
  };
  const handleSearchExpensesChange = (e) => {
    console.log(e.target.value);
    setExpenses({ ...expenses, search: e.target.value });
  };
  const searchFetchTickets = async (p, sType, value) => {
    try {
      const response = await fetch(
        `${apiUrl}/patients-ticket?page=${p}&${sType}=${value}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const responseData = await response.json();
      if (responseData.success) {
        setTickets({
          ...tickets,
          patients: responseData.patients,
          loading: false,
          search: value,
          currentPage: responseData.page,
          totalPages: responseData.total_pages,
        });
      } else {
        throw new Error("There Was an Error");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };
  const searchFetchExpenses = async (p, sType, value) => {
    try {
      const response = await fetch(
        `${apiUrl}/expenses?page=${p}&${sType}=${value}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      if (responseData.success) {
        setExpenses({
          ...expenses,
          expenses: responseData.expenses,
          currentPage: responseData.page,
          search: value,
          totalPages: responseData.total_pages,
        });
      } else {
        throw new Error("There Was an Error");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  let monthly_income_statistics = {
    labels: main.monthly_income_statistics.labels,
    datasets: [
      {
        label: "Income Per Month",
        data: main.monthly_income_statistics.data,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };
  const ticketState = (v) => {
    if (v == 0) {
      return "Free Return";
    } else if (v == 1) {
      return "Paid";
    } else if (v == 2) {
      return "Not-Paid";
    }
  };
  const handleSearchTicketsButton = (e) => {
    e.preventDefault();
    // setState({ ...state, loading: true });
    if (searchTypeTickets == "1") {
      searchFetchTickets(1, "name", tickets.search);
    } else if (searchTypeTickets == "2") {
      searchFetchTickets(1, "date_visit", tickets.search);
    } else if (searchTypeTickets == "3") {
      searchFetchTickets(1, "state", tickets.search);
    }
  };

  const handleSearchExpensesButton = (e) => {
    e.preventDefault();
    // setState({ ...state, loading: true });
    if (searchTypeExpenses == "1") {
      searchFetchExpenses(1, "subject_name", expenses.search);
    } else if (searchTypeExpenses == "2") {
      searchFetchExpenses(1, "expense_state", expenses.search);
    } else if (searchTypeExpenses == "3") {
      searchFetchExpenses(1, "expense_date", expenses.search);
    }
  };
  const deleteExpense = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/expenses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer`,
        },
      });

      const responseData = await response.json();
      getExpenses();
      toast.success("Deleted Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSearchTypeTicketsChange = (e) => {
    setSearchTypeTickets(e.target.value);
    if (e.target.value == "3") {
      setTickets({ ...tickets, search: "0" });
    }
  };
  const handleSearchTypeExpensesChange = (e) => {
    setSearchTypeExpenses(e.target.value);
    if (e.target.value == "2") {
      setExpenses({ ...expenses, search: "0" });
    }
  };
  const getSearchTickets = (p) => {
    if (searchTypeTickets == "1") {
      return searchFetchTickets(p, "name", tickets.search);
    } else if (searchTypeTickets == "2") {
      return searchFetchTickets(p, "date_visit", tickets.search);
    } else if (searchTypeTickets == "3") {
      return searchFetchTickets(p, "state", tickets.search);
    }
  };

  const getSearchExpenses = (p) => {
    if (searchTypeExpenses == "1") {
      return searchFetchExpenses(p, "subject_name", expenses.search);
    } else if (searchTypeExpenses == "2") {
      return searchFetchExpenses(p, "expense_state", expenses.search);
    } else if (searchTypeExpenses == "3") {
      return searchFetchExpenses(p, "expense_date", expenses.search);
    }
  };
  const searchBarTickets = () => {
    if (searchTypeTickets == "1") {
      return (
        <div className="col-5">
          <input
            type="text"
            className="form-control text"
            id="searchPatient"
            onChange={handleSearchTicketsChange}
            placeholder="Name"
          ></input>
        </div>
      );
    } else if (searchTypeTickets == "2") {
      return (
        <>
          <div className="col-5">
            <input
              type="date"
              className="form-control text"
              id="searchLastVisit"
              onChange={handleSearchTicketsChange}
            ></input>
          </div>
        </>
      );
    } else if (searchTypeTickets == "3") {
      return (
        <>
          <div className="col-5">
            <select
              id="searchState"
              onChange={handleSearchTicketsChange}
              className="form-select"
              defaultValue={"0"}
            >
              {states.map((state) => {
                return <option value={state.id}>{state.name}</option>;
              })}
            </select>
          </div>
        </>
      );
    }
  };
  const searchBarExpenses = () => {
    if (searchTypeExpenses == "1") {
      return (
        <div className="col-5">
          <input
            type="text"
            className="form-control text"
            id="searchPatient"
            onChange={handleSearchExpensesChange}
            placeholder="Subject"
          ></input>
        </div>
      );
    } else if (searchTypeExpenses == "2") {
      return (
        <>
          <div className="col-5">
            <select
              id="searchState"
              onChange={handleSearchExpensesChange}
              className="form-select"
              defaultValue={"0"}
            >
              {expense_states.map((state) => {
                return (
                  <option value={state.id} key={state.id}>
                    {state.name}
                  </option>
                );
              })}
            </select>
          </div>
        </>
      );
    } else if (searchTypeExpenses == "3") {
      return (
        <>
          <div className="col-5">
            <input
              type="date"
              className="form-control text"
              id="searchLastVisit"
              onChange={handleSearchExpensesChange}
            ></input>
          </div>
        </>
      );
    }
  };
  return (
    <section className="main pt-5 pb-5">
      <TicketModal
        show={ticketModal.show}
        onHide={() =>
          setTicketModal({
            ...ticketModal,
            show: false,
          })
        }
        dataToChange={dataToChange}
        getTickets={getTickets}
        getMain={getMain}
        getPatientsTicket={getTickets}
      />
      <PatientTicketsModal
        show={patientTicketsModal.show}
        onHide={() =>
          setPatientTicketsModal({
            ...patientTicketsModal,
            show: false,
            id: null,
            name: "",
          })
        }
        id={patientTicketsModal.id}
        name={patientTicketsModal.name}
        getMain={getMain}
        getPatientsTicket={getTickets}
      />
      <ConfirmModal
        show={confirmModal.show}
        onHide={() =>
          setConfirmModal({
            ...confirmModal,
            show: false,
            id: "",
          })
        }
        confirm={deleteExpense}
        id={confirmModal.id}
      />
      <div className="row pt-2 mt-3 m-0 d-flex justify-content-center pb-3">
        <AddExpenseModal
          show={addExpenseModal.show}
          onHide={() => setAddExpenseModal({ ...addExpenseModal, show: false })}
          dataToChange={{
            ...addExpenseModal,
            id: addExpenseModal.id,
            subject: addExpenseModal.subject,
            cost: addExpenseModal.cost,
            expense_date: addExpenseModal.expense_date,
            expense_state: addExpenseModal.expense_state,
          }}
          getExpenses={getExpenses}
        />
        <h2 className="col-10 text-start">Finance</h2>
        <div className="col-10">
          <div className="row ps-2 mt-5 pe-2 mb-5">
            <div className="col-2 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Total Income</h5>
                      <h3>{main.total_income}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-2 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Yearly Income</h5>
                      <h3>{main.yearly_income}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-2 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Monthly Income</h5>
                      <h3>{main.monthly_income}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-2 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Daily Income</h5>
                      <h3>{main.daily_income}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-2 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Total Net</h5>
                      <h3>{main.net_total}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-2 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Yearly Net</h5>
                      <h3>{main.net_yearly}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-2 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Monthly Net</h5>
                      <h3>{main.net_monthly}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-2 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Daily Net</h5>
                      <h3>{main.net_daily}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-2 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Total Expenses</h5>
                      <h3>{main.total_expenses}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-2 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Yearly Expenses</h5>
                      <h3>{main.total_yearly_expenses}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-2 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Monthly Expenses</h5>
                      <h3>{main.total_monthly_expenses}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-2 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Daily Expenses</h5>
                      <h3>{main.total_daily_expenses}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-2 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Total Paid Expenses</h5>
                      <h3>{main.paid_total_expenses}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-2 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Yearly Paid Expenses</h5>
                      <h3>{main.paid_yearly_expenses}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-2 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Monthly Paid Expenses</h5>
                      <h3>{main.paid_monthly_expenses}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-2 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Daily Paid Expenses</h5>
                      <h3>{main.paid_daily_expenses}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-2 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Total Unpaid Expenses</h5>
                      <h3>{main.unpaid_total_expenses}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-2 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Yearly Unpaid Expenses</h5>
                      <h3>{main.unpaid_yearly_expenses}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-5">
          <div className="row ps-2 mt-5 pe-2 mb-5">
            <div className="col-4 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Monthly Unpaid Expenses</h5>
                      <h3>{main.unpaid_monthly_expenses}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-4 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Daily Unpaid Expenses</h5>
                      <h3>{main.unpaid_daily_expenses}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-4 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Free Return Visits</h5>
                      <h3>{main.free_return_visits}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-4 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Paid Tickets</h5>
                      <h3>{main.paid_tickets}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-4 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Unpaid Tickets</h5>
                      <h3>{main.unpaid_tickets}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-4 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Operations Total</h5>
                      <h3>{main.operations_total}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>
            <div className="col-4 p-2">
              <div className="card card-common bg-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="text-left text-white">
                      <h5>Operations Income</h5>
                      <h3>{main.operations_income}</h3>
                    </div>
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                  </div>
                </div>
                <div className="card-footer text-white text-end">
                  <i className="fas fa-sync mr-3"></i>
                  <span>Updated Now</span>
                </div>
              </div>
            </div>

            {main.places.map((place) => {
              return (
                <>
                  <div className="col-4 p-2">
                    <div className="card card-common bg-primary">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div className="text-left text-white">
                            <h5>Total Operations For {place.place_name}</h5>
                            <h3>{place.place_total_operations}</h3>
                          </div>
                          <i className="fas fa-chart-line fa-3x text-danger"></i>
                        </div>
                      </div>
                      <div className="card-footer text-white text-end">
                        <i className="fas fa-sync mr-3"></i>
                        <span>Updated Now</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 p-2">
                    <div className="card card-common bg-primary">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div className="text-left text-white">
                            <h5>Operations Income For {place.place_name}</h5>
                            <h3>{place.place_income}</h3>
                          </div>
                          <i className="fas fa-chart-line fa-3x text-danger"></i>
                        </div>
                      </div>
                      <div className="card-footer text-white text-end">
                        <i className="fas fa-sync mr-3"></i>
                        <span>Updated Now</span>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="col-5" style={{ height: "400px" }}>
          <Line
            data={monthly_income_statistics}
            options={lineOptions}
            width={80}
            height={400}
          />
        </div>
      </div>
      <div className="row m-0 d-flex justify-content-center">
        <div className="col-5">
          <div className="row mt-4 mb-3">
            <div className="col-6">
              <h2 className="text">Patients Latest Ticket</h2>
            </div>
            <div className="col-6">
              <form onSubmit={handleSearchTicketsButton}>
                <div className="form-group row mt-1">
                  <div className="col-4">
                    <select
                      id="searchType"
                      onChange={handleSearchTypeTicketsChange}
                      className="form-select"
                    >
                      <option value="1" defaultValue>
                        Name
                      </option>
                      <option value="2">Visit Date</option>
                      <option value="3">State</option>
                    </select>
                  </div>
                  {searchBarTickets()}
                  <div className="col-2 text">
                    <button type="submit" className="btn btn-secondary">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover text">
              <thead className="thead-dark">
                <tr>
                  <th className="id-width">ID</th>
                  <th className="name-width">Name</th>
                  <th className="">Last Visit</th>
                  <th className="gender-width">Ticket State</th>
                  <th className="job-width">Price</th>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {tickets.patients.map((ticket, index) => {
                  return (
                    <tr key={ticket.visit_id} className="font-weight-bold">
                      <td className="id-width">{index + 1}</td>
                      <td className="name-width">{ticket.name}</td>
                      <td className="">{ticket.last_visit}</td>
                      <td className="gender-width">
                        {ticketState(ticket.ticket_state)}
                      </td>
                      <td className="job-width">{ticket.ticket_price}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-secondary"
                          onClick={(e) => {
                            setPatientTicketsModal({
                              ...patientTicketsModal,
                              show: true,
                              id: ticket.patient_id,
                              name: ticket.name,
                            });
                          }}
                        >
                          View
                        </button>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-secondary"
                          onClick={(e) => {
                            setDataToChange({
                              visit_id: ticket.visit_id,
                              patient_id: ticket.patient_id,
                              state: ticket.ticket_state,
                              price: ticket.ticket_price,
                            });
                            setTicketModal({
                              ...ticketModal,
                              show: true,
                            });
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-12" dir="rtl">
              <Pagination
                totalPages={tickets.totalPages}
                currentPage={tickets.currentPage}
                pageNeighbours={1}
                pageChange={(p) => getSearchTickets(p)}
              />
            </div>
          </div>
        </div>
        <div className="col-5">
          <div className="row mt-4 mb-3">
            <div className="col-5">
              <h2 className="text">Expneses</h2>
            </div>
            <div className="col-1 mt-2">
              <button
                type="button"
                onClick={() =>
                  setAddExpenseModal({ ...addExpenseModal, show: true })
                }
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
            <div className="col-6">
              <form onSubmit={handleSearchExpensesButton}>
                <div className="form-group row mt-1">
                  <div className="col-4">
                    <select
                      id="searchType"
                      onChange={handleSearchTypeExpensesChange}
                      className="form-select"
                    >
                      <option value="1" defaultValue>
                        Subject name
                      </option>
                      <option value="2">Expense state</option>
                      <option value="3">Expense date</option>
                    </select>
                  </div>

                  {searchBarExpenses()}
                  <div className="col-2 text">
                    <button type="submit" className="btn btn-secondary">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover text">
              <thead className="thead-dark">
                <tr>
                  <th className="id-width">ID</th>
                  <th className="name-width">Subject</th>
                  <th className="">Cost</th>
                  <th className="gender-width">Expense State</th>
                  <th className="job-width">Expense date</th>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {expenses.expenses.map((expense, index) => {
                  return (
                    <tr key={expense.id} className="font-weight-bold">
                      <td className="id-width">{index + 1}</td>
                      <td className="name-width">{expense.subject}</td>
                      <td className="">{expense.cost}</td>
                      <td className="gender-width">
                        {expense_states.filter(
                          (expense_state) =>
                            expense_state.id == expense.expense_state
                        )[0] &&
                          expense_states.filter(
                            (expense_state) =>
                              expense_state.id == expense.expense_state
                          )[0].name}
                      </td>
                      <td className="job-width">{expense.expense_date}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-secondary"
                          onClick={(e) => {
                            setAddExpenseModal({
                              ...addExpenseModal,
                              show: true,
                              id: expense.id,
                              subject: expense.subject,
                              cost: expense.cost,
                              expense_state: expense.expense_state,
                              expense_date: expense.expense_date,
                            });
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-danger"
                          onClick={(e) => {
                            setConfirmModal({
                              ...confirmModal,
                              show: true,
                              id: expense.id,
                            });
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-12" dir="rtl">
              <Pagination
                totalPages={expenses.totalPages}
                currentPage={expenses.currentPage}
                pageNeighbours={1}
                pageChange={(p) => getSearchExpenses(p)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Finance;
