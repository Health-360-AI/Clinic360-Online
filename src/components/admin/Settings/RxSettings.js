import React, { useState, useEffect } from "react";
import PhotoModal from "../../common/PhotoModal";
import PrintRx from "../Forms/VisitComponents/PrintRx";

import ReactToPrint from "react-to-print";
import RxView from "./RxView";
import { ipcRenderer } from "electron";
let fs = require("fs");
const path = require("path");

const apiUrl = process.env.API_URL;

let LOCALAPPDATA =
  process.platform !== "darwin"
    ? process.env.LOCALAPPDATA
    : path.join(process.env.HOME, "Library", "Application Support");
let Settings;
if (process.env.NODE_ENV == "development") {
  Settings = "./Settings.json";
} else {
  Settings = LOCALAPPDATA + "/clinic360/Settings.json";
}

function RxSettings({
  specifications,
  setSpecifications,
  handleHeaderChange,
  handleFooterChange,
  handlePrinterChange,
  handlePaperChange,
  printers,
  printer,
  testPrinting,
  marginTop,
  pageSize,
  paper,
  refreshPrinters,
  bMarginD,
}) {
  const [photoModal, setPhotoModal] = useState({
    id: 0,
    name: "",
    photoModalShow: false,
  });
  const [rx, setRx] = useState(true);
  const [RxViewModalShow, setRxViewModalShow] = useState(false);
  const [photo, setPhoto] = useState({});
  const [editHImage, setEditHImage] = useState(false);
  const [editFImage, setEditFImage] = useState(false);
  const [tMargin, setTMargin] = useState(marginTop);
  const [landscape, setLandscape] = useState(
    JSON.parse(fs.readFileSync(Settings, "utf8")).landscape
  );
  const [lMargin, setLMargin] = useState(
    JSON.parse(fs.readFileSync(Settings, "utf8")).leftMargin
  );
  const [rMargin, setRMargin] = useState(
    JSON.parse(fs.readFileSync(Settings, "utf8")).rightMargin
  );
  const [bMarginDrug, setbMarginD] = useState(bMarginD);
  const [method, setMethod] = useState(
    JSON.parse(fs.readFileSync(Settings, "utf8")).printingMethod
  );
  const [reportPaper, setReportPaper] = useState(
    JSON.parse(fs.readFileSync(Settings, "utf8")).reportPageSize
  );
  const [A4TopMargin, setA4TopMargin] = useState(
    JSON.parse(fs.readFileSync(Settings, "utf8")).A4TopMargin
  );

  const [fSize, setFSize] = useState(
    JSON.parse(fs.readFileSync(Settings, "utf8")).fontSize
  );

  const elementRx = React.createRef();

  const [component1Ref, setComponent1Ref] = useState(null);
  const [component2Ref, setComponent2Ref] = useState(null);

  const testPrintingA5 = (target) => {
    return new Promise(() => {
      let data = target.contentWindow.document.documentElement.outerHTML;
      let blob = new Blob([data], { type: "text/html;charset=utf-8" });
      let url = URL.createObjectURL(blob);
      ipcRenderer.send("printComponent", url, "A5");
    });
  };
  const testPrintingA4 = (target) => {
    return new Promise(() => {
      let data = target.contentWindow.document.documentElement.outerHTML;
      let blob = new Blob([data], { type: "text/html;charset=utf-8" });
      let url = URL.createObjectURL(blob);
      ipcRenderer.send("printComponent", url, "A4");
    });
  };
  const printTrigger = () => {
    return (
      <button className="col-2 ms-4 add-button-in-visit" type="button">
        Test A5
      </button>
    );
  };
  const printReportTrigger = () => {
    return (
      <button className="col-2 ms-4 add-button-in-visit" type="button">
        Test A4
      </button>
    );
  };
  const getPhoto = async (type) => {
    try {
      const response = await fetch(`${apiUrl}/visits/prescription-${type}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const responsePhoto = await response.blob();
      if (response.status != 200) {
        throw new Error();
      }
      setPhoto(
        URL.createObjectURL(new Blob([responsePhoto], { type: "image/jpeg" }))
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  const [bgPhoto, setBgPhoto] = useState({});

  const getBgPhoto = async () => {
    try {
      const response = await fetch(`${apiUrl}/visits/prescription-header`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const responsePhoto = await response.blob();
      if (response.status != 200) {
        throw new Error();
      }
      setBgPhoto(
        URL.createObjectURL(new Blob([responsePhoto], { type: "image/jpeg" }))
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  const [headerPhoto, setHeaderPhoto] = useState({});

  const getHeaderPhoto = async () => {
    try {
      const response = await fetch(`${apiUrl}/visits/prescription-header`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const responsePhoto = await response.blob();
      if (response.status != 200) {
        throw new Error();
      }
      setHeaderPhoto(new Blob([responsePhoto], { type: "image/jpeg" }));
    } catch (error) {
      console.log(error.message);
    }
  };
  const [footerPhoto, setFooterPhoto] = useState({});

  const getFooterPhoto = async () => {
    try {
      const response = await fetch(`${apiUrl}/visits/prescription-footer`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const responsePhoto = await response.blob();
      if (response.status != 200) {
        throw new Error();
      }
      setFooterPhoto(new Blob([responsePhoto], { type: "image/jpeg" }));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBgPhoto();
    getHeaderPhoto();
    getFooterPhoto();
  }, []);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const onMouseMove = (e) => {
    setMouse({
      x:
        (e.clientX - elementRx.current.getBoundingClientRect().left) /
        3.7795275593333,
      y:
        (e.clientY - elementRx.current.getBoundingClientRect().top) /
        3.7795275593333,
    });
  };
  const setMarginTop = () => {
    let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
    content.topMargin = mouse.y + "mm";
    //write file
    fs.writeFileSync(Settings, JSON.stringify(content));
    setTMargin(mouse.y + "mm");
  };
  const setLeftMargin = (e) => {
    let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
    content.leftMargin = e.target.value;
    //write file
    fs.writeFileSync(Settings, JSON.stringify(content));
    setLMargin(e.target.value);
  };
  const setRightMargin = (e) => {
    let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
    content.rightMargin = e.target.value;
    //write file
    fs.writeFileSync(Settings, JSON.stringify(content));
    setRMargin(e.target.value);
  };
  const setbMarginDrug = (e) => {
    let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
    content.bMarginDrug = e.target.value;
    //write file
    fs.writeFileSync(Settings, JSON.stringify(content));
    setbMarginD(e.target.value);
  };
  const handleMethodChange = (e) => {
    let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
    content.printingMethod = e.target.value;
    //write file
    fs.writeFileSync(Settings, JSON.stringify(content));
    setMethod(e.target.value);
    getBgPhoto();
    getHeaderPhoto();
    getFooterPhoto();
  };

  const handleReportPaperChange = (e) => {
    setReportPaper(e.target.value);

    let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
    content.reportPageSize = e.target.value;
    //write file
    fs.writeFileSync(Settings, JSON.stringify(content));
  };
  const handleA4TopMarginChange = (e) => {
    let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
    content.A4TopMargin = mouse.y + "mm";
    //write file
    fs.writeFileSync(Settings, JSON.stringify(content));
    setA4TopMargin(mouse.y + "mm");
  };
  const handleLandscapeChange = (e) => {
    let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
    content.landscape = e.target.checked == true ? 1 : 0;
    //write file
    fs.writeFileSync(Settings, JSON.stringify(content));
    setLandscape(e.target.checked == true ? 1 : 0);
  };
  const handleFontSizeChange = (e) => {
    setFSize(e.target.value);
    let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
    content.fontSize = e.target.value;
    //write file
    fs.writeFileSync(Settings, JSON.stringify(content));
  };
  return (
    <div
      className={"width-others-wide ms-auto main-view pt-3 fadeIn mb-3"}
      id="main-view"
    >
      {photoModal.photoModalShow && (
        <PhotoModal
          show={photoModal.photoModalShow}
          onHide={() => setPhotoModal({ ...photoModal, photoModalShow: false })}
          photo={photo}
        />
      )}
      {RxViewModalShow && (
        <RxView
          onHide={() => setRxViewModalShow(false)}
          headerPhoto={bgPhoto}
          refd={elementRx}
          patient={{ age: 20, date: "2022/2/22", name: "علي" }}
          scientific_drugs={[]}
          trade_drugs={[]}
          marginTop={rx ? marginTop : A4TopMargin}
          width={rx ? "148mm" : "210mm"}
          height={rx ? "210mm" : "297mm"}
          onMouseMove={onMouseMove}
          setMarginTop={rx ? setMarginTop : handleA4TopMarginChange}
          tMargin={rx ? tMargin : A4TopMargin}
          setLMargin={setLMargin}
          leftMargin={lMargin + "mm"}
          landscape={landscape}
          setRMargin={setRMargin}
          rightMargin={rMargin + "mm"}
          paper={rx ? paper : reportPaper}
          fontSize={fSize}
        />
      )}
      {/* <div className="form-check mb-4 checkboxes">
        <input
          className="form-check-input"
          type="checkbox"
          value={specifications.ros}
          checked={specifications.ros}
          id="ros"
          onChange={(e) =>
            setSpecifications({
              ...specifications,
              ros: e.target.checked,
            })
          }
        />
        <label className="form-check-label" htmlFor="ros">
          Hide Review of systems
        </label>
      </div>
      <div className="form-check mb-4 checkboxes">
        <input
          className="form-check-input"
          type="checkbox"
          value={specifications.morehx}
          checked={specifications.morehx}
          id="morehx"
          onChange={(e) =>
            setSpecifications({
              ...specifications,
              morehx: e.target.checked,
            })
          }
        />
        <label className="form-check-label" htmlFor="morehx">
          Hide More Hx.
        </label>
      </div> */}
      <div style={{ display: "none" }}>
        <PrintRx
          bgPhoto={bgPhoto}
          headerPhoto={headerPhoto}
          footerPhoto={footerPhoto}
          refd={setComponent1Ref}
          patient={{ age: 20, date: "2022/2/22", name: "علي" }}
          scientific_drugs={[{ drug_name: "Levofloxacin" }]}
          trade_drugs={[{ drug_name: "Augmentin" }]}
          marginTop={marginTop}
          leftMargin={lMargin + "mm"}
          landscape={landscape}
          tMargin={tMargin}
          rightMargin={rMargin + "mm"}
          width={"146mm"}
          height={"208mm"}
          method={method}
          fontSize={fSize}
          bMarginDrug={bMarginDrug + "mm"}
          rx={true}
        />
      </div>
      <div style={{ display: "none" }}>
        <PrintRx
          bgPhoto={bgPhoto}
          headerPhoto={headerPhoto}
          footerPhoto={footerPhoto}
          refd={setComponent2Ref}
          patient={{ age: 20, date: "2022/2/22", name: "علي" }}
          scientific_drugs={[{ drug_name: "Levofloxacin" }]}
          trade_drugs={[{ drug_name: "Augmentin" }]}
          marginTop={A4TopMargin}
          leftMargin={lMargin + "mm"}
          landscape={landscape}
          tMargin={A4TopMargin}
          rightMargin={rMargin + "mm"}
          width={"208mm"}
          height={"295mm"}
          method={method}
          fontSize={fSize}
          bMarginDrug={bMarginDrug + "mm"}
          rx={true}
        />
      </div>
      <div className="form-check mb-4 checkboxes">
        <form className="row m-0 justify-content-center">
          <label className="col-4 form-check-label pt-2" htmlFor="printer">
            Printer
          </label>
          <div className="col-8 mb-2">
            <select
              id="printer"
              onChange={handlePrinterChange}
              className="form-select form-background"
              value={printer}
            >
              <option selected value="">
                Select
              </option>
              {printers.map((printer) => (
                <option key={printer.deviceId} value={printer.deviceId}>
                  {printer.name}
                </option>
              ))}
            </select>
          </div>
          <label className="col-4 form-check-label pt-2" htmlFor="paper">
            Rx Paper Size
          </label>
          <div className="col-8 mb-2">
            <select
              id="paper"
              onChange={handlePaperChange}
              className="form-select form-background"
              value={paper}
            >
              <option value={"A5"} defaultValue>
                A5
              </option>
              <option value={"A4"}>A4</option>
            </select>
          </div>
          <label className="col-4 form-check-label pt-2" htmlFor="paper">
            Report Paper Size
          </label>
          <div className="col-8 mb-2">
            <select
              id="paper"
              onChange={handleReportPaperChange}
              className="form-select form-background"
              value={reportPaper}
            >
              <option value={"A4"} defaultValue>
                A4
              </option>
              <option value={"A5"}>A5</option>
            </select>
          </div>
          <label className="col-2 form-check-label pt-2" htmlFor="fontSize">
            Font Size
          </label>
          <div className="col-2">
            <input
              id="fontSize"
              type="text"
              placeholder="11"
              className="form-control form-background"
              onChange={handleFontSizeChange}
              value={fSize}
              defaultValue={11}
            ></input>
          </div>
          <label className="col-2 form-check-label pt-2" htmlFor="lMargin">
            Left Margin
          </label>
          <div className="col-2">
            <input
              id="lMargin"
              type="text"
              placeholder="2"
              className="form-control form-background"
              onChange={setLeftMargin}
              value={lMargin}
              defaultValue={2}
            ></input>
          </div>
          <label className="col-2 form-check-label pt-2" htmlFor="rMargin">
            Right Margin
          </label>
          <div className="col-2">
            <input
              id="rMargin"
              type="text"
              placeholder="2"
              className="form-control form-background"
              onChange={setRightMargin}
              value={rMargin}
              defaultValue={2}
            ></input>
          </div>
          <label className="col-4 form-check-label pt-2" htmlFor="bMarginDrug">
            Spacing between Drugs
          </label>
          <div className="col-2">
            <input
              id="bMarginDrug"
              type="text"
              placeholder="0"
              className="form-control form-background"
              onChange={setbMarginDrug}
              value={bMarginDrug}
              defaultValue={0}
            ></input>
          </div>
          <div className="col-1 ps-4 pt-2 pe-0">
            <input
              id="landscape"
              className="form-check-input"
              type="checkbox"
              checked={landscape == 1 ? true : false}
              onChange={handleLandscapeChange}
            />
          </div>
          <label
            className="form-check-label col-form-label pt-2 col-2 ps-0"
            htmlFor="landscape"
          >
            Landscape
          </label>
        </form>
      </div>
      <div className="row justify-content-center mb-3">
        <ReactToPrint
          content={() => component1Ref}
          documentTitle="First component"
          trigger={printTrigger}
          print={testPrintingA5}
        />
        <ReactToPrint
          content={() => component2Ref}
          documentTitle="First component"
          trigger={printReportTrigger}
          print={testPrintingA4}
        />
        <button
          className="col-2 ms-4 add-button-in-visit"
          onClick={() => {
            refreshPrinters();
          }}
        >
          Refresh
        </button>
      </div>
      You have 3 methods for printing the Rx:
      <br />
      1- You can specify header and footer and the Rx will be in the middle.
      <br /> 2- You can specify a background to follow for starting of Rx and it
      will not be printed.
      <br />
      3- You can specify a background to follow for starting of Rx and it will
      be printed.
      <div className="row justify-content-center mt-2">
        <label className="col-3 form-check-label mt-1" htmlFor="method">
          Rx Methods
        </label>
        <div className="col-8 mb-3">
          <select
            id="method"
            onChange={handleMethodChange}
            className="form-select form-background"
            value={method}
          >
            <option value={1} defaultValue>
              First Option of header and footer
            </option>
            <option value={2}>Second Option of Background with no print</option>
            <option value={3}>Third Option of Background with print</option>
          </select>
        </div>
      </div>
      {method != 1 ? (
        <div>
          {editHImage ? (
            <div className="row justify-content-center">
              <div className="form-check mb-4 checkboxes">
                <form
                  className="row m-0"
                  name={`prescription-header`}
                  id={`prescription-header`}
                >
                  <label
                    className="col-4 form-check-label pt-2"
                    htmlFor="prescription-header"
                  >
                    Background of Rx
                  </label>
                  <div className="col-8">
                    <input
                      type="file"
                      name="file"
                      id="file"
                      placeholder="already Added"
                      className="form-control form-background"
                      required
                      dir="rtl"
                      draggable
                      onChange={(e) => {
                        handleHeaderChange(e);
                        setEditHImage(false);
                        getBgPhoto();
                        getHeaderPhoto();
                      }}
                    />
                  </div>
                </form>
              </div>
              <button
                className="col-3 ms-4 add-button-in-visit mb-3 mt-1"
                onClick={() => {
                  getBgPhoto();
                  setRxViewModalShow(true);
                }}
              >
                Specify Start
              </button>
            </div>
          ) : (
            <div className="row justify-content-center">
              <div className="row justify-content-center">
                <p className="col-4">Background of Rx</p>
                <button
                  className="col-2 ms-4 add-button-in-visit"
                  onClick={() => setEditHImage(true)}
                >
                  Edit
                </button>
                <button
                  className="col-2 ms-4 add-button-in-visit"
                  onClick={() => {
                    getPhoto("header");
                    setPhotoModal({ ...photoModal, photoModalShow: true });
                  }}
                >
                  View
                </button>
              </div>
              <button
                className="col-3 ms-4 add-button-in-visit mb-3 mt-1"
                onClick={() => {
                  getBgPhoto();
                  setRx(true);
                  setRxViewModalShow(true);
                }}
              >
                Specify A5 Start
              </button>
              <button
                className="col-4 ms-4 add-button-in-visit mb-3 mt-1"
                onClick={() => {
                  getBgPhoto();
                  setRx(false);
                  setRxViewModalShow(true);
                }}
              >
                Specify A4 Start
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          {editHImage ? (
            <div className="form-check mb-4 checkboxes">
              <form
                className="row m-0"
                name={`prescription-header`}
                id={`prescription-header`}
              >
                <label
                  className="col-4 form-check-label pt-2"
                  htmlFor="prescription-header"
                >
                  Header of Rx
                </label>
                <div className="col-8">
                  <input
                    type="file"
                    name="file"
                    id="file"
                    placeholder="already Added"
                    className="form-control form-background"
                    required
                    dir="rtl"
                    draggable
                    onChange={(e) => {
                      handleHeaderChange(e);
                      setEditHImage(false);
                      getBgPhoto();
                      getHeaderPhoto();
                    }}
                  />
                </div>
              </form>
            </div>
          ) : (
            <div className="row justify-content-center">
              <p className="col-4">Header of Rx</p>
              <button
                className="col-2 ms-4 add-button-in-visit"
                onClick={() => setEditHImage(true)}
              >
                Edit
              </button>
              <button
                className="col-2 ms-4 add-button-in-visit"
                onClick={() => {
                  getPhoto("header");
                  setPhotoModal({ ...photoModal, photoModalShow: true });
                }}
              >
                View
              </button>
            </div>
          )}
          {editFImage ? (
            <div className="form-check mb-4 checkboxes">
              <form
                className="row m-0"
                name={`prescription-footer`}
                id={`prescription-footer`}
              >
                <label
                  className="col-4 form-check-label pt-2"
                  htmlFor="prescription-footer"
                >
                  Footer of Rx
                </label>
                <div className="col-8">
                  <input
                    type="file"
                    name="file"
                    id="file"
                    placeholder="already Added"
                    className="form-control form-background"
                    required
                    dir="rtl"
                    draggable
                    onChange={(e) => {
                      handleFooterChange(e);
                      setEditFImage(false);
                      getFooterPhoto();
                    }}
                  />
                </div>
              </form>
            </div>
          ) : (
            <div className="row justify-content-center">
              <p className="mt-2 col-4">Footer of Rx</p>

              <button
                className="col-2 ms-4 mt-2 add-button-in-visit"
                onClick={() => setEditFImage(true)}
              >
                Edit
              </button>
              <button
                className="col-2 ms-4 mt-2 add-button-in-visit"
                onClick={() => {
                  getPhoto("footer");
                  setPhotoModal({ ...photoModal, photoModalShow: true });
                }}
              >
                View
              </button>
            </div>
          )}
        </div>
      )}
      {/* <div className="form-check mb-4 checkboxes">
        <input
          className="form-check-input"
          type="checkbox"
          value={specifications.examination}
          checked={specifications.examination}
          id="examination"
          onChange={(e) =>
            setSpecifications({
              ...specifications,
              examination: e.target.checked,
            })
          }
        />
        <label className="form-check-label" htmlFor="examination">
          Hide Examination
        </label>
      </div>
      <div className="form-check mb-4 checkboxes">
        <input
          className="form-check-input"
          type="checkbox"
          value={specifications.labs}
          checked={specifications.labs}
          id="labs"
          onChange={(e) =>
            setSpecifications({
              ...specifications,
              labs: e.target.checked,
            })
          }
        />
        <label className="form-check-label" htmlFor="labs">
          Hide Investigations
        </label>
      </div>
      <div className="form-check mb-4 checkboxes">
        <input
          className="form-check-input"
          type="checkbox"
          value={specifications.scores}
          checked={specifications.scores}
          id="scores"
          onChange={(e) =>
            setSpecifications({
              ...specifications,
              scores: e.target.checked,
            })
          }
        />
        <label className="form-check-label" htmlFor="scores">
          Hide Scores
        </label>
      </div>
      <div className="form-check mb-4 checkboxes">
        <input
          className="form-check-input"
          type="checkbox"
          value={specifications.summery_report}
          checked={specifications.summery_report}
          id="summery_report"
          onChange={(e) =>
            setSpecifications({
              ...specifications,
              summery_report: e.target.checked,
            })
          }
        />
        <label className="form-check-label" htmlFor="summery_report">
          Hide Summery & Report
        </label>
      </div> */}
    </div>
  );
}

export default RxSettings;
