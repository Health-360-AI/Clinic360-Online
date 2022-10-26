"use strict";

const keytar = require("keytar");
const { auth0Login } = require("electron-auth0-login");

module.exports = auth0Login({
  // Get these from your Auth0 application console
  auth0: {
    audience: "iClinic",
    clientId: "Fc79jCI3sivRekiqzTM3MflpWI1eYcnN",
    domain: "iclinic.eu.auth0.com",
    scopes: "openid profile offline_access",
  },
  debug: false,
  refreshTokens: {
    keytar,
    appName: "clinic360",
  },
});
