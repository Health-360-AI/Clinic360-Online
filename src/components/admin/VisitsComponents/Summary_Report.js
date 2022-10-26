import React from "react";
import DOMPurify from "dompurify";
import ReactToPrint from "react-to-print";

function Summary_Report({
  selectedVisit,
  component2Ref,
  printReportTrigger,
  pp,
}) {
  return (
    <div className="row justify-content-center">
      <div className="col-12">
        <div className="form-group row">
          <label
            htmlFor="Summary"
            className="col-6 col-form-label offset-3 text-start mb-2 label-font-size"
          >
            Summary
          </label>
          <div className="col-6 offset-3 position-relative">
            <p>{selectedVisit.summary}</p>
          </div>
        </div>
      </div>
      <div style={{ display: "none" }}>
        <h4 id="print-report">{selectedVisit.report}</h4>
      </div>
      <div className="col-12">
        <div className="form-group row">
          <label
            htmlFor="report"
            className="col-6 col-form-label offset-3 text-start mb-2 label-font-size"
          >
            Report
          </label>
          <div
            className="col-6 offset-3"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(selectedVisit.report),
            }}
          ></div>
        </div>
        <ReactToPrint
          content={() => component2Ref}
          documentTitle="Second component"
          trigger={printReportTrigger}
          print={pp}
        />
      </div>
    </div>
  );
}

export default Summary_Report;
