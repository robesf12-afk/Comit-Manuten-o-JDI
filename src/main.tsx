import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";      // <- OU use "./App.tsx" se preferir
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

