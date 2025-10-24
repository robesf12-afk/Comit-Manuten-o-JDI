// src/main.tsx — seguro contra erro de push (não altera layout)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ⚠️ mantém o import do push, mas se faltar o arquivo, não quebra
let initPush: undefined | (() => Promise<void>);
try {
  // se existir ./push.ts, importamos; se não, segue sem push
  // (isso evita tela branca)
  // @ts-ignore
  ({ initPush } = await import("./push"));
} catch {
  // sem push por enquanto
}

const rootEl = document.getElementById("root");
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Só tenta iniciar push DEPOIS que a página carrega, e nunca deixa erro estourar
window.addEventListener("load", () => {
  try {
    if (typeof initPush === "function") {
      initPush().catch((e) => console.warn("push falhou:", e));
    }
  } catch (e) {
    console.warn("erro ao iniciar push:", e);
  }
});
