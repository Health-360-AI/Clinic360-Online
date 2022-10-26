import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "@popperjs/core";
import "./assets/sass/styles.scss";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import App from "./components/App";

let root = document.createElement("div");

root.id = "root";
document.body.appendChild(root);
root = createRoot(document.getElementById("root"));
// const Router = () => {
//   if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
//     return (
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     );
//   } else {
//     return (
//       <HashRouter>
//         <App />
//       </HashRouter>
//     );
//   }
// };
// Now we can render our application into it
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
