import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";

const apiUrl = process.env.API_URL;

export default function AddExpenseModal(props) {
  const [dataToSend, setDataToSend] = useState({
    id: "",
    subject: "",
    expense_state: "",
    cost: 0,
    expense_date: "",
  });
  const states = [
    { id: 1, name: "Paid" },
    { id: 0, name: "Not-Paid" },
  ];
  const handleCostChange = (e) =>
    setDataToSend({ ...dataToSend, cost: e.target.value });
  const handleSubjectChange = (e) =>
    setDataToSend({ ...dataToSend, subject: e.target.value });
  const handleDateChange = (e) =>
    setDataToSend({ ...dataToSend, expense_date: e.target.value });
  const handleStateChange = async (item, action) => {
    if (action.action == "select-option") {
      setDataToSend({ ...dataToSend, expense_state: item.id });
    } else if (action.action == "clear") {
      setDataToSend({ ...dataToSend, expense_state: null });
    }
  };
  useEffect(() => {
    if (Object.keys(props.dataToChange).length != 0) {
      setDataToSend(props.dataToChange);
    }
  }, [props.show]);
  const saveExpense = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/expenses${
          props.dataToChange.id ? "/" + props.dataToChange.id : ""
        }`,
        {
          method: props.dataToChange.id ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );
      console.log(dataToSend);
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.success) {
        props.getExpenses();
        props.onHide();
        toast.success("Added Successfully");
      } else {
        throw new Error("Error");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Failed");
    }
  };
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className=""
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Expense
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-start">
        <div className="form-group row justify-content-center">
          <label
            htmlFor="subject"
            className="col-2 col-form-label text-center mb-2 text-white modal-text-form"
          >
            Subject
          </label>
          <div className="col-6 font-normal">
            <input
              id="subject"
              autoComplete="on"
              type="text"
              placeholder="Subject"
              className="form-control text"
              onChange={handleSubjectChange}
              value={dataToSend.subject}
              required
            ></input>
          </div>
        </div>
        <div className="form-group row justify-content-center">
          <label
            htmlFor="type"
            className="col-2 col-form-label text-center mb-2 text-white modal-text-form"
          >
            State
          </label>
          <div className="col-6 font-normal">
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              isClearable={true}
              value={states.filter((s) => s.id == dataToSend.expense_state)}
              onChange={handleStateChange}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
              options={states}
            />
          </div>
        </div>
        <div className="form-group row justify-content-center mb-0 mt-2">
          <label
            htmlFor="cost"
            className="col-2 col-form-label text-center text-white modal-text-form"
          >
            Cost
          </label>
          <div className="col-6">
            <input
              id="cost"
              type="number"
              placeholder="0"
              className="form-control text"
              onChange={handleCostChange}
              value={dataToSend.cost}
              required
            ></input>
          </div>
          <div className="form-group row justify-content-center mb-0 mt-2">
            <label
              htmlFor="date"
              className="col-2 col-form-label text-center text-white modal-text-form"
            >
              Date
            </label>
            <div className="col-6">
              <input
                id="date"
                type="date"
                className="form-control form-background"
                onChange={handleDateChange}
                value={dataToSend.expense_date}
                required
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer
        className="m-0 align-items-center justify-content-center"
        dir="ltr"
      >
        <div className="">
          <Button
            onClick={async () => {
              if (dataToSend.expense_state != null) {
                saveExpense();
              } else {
                toast.error("Please Choose A State");
              }
            }}
            className="modal-add-nav"
          >
            Add Expense
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
