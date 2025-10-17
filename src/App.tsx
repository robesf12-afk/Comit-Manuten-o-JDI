import React from "react";

/** ================================================
 *  LINKS REAIS DOS SEUS FORMULÁRIOS
 *  (substitua os "https://forms.office.com/..." pelos seus)
 *  ================================================ */
const LINK_ABERTURA   = "https://forms.office.com/..."       // Abertura PCM
const LINK_PARTIDA    = "https://forms.office.com/..."       // Check List de Partida
const LINK_POS        = "https://forms.office.com/..."       // Check List Pós-Partida
const LINK_FECH       = "https://forms.office.com/..."       // OKR de Manutenção (Fechamentos)

/** Tipo auxiliar para os cards */
type Item = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

/** ÍCONES SVG PROFISSIONAIS (inline, sem bibliotecas) */
const IconDoc = (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <path d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill="currentColor" opacity=".12"/>
    <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M8 12h8M8 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconStart = (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="currentColor" opacity=".12"/>
    <path d="M8 12h6M14 12l3-3m-3 3l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const IconChecklist = (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" rx="2" fill="currentColor" opacity=".12"/>
    <path d="M8 9h8M8 13h6M8 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M6.5 9.5l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

const IconOkr = (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="currentColor" opacity=".12"/>
    <path d="M6.5 15.5l3.5-3.5 2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none"/>
    <path d="M12 7v10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity=".6"/>
  </svg>
);

/** Listas de cards */
const operacoes: Item[] = [
  { title: "Abertura", description: "Formulário de abertura (PCM).", href: LINK_ABERTURA, icon: IconDoc },
  { title: "Check List de Partida", description: "Verificação antes da partida.", href: LINK_PARTIDA, icon: IconStart },
  { title: "Check List Pós-Partida", description: "Registro pós-execução.", href: LINK_POS, icon: IconChecklist },
  { title: "Fechamentos", description: "OKR DE MANUTENÇÃO (FECHAMENTOS)", href: LINK_FECH, icon: IconOkr },
];

export default function App() {
  return (
    <>
      {/* BARRA SUPERIOR COM LOGO NO TOPO */}
      <div className="appbar">
        <div className="appbar-inner">
          {/* ✅ usa o logo que você pediu, pequeno e elegante */}
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
              h


