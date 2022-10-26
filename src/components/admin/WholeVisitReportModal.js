import React, { useState, useEffect, Component } from "react";
import { Modal, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const apiUrl = process.env.API_URL;

var Size = ReactQuill.Quill.import("attributors/style/size");
Size.whitelist = [
  "8px",
  "9px",
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "32px",
];
ReactQuill.Quill.register(Size, true);

const modules = {
  toolbar: [
    [
      { font: [] },
      {
        size: Size.whitelist,
      },
    ],
    [{ align: [] }, "direction"],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "super" }, { script: "sub" }],
    ["blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    // ["link", "image", "video"],
    // ["clean"],
  ],
  // clipboard: {
  //   // toggle to add extra line breaks when pasting HTML:
  //   matchVisual: false,
  // },
};

// const formats = [
//   "header",
//   "font",
//   "size",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
//   "video",
// ];

export default function WholeVisitReportModal({
  dataToChange,
  dataToSend,
  setDataToSend,
  show,
  onHide,
}) {
  const [rte, setRTE] = useState();

  //   useEffect(() => {
  //   }, [props.show]);
  const onEditorChange = (e, delta, source, editor) => {
    console.log(e);
    console.log(editor.getContents());
    setRTE(editor.getContents());
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className=""
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Report</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-start">
        <div className={`col-10 offset-1 mt-3`}>
          <ReactQuill
            theme="snow"
            className="editor"
            value={rte}
            onChange={onEditorChange}
            modules={modules}
            // formats={formats}
          />
        </div>
      </Modal.Body>
      <Modal.Footer
        className="m-0 align-items-center justify-content-center"
        dir="ltr"
      >
        <div className="">
          <Button
            onClick={() => {
              onHide();
            }}
            className="btn btn-danger"
          >
            Close
          </Button>
        </div>
        <div className="">
          <Button
            onClick={() => {
              onHide();
            }}
            className="modal-add-nav"
          >
            Print
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
