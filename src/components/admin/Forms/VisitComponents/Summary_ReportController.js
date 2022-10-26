import React, { useState } from "react";
import { toast } from "react-toastify";
import Summery_Report from "./Summary_Report.jsx";
const apiUrl = process.env.API_URL;

function Summary_ReportController({
  loadingSpeechRecognition,
  listening,
  startListening,
  abortListening,
  setSpeech,
  speech,
  summary,
  transcript,
  transcribingToShow,
  dataToSend,
  patient,
  toLocalISOString,
  bgPhoto,
  headerPhoto,
  footerPhoto,
  pp,
  setDataToSend,
  resetTranscript,
  reports,
  getReports,
}) {
  console.log(dataToSend);
  const handleCreateReport = async (title) => {
    try {
      const response = await fetch(`${apiUrl}/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          template: dataToSend.report,
          lang: dataToSend.lang,
        }),
      });
      const responseData = await response.json();
      return responseData.id;
    } catch (error) {
      console.log(error.message);
    }
  };

  const saveReportTemplate = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/reports/${dataToSend.report_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title:
              reports.filter(
                (report) => report.id == dataToSend.report_id
              )[0] &&
              reports.filter((report) => report.id == dataToSend.report_id)[0]
                .title,
            template: dataToSend.report,
            lang: dataToSend.lang,
          }),
        }
      );
      const responseData = await response.json();
      getReports();
      toast.success("Saved Successfully");
      return responseData.id;
    } catch (error) {
      console.log(error.message);
      toast.error("Error");
    }
  };
  const handleSummarySpeech = () => {
    setSpeech({
      ...speech,
      summary:
        (speech.summary != null ? speech.summary : "") + " " + transcript,
      listeningToSummary: false,
    });
    resetTranscript();
  };
  const handleSummaryChange = (e) => {
    setSpeech({ ...speech, summary: e.target.value });
    resetTranscript();
  };
  const transcribingSummary = () => {
    if (speech.listeningToSummary & (speech.summary == "")) {
      return transcript;
    } else if (speech.listeningToSummary & (speech.summary != "")) {
      return speech.summary + " " + transcript;
    } else {
      return speech.summary;
    }
  };

  const handleReportChange = (event, editor) => {
    const data = editor.getData();
    setDataToSend({
      ...dataToSend,
      report: data,
    });
  };
  const handleReferralToChange = (e) => {
    setDataToSend({
      ...dataToSend,
      referral_to: e.target.value,
    });
  };
  return (
    <Summery_Report
      handleSummarySpeech={handleSummarySpeech}
      handleSummaryChange={handleSummaryChange}
      transcribingSummary={transcribingSummary}
      handleReportChange={handleReportChange}
      loadingSpeechRecognition={loadingSpeechRecognition}
      startListening={startListening}
      abortListening={abortListening}
      listening={listening}
      transcript={transcript}
      speech={speech}
      setSpeech={setSpeech}
      summary={speech.summary}
      report={dataToSend.report}
      dataToSend={dataToSend}
      bgPhoto={bgPhoto}
      headerPhoto={headerPhoto}
      footerPhoto={footerPhoto}
      toLocalISOString={toLocalISOString}
      patient={patient}
      pp={pp}
      reports={reports}
      getReports={getReports}
      setDataToSend={setDataToSend}
      handleReferralToChange={handleReferralToChange}
      saveReportTemplate={saveReportTemplate}
      handleCreateReport={handleCreateReport}
    />
  );
}

export default Summary_ReportController;
