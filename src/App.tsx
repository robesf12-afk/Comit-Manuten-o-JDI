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

type MenuItem = { id: string; title: string; href: string; Icon: React.ComponentType<any> };

// ----------------------------- MENU (Drawer) -----------------------------
const MENU: MenuItem[] = [
  { id: "registro",        title: "Registro de Reuniões / Prestação de Contas", href: "#registro",        Icon: IconRegistroPCM },
  { id: "checklist",       title: "Checklist Pós-Partida",                      href: "#checklist",       Icon: IconChecklist },
  { id: "ddms",            title: "DDM’s",                                      href: "#ddms",            Icon: IconDDM },
  { id: "programacao",     title: "Programação de PCM",                         href: "#programacao",     Icon: IconChecklist },
  { id: "distribuicao",    title: "Painel de Distribuição de Horas",            href: "#distribuicao",    Icon: IconOKR },
  { id: "okr",             title: "OKR de Manutenção",                          href: "#okr",             Icon: IconOKR },
  { id: "informativos",    title: "Informativos",                                href: "#informativos",    Icon: IconInfo },
  { id: "papeis",          title: "Papéis & Responsabilidades",                  href: "#papeis",          Icon: IconPapeis },
  { id: "onepager",        title: "One Pager",                                   href: "#onepager",        Icon: IconOnePager },
  { id: "treinamentos",    title: "Treinamentos",                                href: "#treinamentos",    Icon: IconTreinamentos },
  { id: "reconhecimentos", title: "Reconhecimentos",                             href: "#reconhecimentos", Icon: IconReconhecimentos },
];

// --------------------------- CARDS (Conteúdo) ----------------------------
type Card = { id: string; title: string; subtitle: string; href: string; Icon: React.ComponentType<any> };

const CARDS: Card[] = [
  { id: "registro",        title: "REGISTRO DE REUNIÕES DE ABERTURA DE PCM E PRESTAÇÃO DE CONTAS", subtitle: "Aberturas de PCM e Prestação de Contas", href: "https://forms.office.com/r/mt0JTBJiK6?origin=lprLink", Icon: IconRegistroPCM },
  { id: "checklist",       title: "CHECKLIST PÓS-PARTIDA",                      subtitle: "CIP/SETUP/PCM/Grandes Manutenções", href: "https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink", Icon: IconChecklist },
  { id: "ddms",            title: "DDM’S",                                      subtitle: "Diálogos de Manutenção", href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/DDM%C2%B4S?csf=1&web=1&e=kXfLLD", Icon: IconDDM },
  { id: "programacao",     title: "PROGRAMAÇÃO DE PCM",                         subtitle: "Planejamento semanal das manutenções preventivas", href: "https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhado

      
