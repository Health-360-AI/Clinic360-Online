import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loading from "../common/Loading";
import ConfirmModal from "../common/ConfirmModal";
const apiUrl = process.env.API_URL;

function Drugs(props) {
  const [loading, setLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    id: "",
  });
  const [trade_drugs, setTradeDrugs] = useState([]);
  const getTradeDrugs = async () => {
    try {
      const response = await fetch(`${apiUrl}/trade-drugs`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const responseData = await response.json();
      setTradeDrugs(responseData.trade_drugs);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getTradeDrugs();
  }, []);
  const handleDeleteButton = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/trade-drugs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const responseData = await response.json();
      toast.success("Was Deleted Successfully");
      getTradeDrugs();
    } catch (error) {
      console.log(error.message);
      toast.error("Error");
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
      <div className="row m-0 justify-content-center">
        <div className="col-12">
          <div className="row pe-2 ps-2 mb-5">
            <div className="col-12">
              <div className="row mt-4 mb-3">
                <div className="col-4">
                  <h2 className="text">Drugs</h2>
                </div>
                <div className="col-8"></div>
              </div>
            </div>
            <div className="col-12">
              <table className="table table-striped table-bordered table-hover text">
                <thead className="thead-dark">
                  <tr>
                    <th className="">ID</th>
                    <th className="">Name</th>
                    <th className="">Scientific Name</th>
                    <th>Count</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                {loading == true ? (
                  <Loading />
                ) : (
                  <tbody>
                    {trade_drugs.map((trade_drug) => {
                      return (
                        <tr key={trade_drug.id} className="font-weight-bold">
                          <td className="">{trade_drug.id}</td>
                          <td className="">{trade_drug.name}</td>
                          <td className="">{trade_drug.scientific_name}</td>
                          <td className="">{trade_drug.count}</td>
                          <td>
                            <button
                              onClick={() => {
                                props.setDataToChange(trade_drug);
                                props.handleEditDrugButton(trade_drug);
                              }}
                              className="btn btn-secondary text-white"
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                setConfirmModal({
                                  ...confirmModal,
                                  show: true,
                                  id: trade_drug.id,
                                });
                              }}
                              className="btn btn-danger text-white"
                            >
                              Delete
                            </button>
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
    </section>
  );
}

export default Drugs;
