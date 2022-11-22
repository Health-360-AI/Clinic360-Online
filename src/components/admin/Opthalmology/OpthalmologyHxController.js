import React, { useState } from "react";
import OpthalmologyHx from "./OpthalmologyHx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OpthalmologyHxController({
  dataToSend,
  setDataToSend,
  getDiseases,
  diseases,
  family_members,
  getSurgeries,
  surgeries,
}) {
  const [seeMoreHx, setSeeMoreHx] = useState({
    optical_hx: false,
    glasses: false,
    contact_lens: false,
    family_ocular_hx: false,
    ocular_surgical_hx: false,
  });
  const handleOpticalHxLastReflection = (e) => {
    setDataToSend({
      ...dataToSend,
      optical_hx_last_reflection: e.target.value,
    });
  };
  const handleOpticalHxReflectionStability = (e) => {
    setDataToSend({
      ...dataToSend,
      optical_hx_reflection_stability: e.target.value,
    });
  };
  const handleOpticalHxGlassesDuration = (e) => {
    setDataToSend({
      ...dataToSend,
      optical_hx_glasses_duration: e.target.value,
    });
  };
  const handleOpticalHxChangeFrequency = (e) => {
    setDataToSend({
      ...dataToSend,
      optical_hx_glasses_change_frequency: e.target.value,
    });
  };
  const handleOpticalHxContactLensDuration = (e) => {
    setDataToSend({
      ...dataToSend,
      optical_hx_contact_lens_duration: e.target.value,
    });
  };
  const handleOpticalHxUsage = (e) => {
    setDataToSend({
      ...dataToSend,
      optical_hx_usage: e.target.value,
    });
  };
  const handleOpticalHxUses = (e) => {
    setDataToSend({
      ...dataToSend,
      optical_hx_uses: e.target.value,
    });
  };
  const handleOpticalHxType = (e) => {
    setDataToSend({
      ...dataToSend,
      optical_hx_type: e.target.value,
    });
  };
  const handleOpticalHxLastTimeWeared = (e) => {
    setDataToSend({
      ...dataToSend,
      optical_hx_last_time_weared: e.target.value,
    });
  };

  const handleCreateDisease = async (name) => {
    try {
      const response = await fetch(`${apiUrl}/diseases`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  const handleOcularFamilyHx = async (item, action) => {
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

  const handleCreateSurgery = async (name) => {
    try {
      const response = await fetch(`${apiUrl}/surgeries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
  const handleOcularSurgicalHx = async (item, action) => {
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
  const handleOcularSurgicalHxRemoval = (id) => {
    setDataToSend({
      ...dataToSend,
      past_surgical_history: dataToSend.past_surgical_history.filter(
        (item) => item.surgery_id != id
      ),
    });
  };
  const handleOcularSurgicalHxNoteChange = (e, index) => {
    const psh = [...dataToSend.past_surgical_history];
    psh[index].note = e.target.value;
    setDataToSend({
      ...dataToSend,
      past_surgical_history: psh,
    });
  };
  const handleSeeSystem = (hx) => {
    if (hx == "optical_hx") {
      setSeeMoreHx({
        ...seeMoreHx,
        optical_hx: !seeMoreHx.optical_hx,
      });
    } else if (hx == "glasses") {
      setSeeMoreHx({
        ...seeMoreHx,
        glasses: !seeMoreHx.glasses,
      });
    } else if (hx == "contact_lens") {
      setSeeMoreHx({
        ...seeMoreHx,
        contact_lens: !seeMoreHx.contact_lens,
      });
    } else if (hx == "family_ocular_hx") {
      setSeeMoreHx({
        ...seeMoreHx,
        family_ocular_hx: !seeMoreHx.family_ocular_hx,
      });
    } else if (hx == "ocular_surgical_hx") {
      setSeeMoreHx({
        ...seeMoreHx,
        ocular_surgical_hx: !seeMoreHx.ocular_surgical_hx,
      });
    }
  };
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
    <OpthalmologyHx
      handleOpticalHxLastReflection={handleOpticalHxLastReflection}
      optical_hx_last_reflection={dataToSend.optical_hx_last_reflection}
      optical_hx_reflection_stability={
        dataToSend.optical_hx_reflection_stability
      }
      optical_hx_glasses_duration={dataToSend.optical_hx_glasses_duration}
      optical_hx_glasses_change_frequency={
        dataToSend.optical_hx_glasses_change_frequency
      }
      optical_hx_contact_lens_duration={
        dataToSend.optical_hx_contact_lens_duration
      }
      optical_hx_usage={dataToSend.optical_hx_usage}
      optical_hx_uses={dataToSend.optical_hx_uses}
      optical_hx_type={dataToSend.optical_hx_type}
      optical_hx_last_time_weared={dataToSend.optical_hx_last_time_weared}
      handleOpticalHxReflectionStability={handleOpticalHxReflectionStability}
      handleOpticalHxGlassesDuration={handleOpticalHxGlassesDuration}
      handleOpticalHxChangeFrequency={handleOpticalHxChangeFrequency}
      handleOpticalHxContactLensDuration={handleOpticalHxContactLensDuration}
      handleOpticalHxUsage={handleOpticalHxUsage}
      handleOpticalHxUses={handleOpticalHxUses}
      handleOpticalHxType={handleOpticalHxType}
      handleOpticalHxLastTimeWeared={handleOpticalHxLastTimeWeared}
      getDiseases={getDiseases}
      diseases={diseases}
      family_members={family_members}
      handleOcularFamilyHx={handleOcularFamilyHx}
      family_history={dataToSend.family_history}
      handleFamilyHxRemoval={handleFamilyHxRemoval}
      handleRelativeChange={handleRelativeChange}
      getSurgeries={getSurgeries}
      surgeries={surgeries}
      handleOcularSurgicalHx={handleOcularSurgicalHx}
      past_surgical_history={dataToSend.past_surgical_history}
      handleOcularSurgicalHxRemoval={handleOcularSurgicalHxRemoval}
      handleOcularSurgicalHxNoteChange={handleOcularSurgicalHxNoteChange}
      seeMoreHx={seeMoreHx}
      setSeeMoreHx={setSeeMoreHx}
      showing={showing}
    />
  );
}
