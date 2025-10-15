import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // <<< ESSENCIAL: importa o CSS da aplicação

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
