import React, { useState } from "react";
import Loading from "../../../common/Loading";

function Scores() {
  const [loadingIframe, setLoadingIframe] = useState(true);
  return (
    <div style={{ height: "100vh" }} className="pt-5 mt-1">
      {/* {JSON.parse(localStorage.getItem("plan")) >= 1 ? (
        <> */}
      {loadingIframe && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Loading />
        </div>
      )}
      <iframe
        src="https://qxmd.com/calculate?embed=1"
        frameBorder="0"
        scrolling="no"
        width="100%"
        height="100%"
        id="qxmd_calculate"
        onLoad={() => {
          setLoadingIframe(false);
        }}
      ></iframe>
      {/* </>
      ) : (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Sorry you are subscribed in Silver Plan
        </div>
      )} */}
    </div>
  );
}

export default Scores;
