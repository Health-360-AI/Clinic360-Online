import React from "react";

function SupportPage() {
  return (
    <div
      className={"width-others-wide ms-auto main-view fadeIn"}
      id="main-view"
    >
      <div className="row pt-3 mb-5">
        <div className="col-12 text-center">
          <p>
            Welcome to Health 360 Support center, We Are here to Answer your
            questions
          </p>
        </div>
        <div className="col-12 text-center mb-2">
          <p className="">Contact Us</p>
          <p>+964 78 38 360 360</p>
          <a href="mailto: support@health-360.co">support@health-360.co</a>
        </div>
        {/* <div className="col-6 text-center">
          <p>Sajjad Hasasnain</p>
          <p>+964 770 278 2717</p>
          <a href="mailto: sajjadhasanain@health-360.co">
            sajjadhasanain@health-360.co
          </a>
        </div>
        <div className="col-6 text-center">
          <p>Hussein Fadhel</p>
          <p>+964 781 378 5561</p>
          <a href="mailto: husseinfadhel@health-360.co">
            husseinfadhel@health-360.co
          </a>
        </div> */}
      </div>
    </div>
  );
}

export default SupportPage;
