import React from "react";
import Prescription from "./Prescription";
const apiUrl = process.env.API_URL;

function PrescriptionController({
  dataToSend,
  setDataToSend,
  setDiseases,
  diseases,
  getDiseases,
  getTradeDrugs,
  trade_drugs,
  getScientificDrugs,
  scientific_drugs,
  date,
  patient,
  showDx,
  setShowDx,
  getTimes,
  times,
  getTypes,
  types,
}) {
  const handleCreateDisease = async (name) => {
    try {
      const response = await fetch(`${apiUrl}/diseases`, {
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
      return responseData.disease_id;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDxChange = async (item, action) => {
    if (action.action == "select-option") {
      setDataToSend({
        ...dataToSend,
        diagnosis_id: item.id,
        diagnosis_name: item.name,
      });
    } else if (action.action == "create-option") {
      const diagnosis_id = await handleCreateDisease(item.value);
      setDiseases([...diseases, { id: diagnosis_id, name: item.value }]);
      setDataToSend({
        ...dataToSend,
        diagnosis_id,
        diagnosis_name: item.value,
      });
    } else if (action.action == "clear") {
      setDataToSend({
        ...dataToSend,
        diagnosis_id: null,
        diagnosis_name: null,
      });
    }
  };
  const handleCreateTradeDrug = async (name) => {
    try {
      const response = await fetch(`${apiUrl}/trade-drugs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          trade_name: name,
        }),
      });
      const responseData = await response.json();
      return responseData.trade_id;
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleTradeDrugChange = async (item, action) => {
    if (action.action == "select-option") {
      setDataToSend({
        ...dataToSend,
        trade_drugs: [
          ...dataToSend.trade_drugs,
          {
            drug_id: item.id,
            drug_name: item.name,
            scientific_id: item.scientific_id,
            times_name: "",
            times_id: null,
            period: "",
          },
        ],
      });
    } else if (action.action == "create-option") {
      const trade_drug_id = await handleCreateTradeDrug(item.value);
      getTradeDrugs();
      setDataToSend({
        ...dataToSend,
        trade_drugs: [
          ...dataToSend.trade_drugs,
          {
            drug_id: trade_drug_id,
            drug_name: item.value,
            scientific_id: null,
            times_name: "",
            times_id: null,
            period: "",
          },
        ],
      });
    }
  };
  const handleCreateDrugTimes = async (name) => {
    try {
      const response = await fetch(`${apiUrl}/times`, {
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
      return responseData.times_id;
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(dataToSend);
  const handleTradeDrugTimesChange = async (item, action, index) => {
    const tdt = [...dataToSend.trade_drugs];
    console.log(action);
    if (action.action == "select-option") {
      tdt[index].times_id = item.id;
      tdt[index].times_name = item.name;
      setDataToSend({
        ...dataToSend,
        trade_drugs: tdt,
      });
    } else if (action.action == "create-option") {
      const times_id = await handleCreateDrugTimes(item.value);
      getTimes();
      tdt[index].times_id = times_id;
      tdt[index].times_name = item.value;
      setDataToSend({
        ...dataToSend,
        trade_drugs: tdt,
      });
    } else if (action.action == "clear") {
      sdt[index].times_id = 0;
      sdt[index].times_name = "";
      setDataToSend({
        ...dataToSend,
        scientific_drugs: sdt,
      });
    }
  };
  const handleTradeDrugPeriodChange = (e, index) => {
    const tdp = [...dataToSend.trade_drugs];
    tdp[index].period = e.target.value;
    setDataToSend({
      ...dataToSend,
      trade_drugs: tdp,
    });
  };
  const handleTradeDrugRemoval = (e, i) => {
    e.preventDefault();
    setDataToSend({
      ...dataToSend,
      trade_drugs: dataToSend.trade_drugs.filter((item, index) => index != i),
    });
  };
  const handleScientificDrugChange = (item, action) => {
    if (action.action == "select-option") {
      setDataToSend({
        ...dataToSend,
        scientific_drugs: [
          ...dataToSend.scientific_drugs,
          {
            drug_id: item.id,
            drug_name: item.name,
            dose: "",
            times_id: null,
            times_name: "",
            type_id: null,
            type_name: "",
            period: "",
          },
        ],
      });
    }
  };
  const handleScientificDrugDoseChange = (e, index) => {
    const sdp = [...dataToSend.scientific_drugs];
    sdp[index].dose = e.target.value;
    setDataToSend({
      ...dataToSend,
      scientific_drugs: sdp,
    });
  };
  const handleCreateDrugType = async (name) => {
    try {
      const response = await fetch(`${apiUrl}/types`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
        }),
      });
      const responseData = await response.json();
      return responseData.type_id;
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleScientificDrugTypeChange = async (item, action, index) => {
    const sdt = [...dataToSend.scientific_drugs];
    if (action.action == "select-option") {
      sdt[index].type_id = item.id;
      sdt[index].type_name = item.name;
      setDataToSend({
        ...dataToSend,
        scientific_drugs: sdt,
      });
    } else if (action.action == "create-option") {
      const type_id = await handleCreateDrugType(item.value);
      getTypes();
      sdt[index].type_id = type_id;
      sdt[index].type_name = item.value;
      setDataToSend({
        ...dataToSend,
        scientific_drugs: sdt,
      });
    } else if (action.action == "clear") {
      sdt[index].type_id = 0;
      sdt[index].type_name = "";
      setDataToSend({
        ...dataToSend,
        scientific_drugs: sdt,
      });
    }
  };
  const handleScientificDrugTimesChange = async (item, action, index) => {
    const sdt = [...dataToSend.scientific_drugs];
    if (action.action == "select-option") {
      sdt[index].times_id = item.id;
      sdt[index].times_name = item.name;
      setDataToSend({
        ...dataToSend,
        scientific_drugs: sdt,
      });
    } else if (action.action == "create-option") {
      const times_id = await handleCreateDrugTimes(item.value);
      getTimes();
      sdt[index].times_id = times_id;
      sdt[index].times_name = item.value;
      setDataToSend({
        ...dataToSend,
        scientific_drugs: sdt,
      });
    } else if (action.action == "clear") {
      sdt[index].times_id = 0;
      sdt[index].times_name = "";
      setDataToSend({
        ...dataToSend,
        scientific_drugs: sdt,
      });
    }
  };
  const handleScientificDrugPeriodChange = (e, index) => {
    const sdp = [...dataToSend.scientific_drugs];
    sdp[index].period = e.target.value;
    setDataToSend({
      ...dataToSend,
      scientific_drugs: sdp,
    });
  };
  const handleScientificDrugRemoval = (e, i) => {
    e.preventDefault();
    setDataToSend({
      ...dataToSend,
      scientific_drugs: dataToSend.scientific_drugs.filter(
        (item, index) => index != i
      ),
    });
  };
  const handlePrescriptionNoteChange = (e) => {
    setDataToSend({
      ...dataToSend,
      prescription_note: e.target.value,
    });
  };
  return (
    <Prescription
      handleDxChange={handleDxChange}
      handleTradeDrugChange={handleTradeDrugChange}
      handleTradeDrugTimesChange={handleTradeDrugTimesChange}
      handleTradeDrugPeriodChange={handleTradeDrugPeriodChange}
      handleTradeDrugRemoval={handleTradeDrugRemoval}
      handleScientificDrugChange={handleScientificDrugChange}
      handleScientificDrugDoseChange={handleScientificDrugDoseChange}
      handleScientificDrugTypeChange={handleScientificDrugTypeChange}
      handleScientificDrugTimesChange={handleScientificDrugTimesChange}
      handleScientificDrugPeriodChange={handleScientificDrugPeriodChange}
      handleScientificDrugRemoval={handleScientificDrugRemoval}
      handlePrescriptionNoteChange={handlePrescriptionNoteChange}
      getDiseases={getDiseases}
      diseases={diseases}
      getTradeDrugs={getTradeDrugs}
      trade_drugs={trade_drugs}
      getScientificDrugs={getScientificDrugs}
      scientific_drugs={scientific_drugs}
      date={date}
      patient={patient}
      dataToSend={dataToSend}
      showDx={showDx}
      setShowDx={setShowDx}
      times={times}
      types={types}
    />
  );
}

export default PrescriptionController;
