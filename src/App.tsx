// src/App.tsx
import React, { useEffect, useState } from "react";
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

/* ----------------------------- MENU (Drawer) ----------------------------- */
const MENU = [
  { id: "registro",       title: "Registro de Reuniões / Prestação de Contas", href: "#registro",       Icon: IconRegistroPCM },
  { id: "checklist",      title: "Checklist Pós-Partida",                      href: "#checklist",      Icon: IconChecklist },
  { id: "ddms",           title: "DDM’s",                                      href: "#ddms",           Icon: IconDDM },
  { id: "programacao",    title: "Programação de PCM",                         href: "#programacao",    Icon: IconChecklist },
  { id: "distribuicao",   title: "Painel de Distribuição de Horas",            href: "#distribuicao",   Icon: IconOKR },
  { id: "okr",            title: "OKR de Manutenção",                          href: "#okr",            Icon: IconOKR },
  { id: "informativos",   title: "Informativos",                                href: "#informativos",   Icon: IconInfo },
  { id: "papeis",         title: "Papéis & Responsabilidades",                  href: "#papeis",         Icon: IconPapeis },
  { id: "onepager",       title: "One Pager",                                   href: "#onepager",       Icon: IconOnePager },
  { id: "treinamentos",   title: "Treinamentos",                                href: "#treinamentos",   Icon: IconTreinamentos },
  { id: "reconhecimentos",title: "Reconhecimentos",                             href: "#reconhecimentos",Icon: IconReconhecimentos },
];

/* --------------------------- CARDS (Conteúdo) ---------------------------- */
type Card = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  Icon: React.ComponentType<any>;
};

const CARDS: Card[] = [
  {
    id: "registro",
    title: "REGISTRO DE REUNIÕES DE ABERTURA DE PCM E PRESTAÇÃO DE CONTAS",
    subtitle: "Aberturas de PCM e Prestação de Contas",
    href: "https://forms.office.com/r/mt0JTBJiK6?origin=lprLink",
    Icon: IconRegistroPCM,
  },
  {
    id: "checklist",
    title: "CHECKLIST PÓS-PARTIDA",
    subtitle: "CIP/SETUP/PCM/Grandes Manutenções",
    href: "https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink",
    Icon: IconChecklist,
  },
  {
    id: "ddms",
    title: "DDM’S",
    subtitle: "Diálogos de Manutenção",
    href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/DDM%C2%B4S?csf=1&web=1&e=kXfLLD",
    Icon: IconDDM,
  },
  {
    id: "programacao",
    title: "PROGRAMAÇÃO DE PCM",
    subtitle: "Planejamento semanal das manutenções preventivas",
    href: "https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PAINEL%20DISTRIBUI%C3%87%C3%83O%20DE%20HORAS?csf=1&web=1&e=Ye4Wad",
    Icon: IconChecklist,
  },
  {
    id: "distribuicao",
    title: "PAINEL DE DISTRIBUIÇÃO DE HORAS",
    subtitle: "Acompanhamento da alocação de horas PCM",
    href: "https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PROGRAMA%C3%87%C3%83O%20PRE%20PCM?csf=1&web=1&e=LYYchz",
    Icon: IconOKR,
  },
  {
    id: "okr",
    title: "OKR DE MANUTENÇÃO",
    subtitle: "Fechamentos",
    href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS?csf=1&web=1&e=e0QIRb",
    Icon: IconOKR,
  },
  {
    id: "informativos",
    title: "INFORMATIVOS",
    subtitle: "Informativos sobre as rotinas de manutenção",
    href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/INFORMATIVOS?csf=1&web=1&e=dy3e4Y",
    Icon: IconInfo,
  },
  {
    id: "papeis",
    title: "PAPÉIS & RESPONSABILIDADES",
    subtitle: "Papéis e responsabilidades conforme MOM",
    href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/PAP%C3%89IS%20E%20RESPONSABILIDADES?csf=1&web=1&e=C529Nu",
    Icon: IconPapeis,
  },
  {
    id: "onepager",
    title: "ONE PAGER",
    subtitle: "Resumo dos principais indicadores de manutenção",
    href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/ONE%20PAGER?csf=1&web=1&e=mTBbo1",
    Icon: IconOnePager,
  },
  {
    id: "treinamentos",
    title: "TREINAMENTOS",
    subtitle: "Sou novo na função de T2/téc. de Manutenção/T3 e agora?",
    href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/TREINAMENTOS?csf=1&web=1&e=RYgJ70",
    Icon: IconTreinamentos,
  },
  {
    id: "reconhecimentos",
    title: "RECONHECIMENTOS",
    subtitle: "Áreas reconhecidas por atingimento de meta",
    href: "https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink",
    Icon: IconReconhecimentos,
  },
];

/* --------------------------- Estilos mínimos ----------------------------- */
const styles = {
  fab: {
    position: "fixed" as const,
    left: 16,
    bottom: 16,
    zIndex: 1001,
    width: 52,
    height: 52,
    borderRadius: 9999,
    border: "none",
    background: "#cc0000",
    color: "#fff",
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  },
  bar: {
    width: 22,
    height: 2,
    background: "#fff",
    display: "block",
    borderRadius: 2,
    margin: "2px 0",
  },
  scrim: (open: boolean) =>
    ({
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.35)",
      opacity: open ? 1 : 0,
      pointerEvents: open ? "auto" : "none",
      transition: "opacity .2s ease",
      zIndex: 1000,
    } as React.CSSProperties),
  drawer: (open: boolean) =>
    ({
      position: "fixed",
      top: 0,
      left: 0,
      height: "100dvh",
      width: 300,
      maxWidth: "85vw",
      background: "#fff",
      boxShadow: "4px 0 24px rgba(0,0,0,0.18)",
      transform: open ? "translateX(0)" : "translateX(-102%)",
      transiti
