import React from "react";
import ROS from "./ROS";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ROSController({
  ros,
  checkedROS,
  setROSs,
  dataToSend,
  setDataToSend,
}) {
  const setROS = (ros) => {
    setROSs(ros);
  };

  const handleROSSymptoms = (e, symptom) => {
    if (e.target.checked) {
      let ss = dataToSend.symptoms;
      ss.push(symptom);
      setDataToSend({ ...dataToSend, symptoms: ss });
    } else {
      setDataToSend({
        ...dataToSend,
        symptoms: dataToSend.symptoms.filter((symp) => symp.id != symptom.id),
      });
    }
  };
  const findSystem = (system_id) => {
    return ros.findIndex((s) => s.system_id == system_id);
  };

  const handleSeeSystem = (system_id) => {
    const index = findSystem(system_id);
    let nee = [...ros];
    nee[index] = { ...nee[index], see: !nee[index].see };
    setROS(nee);
  };

  const showing = (system_id) => {
    return (
      <div
        className="systems-angle mb-4"
        onClick={() => handleSeeSystem(system_id)}
      >
        <FontAwesomeIcon
          icon={ros[findSystem(system_id)].see ? "angle-up" : "angle-down"}
          size="2x"
          color="#008DFF"
          className={
            ros[findSystem(system_id)].see ? "rotateLeft" : "rotateRight"
          }
        />
      </div>
    );
  };
  return (
    <ROS
      ros={ros}
      setROS={setROS}
      handleROSSymptoms={handleROSSymptoms}
      checkedROS={checkedROS}
      findSystem={findSystem}
      handleSeeSystem={handleSeeSystem}
      showing={showing}
    />
  );
}

export default ROSController;
