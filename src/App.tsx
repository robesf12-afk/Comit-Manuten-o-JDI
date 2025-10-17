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

        {/* Logos à direita (mantidas) */}
        <div className="logos">
          <img src="/logo-comite.png" alt="Comitê de Manutenção" />
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
            <div className="card-icon"><IconDDM /></div>
            <div className="card-body">
              <h2>DDM’s</h2>
              <p>Diálogos de Manutenção</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          <a
            className="card"
            id="linkOKR"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS?csf=1&web=1&e=e0QIRb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconOKR /></div>
            <div className="card-body">
              <h2>Fechamentos (OKR)</h2>
              <p>Pasta de Fechamentos</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          <a
            className="card"
            id="linkInformativos"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/INFORMATIVOS?csf=1&web=1&e=dy3e4Y"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconInfo /></div>
            <div className="card-body">
              <h2>Informativos</h2>
              <p>Informativos sobre as rotinas de manutenção</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          <a
            className="card"
            id="linkOnePager"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/ONE%20PAGER?csf=1&web=1&e=mTBbo1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconOnePager /></div>
            <div className="card-body">
              <h2>One Pager</h2>
              <p>Resumo dos principais indicadores de manutenção</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          <a
            className="card"
            id="linkPapeis"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/PAP%C3%89IS%20E%20RESPONSABILIDADES?csf=1&web=1&e=C529Nu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconPapeis /></div>
            <div className="card-body">
              <h2>Papéis & Responsabilidades</h2>
              <p>Papéis e responsabilidades conforme MOM</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          <a
            className="card"
            id="linkTreinamentos"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/TREINAMENTOS?csf=1&web=1&e=RYgJ70"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconTreinamentos /></div>
            <div className="card-body">
              <h2>Treinamentos</h2>
              <p>Materiais e trilhas</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          <a
            className="card"
            id="linkChecklistPartida"
            href="https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconChecklist /></div>
            <div className="card-body">
              <h2>Checklist Pós-Partida</h2>
              <p>CIP/SETUP/PCM/Grandes Manutenções</p>
            </div>
            <div className="card-cta">Abrir</div>

