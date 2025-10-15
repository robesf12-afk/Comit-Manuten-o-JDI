// src/App.tsx
import React from "react";

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="logo">🛠️</span>
          <h1>Comitê de Manutenção</h1>
        </div>
        <button id="installBtn" className="btn" hidden>
          Instalar
        </button>
      </header>

      <main className="container">
        <section className="grid">
          {/* 1) Formulário de Abertura — deixe o link correto que você usa */}
          <a
            className="card"
            id="linkAbertura"
            href={"COLAR_AQUI_URL_DE_ABERTURA"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon">📝</div>
            <div className="card-body">
              <h2>Formulário de Abertura</h2>
              <p>Abra o fluxo inicial do comitê.</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 2) Checklist — RENOMEADO e LINK ATUALIZADO */}
          <a
            className="card"
            id="linkChecklistPartida"
            href="https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon">✅</div>
            <div className="card-body">
              <h2>Checklist Pós-Partida</h2>
              <p>CIP / SETUP / PCM / Grandes Manutenções.</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 3) Registro de Abertura & Prestação — NOVO */}
          <a
            className="card"
            id="linkRegistroPrestacao"
            href="https://forms.office.com/r/mt0JTBJiK6?origin=lprLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon">🗂️</div>
            <div className="card-body">
              <h2>Registro de Abertura & Prestação</h2>
              <p>Reuniões de abertura de PCM e prestação de contas.</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 4) OKR de Manutenção — mantém como estava até você confirmar o link */}
          <a
            className="card"
            id="linkOKR"
            href={"COLAR_AQUI_LINK_OKR"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon">📊</div>
            <div className="card-body">
              <h2>OKR de Manutenção</h2>
              <p>Indicadores e metas.</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 5) DDM — link preenchido conforme seu comentário */}
          <a
            className="card"
            id="linkDDM"
            href={
              "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/DDM%C2%B4S?csf=1&web=1&e=kXfLLD"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon">🗣️</div>
            <div className="card-body">
              <h2>DDM – Diálogo de Manutenção</h2>
              <p>Guias e registros.</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 6) One-Pager — link preenchido conforme seu comentário */}
          <a
            className="card"
            id="linkOnePager"
            href={
              "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/ONE%20PAGER?csf=1&web=1&e=mTBbo1"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon">📄</div>
            <div className="card-body">
              <h2>One-Pager</h2>
              <p>Resumo executivo.</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 7) Treinamentos — link preenchido conforme seu comentário */}
          <a
            className="card"
            id="linkTreinamentos"
            href={
              "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/TREINAMENTOS?csf=1&web=1&e=RYgJ70"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon">🎯</div>
            <div className="card-body">
              <h2>Treinamentos de Manutenção</h2>
              <p>Calendário e conteúdos.</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 8) Papéis & Responsabilidades — link preenchido conforme seu comentário */}
          <a
            className="card"
            id="linkPapeis"
            href={
              "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/PAP%C3%89IS%20E%20RESPONSABILIDADES?csf=1&web=1&e=C529Nu"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon">🧭</div>
            <div className="card-body">
              <h2>Papéis & Responsabilidades</h2>
              <p>Quem faz o quê.</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 9) Informativos — link preenchido conforme seu comentário */}
          <a
            className="card"
            id="linkInformativos"
            href={
              "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/INFORMATIVOS?csf=1&web=1&e=dy3e4Y"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon">ℹ️</div>
            <div className="card-body">
              <h2>Informativos</h2>
              <p>Comunicados e avisos.</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 10) Reconhecimentos — NOVO e por último */}
          <a
            className="card"
            id="linkReconhecimentos"
            href="https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon">🏅</div>
            <div className="card-body">
              <h2>Reconhecimentos</h2>
              <p>Destaques, premiados e contribuições.</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>
        </section>
      </main>

      <footer className="footer">
        <small>© 2025 Comitê de Manutenção JDI – PWA</small>
      </footer>
    </div>
  );
}
