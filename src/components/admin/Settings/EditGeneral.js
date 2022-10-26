import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const apiUrl = process.env.API_URL;

const EditGeneral = ({ data, handleGeneralPage, getGeneral }) => {
  const [dataToSend, setDataToSend] = useState({
    name: "",
    degrees: "",
    department: "",
    speciality: "",
    email: "",
    address: "",
    Time: "",
    days: "",
    phone: null,
  });

  useEffect(() => {
    if (data) {
      setDataToSend(data);
    }
  }, []);
  const [saving, setSaving] = useState(false);
  const saveGeneral = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/general-info${dataToSend.id ? `/${dataToSend.id}` : ``}`,
        {
          method: dataToSend.id ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      setSaving(false);
      toast.success("Info Saved Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Info Saving Failed");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    saveGeneral();
    handleGeneralPage();
    getGeneral();
  };
  const handleNameChange = (e) => {
    setDataToSend({ ...dataToSend, name: e.target.value });
  };
  const handleDegreesChange = (e) => {
    setDataToSend({ ...dataToSend, degrees: e.target.value });
  };
  const handleDepartmentChange = (e) => {
    setDataToSend({ ...dataToSend, department: e.target.value });
  };
  const handleSpecialityChange = (e) => {
    setDataToSend({ ...dataToSend, speciality: e.target.value });
  };
  const handleEmailChange = (e) => {
    setDataToSend({ ...dataToSend, email: e.target.value });
  };
  const handleAddressChange = (e) => {
    setDataToSend({ ...dataToSend, address: e.target.value });
  };
  const handleTimeChange = (e) => {
    setDataToSend({ ...dataToSend, Time: e.target.value });
  };
  const handleWorkingDaysChange = (e) => {
    setDataToSend({ ...dataToSend, days: e.target.value });
  };
  const handlePhoneChange = (e) => {
    setDataToSend({ ...dataToSend, phone: e.target.value });
  };
  return (
    <div
      className={"width-others-wide ms-auto main-view fadeIn"}
      id="main-view"
    >
      <form onSubmit={handleSubmit} className="row m-0">
        <div className="col-12">
          <div className="form-group row mt-2">
            <label
              htmlFor="name"
              className="col-3 col-form-label text-center mb-2"
            >
              Name
            </label>
            <div className="col-8">
              <input
                id="name"
                type="text"
                placeholder="Name"
                className="form-control form-background"
                onChange={handleNameChange}
                value={dataToSend.name}
                required
              ></input>
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="degrees"
              className="col-3 col-form-label text-center mb-2"
            >
              Degrees
            </label>
            <div className="col-8">
              <input
                id="degrees"
                type="text"
                placeholder="Degrees"
                className="form-control form-background"
                onChange={handleDegreesChange}
                value={dataToSend.degrees}
              ></input>
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="department"
              className="col-3 col-form-label text-center mb-2"
            >
              Department
            </label>
            <div className="col-8">
              <input
                id="department"
                type="text"
                placeholder="Department"
                className="form-control form-background"
                onChange={handleDepartmentChange}
                value={dataToSend.department}
              ></input>
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="speciality"
              className="col-3 col-form-label text-center mb-2"
            >
              Speciality
            </label>
            <div className="col-8">
              <input
                id="speciality"
                type="text"
                placeholder="Speciality"
                className="form-control form-background"
                onChange={handleSpecialityChange}
                value={dataToSend.speciality}
              ></input>
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="email"
              className="col-3 col-form-label text-center mb-2"
            >
              Email
            </label>
            <div className="col-8">
              <input
                id="email"
                type="text"
                placeholder="Email"
                className="form-control form-background"
                onChange={handleEmailChange}
                value={dataToSend.email}
              ></input>
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="address"
              className="col-3 col-form-label text-center mb-2"
            >
              Address
            </label>
            <div className="col-8">
              <input
                id="address"
                type="text"
                placeholder="Address"
                className="form-control form-background"
                onChange={handleAddressChange}
                value={dataToSend.address}
              ></input>
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="time"
              className="col-3 col-form-label text-center mb-2"
            >
              Time
            </label>
            <div className="col-8">
              <input
                id="time"
                type="text"
                placeholder="Time"
                className="form-control form-background"
                onChange={handleTimeChange}
                value={dataToSend.Time}
              ></input>
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="working_days"
              className="col-3 col-form-label text-center mb-2"
            >
              Working Days
            </label>
            <div className="col-8">
              <input
                id="working_days"
                type="text"
                placeholder="Working Days"
                className="form-control form-background"
                onChange={handleWorkingDaysChange}
                value={dataToSend.days}
              ></input>
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="phone"
              className="col-3 col-form-label text-center mb-2"
            >
              Phone
            </label>
            <div className="col-8">
              <input
                id="phone"
                type="text"
                placeholder="Phone"
                className="form-control form-background"
                onChange={handlePhoneChange}
                value={dataToSend.phone}
              ></input>
            </div>
          </div>
          <div className="form-group row justify-content-center">
            <div className="col-3 mt-2 mb-2">
              {!saving ? (
                <button
                  type="submit"
                  className="btn btn-block w-100 submit-button"
                >
                  Save Info
                </button>
              ) : (
                <button disabled className="btn btn-block w-100 submit-button">
                  Saving...
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditGeneral;
