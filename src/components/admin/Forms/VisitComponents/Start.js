import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import Gynecological from "./Gynecological";
import Autocomplete from "../../../common/Autocomplete";
let fs = require("fs");
const path = require("path");
const SPACE_KEYCODE = 32;
const ENTER_KEYCODE = 13;

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
const Item = ({ entity: { name, char } }) => <div>{`${name}: ${char}`}</div>;
let letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  " ",
];
// function filterArray(array, item, reverse = false) {
//   if (reverse) {
//     return array
//       .filter((word) => compareTwoStrings(word, item))
//       .sort((a, b) => a.length - b.length);
//   } else {
//     return array
//       .filter((word) => compareTwoStrings(word, item))
//       .sort((a, b) => b.length - a.length);
//   }
// }
// function compareTwoStrings(string, subString) {
//   let temp = string.split("", subString.length).join("");
//   if (subString == temp) return subString;
// }
const languages = [
  {
    name: "C",
    year: 1972,
  },
  {
    name: "Elm",
    year: 2012,
  },
];

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : languages.filter(
        (lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue
      );
}

function getSuggestionValue(suggestion) {
  // when suggestion selected, this function tells
  return suggestion.name; // what should be the value of the input
}

function renderSuggestion(suggestion) {
  return <span>{suggestion.name}</span>;
}
function Start({
  loadingSpeechRecognition,
  listening,
  startListening,
  abortListening,
  dataToSend,
  setDataToSend,
  handleChiefComplaint,
  chief_complaints,
  speech,
  setSpeech,
  handleStartNoteChange,
  handleStartNoteSpeech,
  handleHOPIChange,
  handleHOPISpeech,
  transcribingNote,
  transcribingHOPI,
  nutrition,
  patient,
  gynecological,
  runPrediction,
  wordList,
}) {
  const [display, setDisplay] = useState("none");
  const inputProps = {
    placeholder: "Type a programming language",
    value: transcribingNote(),
    onChange: handleStartNoteChange,
  };
  console.log("dd", dataToSend);
  console.log("dd", chief_complaints);
  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <div className="form-group row">
          <label
            htmlFor="cc"
            className="col-6 col-form-label offset-4 text-start mb-2 label-font-size"
          >
            Chief Complaint
          </label>
          <div className="col-6 offset-4">
            <CreatableSelect
              id="cc"
              className="react-select-container"
              classNamePrefix="react-select"
              isClearable={true}
              onChange={handleChiefComplaint}
              getOptionLabel={(option) =>
                option.__isNew__ ? option.label : option.name
              }
              getOptionValue={(option) =>
                option.__isNew__ ? option.value : option.id
              }
              value={chief_complaints.filter(
                (chief_complaint) =>
                  chief_complaint.id == dataToSend.chief_complaint_id
              )}
              options={chief_complaints}
            />
          </div>
          <label
            htmlFor="note"
            className="col-6 col-form-label offset-4 text-start mb-2 label-font-size mt-1"
          >
            Note
          </label>
          <div className="col-6 offset-4 position-relative">
            {/* <ReactAutocompleteTextarea
              id="note"
              // onBlur={function noRefCheck() {}}
              onChange={(e) => {
                console.log(e);
                handleStartNoteChange(e);

                JSON.parse(fs.readFileSync(Settings, "utf8")).bert
                  ? runPrediction(e)
                  : () => {};
              }}
              onKeyDown={() =>
                JSON.parse(fs.readFileSync(Settings, "utf8")).bert
                  ? runPrediction(transcribingNote())
                  : () => {}
              }
              onRequestOptions={() =>
                JSON.parse(fs.readFileSync(Settings, "utf8")).bert
                  ? runPrediction(transcribingNote())
                  : () => {}
              }
              onSelect={() =>
                JSON.parse(fs.readFileSync(Settings, "utf8")).bert
                  ? runPrediction(transcribingNote())
                  : () => {}
              }
              options={wordList}
              placeholder="Note"
              rows={5}
              trigger={" "}
              value={transcribingNote()}
            /> */}
            {/* {!speech.listeningToNote && (
              <ReactTextareaAutocomplete
                id="note"
                className="chief-complaint-note"
                onChange={(e) => {
                  handleStartNoteChange(e.target.value);
                }}
                loadingComponent={() => <span>Loading</span>}
                trigger={{
                  " ": {
                    dataProvider: (token) => {
                      return wordList;
                    },
                    component: Item,
                    output: (item, trigger) => item.char,
                  },
                }}
                onKeyDown={(e) => {
                  if (e.keyCode == SPACE_KEYCODE) {
                    JSON.parse(fs.readFileSync(Settings, "utf8")).bert
                      ? runPrediction(e.target.value)
                      : () => {};
                  }
                }}
                onItemSelected={({ e, item }) => {
                  JSON.parse(fs.readFileSync(Settings, "utf8")).bert
                    ? runPrediction(transcribingNote() + item.char)
                    : () => {};
                }}
                value={speech.chief_complaint_note}
                placeholder="Note"
              />
            )} */}
            {/* <textarea
              id="note"
              placeholder="Note"
              className="form-control form-background textarea-note"
              onChange={(e) => {
                handleStartNoteChange(e.target.value);
                onInput(e.target.value);
              }}
              onKeyDown={onKeyDown}
              value={transcribingNote()}
              required
            ></textarea> */}
            {/* <div
              contenteditable="true"
              style={{
                height: "144px",
                width: "100%",
                resize: "vertical",
                overflow: "auto",
              }}
              onInput={(e) => {
                console.log(e);
                handleStartNoteChange(e.target.innerText);
                runPrediction(e.target.innerText);
                setDisplay("block");
              }}
              onBlur={() => setDisplay("none")}
            >
              {transcribingNote()}
            </div>
            <ul id="results" style={{ display }}>
              {wordList}
            </ul> */}
            {/* <InputComponent
              id="note"
              placeholder="Note"
              handleChange={handleStartNoteChange}
              value={transcribingNote()}
              runPrediction={runPrediction}
              wordList={wordList}
            /> */}
            {/* {speech.listeningToNote && ( */}
            <textarea
              id="note"
              placeholder="Note"
              className="form-control form-background textarea-note"
              onChange={(e) => {
                handleStartNoteChange(e.target.value);
              }}
              value={transcribingNote()}
            ></textarea>
            {/* )} */}
            {loadingSpeechRecognition ? (
              ""
            ) : (
              <div
                className="microphone-div"
                onClick={() => {
                  if (!listening) {
                    setSpeech({
                      ...speech,
                      listeningToNote: true,
                      listeningToHOPI: false,
                    });
                    startListening();
                  } else {
                    abortListening();
                    handleStartNoteSpeech();
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
      <div className="col-6">
        <div className="form-group row">
          <label
            htmlFor="hopi"
            className="col-6 col-form-label offset-3 text-start mb-2 label-font-size"
          >
            History of Present illness
          </label>
          <div className="col-6 offset-3 position-relative">
            <div id="rrp"></div>
            {/* <textarea
              id="hopi"
              placeholder="History of Present illness"
              className="form-control form-background textarea-hopi"
              onChange={handleHOPIChange}
              value={transcribingHOPI()}
              required
            ></textarea> */}
            {/* <ReactAutocompleteTextarea
              id="hopi"
              // onBlur={function noRefCheck() {}}
              onChange={(e) => {
                console.log(e);
                handleHOPIChange(e);
                JSON.parse(fs.readFileSync(Settings, "utf8")).bert
                  ? runPrediction(e)
                  : () => {};
              }}
              onKeyDown={() =>
                JSON.parse(fs.readFileSync(Settings, "utf8")).bert
                  ? runPrediction(transcribingHOPI())
                  : () => {}
              }
              onRequestOptions={() =>
                JSON.parse(fs.readFileSync(Settings, "utf8")).bert
                  ? runPrediction(transcribingHOPI())
                  : () => {}
              }
              onSelect={() =>
                JSON.parse(fs.readFileSync(Settings, "utf8")).bert
                  ? runPrediction(transcribingHOPI())
                  : () => {}
              }
              options={wordList}
              placeholder="History of Present illness"
              trigger={" "}
              value={transcribingHOPI()}
            /> */}

            {/* <Autocomplete suggestions={wordList} request={runPrediction} /> */}
            {/* {!speech.listeningToHOPI && (
              <ReactTextareaAutocomplete
                id="hopi"
                className="hopi"
                onChange={(e) => {
                  handleHOPIChange(e.target.value);
                }}
                loadingComponent={() => <span>Loading</span>}
                trigger={{
                  " ": {
                    dataProvider: (token) => {
                      return wordList;
                    },
                    component: Item,
                    output: (item, trigger) => item.char,
                  },
                }}
                onKeyDown={(e) => {
                  if (e.keyCode == SPACE_KEYCODE) {
                    JSON.parse(fs.readFileSync(Settings, "utf8")).bert
                      ? runPrediction(e.target.value)
                      : () => {};
                  }
                }}
                onItemSelected={({ e, item }) => {
                  JSON.parse(fs.readFileSync(Settings, "utf8")).bert
                    ? runPrediction(transcribingNote() + item.char)
                    : () => {};
                }}
                value={speech.hopi}
                placeholder="History of Present illness"
              />
            )}
            {speech.listeningToHOPI && ( */}
            <textarea
              id="hopi"
              placeholder="History of Present illness"
              className="form-control form-background textarea-hopi"
              onChange={(e) => handleHOPIChange(e.target.value)}
              value={transcribingHOPI()}
              required
            ></textarea>
            {/* )} */}
            {loadingSpeechRecognition ? (
              ""
            ) : (
              <div
                className="microphone-div"
                onClick={() => {
                  if (!listening) {
                    setSpeech({
                      ...speech,
                      listeningToHOPI: true,
                      listeningToNote: false,
                    });
                    startListening();
                  } else {
                    abortListening();

                    handleHOPISpeech();
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
      {gynecological && patient.gender == "Female" ? (
        <Gynecological dataToSend={dataToSend} setDataToSend={setDataToSend} />
      ) : (
        ""
      )}
      {nutrition ? (
        <div className="col-12">
          <div className="row m-0 pt-5 pb-5 justify-content-center">
            <h2 className="text-center">Nutritional Info.</h2>
            <div className="col-6 pb-5">
              <div className="row">
                <div className="col-4">
                  <div className="form-group row">
                    <label
                      htmlFor="epigastric_radius"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Epigastric Radius
                    </label>
                    <div className="col-12">
                      <input
                        id="epigastric_radius"
                        type="number"
                        placeholder=""
                        onChange={(e) =>
                          setDataToSend({
                            ...dataToSend,
                            epigastric_radius: e.target.value,
                          })
                        }
                        className="form-control form-background"
                        value={dataToSend.epigastric_radius}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="umbilical_radius"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Umbilical Radius
                    </label>
                    <div className="col-12">
                      <input
                        id="umbilical_radius"
                        type="number"
                        placeholder=""
                        onChange={(e) =>
                          setDataToSend({
                            ...dataToSend,
                            umbilical_radius: e.target.value,
                          })
                        }
                        className="form-control form-background"
                        value={dataToSend.umbilical_radius}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="hypogastric_radius"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Hypogastric Radius
                    </label>
                    <div className="col-12">
                      <input
                        id="hypogastric_radius"
                        type="number"
                        placeholder=""
                        onChange={(e) =>
                          setDataToSend({
                            ...dataToSend,
                            hypogastric_radius: e.target.value,
                          })
                        }
                        className="form-control form-background"
                        value={dataToSend.hypogastric_radius}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="pelvic_radius"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Pelvic Radius
                    </label>
                    <div className="col-12">
                      <input
                        id="pelvic_radius"
                        type="number"
                        placeholder=""
                        onChange={(e) =>
                          setDataToSend({
                            ...dataToSend,
                            pelvic_radius: e.target.value,
                          })
                        }
                        className="form-control form-background"
                        value={dataToSend.pelvic_radius}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group row">
                    <label
                      htmlFor="thigh_radius"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Thigh Radius
                    </label>
                    <div className="col-12">
                      <input
                        id="thigh_radius"
                        type="number"
                        placeholder=""
                        onChange={(e) =>
                          setDataToSend({
                            ...dataToSend,
                            thigh_radius: e.target.value,
                          })
                        }
                        className="form-control form-background"
                        value={dataToSend.thigh_radius}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="metabolism"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Metabolism
                    </label>
                    <div className="col-12">
                      <input
                        id="metabolism"
                        type="number"
                        placeholder=""
                        onChange={(e) =>
                          setDataToSend({
                            ...dataToSend,
                            metabolism: e.target.value,
                          })
                        }
                        className="form-control form-background"
                        value={dataToSend.metabolism}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="fats_percentage"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Fats Percentage
                    </label>
                    <div className="col-12">
                      <input
                        id="fats_percentage"
                        type="number"
                        placeholder=""
                        onChange={(e) =>
                          setDataToSend({
                            ...dataToSend,
                            fats_percentage: e.target.value,
                          })
                        }
                        className="form-control form-background"
                        value={dataToSend.fats_percentage}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="muscles_percentage"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Muscles Percentage
                    </label>
                    <div className="col-12">
                      <input
                        id="muscles_percentage"
                        type="number"
                        placeholder=""
                        onChange={(e) =>
                          setDataToSend({
                            ...dataToSend,
                            muscles_percentage: e.target.value,
                          })
                        }
                        className="form-control form-background"
                        value={dataToSend.muscles_percentage}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group row">
                    <label
                      htmlFor="calories"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Calories
                    </label>
                    <div className="col-12">
                      <input
                        id="calories"
                        type="number"
                        placeholder=""
                        onChange={(e) =>
                          setDataToSend({
                            ...dataToSend,
                            calories: e.target.value,
                          })
                        }
                        className="form-control form-background"
                        value={dataToSend.calories}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="body_age"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Body Age
                    </label>
                    <div className="col-12">
                      <input
                        id="body_age"
                        type="number"
                        placeholder=""
                        onChange={(e) =>
                          setDataToSend({
                            ...dataToSend,
                            body_age: e.target.value,
                          })
                        }
                        className="form-control form-background"
                        value={dataToSend.body_age}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="organic_fats"
                      className="col-12 col-form-label text-start mt-2 mb-2"
                    >
                      Organic Fats
                    </label>
                    <div className="col-12">
                      <input
                        id="organic_fats"
                        type="number"
                        placeholder=""
                        onChange={(e) =>
                          setDataToSend({
                            ...dataToSend,
                            organic_fats: e.target.value,
                          })
                        }
                        className="form-control form-background"
                        value={dataToSend.organic_fats}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Start;
