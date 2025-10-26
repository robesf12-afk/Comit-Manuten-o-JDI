// src/App.tsx
import React from "react";
import {
  IconDDM,
  IconOKR,
  IconInfo,
  IconOnePager,
  IconPapeis,
  IconTreinamentos,
  IconChecklist,
  IconRegistroPCM,
  IconReconhecimentos,
} from "./icons";

export default function App() {
  return (
    <div className="app">
      {/* CABEÇALHO – logo grande + pílula central + FEMSA */}
      <header className="topbar">
        <div className="topbar-inner">
          <img
            className="logo-comite"
            src="/logo-comite.png"
            alt="Logo do Comitê"
          />

          <div className="title-chip" aria-label="Comitê de Manutenção JDI">
            <span>COMITÊ DE MANUTENÇÃO • JDI</span>
          </div>

          <img
            className="logo-femsa"
            src="/logo-femsa.png"
            alt="Coca-Cola FEMSA"
          />
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="container">
        <section className="grid">
          {/* DDM’s */}
          <a
            className="card"
            id="linkDDM"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/DDM%C2%B4S?csf=1&web=1&e=kXfLLD"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon">
              <IconDDM />
            </div>
            <div className="card-body">
              <h2>DDM’s</h2>
              <p>Diálogos de Manutenção</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* Fechamentos (OKR) */}
          <a
            className="card"
            id="linkOKR"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS?csf=1&web=1&e=e0QIRb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon">
              <IconOKR />
            </div>
            <div className="card-body">
              <h2>OKR de Manutenção </h2>
              <p>Fechamentos</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* Informativos */}
          <a
            className="card"
            id="linkInformativos"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/INFORMATIVOS?csf=1&web=1&e=dy3e4Y"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon">
              <IconInfo />
            </div>
            <div className="card-body">
              <h2>Informativos</h2>
              <p>Informativos sobre as rotinas de manutenção</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* One Pager */}
          <a
            className="card"
            id="linkOnePager"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/ONE%20PAGER?csf=1&web=1&e=mTBbo1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon">
              <IconOnePager />
            </div>
            <div className="card-body">
              <h2>One Pager</h2>
              <p>Resumo dos principais indicadores de manutenção</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* Papéis & Responsabilidades */}
          <a
            classNa
