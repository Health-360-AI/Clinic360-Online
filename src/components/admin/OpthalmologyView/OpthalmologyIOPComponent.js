import React from "react";

export default function OpthalmologyIOPComponent({
  handle_iop_airpuff,
  iop_airpuff,
  handle_iop_applantation,
  iop_applantation,
  handle_iop_other,
  iop_other,
}) {
  return (
    <div className="row justify-content-center p-0 m-0 text-center">
      <div className="col-12 text-primary">
        <h4>IOP</h4>
      </div>
      <div className="col-8">
        <div className="row">
          <div className="col-4">
            <h5>AirPuff</h5>
          </div>
          <div className="col-4">
            <h5>Applant.</h5>
          </div>
          <div className="col-4">
            <h5>Others</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_iop_airpuff}
              value={iop_airpuff}
              disabled
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_iop_applantation}
              value={iop_applantation}
              disabled
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              className="form-control form-background"
              onChange={handle_iop_other}
              value={iop_other}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
}
