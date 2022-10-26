import React from "react";

function SubscriptionPage({ subscription, renewal }) {
  return (
    <div
      className={"width-others-wide ms-auto main-view fadeIn"}
      id="main-view"
    >
      <p className="pt-3">Date of installment: {subscription.start_date}</p>
      <p>Subscription valid until: {subscription.expire_date}</p>
      <p>
        {/* Subsription plan:{" "}
        {subscription.plan == 0
          ? "Silver"
          : subscription.plan == 1
          ? "Golden"
          : "Platinium"} */}
      </p>
      <button className="btn btn-success" onClick={renewal}>
        Renew
      </button>
    </div>
  );
}

export default SubscriptionPage;
