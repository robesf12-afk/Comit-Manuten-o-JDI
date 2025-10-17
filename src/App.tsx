import React from "react";

/** Substitua pelos seus links reais do Forms */
const LINK_ABERTURA = "https://forms.office.com/...";
const LINK_PARTIDA  = "https://forms.office.com/...";
const LINK_POS      = "https://forms.office.com/...";
const LINK_FECH     = "https://forms.office.com/...";

export default function App() {
  return (
    <div>
      {/* TOP BAR COM LOGO */}
      <div className="appbar">
        <div className="appbar-inner">
          <img
            className="app-logo"
            src="/logo-comite-512.png"
            alt="Logo do Comitê"
          />
          <div>
            <h1 className="app-title">Comitê de Manutenção JDI</h1>
            <p className="app-sub">Hub oficial • PCM • Checklists • OKR</p>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <a
              href={LINK_FECH}
              target="_blank"
              rel="noreferrer"
              className="btn"
              aria-label="Abrir OKR de Manutenção (Fechamentos)"
            >
              OKR
            </a>
          </div>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="container">
        {/* HERO */}
        <section className="hero" role="region" aria-label="Resumo">
          <h2>Bem-vinda, Roberta 👋</h2>
          <p>Todos os formulários e registros em um só lugar — visual limpo, rápido e padronizado.</p>
        </section>

        {/* SEÇÃO: OPERAÇÕES */}
        <section className="section" role="region" aria-label="Operações">
          <h3 className="section-title">
            Operações <span className="badge">PCM</span>
          </h3>

          <div className="grid">
            <a className="card" href={LINK_ABERTURA} target="_blank" rel="noreferrer">
              <div className="icon">📄</div>
              <div>
                <h3>Abertura</h3>
                <p>Formulário de abertura (PCM).</p>
              </div>
            </a>

            <a className="card" href={LINK_PARTIDA} target="_blank" rel="noreferrer">
              <div className="icon">🚀</div>
              <div>
                <h3>Check List de Partida</h3>
                <p>Verificação antes da partida.</p>
              </div>
            </a>

            <a className="card" href={LINK_POS} target="_blank" rel="noreferrer">
              <div className="icon">✅</div>
              <div>
                <h3>Check List Pós-Partida</h3>
                <p>Registro pós-execução.</p>
              </div>
            </a>

            <a className="card" href={LINK_FECH} target="_blank" rel="noreferrer">
              <div className="icon">📈</div>
              <div>
                <h3>Fechamentos</h3>
                <p>OKR DE MANUTENÇÃO (FECHAMENTOS)</p>
              </div>
            </a>
          </div>
        </section>

        {/* RODAPÉ */}
        <div className="footer">
          © {new Date().getFullYear()} Coca-Cola FEMSA • Fábrica Jundiaí — Comitê de Manutenção
        </div>
      </div>
    </div>
  );
}

