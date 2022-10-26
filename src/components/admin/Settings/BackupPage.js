import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../../common/Loading";

const GeneralPage = ({
  backups,
  handleBackupButton,
  handleRecoveryButton,
  internet,
  backingup,
  recovering,
  getBackups,
  checkInternetConnected,
  config,
  handleZippingFile,
  handleUnzippingFile,
}) => {
  useEffect(() => {
    checkInternetConnected(config)
      .then(async () => {
        console.log("Connection available");
        getBackups();
      })
      .catch((err) => {
        console.log("No connection", err.message);
      });
  }, []);
  return (
    <div
      className={"width-others-wide ms-auto main-view fadeIn"}
      id="main-view"
    >
      <div className="row pt-3 justify-content-center">
        <div className="col-12 text-center">
          <h3>Recovery</h3>
        </div>
        {backingup ? (
          <button className="btn btn-success col-3 m-2" disabled={true}>
            Backing...
          </button>
        ) : (
          <button
            className="btn btn-success col-3 m-2"
            onClick={handleBackupButton}
            disabled={internet == false ? true : false}
          >
            Online Backup
          </button>
        )}
        <button
          className="btn btn-success col-3 m-2"
          onClick={handleZippingFile}
        >
          Local Backup
        </button>
        <button
          className="btn btn-success col-3 m-2"
          onClick={handleUnzippingFile}
        >
          Local Retreival
        </button>
        {backingup ? (
          <Loading />
        ) : (
          <div className="col-12">
            {internet ? (
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover text overflow-auto">
                  <thead className="">
                    <tr>
                      <th className="">ID</th>
                      <th className="">Date</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {backups.map((backup, index) => {
                      return (
                        <tr key={index + 1} className="font-weight-bold">
                          <td className="">
                            <h4>{index + 1}</h4>
                          </td>
                          <td className="">
                            <h4>{backup.name}</h4>
                          </td>
                          <td>
                            {recovering ? (
                              <FontAwesomeIcon
                                icon="sync"
                                className="text-secondary"
                                cursor="default"
                                size="2x"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon="download"
                                size="2x"
                                className="text-secondary"
                                cursor="pointer"
                                onClick={() =>
                                  handleRecoveryButton(backup.name)
                                }
                              />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <h4>No Internet Available</h4>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralPage;
