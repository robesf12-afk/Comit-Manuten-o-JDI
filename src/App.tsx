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
      {/* CABEÇALHO – logo COMITÊ + (FEMSA + título) em grupo */}
      <header className="topbar">
        <div className="topbar-inner">
          <img
            className="logo-comite"
            src="/logo-comite.png"
            alt="Logo do Comitê"
          />

          {/* FEMSA à esquerda do título */}
          <div className="brand">
            <img className="logo-femsa" src="/logo-femsa.png" alt="Coca-Cola FEMSA" />
            <div className="title-chip" aria-label="Comitê de Manutenção JDI">
              <span>COMITÊ DE MANUTENÇÃO • JDI</span>
            </div>
          </div>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="container">
        <section className="grid">
          {/* 1) REGISTRO DE REUNIÕES / PRESTAÇÃO DE CONTAS */}
          <a
            className="card"
            id="linkRegistroPrestacao"
            href="https://forms.office.com/r/mt0JTBJiK6?origin=lprLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconRegistroPCM /></div>
            <div className="card-body">
              <h2>REGISTRO DE REUNIÕES DE ABERTURA DE PCM E PRESTAÇÃO DE CONTAS</h2>
              <p>Aberturas de PCM e Prestação de Contas</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 2) CHECKLIST PÓS-PARTIDA */}
          <a
            className="card"
            id="linkChecklistPartida"
            href="https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconChecklist /></div>
            <div className="card-body">
              <h2>CHECKLIST PÓS-PARTIDA</h2>
              <p>CIP/SETUP/PCM/Grandes Manutenções</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 3) DDM’S */}
          <a
            className="card"
            id="linkDDM"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/DDM%C2%B4S?csf=1&web=1&e=kXfLLD"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconDDM /></div>
            <div className="card-body">
              <h2>DDM’S</h2>
              <p>Diálogos de Manutenção</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 4) PROGRAMAÇÃO DE PCM */}
          <a
            className="card"
            id="linkProgramacaoPCM"
            href="https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PAINEL%20DISTRIBUI%C3%87%C3%83O%20DE%20HORAS?csf=1&web=1&e=Ye4Wad"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconChecklist /></div>
            <div className="card-body">
              <h2>PROGRAMAÇÃO DE PCM</h2>
              <p>Planejamento semanal das manutenções preventivas</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 5) PAINEL DE DISTRIBUIÇÃO DE HORAS */}
          <a
            className="card"
            id="linkPainelHoras"
            href="https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PROGRAMA%C3%87%C3%83O%20PRE%20PCM?csf=1&web=1&e=LYYchz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconOKR /></div>
            <div className="card-body">
              <h2>PAINEL DE DISTRIBUIÇÃO DE HORAS</h2>
              <p>Acompanhamento da alocação de horas PCM</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 6) OKR DE MANUTENÇÃO */}
          <a
            className="card"
            id="linkOKR"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS?csf=1&web=1&e=e0QIRb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconOKR /></div>
            <div className="card-body">
              <h2>OKR DE MANUTENÇÃO</h2>
              <p>Fechamentos</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* INFORMATIVOS */}
          <a
            className="card"
            id="linkInformativos"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/INFORMATIVOS?csf=1&web=1&e=dy3e4Y"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconInfo /></div>
            <div className="card-body">
              <h2>INFORMATIVOS</h2>
              <p>Informativos sobre as rotinas de manutenção</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* PAPÉIS & RESPONSABILIDADES */}
          <a
            className="card"
            id="linkPapeis"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/PAP%C3%89IS%20E%20RESPONSABILIDADES?csf=1&web=1&e=C529Nu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconPapeis /></div>
            <div className="card-body">
              <h2>PAPÉIS &amp; RESPONSABILIDADES</h2>
              <p>Papéis e responsabilidades conforme MOM</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* ONE PAGER */}
          <a
            className="card"
            id="linkOnePager"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/ONE%20PAGER?csf=1&web=1&e=mTBbo1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconOnePager /></div>
            <div className="card-body">
              <h2>ONE PAGER</h2>
              <p>Resumo dos principais indicadores de manutenção</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* TREINAMENTOS */}
          <a
            className="card"
            id="linkTreinamentos"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/TREINAMENTOS?csf=1&web=1&e=RYgJ70"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconTreinamentos /></div>
            <div className="card-body">
              <h2>TREINAMENTOS</h2>
              <p>Sou novo na função de T2/téc. de Manutenção/T3 e agora?</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* RECONHECIMENTOS */}
          <a
            className="card"
            id="linkReconhecimentos"
            href="https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconReconhecimentos /></div>
            <div className="card-body">
              <h2>RECONHECIMENTOS</h2>
              <p>Áreas reconhecidas por atingimento de meta</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>
        </section>
      </main>

      <footer className="footer">
        <small>© 2025 COMITÊ DE MANUTENÇÃO JDI— FEMSA</small>
      </footer>
    </div>
  );
}

