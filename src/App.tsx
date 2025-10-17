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

const CARDS: Card[] = [
  { title: "DDM’S", desc: "Diálogos de Manutenção", link: LINKS.DDMS, Icon: ChatIcon },
  {
    title: "OKR DE MANUTENÇÃO (FECHAMENTOS)",
    desc: "Pasta de Fechamentos",
    link: LINKS.FECHAMENTOS,
    Icon: BarChartIcon,
  },
  { title: "INFORMATIVOS", desc: "Informativos sobre as rotinas de manutenção", link: LINKS.INFORMATIVOS, Icon: InfoIcon },
  { title: "ONE PAGER", desc: "Resumo dos principais indicadores de manutenção", link: LINKS.ONE_PAGER, Icon: FileIcon },
  { title: "PAPÉIS & RESPONSABILIDADES", desc: "Papéis e responsabilidades conforme MOM", link: LINKS.PAPEIS_RESP, Icon: CompassIcon },
  { title: "TREINAMENTOS", desc: "Materiais e trilhas", link: LINKS.TREINAMENTOS, Icon: TargetIcon },
  { title: "CHECKLIST PÓS-PARTIDA", desc: "CIP/SETUP/PCM/Grandes Manutenções", link: LINKS.CHECKLIST_POS_PARTIDA, Icon: CheckBadgeIcon },
  {
    title: "REGISTRO DE REUNIÕES DE ABERTURA DE PCM E PRESTAÇÃO DE CONTAS",
    desc: "Aberturas de PCM e Prestação de Contas",
    link: LINKS.REGISTRO_REUNIOES_PCM_PRESTACAO,
    Icon: FolderIcon,
  },
  { title: "RECONHECIMENTOS", desc: "Áreas reconhecidas por atingimento de meta", link: LINKS.RECONHECIMENTOS, Icon: MedalIcon },
];

export default function App() {
  return (
    <main style={s.page}>
      <header style={s.header}>
        <div style={s.badge}><div style={s.badgeInner}>🛠️</div></div>
        <h1 style={s.title}>COMITÊ DE MANUTENÇÃO • JDI</h1>
      </header>

      <section style={s.grid}>
        {CARDS.map(({ title, desc, link, Icon }) => (
          <article key={title} style={s.card}>
            <div style={s.cardHeader}>
              <div style={s.iconBox} aria-hidden="true">
                <Icon />
              </div>
              <div>
                <h2 style={s.cardTitle}>{title}</h2>
                <p style={s.cardDesc}>{desc}</p>
              </div>
              <button
                style={s.openBtn}
                onClick={() => safeOpen(link)}
                aria-label={`Abrir ${title}`}
              >
                Abrir
              </button>
            </div>
          </article>
        ))}
      </section>

      <footer style={s.footer}>
        © 2025 Comitê de Manutenção Jundiaí — FEMSA
      </footer>
    </main>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: { m

