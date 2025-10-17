import React from "react";

/** ================================================
 *  LINKS REAIS DOS SEUS FORMULÁRIOS
 *  (substitua pelos seus links do Forms)
 *  ================================================ */
const LINK_ABERTURA = "https://forms.office.com/...";
const LINK_PARTIDA  = "https://forms.office.com/...";
const LINK_POS      = "https://forms.office.com/...";
const LINK_FECH     = "https://forms.office.com/...";

/** Tipo auxiliar para os cards */
type Item = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

/** ÍCONES SVG (inline, sem libs) */
const IconDoc = (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <path d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill="currentColor" opacity=".12" />
    <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M8 12h8M8 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconStart = (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="currentColor" opacity=".12" />
    <path d="M8 12h6M14 12l3-3m-3 3l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const IconChecklist = (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" rx="2" fill="currentColor" opacity=".12" />
    <path d="M8 9h8M8 13h6M8 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M6.5 9.5l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

const IconOkr = (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="currentColor" opacity=".12" />
    <path d="M6.5 15.5l3.5-3.5 2.5


