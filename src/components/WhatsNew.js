import React from "react";

let fs = require("fs");
let LOCALAPPDATA =
  process.platform !== "darwin"
    ? process.env.LOCALAPPDATA
    : path.join(process.env.HOME, "Library", "Application Support");
let WhatsNewFile;
if (process.env.NODE_ENV == "development") {
  WhatsNewFile = "./WhatsNew.json";
} else {
  WhatsNewFile = LOCALAPPDATA + "/clinic360/WhatsNew.json";
}
function WhatsNew(props) {
  return (
    <div id="main-view">
      <h2 className="p-3">What's New ?</h2>
      <ul>
        {JSON.parse(fs.readFileSync(WhatsNewFile, "utf8")).news.map(
          (item, index) => {
            return <li>{`${index + 1}- ${item}`}</li>;
          }
        )}
      </ul>
    </div>
  );
}

export default WhatsNew;
