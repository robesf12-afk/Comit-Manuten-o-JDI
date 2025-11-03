// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// 🔔 OneSignal – dispara o prompt quando o SDK estiver pronto
import { promptPushIfNeeded } from "./push";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// chama depois do render — seguro e idempotente
promptPushIfNeeded();
