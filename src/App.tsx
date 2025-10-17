import React from "react";
import {
  ChatIcon,
  BarChartIcon,
  InfoIcon,
  FileIcon,
  CompassIcon,
  TargetIcon,
  CheckBadgeIcon,
  FolderIcon,
  MedalIcon,
} from "./components/icons";

/** COLE SEUS LINKS REAIS ABAIXO (precisam começar com https://) */
const LINKS = {
  DDMS: "https://COLE_AQUI",
  FECHAMENTOS: "https://COLE_AQUI", // OKR de Manutenção (Fechamentos)
  INFORMATIVOS: "https://COLE_AQUI",
  ONE_PAGER: "https://COLE_AQUI",
  PAPEIS_RESP: "https://COLE_AQUI",
  TREINAMENTOS: "https://COLE_AQUI",
  CHECKLIST_POS_PARTIDA: "https://COLE_AQUI",
  REGISTRO_REUNIOES_PCM_PRESTACAO: "https://COLE_AQUI",
  RECONHECIMENTOS: "https://COLE_AQUI",
} as const;

function safeOpen(url: string) {
  if (!url || !url.startsWith("http")) {
    alert("Link inválido. Verifique se começa com https://");
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

type Card = {
  title: string;
  desc: string;
  link: string;
  Icon: React.FC<{ size?: number }>;
};

const
