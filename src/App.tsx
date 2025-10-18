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
      {/* CABEÇALHO – pílula vermelha + logos */}
      <header className="topbar">
        <div className="topbar-inner">
          <div className="title-chip" aria-label="Comitê de Manutenção JDI">
            <img className="chip-logo" src="/logo-comite.png" alt="Logo do Comitê" />
            <span>COMITÊ DE MANUTENÇÃO • JDI</span>
          </div>
          <img
