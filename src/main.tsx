// src/main.tsx — versão segura (sem top-level await)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// ✅ tenta carregar o push só depois da página pronta
window.addEventListener("load", () => {
  import("./push")
    .then((mod) => {
      if (mod && typeof mod.initPush === "function") {
        mod.initPush().catch((err) =>
          console.warn("Falha ao iniciar push:", err)
        );
      }
    })
    .catch((err) => console.warn("Push desativado:", err));
});

