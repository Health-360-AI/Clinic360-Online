import React, { Fragment, useState } from "react";
import { motion } from "framer-motion";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function ROS({ ros, setROS, handleROSSymptoms, checkedROS, showing }) {
  return (
    <div className="row justify-content-center p-0 m-0">
      <div className="col-12 text-center">
        <h2 className="visit-header">Review of Systems</h2>
      </div>
      <div className="col-12">
        <div className="row">
          {ros.map((system) => {
            return (
              <div
                className="col-3 offset-2"
                key={system.system_id}
                // onTransitionEnd={() => handleEndTransition(system.system_id)}
              >
                <h4 className="mb-4 text-center systems-header">
                  {system.name}
                </h4>
                {/* <motion.div
                  animate={{ maxHeight: system.see ? "2000px" : "100px" }}
                  transition={{
                    duration: 2,
                  }}
                > */}
                <TransitionGroup
                  className={system.see ? `ros-transition` : `ros-ntransition`}
                >
                  {system.see &&
                    system.symptoms.map((symptom) => {
                      return (
                        <CSSTransition
                          key={symptom.id}
                          timeout={1500}
                          classNames="item"
                          unmountOnExit={true}
                        >
                          <div className={"form-check mb-4 checkboxes "}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={symptom.id}
                              checked={
                                checkedROS.filter(
                                  (cROS) => cROS.id == symptom.id
                                ).length != 0
                              }
                              id={symptom.symptom}
                              onChange={(e) =>
                                handleROSSymptoms(e, { id: symptom.id })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor={symptom.symptom}
                            >
                              {symptom.symptom}
                            </label>
                          </div>
                        </CSSTransition>
                      );
                    })}
                </TransitionGroup>
                {/* </motion.div> */}
                {showing(system.system_id)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ROS;
