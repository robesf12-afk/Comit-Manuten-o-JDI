import React from "react";
import {
  ChatIcon, BarChartIcon, InfoIcon, FileIcon,
  CompassIcon, TargetIcon, CheckBadgeIcon, FolderIcon, MedalIcon
} from "./icons";

/* MANTENHA os caminhos dos logos que já funcionam no seu projeto */
const ASSETS = {
  LOGO_COMITE: "/logo-comite.png",
  // FEMSA só no rodapé em texto, como estava (sem imagem no header)
};

/* Cole seus links reais (https://...) */
const LINKS = {
  DDMS: "https://COLE_AQUI",
  FECHAMENTOS: "https://COLE_AQUI",
  INFORMATIVOS: "https://COLE_AQUI",
  ONE_PAGER: "https://COLE_AQUI",
  PAPEIS_RESP: "https://COLE_AQUI",
  TREINAMENTOS: "https://COLE_AQUI",
  CHECKLIST_POS_PARTIDA: "https://COLE_AQUI",
  REGISTRO_REUNIOES_PCM_PRESTACAO: "https://COLE_AQUI",
  RECONHECIMENTOS: "https://COLE_AQUI",
} as const;

function safeOpen(url: string) {
  if (!url || !url.startsWith("http")) { alert("Link inválido. Verifique se começa com https://"); return; }
  window.open(url, "_blank", "noopener,noreferrer");
}

type Card = {
  title: string;
  desc: string;
  link: string;
  Icon: React.FC<{ size?: number }>;
  cssClass: string; // classe de cor do ícone
};

const CARDS: Card[] = [
  { title: "DDM’S", desc: "Diálogos de Manutenção", link: LINKS.DDMS, Icon: ChatIcon, cssClass: "icon--ddm" },
  { title: "OKR DE MANUTENÇÃO (FECHAMENTOS)", desc: "Pasta de Fechamentos", link: LINKS.FECHAMENTOS, Icon: BarChartIcon, cssClass: "icon--okr" },
  { title: "INFORMATIVOS", desc: "Informativos sobre as rotinas de manutenção", link: LINKS.INFORMATIVOS, Icon: InfoIcon, cssClass: "icon--info" },
  { title: "ONE PAGER", desc: "Resumo dos principais indicadores de manutenção", link: LINKS.ONE_PAGER, Icon: FileIcon, cssClass: "icon--onepager" },
  { title: "PAPÉIS & RESPONSABILIDADES", desc: "Papéis e responsabilidades conforme MOM", link: LINKS.PAPEIS_RESP, Icon: CompassIcon, cssClass: "icon--papeis" },
  { title: "TREINAMENTOS", desc: "Materiais e trilhas", link: LINKS.TREINAMENTOS, Icon: TargetIcon, cssClass: "icon--treinamentos" },
  { title: "CHECKLIST PÓS-PARTIDA", desc: "CIP/SETUP/PCM/Grandes Manutenções", link: LINKS.CHECKLIST_POS_PARTIDA, Icon: CheckBadgeIcon, cssClass: "icon--checklist" },
  { title: "REGISTRO DE REUNIÕES DE ABERTURA DE PCM E PRESTAÇÃO DE CONTAS", desc: "Aberturas de PCM e Prestação de Contas", link: LINKS.REGISTRO_REUNIOES_PCM_PRESTACAO, Icon: FolderIcon, cssClass: "icon--registro" },
  { title: "RECONHECIMENTOS", desc: "Áreas reconhecidas por atingimento de meta", link: LINKS.RECONHECIMENTOS, Icon: MedalIcon, cssClass: "icon--reconhec" },
];

export default function App() {
  return (
    <main className="page">
      {/* TOPO — exatamente como estava: logo do comitê + título */}
      <header className="header">
        <div className="badge">
          <img src={ASSETS.LOGO_COMITE} alt="Comitê de Manutenção" className="badge-img" />
        </div>
        <h1 className="title">COMITÊ DE MANUTENÇÃO • JDI</h1>
      </header>

      {/* CARDS */}
      <section className="grid">
        {CARDS.map(({ title, desc, link, Icon, cssClass }) => (
          <article key={title} className="card">
            <div className="card-header">
              {/* Ícone profissional, com cor — nada mais muda */}
              <span className={`icon-pro ${cssClass}`} aria-hidden="true">
                <Icon />
              </span>

              <div>
                <h2 className="card-title">{title}</h2>
                <p className="card-desc">{desc}</p>
              </div>

              <button className="open-btn" onClick={() => safeOpen(link)} aria-label={`Abrir ${title}`}>
                Abrir
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* RODAPÉ — texto simples, como no seu layout bom */}
      <footer className="footer">© 2025 Comitê de Manutenção Jundiaí — FEMSA</footer>
    </main>
  );
}

