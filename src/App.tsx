import React from "react";

/** ============ ÍCONES (inline) ============ */
type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };
const BaseIcon = ({ size = 28, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  />
);

const ChatIcon = (p: IconProps) => (
  <BaseIcon {...p}>
    <path d="M21 15a4 4 0 0 1-4 4H8l-4 3v-3a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h13a4 4 0 0 1 4 4z" />
    <path d="M7 8h10M7 12h7" />
  </BaseIcon>
);

const BarChartIcon = (p: IconProps) => (
  <BaseIcon {...p}>
    <path d="M3 3v18h18" />
    <rect x="6" y="10" width="3" height="7" rx="1" />
    <rect x="11" y="6" width="3" height="11" rx="1" />
    <rect x="16" y="12" width="3" height="5" rx="1" />
  </BaseIcon>
);

const InfoIcon = (p: IconProps) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 10v6M12 7h.01" />
  </BaseIcon>
);

const FileIcon = (p: IconProps) => (
  <BaseIcon {...p}>
    <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
    <path d="M14 2v5h5" />
    <path d="M9 13h6M9 17h6M9 9h3" />
  </BaseIcon>
);

const CompassIcon = (p: IconProps) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="9" />
    <polygon points="14.5,9.5 11,13 9.5,14.5 11,11 14.5,9.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </BaseIcon>
);

const TargetIcon = (p: IconProps) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <path d="M12 2v3M22 12h-3M12 22v-3M2 12h3" />
  </BaseIcon>
);

const CheckBadgeIcon = (p: IconProps) => (
  <BaseIcon {...p}>
    <path d="M8 3h8l3 4v6l-3 4H8l-3-4V7z" />
    <path d="M9.5 12l2 2 3.5-4" />
  </BaseIcon>
);

const FolderIcon = (p: IconProps) => (
  <BaseIcon {...p}>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </BaseIcon>
);

const MedalIcon = (p: IconProps) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="13" r="4" />
    <path d="M8 3l4 6 4-6" />
    <path d="M10 17l-2 4M14 17l2 4" />
  </BaseIcon>
);
/** ============ FIM ÍCONES ============ */

/** Caminhos dos LOGOS (ajuste para os arquivos que já estão no seu projeto) */
const ASSETS = {
  LOGO_COMITE: "/logo-comite.png", // ⟵ use o mesmo arquivo/path que você já tinha
  LOGO_FEMSA: "/logo-femsa.png",   // ⟵ idem
};

/** COLE SEUS LINKS REAIS (precisam começar com https://) */
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
  color: string;
};

const CARDS: Card[] = [
  { title: "DDM’S", desc: "Diálogos de Manutenção", link: LINKS.DDMS, Icon: ChatIcon, color: "#0ea5e9" }, // azul
  { title: "OKR DE MANUTENÇÃO (FECHAMENTOS)", desc: "Pasta de Fechamentos", link: LINKS.FECHAMENTOS, Icon: BarChartIcon, color: "#d70000" }, // vermelho FEMSA
  { title: "INFORMATIVOS", desc: "Informativos sobre as rotinas de manutenção", link: LINKS.INFORMATIVOS, Icon: InfoIcon, color: "#111827" }, // grafite
  { title: "ONE PAGER", desc: "Resumo dos principais indicadores de manutenção", link: LINKS.ONE_PAGER, Icon: FileIcon, color: "#d97706" }, // âmbar
  { title: "PAPÉIS & RESPONSABILIDADES", desc: "Papéis e responsabilidades conforme MOM", link: LINKS.PAPEIS_RESP, Icon: CompassIcon, color: "#6366f1" }, // índigo
  { title: "TREINAMENTOS", desc: "Materiais e trilhas", link: LINKS.TREINAMENTOS, Icon: TargetIcon, color: "#16a34a" }, // verde
  { title: "CHECKLIST PÓS-PARTIDA", desc: "CIP/SETUP/PCM/Grandes Manutenções", link: LINKS.CHECKLIST_POS_PARTIDA, Icon: CheckBadgeIcon, color: "#059669" }, // teal
  { title: "REGISTRO DE REUNIÕES DE ABERTURA DE PCM E PRESTAÇÃO DE CONTAS", desc: "Aberturas de PCM e Prestação de Contas", link: LINKS.REGISTRO_REUNIOES_PCM_PRESTACAO, Icon: FolderIcon, color: "#6b7280" }, // cinza
  { title: "RECONHECIMENTOS", desc: "Áreas reconhecidas por atingimento de meta", link: LINKS.RECONHECIMENTOS, Icon: MedalIcon, color: "#b45309" }, // dourado escuro
];

export default function App() {
  return (
    <main className="page">
      <header className="header">
        <div className="badge">
          <img src={ASSETS.LOGO_COMITE} alt="Comitê de Manutenção" className="badge-img" />
        </div>
        {/* Título sem trocar sua fonte — herda do site */}
        <h1 className="title">COMITÊ DE MANUTENÇÃO • JDI</h1>
      </header>

      <section className="grid">
        {CARDS.map(({ title, desc, link, Icon, color }) => (
          <article key={title} className="card">
            <div className="card-header">
              <div className="icon-box" style={{ color }} aria-hidden="true">
                <Icon />
              </div>
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

      <footer className="footer">
        <span>© 2025 Comitê de Manutenção Jundiaí —</span>
        <img src={ASSETS.LOGO_FEMSA} alt="Coca-Cola FEMSA" className="footer-logo" />
      </footer>
    </main>
  );
}
