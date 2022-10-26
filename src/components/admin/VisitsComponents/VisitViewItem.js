import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TagBadge from "../../common/TagBadge";

const NoteRelativeDoseRelated = ({
  divToShow,
  note,
  family_member,
  dose,
  system,
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
          <p>{note}</p>
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
          <p>{family_member}</p>
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
          <p>{dose}</p>
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
          <p>{system}</p>
        </div>
      </>
    );
  }
};

const VisitViewItem = ({
  divToShow,
  index,
  tag,
  note,
  family_member,
  dose,
  system,
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
            system={system}
          />
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-4 p-0">
            <TagBadge text={tag} />
          </div>
          <NoteRelativeDoseRelated
            divToShow={divToShow}
            index={index}
            note={note}
            family_member={family_member}
            dose={dose}
          />
        </div>
      )}
    </>
  );
};

export default VisitViewItem;
