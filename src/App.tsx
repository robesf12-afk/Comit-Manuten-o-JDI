
   // src/App.tsx
import React from "react";

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        {/* Marca à esquerda: LOGO DO COMITÊ + título */}
        <div className="brand">
          <img
            className="brand-mark"
            src="/logo-comite.png"
            alt="Comitê de Manutenção"
          />
          <h1>Comitê de Manutenção • JDI</h1>
        </div>

        {/* À direita: somente logo FEMSA (removi o logo do comitê aqui) */}
        <div className="logos">
          <img src="/logo-femsa.png" alt="Coca-Cola FEMSA" />
        </div>

        <button id="installBtn" className="btn" hidden>
          Instalar
        </button>
      </header>

      <main className="container">
        <section className="grid">
          <a
            className="card"
            id="linkDDM"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/DDM%C2%B4S?csf=1&web=1&e=kXfLLD"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon">🗣️</div>
            <div className="card-body">
              <h2>DDM’s</h2>
              <p>Diálogos de Manutenção</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          <a
            className="card"
            id="linkOKR"
            href={"COLAR_AQUI_LINK_OKR"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon">📊</div>
            <div className="card-body">
              <h2>Fechamentos (OKR)</h2>
              <p>Pasta de Fechamentos</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          <a
            className="card"
            id="linkInformativos"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/INFORMATIVOS?csf=1&

