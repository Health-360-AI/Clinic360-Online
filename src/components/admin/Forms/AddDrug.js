import React, { useState, useEffect, Fragment } from "react";
import AsyncSelect from "react-select/async";
import { toast } from "react-toastify";

const apiUrl = process.env.API_URL;

function AddDrug({ page, dataToChange }) {
  const [scientificDrugs, setScientificDrugs] = useState([]);

  const [dataToSend, setDataToSend] = useState({
    trade_id: 0,
    trade_name: "",
    scientific_id: null,
    scientific_id_doc: 0,
    scientific_name: "",
  });
  const [saving, setSaving] = useState(false);

  const getScientificDrugs = async (search, callback) => {
    try {
      const response = await fetch(
        `${apiUrl}/scientific-drugs${
          search != " " && search != undefined ? "?search=" + search : ""
        }`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      setScientificDrugs(responseData.scientific_drugs);
      if (callback) {
        callback(responseData.scientific_drugs);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (Object.keys(dataToChange).length != 0) {
      console.log(dataToChange);
      if (dataToChange.scientific_id) {
        setScientificDrugs([
          ...scientificDrugs,
          {
            id: dataToChange.scientific_id,
            name: dataToChange.scientific_name,
          },
        ]);
      }
      setDataToSend({
        ...dataToSend,
        trade_id: dataToChange.id,
        trade_name: dataToChange.name,
        scientific_id: dataToChange.scientific_id,
      });
    }
  }, []);

  const handleTradeNameChange = (e) =>
    setDataToSend({ ...dataToSend, trade_name: e.target.value });
  const handleScientificIdChange = (e) => {
    if (e == null) {
      setDataToSend({ ...dataToSend, scientific_id: 0 });
    } else {
      setDataToSend({ ...dataToSend, scientific_id: e.id });
    }
  };
  const handleScientificNameChange = (e) => {
    setDataToSend({ ...dataToSend, scientific_name: e.target.value });
  };

  const saveTradeDrug = async () => {
    try {
      setSaving(true);
      const response = await fetch(
        `${apiUrl}/trade-drugs` +
          `${dataToSend.trade_id ? "/" + dataToSend.trade_id : ""}`,
        {
          method: dataToSend.trade_id ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            trade_name: dataToSend.trade_name,
            scientific_id: dataToSend.scientific_id,
          }),
        }
      );

      const responseData = await response.json();

      toast.success("Drug Was Added Successfully");
      page();
    } catch (error) {
      console.log(error.message);
      setSaving(false);
      toast.error("Saving Failed");
    }
  };
  const saveScientificDrug = async () => {
    try {
      setSaving(true);
      const response = await fetch(
        `${apiUrl}/scientific-drugs` +
          `${
            dataToSend.scientific_id_doc != 0
              ? "/" + dataToSend.scientific_id_doc
              : ""
          }`,
        {
          method: dataToSend.scientific_id_doc != 0 ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: dataToSend.scientific_name,
          }),
        }
      );

      const responseData = await response.json();

      toast.success("Drug Was Added Successfully");
      page();
    } catch (error) {
      console.log(error.message);
      setSaving(false);
      toast.error("Saving Failed");
    }
  };
  const handleTradeSubmit = (e) => {
    e.preventDefault();
    saveTradeDrug();
  };
  const handleScientificSubmit = (e) => {
    e.preventDefault();
    saveScientificDrug();
  };
  return (
    <section className="main pt-5">
      <div className="row m-0 justify-content-center">
        <div className="col-12">
          <div className="row pr-2 pl-2 mb-5">
            <div className="col-12">
              <div className="row">
                <div className="col-5">
                  <form onSubmit={handleTradeSubmit}>
                    <div className="form-group row">
                      <div className="col-7 offset-5">
                        <h2 className="mt-3 mb-2 text-black header-text">
                          Add Trade Drug
                        </h2>
                      </div>
                      <label
                        htmlFor="trade_name"
                        className="col-6 col-form-label offset-6 text-start mb-2"
                      >
                        Trade Name
                      </label>
                      <div className="col-6 offset-6 mb-2">
                        <input
                          id="trade_name"
                          name="trade_name"
                          type="text"
                          placeholder="Trade Name"
                          className="form-control form-background"
                          autoComplete
                          onChange={handleTradeNameChange}
                          value={dataToSend.trade_name}
                          required
                        ></input>
                      </div>
                      <div className="col-6 offset-6">
                        <label
                          htmlFor="scientific_name"
                          className="col-12 col-form-label text-start mb-2"
                        >
                          Scientific Name
                        </label>
                        <div className="col-12">
                          {/* <Select
                            className="react-select-container"
                            classNamePrefix="react-select"
                            isClearable
                            onChange={handleScientificIdChange}
                            value={scientificDrugs.filter(
                              (scientificDrug) =>
                                scientificDrug.id == dataToSend.scientific_id
                            )}
                            getOptionValue={(option) => option.id}
                            getOptionLabel={(option) => option.name}
                            // onInputChange={this.handleInputChange}
                            options={scientificDrugs}
                          /> */}
                          <AsyncSelect
                            className="react-select-container"
                            classNamePrefix="react-select"
                            isClearable
                            onChange={handleScientificIdChange}
                            value={scientificDrugs.filter(
                              (scientificDrug) =>
                                scientificDrug.id == dataToSend.scientific_id
                            )}
                            getOptionValue={(option) => option.id}
                            getOptionLabel={(option) => option.name}
                            loadOptions={getScientificDrugs}
                            defaultOptions={scientificDrugs}
                          />
                        </div>
                      </div>
                      <div className="col-4 offset-7 mt-4">
                        {!saving ? (
                          <button
                            type="submit"
                            className="btn btn-block w-100 submit-button"
                          >
                            {dataToSend.trade_id ? "Update" : "Add"} Trade Drug
                          </button>
                        ) : (
                          <button
                            disabled
                            className="btn btn-block w-100 submit-button"
                          >
                            Saving...
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-2"></div>
                <div className="col-5">
                  <form onSubmit={handleScientificSubmit} autoComplete="on">
                    <div className="form-group row">
                      <div className="col-7">
                        <h2 className="mt-3 mb-2 text-black header-text">
                          Add Scientific Drug
                        </h2>
                      </div>
                      <label
                        htmlFor="scientific_name2"
                        className="col-6 col-form-label text-start mb-2"
                      >
                        Scientific Name
                      </label>
                      <div className="col-12"></div>
                      <div className="col-6 mb-2">
                        <input
                          id="scientific_name2"
                          type="text"
                          placeholder="Scientific Name"
                          className="form-control form-background"
                          onChange={handleScientificNameChange}
                          value={dataToSend.scientific_name}
                          required
                        ></input>
                      </div>
                      <div className="col-12">
                        &nbsp;
                        <br />
                        &nbsp;
                      </div>
                      <div className="col-12">
                        &nbsp;
                        <br />
                        &nbsp;
                      </div>

                      <div className="col-4">
                        {!saving ? (
                          <button
                            type="submit"
                            className="btn btn-block w-100 submit-button"
                          >
                            {dataToSend.id ? "Update" : "Add"} Scientific Drug
                          </button>
                        ) : (
                          <button
                            disabled
                            type="submit"
                            className="btn btn-block w-100 submit-button"
                          >
                            Saving...
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddDrug;
