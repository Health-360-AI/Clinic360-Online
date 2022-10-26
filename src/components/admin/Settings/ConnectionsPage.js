import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const HEALTH360_GATEWAY_V = process.env.HEALTH360_GATEWAY_V;

function ConnectionsPage({ setSubscribed }) {
  const [pharmacies, setPharmacies] = useState([]);
  const handleAssignPharmacyButton = async (pharmacy_id) => {
    try {
      const response = await fetch(
        `${HEALTH360_GATEWAY_V}/users/assign-pharmacy?doctor_id=${await getUserInfo()}&pharmacy_id=${pharmacy_id}&token=${localStorage.getItem(
          "token"
        )}`,
        {
          method: "POST",
        }
      );
      const responseData = await response.json();
      getPharmacies();
      toast.success("Assigned Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };
  const getPharmacies = async () => {
    try {
      const response = await fetch(
        `${HEALTH360_GATEWAY_V}/users/pharmacies?token=${localStorage.getItem(
          "token"
        )}`,
        {
          method: "GET",
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.success) {
        setPharmacies(responseData.pharmacies);
      } else if (responseData.error == "Signature has expired") {
        setSubscribed(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getUserInfo = async () => {
    try {
      const response = await fetch(
        `${HEALTH360_GATEWAY_V}/users/user-info?token=${localStorage.getItem(
          "token"
        )}`,
        {
          method: "GET",
        }
      );
      const responseData = await response.json();
      if (responseData.success) {
        return responseData.doctor.id;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getPharmacies();
  }, []);
  return (
    <div
      className={"width-others-wide ms-auto main-view pt-2 fadeIn"}
      id="main-view"
    >
      <div className="row m-0">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover text">
              <thead className="thead-dark">
                <tr>
                  <th className="id-width">No.</th>
                  <th className="name-width">Name</th>
                  <th className="age-width">Email</th>
                  <th className="gender-width">Address</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {pharmacies.map((pharmacy, index) => {
                  return (
                    <tr key={pharmacy.id} className="font-weight-bold">
                      <td className="id-width">{index + 1}</td>
                      <td className="name-width">{pharmacy.name}</td>
                      <td className="age-width">{pharmacy.email}</td>
                      <td className="gender-width">{pharmacy.address}</td>
                      <td>
                        <button
                          onClick={() => {
                            handleAssignPharmacyButton(pharmacy.id);
                          }}
                          className="btn btn-primary text-white"
                          disabled={pharmacy.assigned ? true : false}
                        >
                          {pharmacy.assigned ? "Assigned" : "Assign"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectionsPage;
