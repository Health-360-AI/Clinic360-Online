import React, { useState } from "react";
import Reports from "./Lists/Reports";

function ListsPage() {
  const [reportsModalShow, setReportsModalShow] = useState(false);
  return (
    <div
      className={"width-others-wide ms-auto main-view fadeIn"}
      id="main-view"
    >
      <Reports
        show={reportsModalShow}
        onHide={() => setReportsModalShow(false)}
      />
      <button
        className="m-3 btn btn-primary"
        onClick={() => setReportsModalShow(true)}
      >
        Reports
      </button>
      {/* <button className="btn btn-primary">Renew</button>
      <button className="btn btn-primary">Renew</button>
      <button className="btn btn-primary">Renew</button> */}
    </div>
  );
}

export default ListsPage;
