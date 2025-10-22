import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initPush } from "./push";

initPush();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
