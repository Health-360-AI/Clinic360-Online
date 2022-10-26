import React, { useState } from "react";
import Start from "./Start";
const apiUrl = process.env.API_URL;

function StartController({
  loadingSpeechRecognition,
  listening,
  startListening,
  abortListening,
  dataToSend,
  setDataToSend,
  chief_complaints,
  speech,
  transcript,
  setSpeech,
  nutrition,
  resetTranscript,
  dataToChange,
  getChiefComplaints,
  patient,
  gynecological,
}) {
  const [wordList, setWordList] = useState([]);
  const runPrediction = async (e) => {
    console.log(e.charAt(e.length - 1) != " " ? e + " " : e);
    try {
      const response = await fetch(`http://localhost:8050/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          text_sentence: e.charAt(e.length - 1) != " " ? e + " " : e,
          top_clean: 6,
        }),
      });
      const responseData = await response.json();
      let s = [];
      for (let i = 0; i < responseData.list_words.length; i++) {
        s.push({
          name: responseData.list_words[i],
          char: ` ${responseData.list_words[i]}`,
        });
      }
      setWordList(s);
      console.log(s);
      return responseData.list_words;
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCreateChiefComplaint = async (name) => {
    try {
      const response = await fetch(`${apiUrl}/chief-complaints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          visit_id:
            Object.keys(dataToChange).length != 0
              ? dataToChange.id
              : dataToSend.visit_id,
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
    setSpeech({ ...speech, chief_complaint_note: e });
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
    setSpeech({ ...speech, hopi: e });
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
    <Start
      loadingSpeechRecognition={loadingSpeechRecognition}
      listening={listening}
      startListening={startListening}
      abortListening={abortListening}
      dataToSend={dataToSend}
      setDataToSend={setDataToSend}
      handleChiefComplaint={handleChiefComplaint}
      chief_complaints={chief_complaints}
      speech={speech}
      setSpeech={setSpeech}
      handleStartNoteChange={handleStartNoteChange}
      handleStartNoteSpeech={handleStartNoteSpeech}
      handleHOPIChange={handleHOPIChange}
      handleHOPISpeech={handleHOPISpeech}
      transcribingNote={transcribingNote}
      transcribingHOPI={transcribingHOPI}
      nutrition={nutrition}
      patient={patient}
      gynecological={gynecological}
      runPrediction={runPrediction}
      wordList={wordList}
    />
  );
}

export default StartController;
