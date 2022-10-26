import React from "react";
import Examination from "./Examination";

const apiUrl = process.env.API_URL;
function ExaminationController({
  signs,
  systems,
  dataToSend,
  getSigns,
  setDataToSend,
}) {
  const handleHRChange = (e) => {
    setDataToSend({
      ...dataToSend,
      hr: e.target.value,
    });
  };
  const handleSBPChange = (e) => {
    setDataToSend({
      ...dataToSend,
      sbp: e.target.value,
    });
  };
  const handleDBPChange = (e) => {
    setDataToSend({
      ...dataToSend,
      dbp: e.target.value,
    });
  };
  const handleRRChange = (e) => {
    setDataToSend({
      ...dataToSend,
      rr: e.target.value,
    });
  };
  const handleTempChange = (e) => {
    setDataToSend({
      ...dataToSend,
      temp: e.target.value,
    });
  };
  const handleSPO2Change = (e) => {
    setDataToSend({
      ...dataToSend,
      spo2: e.target.value,
    });
  };
  const handleCreateSigns = async (name) => {
    try {
      const response = await fetch(`${apiUrl}/signs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
  const handlePositiveSigns = async (item, action) => {
    if (action.action == "select-option") {
      setDataToSend({
        ...dataToSend,
        positive_signs: [
          ...dataToSend.positive_signs,
          { sign_id: item.id, sign_name: item.name, system_id: null },
        ],
      });
    } else if (action.action == "create-option") {
      const sign_id = await handleCreateSigns(item.value);
      getSigns();
      setDataToSend({
        ...dataToSend,
        positive_signs: [
          ...dataToSend.positive_signs,
          { sign_id, sign_name: item.value, system_id: null },
        ],
      });
    }
  };
  const handlePositiveSignsRemoval = (id) => {
    setDataToSend({
      ...dataToSend,
      positive_signs: dataToSend.positive_signs.filter(
        (item) => item.sign_id != id
      ),
    });
  };
  const handlePositiveSignsRelatedChange = (e, index) => {
    const psr = [...dataToSend.positive_signs];
    psr[index].system_id = e.target.value;
    setDataToSend({
      ...dataToSend,
      positive_signs: psr,
    });
  };
  const handleRelativeNegatives = async (item, action) => {
    if (action.action == "select-option") {
      setDataToSend({
        ...dataToSend,
        relative_negatives: [
          ...dataToSend.relative_negatives,
          { sign_id: item.id, sign_name: item.name, system_id: null },
        ],
      });
    } else if (action.action == "create-option") {
      const sign_id = await handleCreateSigns(item.value);
      getSigns();
      setDataToSend({
        ...dataToSend,
        relative_negatives: [
          ...dataToSend.relative_negatives,
          { sign_id, sign_name: item.value, system_id: null },
        ],
      });
    }
  };
  const handleRelativeNegativesRemoval = (id) => {
    setDataToSend({
      ...dataToSend,
      relative_negatives: dataToSend.relative_negatives.filter(
        (item) => item.sign_id != id
      ),
    });
  };
  const handleRelativeNegativesRelatedChange = (e, index) => {
    const rnr = [...dataToSend.relative_negatives];
    rnr[index].system_id = e.target.value;
    setDataToSend({
      ...dataToSend,
      relative_negatives: rnr,
    });
  };
  return (
    <Examination
      handleHRChange={handleHRChange}
      handleSBPChange={handleSBPChange}
      handleDBPChange={handleDBPChange}
      handleRRChange={handleRRChange}
      handleTempChange={handleTempChange}
      handleSPO2Change={handleSPO2Change}
      handlePositiveSigns={handlePositiveSigns}
      handlePositiveSignsRemoval={handlePositiveSignsRemoval}
      handlePositiveSignsRelatedChange={handlePositiveSignsRelatedChange}
      handleRelativeNegatives={handleRelativeNegatives}
      handleRelativeNegativesRemoval={handleRelativeNegativesRemoval}
      handleRelativeNegativesRelatedChange={
        handleRelativeNegativesRelatedChange
      }
      signs={signs}
      systems={systems}
      dataToSend={dataToSend}
      getSigns={getSigns}
    />
  );
}

export default ExaminationController;
