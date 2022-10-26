import React, { Fragment, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import Patients from "./admin/Patients";
import PageNotFound from "./PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "draft-js/dist/Draft.css";
import checkInternetConnected from "check-internet-connected";

// fontawesome
import initFontAwesome from "./common/initFontAwesome";
import WhatsNew from "./WhatsNew";
initFontAwesome();
const config = {
  timeout: 5000, //timeout connecting to each try (default 5000)
  // retries: 3,//number of retries to do before failing (default 5)
  domain: "www.google.com", //the domain to check DNS record of
};

// API
const apiUrl = process.env.API_URL;

function App() {
  return (
    <Fragment>
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => <HomePage {...routeProps} />}
        />
        <Route
          exact
          path="/whats-new"
          render={(routeProps) => <WhatsNew {...routeProps} news={[]} />}
        />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} position="top-left" />
    </Fragment>
  );
}

export default App;
