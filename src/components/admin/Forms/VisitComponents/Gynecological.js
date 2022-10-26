import React from "react";

function Gynecological({ dataToSend, setDataToSend }) {
  const eddCalculator = (lmp) => {
    let date = new Date(lmp);
    date.setDate(date.getDate() + 7);
    date.setMonth(date.getMonth() + 9);
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    setDataToSend({
      ...dataToSend,
      lmp: lmp,
      edd: date.getFullYear() + "-" + month + "-" + day,
    });
  };
  return (
    <div className="col-12">
      <div className="row m-0 pt-5 pb-5 justify-content-center">
        <h2 className="text-center">Gynecological Info.</h2>
        <div className="col-6 pb-5">
          <div className="row">
            <div className="col-4">
              <div className="form-group row">
                <label
                  htmlFor="lmp"
                  className="col-12 col-form-label text-start mt-2 mb-2"
                >
                  Last Mestrual Period
                </label>
                <div className="col-12">
                  <input
                    id="lmp"
                    type="date"
                    placeholder=""
                    onChange={(e) => eddCalculator(e.target.value)}
                    className="form-control form-background"
                    value={dataToSend.lmp}
                  ></input>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="edd"
                  className="col-12 col-form-label text-start mt-2 mb-2"
                >
                  Expected Date of Delivery
                </label>
                <div className="col-12">
                  <input
                    id="edd"
                    type="date"
                    placeholder=""
                    className="form-control form-background"
                    value={dataToSend.edd}
                    disabled
                  ></input>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="gestation_age"
                  className="col-12 col-form-label text-start mt-2 mb-2"
                >
                  Gestational Age
                </label>
                <div className="col-12">
                  <input
                    id="gestation_age"
                    type="number"
                    placeholder=""
                    onChange={(e) =>
                      setDataToSend({
                        ...dataToSend,
                        gestational_age: e.target.value,
                      })
                    }
                    className="form-control form-background"
                    value={dataToSend.gestational_age}
                  ></input>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group row">
                <label
                  htmlFor="gravidity"
                  className="col-12 col-form-label text-start mt-2 mb-2"
                >
                  Gravidity
                </label>
                <div className="col-12">
                  <input
                    id="gravidity"
                    type="number"
                    placeholder=""
                    onChange={(e) =>
                      setDataToSend({
                        ...dataToSend,
                        gravidity: e.target.value,
                      })
                    }
                    className="form-control form-background"
                    value={dataToSend.gravidity}
                  ></input>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="parity"
                  className="col-12 col-form-label text-start mt-2 mb-2"
                >
                  Parity
                </label>
                <div className="col-12">
                  <input
                    id="parity"
                    type="number"
                    placeholder=""
                    onChange={(e) =>
                      setDataToSend({
                        ...dataToSend,
                        parity: e.target.value,
                      })
                    }
                    className="form-control form-background"
                    value={dataToSend.parity}
                  ></input>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="abortion"
                  className="col-12 col-form-label text-start mt-2 mb-2"
                >
                  Abortion
                </label>
                <div className="col-12">
                  <input
                    id="abortion"
                    type="number"
                    placeholder=""
                    onChange={(e) =>
                      setDataToSend({
                        ...dataToSend,
                        abortion: e.target.value,
                      })
                    }
                    className="form-control form-background"
                    value={dataToSend.abortion}
                  ></input>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group row">
                <label
                  htmlFor="abortion_note"
                  className="col-12 col-form-label text-start mt-2 mb-2"
                >
                  Abortion Note
                </label>
                <div className="col-12">
                  <input
                    id="abortion_note"
                    type="text"
                    placeholder=""
                    onChange={(e) =>
                      setDataToSend({
                        ...dataToSend,
                        abortion_note: e.target.value,
                      })
                    }
                    className="form-control form-background"
                    value={dataToSend.abortion_note}
                  ></input>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="last_ultrasound"
                  className="col-12 col-form-label text-start mt-2 mb-2"
                >
                  Last Ultrasound
                </label>
                <div className="col-12">
                  <input
                    id="last_ultrasound"
                    type="date"
                    placeholder=""
                    onChange={(e) =>
                      setDataToSend({
                        ...dataToSend,
                        last_ultrasound: e.target.value,
                      })
                    }
                    className="form-control form-background"
                    value={dataToSend.last_ultrasound}
                  ></input>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="last_ultrasound_note"
                  className="col-12 col-form-label text-start mt-2 mb-2"
                >
                  Last Ultrasound Note
                </label>
                <div className="col-12">
                  <input
                    id="last_ultrasound_note"
                    type="text"
                    placeholder=""
                    onChange={(e) =>
                      setDataToSend({
                        ...dataToSend,
                        last_ultrasound_note: e.target.value,
                      })
                    }
                    className="form-control form-background"
                    value={dataToSend.last_ultrasound_note}
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gynecological;
