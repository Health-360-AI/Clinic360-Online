import React, { useState } from "react";
import TagBadge from "../../../common/TagBadge";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NoteRelativeDoseRelated = ({
  divToShow,
  index,
  handleNoteChange,
  note,
  family_members,
  relative_id,
  handleRelativeChange,
  dose,
  handleDoseChange,
  systems,
  system_id,
  handleRelatedChange,
  handleRemoval,
}) => {
  if (divToShow == "Note") {
    return (
      <>
        <label
          htmlFor="note"
          className="col-2 col-form-label text-center mb-2 visit-note"
        >
          Note
        </label>
        <div className="col-4 p-0">
          <input
            id="note"
            type="text"
            placeholder="Note"
            className="form-control form-background"
            onChange={(e) => handleNoteChange(e, index)}
            value={note}
            required
          ></input>
        </div>
      </>
    );
  } else if (divToShow == "Relative") {
    return (
      <>
        <label
          htmlFor="relative"
          className="col-2 col-form-label text-center mb-2 visit-note"
        >
          Relative
        </label>
        <div className="col-4 p-0">
          <select
            id="relative"
            onChange={(e) => handleRelativeChange(e, index)}
            className="form-select form-background psh-select"
            value={relative_id}
            required
          >
            <option defaultValue>Select</option>
            {family_members.map((family_member) => (
              <option key={family_member.id} value={family_member.id}>
                {family_member.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-1 p-0">
          <FontAwesomeIcon
            icon="times-circle"
            size="2x"
            className="delete-button-morehx"
            onClick={() => handleRemoval(index)}
          ></FontAwesomeIcon>
        </div>
      </>
    );
  } else if (divToShow == "Dose") {
    return (
      <>
        <label
          htmlFor="dose"
          className="col-2 col-form-label text-center mb-2 visit-note"
        >
          Dose
        </label>
        <div className="col-4 p-0">
          <input
            id="dose"
            type="text"
            placeholder="Dose"
            className="form-control form-background"
            onChange={(e) => handleDoseChange(e, index)}
            value={dose}
            required
          ></input>
        </div>
      </>
    );
  } else if (divToShow == "Related") {
    return (
      <>
        <label
          htmlFor="related"
          className="col-1 col-form-label text-center mb-2 text-related ps-0 pe-0"
        >
          Related
        </label>
        <div className="col-2">
          <select
            id="related"
            onChange={(e) => handleRelatedChange(e, index)}
            className="form-select form-background"
            value={system_id}
            required
          >
            <option defaultValue>Select</option>
            {systems.map((system) => (
              <option key={system.id} value={system.id}>
                {system.name}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }
};

const Item = ({
  divToShow,
  index,
  tag,
  id,
  handleRemoval,
  handleNoteChange,
  note,
  family_members,
  relative_id,
  handleRelativeChange,
  dose,
  handleDoseChange,
  systems,
  system_id,
  handleRelatedChange,
}) => {
  return (
    <>
      {divToShow == "Related" ? (
        <div className="row">
          <div className="col-2 offset-3 ps-0">
            <TagBadge text={tag} />
          </div>
          <NoteRelativeDoseRelated
            divToShow={divToShow}
            index={index}
            systems={systems}
            system_id={system_id}
            handleRelatedChange={handleRelatedChange}
          />
          <div className="col-1 p-0">
            <FontAwesomeIcon
              icon="times-circle"
              size="2x"
              className="delete-button-morehx"
              onClick={() => handleRemoval(id)}
            ></FontAwesomeIcon>
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-4 p-0">
            <TagBadge text={tag} />
          </div>
          <NoteRelativeDoseRelated
            divToShow={divToShow}
            index={index}
            handleNoteChange={handleNoteChange}
            note={note}
            family_members={family_members}
            relative_id={relative_id}
            handleRelativeChange={handleRelativeChange}
            dose={dose}
            handleDoseChange={handleDoseChange}
            handleRemoval={handleRemoval}
          />
          {divToShow != "Relative" && (
            <div className="col-1 p-0">
              <FontAwesomeIcon
                icon="times-circle"
                size="2x"
                className="delete-button-morehx"
                onClick={() => handleRemoval(id)}
              ></FontAwesomeIcon>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Item;
