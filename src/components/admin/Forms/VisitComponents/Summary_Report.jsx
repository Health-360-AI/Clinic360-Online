import React, { useState, Component, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrintRx from "./PrintRx";
import ReactToPrint from "react-to-print";
import AsyncCreatableSelect from "react-select/async-creatable";
import "../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import parse from "html-react-parser";
import { EditorState, RichUtils } from "draft-js";
import { convertToRaw, convertFromRaw, ContentState } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import editorStyles from "../../../../assets/sass/editorStyles.module.css";

import { ipcRenderer } from "electron";

let fs = require("fs");
const path = require("path");
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

function Summery_Report({
  loadingSpeechRecognition,
  listening,
  startListening,
  abortListening,
  handleSummaryChange,
  handleSummarySpeech,
  setSpeech,
  speech,
  summary,
  transcript,
  transcribingToShow,
  transcribingSummary,
  dataToSend,
  handleReportChange,
  patient,
  toLocalISOString,
  bgPhoto,
  headerPhoto,
  footerPhoto,
  getReports,
  reports,
  setDataToSend,
  handleReferralToChange,
  saveReportTemplate,
  handleCreateReport,
}) {
  const [paper, setPaper] = useState(
    JSON.parse(fs.readFileSync(Settings, "utf8")).reportPageSize
  );
  console.log(paper);
  const [date, setDate] = useState(toLocalISOString(new Date()).slice(0, 10));
  const [component1Ref, setComponent1Ref] = useState(null);
  const [showTitle, setShowTitle] = useState(false);
  const [showReferralTo, setShowReferralTo] = useState(false);
  const printTrigger = () => {
    return (
      <button className="btn btn-primary" type="button">
        Print Report
      </button>
    );
  };

  async function downloadDocx(params) {
    // const fileBuffer = await HTMLtoDOCX(dataToSend.report, null, {
    //   table: { row: { cantSplit: true } },
    //   footer: true,
    //   pageNumber: true,
    // });

    // saveAs(fileBuffer, "html-to-docx.docx");
    ipcRenderer.send("get-word");
  }
  // useEffect(() => {
  //   DecoupledEditor.create(document.querySelector(".document-editor"), {
  //     language: dataToSend.lang,
  //     ui: "en",
  //   })
  //     .then((editor) => {
  //       // Insert the toolbar before the editable area.
  //       editor.ui
  //         .getEditableElement()
  //         .parentElement.insertBefore(
  //           editor.ui.view.toolbar.element,
  //           editor.ui.getEditableElement()
  //         );
  //       editor.ui.element.setAttribute("data-cke-ignore-events", "true");

  //       // toolbarContainer.appendChild(editor.ui.view.toolbar.element);
  //       editor.setData(dataToSend.report ? dataToSend.report : "");
  //       editor.model.document.on("change:data", () => {
  //         handleReportChange(editor.data.get());
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   getReports();
  // }, []);
  const handleLanguageChange = (e) => {
    setDataToSend({ ...dataToSend, lang: e.target.value });
    // edi.current.ui.view.toolbar.element.remove();
    // edi.current.destroy(true);

    // // const toolbarContainer = document.querySelector(
    // //   ".document-editor__toolbar"
    // // );
    // // const documentEd = document.querySelector(".document-editor");
    // // const documentd = document.querySelector(".docmentd");
    // // toolbarContainer.remove();
    // // documentEd.remove();
    // // let de = document.createElement("div");
    // // de.className = ".document-editor__toolbar";
    // // documentd.appendChild(de);

    // // let ee = document.createElement("div");
    // // ee.className = "document-editor";
    // // documentd.appendChild(ee);
    // DecoupledEditor.create(document.querySelector(".document-editor"), {
    //   language: e.target.value,
    //   ui: "en",
    // })
    //   .then((editor) => {
    //     // Insert the toolbar before the editable area.
    //     editor.ui
    //       .getEditableElement()
    //       .parentElement.insertBefore(
    //         editor.ui.view.toolbar.element,
    //         editor.ui.getEditableElement()
    //       );
    //     // editor.ui.element.setAttribute( "data-cke-ignore-events", "true")
    //     // toolbarContainer.appendChild(editor.ui.view.toolbar.element);
    //     editor.setData(dataToSend.report ? dataToSend.report : "");
    //     editor.model.document.on("change:data", () => {
    //       handleReportChange(editor.data.get());
    //     });
    //     edi.current = editor;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  const printReport = (target) => {
    return new Promise(() => {
      let data = target.contentWindow.document.documentElement.outerHTML;
      console.log(data);
      let blob = new Blob([data], { type: "text/html;charset=utf-8" });
      let url = URL.createObjectURL(blob);
      ipcRenderer.send("printComponent", url, paper);
      // printJS({
      //   printable: "print-rx",
      //   type: "html",
      //   style: [
      //     `@page {
      //     size: ${JSON.parse(fs.readFileSync(Settings, "utf8")).pageSize};
      //     margin-top:0mm;
      //     margin-left: ${
      //       JSON.parse(fs.readFileSync(Settings, "utf8")).sideMargins
      //     }mm;
      //     margin-right: ${
      //       JSON.parse(fs.readFileSync(Settings, "utf8")).sideMargins
      //     }mm;
      //   } body {
      //     margin-top:${JSON.parse(fs.readFileSync(Settings, "utf8")).topMargin}mm;
      //   }`,
      //   ],

      //   targetStyles: ["*"],
      // });
    });
  };
  // const state = ContentState.createFromBlockArray(
  //   blocksFromHTML.contentBlocks,
  //   blocksFromHTML.entityMap
  // );
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // Initialise with the raw content state otherwise.
  // const editorStateEditor = createEditorStateFromRaw(rawContentState)
  // const editorStateRaw = createEditorStateFromRaw(editorState);
  // setEditorState(EditorState.push(editorState, state));
  // useEffect(() => {
  //   setEditorState(
  //     EditorState.push(editorState, convertFromHTML(dataToSend.report))
  //   );
  // }, []);
  // const fromHTML = (html) =>
  //   convertToRaw(convertFromHTML(importerConfig)(html));

  // const toHTML = (raw) => (raw ? convertToHTML(exporterConfig)(raw) : "");
  // const editorState2 = createEditorStateFromRaw(rawContentState);

  // Content will be `null` if there’s no textual content, or RawDraftContentState otherwise.
  // const content = serialiseEditorStateToRaw(editorState2);
  const [rte, setRTE] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(
        htmlToDraft(dataToSend.report ? dataToSend.report : "<p></p>")
          .contentBlocks
      )
    )
  );

  useEffect(() => {
    if (dataToSend.report) {
      const contentBlock = htmlToDraft(dataToSend.report);
      console.log(contentBlock);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        setRTE(EditorState.createWithContent(contentState));
      }
    }
  }, []);
  const onEditorStateChange = (value) => {
    // console.log(convertToHTML(value.getCurrentContent()));
    let rr = draftToHtml(convertToRaw(value.getCurrentContent()));
    rr = rr.replace(/<[p>]*><[/p>]*>/g, "<p>&nbsp;</p>");
    setDataToSend({
      ...dataToSend,
      report: rr,
    });
    setRTE(value);
  };
  const handleReturn = (value) => {
    console.log(value);
  };
  const handleReportTempChange = async (item, action) => {
    if (action.action == "select-option") {
      setRTE(
        EditorState.createWithContent(
          convertFromHTML(item.template ? item.template : "<p></p>")
        )
      );
      setDataToSend({
        ...dataToSend,
        report_id: item.id,
        report: item.template,
      });
    } else if (action.action == "create-option") {
      const report_id = await handleCreateReport(item.value);
      getReports();
      setDataToSend({
        ...dataToSend,
        report_id,
        report: "<p></p>",
      });
    } else if (action.action == "clear") {
      setDataToSend({
        ...dataToSend,
        report_id: null,
        report: "<p></p>",
      });
    }
  };
  // console.log(editorState);
  // useEffect(() => {
  //   setEditorState(
  //     EditorState.createWithContent(convertFromHTML(dataToSend.report))
  //   );
  // }, [dataToSend.report]);
  return (
    <div className="row justify-content-center pb-5 mb-5">
      <div style={{ display: "none" }}>
        <PrintRx
          scientific_drugs={[]}
          trade_drugs={[]}
          patient={patient}
          date={date}
          diagnonis={""}
          note={dataToSend.report ? dataToSend.report : ""}
          refd={setComponent1Ref}
          bgPhoto={bgPhoto}
          headerPhoto={headerPhoto}
          footerPhoto={footerPhoto}
          showDx={false}
          tMargin={
            paper == "A5"
              ? JSON.parse(fs.readFileSync(Settings, "utf8")).topMargin
              : JSON.parse(fs.readFileSync(Settings, "utf8")).A4TopMargin
          }
          leftMargin={
            JSON.parse(fs.readFileSync(Settings, "utf8")).leftMargin + "mm"
          }
          rightMargin={
            JSON.parse(fs.readFileSync(Settings, "utf8")).rightMargin + "mm"
          }
          width={paper == "A5" ? "146mm" : "208mm"}
          height={paper == "A5" ? "208mm" : "295mm"}
          landscape={JSON.parse(fs.readFileSync(Settings, "utf8")).landscape}
          method={JSON.parse(fs.readFileSync(Settings, "utf8")).printingMethod}
          fontSize={JSON.parse(fs.readFileSync(Settings, "utf8")).fontSize}
          bMarginDrug={
            JSON.parse(fs.readFileSync(Settings, "utf8")).bMarginDrug + "mm"
          }
          lang={dataToSend.lang}
          reportTitle={
            reports.filter((report) => report.id == dataToSend.report_id)[0] &&
            reports.filter((report) => report.id == dataToSend.report_id)[0]
              .title
          }
          referralTo={dataToSend.referral_to}
          showReferralTo={showReferralTo}
          showTitle={showTitle}
        />
      </div>
      <div className="col-12">
        <div className="form-group row">
          <label
            htmlFor="summary"
            className="col-6 col-form-label offset-3 text-start mb-2 label-font-size"
          >
            Summary
          </label>
          <div className="col-6 offset-3 position-relative">
            <textarea
              id="summary"
              placeholder="Summary"
              className="form-control form-background textarea-hopi"
              onChange={handleSummaryChange}
              value={transcribingSummary()}
            ></textarea>
            {loadingSpeechRecognition ? (
              ""
            ) : (
              <div
                className="microphone-div"
                onClick={() => {
                  if (!listening) {
                    setSpeech({ ...speech, listeningToSummary: true });
                    startListening();
                  } else {
                    abortListening();
                    handleSummarySpeech();
                  }
                }}
              >
                <FontAwesomeIcon
                  icon="microphone"
                  size="2x"
                  className="microphone"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ display: "none" }}>
        <h4 id="print-report">{dataToSend.report}</h4>
      </div>
      <div className="col-12">
        <div className="form-group row">
          <label
            htmlFor="report"
            className="col-6 col-form-label offset-3 text-start mb-2 label-font-size"
          >
            Report
          </label>

          <div className="col-6 offset-3 font-normal">
            <AsyncCreatableSelect
              id="reports"
              className="react-select-container"
              classNamePrefix="react-select"
              isClearable={true}
              onChange={handleReportTempChange}
              getOptionLabel={(option) =>
                option.__isNew__ ? option.label : option.title
              }
              getOptionValue={(option) =>
                option.__isNew__ ? option.value : option.id
              }
              value={reports.filter(
                (report) => report.id == dataToSend.report_id
              )}
              loadOptions={getReports}
              defaultOptions={reports}
            />
          </div>
          <label className="col-6 offset-3 col-form-label p-3" htmlFor="paper">
            Report Paper Size
          </label>
          <div className="col-6 offset-3 mb-2">
            <select
              id="paper"
              onChange={(e) => setPaper(e.target.value)}
              className="form-select form-background"
              value={paper}
            >
              <option value={"A4"} defaultValue>
                A4
              </option>
              <option value={"A5"}>A5</option>
            </select>
          </div>
          <label className="col-6 col-form-label offset-3 pt-2" htmlFor="lang">
            Language
          </label>
          <div className="col-6 offset-3 mb-2">
            <select
              id="lang"
              onChange={handleLanguageChange}
              className="form-select form-background"
              value={dataToSend.lang}
            >
              <option value="en">English</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
          <label
            htmlFor="referralTo"
            className="col-6 col-form-label offset-3 mb-2"
          >
            Referral To
          </label>
          <div className="col-6 offset-3 mb-4">
            <input
              id="referralTo"
              type="text"
              placeholder="Referral To"
              className="form-control form-background"
              onChange={handleReferralToChange}
              value={dataToSend.referral_to}
            ></input>
          </div>
          {/* <textarea
            disabled
            value={draftToHtml(convertToRaw(rte.getCurrentContent()))}
            className="col-6 offset-3"
          /> */}
          <div className={`col-6 offset-3 ${editorStyles.editor}`}>
            <Editor
              editorState={rte}
              onEditorStateChange={onEditorStateChange}
              // handleReturn={(event) => {
              //   // override behavior for enter key
              //   var newEditorState = null;
              //   if (event.keyCode === 13 && event.shiftKey) {
              //     // with shift, make a new block
              //     newEditorState = insertNewUnstyledBlock(rte);
              //   } else if (event.keyCode === 13 && !event.shiftKey) {
              //     // without shift, just a normal line break
              //     newEditorState = RichUtils.insertSoftNewline(rte);
              //   }
              //   if (newEditorState) {
              //     setRTE(newEditorState);
              //     return true;
              //   }
              //   return false;
              // }}
              // toolbarClassName="toolbarClassName"
              // editorStyle={editorStyles}
            />
          </div>
          <div className="col-6 offset-3">
            {/* <textarea
              id="report"
              placeholder="Report"
              className="form-control form-background textarea-hopi"
              onChange={handleReportChange}
              value={dataToSend.report}
            ></textarea> */}
            {/* <div className="docmentd"> */}
            {/* <div className="document-editor__toolbar"></div> */}
            <div className="document-editor"></div>
            {/* </div> */}
            {/* <CKEditor
              onReady={(editor) => {
                console.log("Editor is ready to use!", editor);

                // Insert the toolbar before the editable area.
                editor.ui
                  .getEditableElement()
                  .parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement()
                  );

                editors = editor;
              }}
              onError={(error, { willEditorRestart }) => {
                // If the editor is restarted, the toolbar element will be created once again.
                // The `onReady` callback will be called again and the new toolbar will be added.
                // This is why you need to remove the older toolbar.
                if (willEditorRestart) {
                  editors.ui.view.toolbar.element.remove();
                }
              }}
              onChange={(event, editor) => {
                console.log(editor);
                console.log(editor.data.get());
                handleReportChange(editor.data.get());
              }}
              editor={DecoupledEditor}
              data={dataToSend.report ? dataToSend.report : ""}
              config={{
                language: lang,
                ui: "en",

                // ...
              }}
            /> */}
          </div>
        </div>
        <div className="col-12 mt-2">
          <div className="row justify-content-center">
            <div className={"form-check mb-2 checkboxes col-4"}>
              <input
                id="titleshow"
                className="form-check-input"
                type="checkbox"
                checked={showTitle}
                onChange={() => setShowTitle(!showTitle)}
              />
              <label className="form-check-label" htmlFor="titleshow">
                Show Title on Print
              </label>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className={"form-check mb-2 checkboxes col-4"}>
              <input
                id="referraltoshow"
                className="form-check-input"
                type="checkbox"
                checked={showReferralTo}
                onChange={() => setShowReferralTo(!showReferralTo)}
              />
              <label className="form-check-label" htmlFor="referraltoshow">
                Show Referral To on Print
              </label>
            </div>
          </div>
        </div>
        <div className="col-12 mb-5 mt-2">
          <div className="row justify-content-center">
            <div className="col-1 mb-3">
              <ReactToPrint
                content={() => component1Ref}
                documentTitle="First component"
                trigger={printTrigger}
                print={printReport}
              />
            </div>
            <div className="col-2 mb-3">
              <button
                className="btn btn-secondary"
                onClick={saveReportTemplate}
                type="button"
              >
                Save Template
              </button>
            </div>
            {/* <div className="col-2 mb-3">
              <button
                className="btn btn-secondary"
                onClick={downloadDocx}
                type="button"
              >
                Save Docx
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summery_Report;
