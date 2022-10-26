import DOMPurify from "dompurify";
import React from "react";

function PrintRx({
  patient,
  date,
  diagnonis,
  scientific_drugs,
  trade_drugs,
  note,
  headerPhoto,
  footerPhoto,
  bgPhoto,
  showDx,
  refd,
  tMargin,
  leftMargin,
  rightMargin,
  landscape,
  method,
  width,
  height,
  fontSize,
  bMarginDrug,
  lang,
  reportTitle,
  referralTo,
  rx,
  showTitle,
  showReferralTo,
}) {
  if (document.getElementById("header-img") != null) {
    if (headerPhoto instanceof Blob) {
      document.getElementById("header-img").src =
        URL.createObjectURL(headerPhoto);
    }
  }
  if (document.getElementById("footer-img") != null) {
    if (footerPhoto instanceof Blob) {
      document.getElementById("footer-img").src =
        URL.createObjectURL(footerPhoto);
    }
  }
  return method != 1 ? (
    <div
      className="m-0 p-0"
      id="print-rx"
      ref={refd}
      style={{
        marginTop: "0",
        paddingTop: "0",
        width: landscape ? height : width,
        height: landscape ? width : height,
        background:
          method == 3 ? `url(${bgPhoto}) 0% 0% / cover no-repeat` : "",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <div className="" style={{ flex: "100%" }}>
        <div
          className="row"
          style={{
            marginTop: tMargin,
            marginLeft: leftMargin,
            marginRight: rightMargin,
            fontSize: fontSize + "px",
            fontWeight: "500",
          }}
        >
          <p className="p-0 m-0" dir="rtl" style={{ flex: "50%" }}>
            العمر: {patient.age}
          </p>
          <p className="p-0 m-0" dir="rtl" style={{ flex: "50%" }}>
            الاسم: {patient.name}
          </p>
          <p className="p-0" dir="rtl" style={{ flex: "100%" }}>
            التاريخ: {date}
          </p>
          {showDx && (
            <p className="p-0" style={{ flex: "100%" }}>
              Dx: {diagnonis}
            </p>
          )}
          {rx && (
            <p className="p-0 m-0" style={{ flex: "100%" }}>
              Rx:
            </p>
          )}
          <div style={{ flex: "100%", paddingTop: "3px" }}>
            {trade_drugs.map((drug, index) => {
              return (
                <p className="" style={{ marginBottom: bMarginDrug }}>
                  {index + 1}- {drug.drug_name}
                  {", "}
                  {drug.times_name}
                  {", "}
                  {drug.period}
                </p>
              );
            })}
            {scientific_drugs.map((drug, index) => {
              return (
                <p className="" style={{ marginBottom: bMarginDrug }}>
                  {trade_drugs.length + index + 1}- {drug.drug_name}
                  {", "}
                  {drug.dose}
                  {", "}
                  {drug.type_name}
                  {", "}
                  {drug.times_name}
                  {", "}
                  {drug.period}
                </p>
              );
            })}
          </div>

          {showTitle && reportTitle && (
            <div className="text-center">{reportTitle}</div>
          )}
          {showReferralTo &&
            referralTo &&
            (lang == "en" ? (
              <div className="text-start" dir="ltr">
                Referral to: {referralTo}
              </div>
            ) : (
              <div className="" dir="rtl">
                احالة الى: {referralTo}
              </div>
            ))}
          {lang ? (
            <div
              dir={lang == "en" ? "ltr" : "rtl"}
              className="editor-wrapper"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note) }}
            ></div>
          ) : (
            <div style={{ whiteSpace: "break-spaces" }}>{note}</div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div
      className=""
      id="print-rx"
      ref={refd}
      style={{ padding: "20px", display: "flex", flexWrap: "wrap" }}
    >
      <div className="p-0" dir="rtl" style={{ flex: "100%" }}>
        <img id="header-img" width="100%" style={{ marginRight: "10px" }} />
      </div>

      <div className="" style={{ flex: "100%" }}>
        <div
          className="m-0"
          style={{
            fontSize: fontSize + "px",
            fontWeight: "500",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <p className="p-0 m-0" dir="rtl" style={{ flex: "50%" }}>
            العمر: {patient.age}
          </p>
          <p className="p-0 m-0" dir="rtl" style={{ flex: "50%" }}>
            الاسم: {patient.name}
          </p>
          <p className="p-0" dir="rtl" style={{ flex: "100%" }}>
            التاريخ: {date}
          </p>
          {showDx && (
            <p className="p-0" style={{ flex: "100%" }}>
              Dx: {diagnonis}
            </p>
          )}
          {rx && (
            <p className="p-0 m-0" style={{ flex: "100%" }}>
              Rx:
            </p>
          )}
          <div style={{ flex: "100%", paddingTop: "3px" }}>
            {trade_drugs.map((drug, index) => {
              return (
                <p className="" style={{ marginBottom: bMarginDrug }}>
                  {index + 1}- {drug.drug_name}
                  {", "}
                  {drug.times_name}
                  {", "}
                  {drug.period}
                </p>
              );
            })}
            {scientific_drugs.map((drug, index) => {
              return (
                <p className="" style={{ marginBottom: bMarginDrug }}>
                  {trade_drugs.length + index + 1}- {drug.drug_name}
                  {", "}
                  {drug.dose}
                  {", "}
                  {drug.type_name}
                  {", "}
                  {drug.times_name}
                  {", "}
                  {drug.period}
                </p>
              );
            })}
          </div>
          {showTitle && reportTitle && (
            <div className="text-center">{reportTitle}</div>
          )}
          {showReferralTo &&
            referralTo &&
            (lang == "en" ? (
              <div className="text-start" dir="ltr">
                Referral to: {referralTo}
              </div>
            ) : (
              <div className="" dir="rtl">
                احالة الى: {referralTo}
              </div>
            ))}
          {lang ? (
            <div
              dir={lang == "en" ? "ltr" : "rtl"}
              className="editor-wrapper"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note) }}
            ></div>
          ) : (
            <div style={{ whiteSpace: "break-spaces" }}>{note}</div>
          )}
        </div>
      </div>
      <div className="bottom-rx" dir="rtl" style={{ flex: "100%" }}>
        <img id="footer-img" width="100%" style={{ marginRight: "10px" }} />
      </div>
    </div>
  );
}

export default PrintRx;
