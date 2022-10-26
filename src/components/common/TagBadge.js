import React, { Fragment } from "react";

function TagBadge(props) {
  return (
    <Fragment>
      <div className="tag-badge">
        <span className="text-related">{props.text}</span>
      </div>
      <svg height="0" width="0" style={{ position: "absolute" }}>
        <clipPath id="TagBadge-path" clipPathUnits="objectBoundingBox">
          <path
            id="Union_33"
            data-name="Union 33"
            d="M0.074,1 V0.64 L0,0.506 L0.074,0.372 V0 H1 V1"
          />
        </clipPath>
      </svg>
    </Fragment>
  );
}

export default TagBadge;
