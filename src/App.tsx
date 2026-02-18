// src/App.tsx
import React, { useEffect, useState, useRef } from "react";
import { readDiagnostics, activatePush } from "./push";

import {
  IconOKR,
  IconDDM,
  IconOnePager,
  IconTreinamentos,
  IconPapeis,
  IconChecklist,
  IconRegistroPCM,
  IconReconhecimentos,
  // ❌ NÃO importa IconEscola aqui para não quebrar build caso não exista
} from "./icons";

/* Ícones locais extras */
const IconHelp: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path
      d="M9.7 9.5a2.8 2.8 0 0 1 5.1 1.6c0 2-2.6 2.3-2.6 3.9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="18" r="1.25" fill="currentColor" />
  </svg>
);

const IconDoc: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M14 3v5h5" stroke="currentColor" strokeWidth="2" />
    <path
      d="M9.5 12h5M9.5 15.5h5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const IconCost: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="8" cy="14" r="4.5" stroke="currentColor" strokeWidth="2" />
    <line
      x1="6.2"
      y1="13.2"
      x2="9.8"
      y2="13.2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="6.2"
      y1="15.6"
      x2="9.8"
      y2="15.6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="17" cy="7" r="2" stroke="currentColor" strokeWidth="2" />
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="17" y1="2.6"
