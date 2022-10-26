import React, { useState } from "react";
import MoreHx from "./MoreHx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const apiUrl = process.env.API_URL;
function MoreHxController({
  handleCreateDisease,
  diseases,
  family_members,
  surgeries,
  drugs,
  allergies,
  dataToSend,
  setDataToSend,
  getDiseases,
  getSurgeries,
  getScientificDrugs,
  scientific_drugs,
  getAllergies,
}) {
  const [seeMoreHx, setSeeMoreHx] = useState({
    past_medical_hx: false,
    past_surgical_hx: false,
    family_hx: false,
    smoking_hx: false,
    alcohol_hx: false,
    drug_hx: false,
    allergies: false,
  });
  const [cig, setCig] = useState(0);
  const [years, setYears] = useState(0);
  const handlePastMedicalHx = async (item, action) => {
    if (action.action == "select-option") {
      setDataToSend({
        ...dataToSend,
        past_medical_history: [
          ...dataToSend.past_medical_history,
          { disease_id: item.id, disease_name: item.name, note: "" },
        ],
      });
    } else if (action.action == "create-option") {
      const disease = await handleCreateDisease(item.value);
      getDiseases();
      setDataToSend({
        ...dataToSend,
        past_medical_history: [
          ...dataToSend.past_medical_history,
          { disease_id: disease, disease_name: item.value, note: "" },
        ],
      });
    }
  };
  const handlePastMedicalHxRemoval = (id) => {
    setDataToSend({
      ...dataToSend,
      past_medical_history: dataToSend.past_medical_history.filter(
        (item) => item.disease_id != id
      ),
    });
  };
  const handlePastMedicalHxNoteChange = (e, index) => {
    const pmh = [...dataToSend.past_medical_history];
    pmh[index].note = e.target.value;
    setDataToSend({
      ...dataToSend,
      past_medical_history: pmh,
    });
  };

  const handleCreateSurgery = async (name) => {
    try {
      const response = await fetch(`${apiUrl}/surgeries`, {
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
      return responseData.surgery_id;
    } catch (error) {
      console.log(error.message);
    }
  };
  const handlePastSurgicalHx = async (item, action) => {
    if (action.action == "select-option") {
      setDataToSend({
        ...dataToSend,
        past_surgical_history: [
          ...dataToSend.past_surgical_history,
          { surgery_id: item.id, surgery_name: item.name, note: "" },
        ],
      });
    } else if (action.action == "create-option") {
      const surgery = await handleCreateSurgery(item.value);
      getSurgeries();
      setDataToSend({
        ...dataToSend,
        past_surgical_history: [
          ...dataToSend.past_surgical_history,
          { surgery_id: surgery, surgery_name: item.value, note: "" },
        ],
      });
    }
  };
  const handlePastSurgicalHxRemoval = (id) => {
    setDataToSend({
      ...dataToSend,
      past_surgical_history: dataToSend.past_surgical_history.filter(
        (item) => item.surgery_id != id
      ),
    });
  };
  const handlePastSurgicalHxNoteChange = (e, index) => {
    const psh = [...dataToSend.past_surgical_history];
    psh[index].note = e.target.value;
    setDataToSend({
      ...dataToSend,
      past_surgical_history: psh,
    });
  };
  const handleFamilyHx = async (item, action) => {
    if (action.action == "select-option") {
      setDataToSend({
        ...dataToSend,
        family_history: [
          ...dataToSend.family_history,
          { disease_id: item.id, disease_name: item.name, relative_id: null },
        ],
      });
    } else if (action.action == "create-option") {
      const disease = await handleCreateDisease(item.value);
      getDiseases();
      setDataToSend({
        ...dataToSend,
        family_history: [
          ...dataToSend.family_history,
          { disease_id: disease, disease_name: item.value, relative_id: null },
        ],
      });
    }
  };

  const handleFamilyHxRemoval = (index) => {
    let x = dataToSend.family_history;
    x.splice(index, 1);
    setDataToSend({
      ...dataToSend,
      family_history: x,
    });
  };

  const handleRelativeChange = (e, index) => {
    const fh = [...dataToSend.family_history];
    fh[index].relative_id = e.target.value;
    setDataToSend({
      ...dataToSend,
      family_history: fh,
    });
  };

  const handleDrugHx = (item, action) => {
    if (action.action == "select-option") {
      setDataToSend({
        ...dataToSend,
        drug_history: [
          ...dataToSend.drug_history,
          { drug_id: item.id, drug_name: item.name, dose: "" },
        ],
      });
    }
  };
  const handleDrugHxRemoval = (id) => {
    setDataToSend({
      ...dataToSend,
      drug_history: dataToSend.drug_history.filter(
        (item) => item.drug_id != id
      ),
    });
  };
  const handleDoseChange = (e, index) => {
    const dh = [...dataToSend.drug_history];
    dh[index].dose = e.target.value;
    setDataToSend({
      ...dataToSend,
      drug_history: dh,
    });
  };

  const handleCreateAllergies = async (name) => {
    try {
      const response = await fetch(`${apiUrl}/allergies`, {
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
      return responseData.allergy_id;
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleAllergies = async (item, action) => {
    if (action.action == "select-option") {
      setDataToSend({
        ...dataToSend,
        allergies: [
          ...dataToSend.allergies,
          { allergy_id: item.id, allergy_name: item.name, note: "" },
        ],
      });
    } else if (action.action == "create-option") {
      const allergy_id = await handleCreateAllergies(item.value);
      getAllergies();
      setDataToSend({
        ...dataToSend,
        allergies: [
          ...dataToSend.allergies,
          { allergy_id, allergy_name: item.value, note: "" },
        ],
      });
    }
  };
  const handleAllergiesRemoval = (id) => {
    setDataToSend({
      ...dataToSend,
      allergies: dataToSend.allergies.filter((item) => item.allergy_id != id),
    });
  };
  const handleAllergiesNoteChange = (e, index) => {
    const a = [...dataToSend.allergies];
    a[index].note = e.target.value;
    setDataToSend({
      ...dataToSend,
      allergies: a,
    });
  };

  const calculatePackYear = (e) => {
    e.preventDefault();
    setDataToSend({
      ...dataToSend,
      smoking_history: {
        pack_year: (cig * years) / 20,
      },
    });
  };
  const handleCigarettesChange = (e) => {
    setCig(e.target.value);
  };
  const handleYearsChange = (e) => {
    setYears(e.target.value);
  };
  const handleAlcoholTypeChange = (e) => {
    setDataToSend({
      ...dataToSend,
      alcohol_history: { ...dataToSend.alcohol_history, type: e.target.value },
    });
  };
  const handleAlcoholConcentrationChange = (e) => {
    setDataToSend({
      ...dataToSend,
      alcohol_history: {
        ...dataToSend.alcohol_history,
        concentration: e.target.value,
      },
    });
  };
  const handleAlcoholVolumeChange = (e) => {
    setDataToSend({
      ...dataToSend,
      alcohol_history: {
        ...dataToSend.alcohol_history,
        volume: e.target.value,
      },
    });
  };
  const handleSeeSystem = (hx) => {
    if (hx == "past_medical_hx") {
      setSeeMoreHx({
        ...seeMoreHx,
        past_medical_hx: !seeMoreHx.past_medical_hx,
      });
    } else if (hx == "past_surgical_hx") {
      setSeeMoreHx({
        ...seeMoreHx,
        past_surgical_hx: !seeMoreHx.past_surgical_hx,
      });
    } else if (hx == "family_hx") {
      setSeeMoreHx({
        ...seeMoreHx,
        family_hx: !seeMoreHx.family_hx,
      });
    } else if (hx == "smoking_hx") {
      setSeeMoreHx({
        ...seeMoreHx,
        smoking_hx: !seeMoreHx.smoking_hx,
      });
    } else if (hx == "alcohol_hx") {
      setSeeMoreHx({
        ...seeMoreHx,
        alcohol_hx: !seeMoreHx.alcohol_hx,
      });
    } else if (hx == "drug_hx") {
      setSeeMoreHx({
        ...seeMoreHx,
        drug_hx: !seeMoreHx.drug_hx,
      });
    } else if (hx == "allergies") {
      setSeeMoreHx({
        ...seeMoreHx,
        allergies: !seeMoreHx.allergies,
      });
    }
  };
  console.log(dataToSend);
  const showing = (see, hx) => {
    return (
      <div className="systems-angle mb-4" onClick={() => handleSeeSystem(hx)}>
        <FontAwesomeIcon
          icon={see ? "angle-up" : "angle-down"}
          size="2x"
          color="#008DFF"
          className={see ? "rotateLeft" : "rotateRight"}
        />
      </div>
    );
  };
  return (
    <MoreHx
      handlePastMedicalHx={handlePastMedicalHx}
      handlePastMedicalHxRemoval={handlePastMedicalHxRemoval}
      handlePastMedicalHxNoteChange={handlePastMedicalHxNoteChange}
      handlePastSurgicalHx={handlePastSurgicalHx}
      handlePastSurgicalHxRemoval={handlePastSurgicalHxRemoval}
      handlePastSurgicalHxNoteChange={handlePastSurgicalHxNoteChange}
      handleFamilyHx={handleFamilyHx}
      handleFamilyHxRemoval={handleFamilyHxRemoval}
      handleRelativeChange={handleRelativeChange}
      handleDrugHx={handleDrugHx}
      handleDrugHxRemoval={handleDrugHxRemoval}
      handleDoseChange={handleDoseChange}
      handleAllergies={handleAllergies}
      handleAllergiesRemoval={handleAllergiesRemoval}
      handleAllergiesNoteChange={handleAllergiesNoteChange}
      seeMoreHx={seeMoreHx}
      cig={cig}
      years={years}
      calculatePackYear={calculatePackYear}
      handleCigarettesChange={handleCigarettesChange}
      handleYearsChange={handleYearsChange}
      handleAlcoholTypeChange={handleAlcoholTypeChange}
      handleAlcoholConcentrationChange={handleAlcoholConcentrationChange}
      handleAlcoholVolumeChange={handleAlcoholVolumeChange}
      handleSeeSystem={handleSeeSystem}
      showing={showing}
      diseases={diseases}
      surgeries={surgeries}
      drugs={drugs}
      allergies={allergies}
      family_members={family_members}
      dataToSend={dataToSend}
      setDataToSend={setDataToSend}
      getScientificDrugs={getScientificDrugs}
      getSurgeries={getSurgeries}
      getDiseases={getDiseases}
    />
  );
}

export default MoreHxController;
