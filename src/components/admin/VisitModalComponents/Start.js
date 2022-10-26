import React from "react";
import CreatableSelect from "react-select/creatable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const apiUrl = process.env.API_URL;

function Start({
  dataToSend,
  setDataToSend,
  speech,
  setSpeech,
  getChiefComplaints,
  chief_complaints,
  loadingSpeechRecognition,
  transcript,
  listening,
  resetTranscript,
  startListening,
  abortListening,
}) {
  const handleCreateChiefComplaint = async (name) => {
    try {
      const response = await fetch(`${apiUrl}/chief-complaints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
        }),
      });
      const responseData = await response.json();
      return responseData.id;
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleChiefComplaint = async (item, action) => {
    if (action.action == "select-option") {
      setDataToSend({
        ...dataToSend,
        chief_complaint_id: item.id,
      });
    } else if (action.action == "create-option") {
      // toast.warn(
      //   "Sorry, Create is not ready here you can add CC in the Full Visit"
      // );
      const chief_complaint_id = await handleCreateChiefComplaint(item.value);
      getChiefComplaints();
      setDataToSend({
        ...dataToSend,
        chief_complaint_id,
      });
    } else if (action.action == "clear") {
      setDataToSend({
        ...dataToSend,
        chief_complaint_id: null,
      });
    }
  };
  const handleStartNoteSpeech = () => {
    setSpeech({
      ...speech,
      chief_complaint_note:
        (speech.chief_complaint_note != null
          ? speech.chief_complaint_note
          : "") +
        " " +
        transcript,
      listeningToNote: false,
    });
    resetTranscript();
  };
  const handleStartNoteChange = (e) => {
    setSpeech({ ...speech, chief_complaint_note: e.target.value });
  };
  const handleHOPISpeech = () => {
    setSpeech({
      ...speech,
      hopi: (speech.hopi != null ? speech.hopi : "") + " " + transcript,
      listeningToHOPI: false,
    });
    resetTranscript();
  };
  const handleHOPIChange = (e) => {
    setSpeech({ ...speech, hopi: e.target.value });
    resetTranscript();
  };
  const transcribingNote = () => {
    if (speech.listeningToNote & (speech.chief_complaint_note == "")) {
      return transcript;
    } else if (speech.listeningToNote & (speech.chief_complaint_note != "")) {
      return speech.chief_complaint_note + " " + transcript;
    } else {
      return speech.chief_complaint_note;
    }
  };
  const transcribingHOPI = () => {
    if (speech.listeningToHOPI & (speech.hopi == "")) {
      return transcript;
    } else if (speech.listeningToHOPI & (speech.hopi != "")) {
      return speech.hopi + " " + transcript;
    } else {
      return speech.hopi;
    }
  };
  return (
    <>
      <div className="col-6">
        <div className="form-group row">
          <label
            htmlFor="cc"
            className="col-8 col-form-label offset-2 text-start mb-2 label-font-size"
          >
            Chief Complaint
          </label>
          <div className="col-8 offset-2">
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
            className="col-8 col-form-label offset-2 text-start mb-2 label-font-size mt-1"
          >
            Note
          </label>
          <div className="col-8 offset-2 position-relative">
            <textarea
              id="note"
              placeholder="Note"
              className="form-control form-background textarea-note"
              onChange={handleStartNoteChange}
              value={transcribingNote()}
              required
            ></textarea>
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
            className="col-10 col-form-label offset-1 text-start mb-2 label-font-size"
          >
            History of Present illness
          </label>
          <div className="col-8 offset-1 position-relative">
            <textarea
              id="hopi"
              placeholder="History of Present illness"
              className="form-control form-background textarea-hopi"
              onChange={handleHOPIChange}
              value={transcribingHOPI()}
              required
            ></textarea>
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
    </>
  );
}

export default Start;
