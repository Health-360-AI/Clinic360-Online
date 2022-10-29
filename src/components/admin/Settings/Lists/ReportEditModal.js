import React, { useState, useEffect, Component } from "react";
import { Modal, Button } from "react-bootstrap";
import parse from "html-react-parser";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, convertFromRaw } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import buttonStyles from "../../../../assets/sass/buttonStyles.module.css";
import alignmentStyles from "../../../../assets/sass/alignmentStyles.module.css";
import toolbarStyles from "../../../../assets/sass/toolbarStyles.module.css";
import editorStyles from "../../../../assets/sass/editorStyles.module.css";
import { toast } from "react-toastify";
import htmlToDraft from "html-to-draftjs";
import { ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";

const apiUrl = process.env.API_URL;

export default function ReportEditModal(props) {
  const [dataToSend, setDataToSend] = useState({
    id: "",
    lang: "",
    title: "",
    template: "",
  });
  const [rte, setRTE] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(
        htmlToDraft(dataToSend.template ? dataToSend.template : "<p></p>")
          .contentBlocks
      )
    )
  );

  const onEditorStateChange = (value) => {
    // console.log(convertToHTML(value.getCurrentContent()));
    let rr = draftToHtml(convertToRaw(value.getCurrentContent()));
    rr = rr.replace(/<[p>]*><[/p>]*>/g, "<p>&nbsp;</p>");
    setDataToSend({
      ...dataToSend,
      template: rr,
    });
    setRTE(value);
  };

  useEffect(() => {
    if (Object.keys(props.dataToChange).length != 0) {
      setDataToSend(props.dataToChange);
      if (props.dataToChange.template) {
        const contentBlock = htmlToDraft(props.dataToChange.template);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          setRTE(EditorState.createWithContent(contentState));
        }
      }
    }
  }, [props.show]);
  const handleLanguageChange = (e) => {
    setDataToSend({ ...dataToSend, lang: e.target.value });
  };

  const saveReport = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/reports${
          props.dataToChange.id ? "/" + props.dataToChange.id : ""
        }`,
        {
          method: props.dataToChange.id ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: dataToSend.title,
            template: dataToSend.template,
            lang: dataToSend.lang,
          }),
        }
      );
      const responseData = await response.json();
      toast.success("Saved Successfully");
      props.getReports();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className=""
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Report</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-start">
        <div className="col-6 offset-3 font-normal">
          <input
            id="title"
            type="text"
            placeholder="Title"
            className="form-control form-background"
            onChange={(e) =>
              setDataToSend({
                ...dataToSend,
                title: e.target.value,
              })
            }
            value={dataToSend.title}
          ></input>
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

        <div className={`col-10 offset-1 mt-3 ${editorStyles.editor}`}>
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
      </Modal.Body>
      <Modal.Footer
        className="m-0 align-items-center justify-content-center"
        dir="ltr"
      >
        <div className="">
          <Button
            onClick={() => {
              props.onHide();
            }}
            className="btn btn-danger"
          >
            Close
          </Button>
        </div>
        <div className="">
          <Button
            onClick={() => {
              saveReport();
              props.onHide();
            }}
            className="modal-add-nav"
          >
            Save Template
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
