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

/* ----------------------------- URLs (1 linha cada!) ----------------------------- */
const URLS = {
  registro: "https://forms.office.com/r/mt0JTBJiK6?origin=lprLink",
  checklist: "https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink",
  ddms: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/DDM%C2%B4S?csf=1&web=1&e=kXfLLD",
  programacao: "https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PAINEL%20DISTRIBUI%C3%87%C3%83O%20DE%20HORAS?csf=1&web=1&e=Ye4Wad",
  distribuicao: "https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PROGRAMA%C3%87%C3%83O%20PRE%20PCM?csf=1&web=1&e=LYYchz",
  okr: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS?csf=1&web=1&e=e0QIRb",
  informativos: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/INFORMATIVOS?csf=1&web=1&e=dy3e4Y",
  papeis: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/PAP%C3%89IS%20E%20RESPONSABILIDADES?csf=1&web=1&e=C529Nu",
  onepager: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/ONE%20PAGER?csf=1&web=1&e=mTBbo1",
  treinamentos: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/TREINAMENTOS?csf=1&web=1&e=RYgJ70",
  reconhecimentos: "https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink",
} as const;

/* ----------------------------- MENU (Drawer) ----------------------------- */
const MENU = [
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

/* --------------------------- CARDS (Conteúdo) ---------------------------- */
type Card = { id: string; title: string; subtitle: string; href: string; Icon: React.ComponentType<any>; };

const CARDS: Card[] = [
  { id: "registro",       title: "REGISTRO DE REUNIÕES DE ABERTURA DE PCM E PRESTAÇÃO DE CONTAS", subtitle: "Aberturas de PCM e Prestação de Contas", href: URLS.registro,       Icon: IconRegistroPCM },
  { id: "checklist",      title: "CHECKLIST PÓS-PARTIDA",                                          subtitle: "CIP/SETUP/PCM/Grandes Manutenções",     href: URLS.checklist,      Icon: IconChecklist },
  { id: "ddms",           title: "DDM’S",                                                          subtitle: "Diálogos de Manutenção",                href: URLS.ddms,           Icon: IconDDM },
  { id: "programacao",    title: "PROGRAMAÇÃO DE PCM",                                             subtitle: "Planejamento semanal das manutenções preventivas", href: URLS.programacao, Icon: IconChecklist },
  { id: "distribuicao",   title: "PAINEL DE DISTRIBUIÇÃO DE HORAS",                                subtitle: "Acompanhamento da alocação de horas PCM", href: URLS.distribuicao,  Icon: IconOKR },
  { id: "okr",            title: "OKR DE MANUTENÇÃO",                                              subtitle: "Fechamentos",                             href: URLS.okr,            Icon: IconOKR },
  { id: "informativos",   title: "INFORMATIVOS",                                                   subtitle: "Informativos sobre as rotinas de manutenção", href: URLS.informativos, Icon: IconInfo },
  { id: "papeis",         title: "PAPÉIS & RESPONSABILIDADES",                                     subtitle: "Papéis e responsabilidades conforme MOM", href: URLS.papeis,        Icon: IconPapeis },
  { id: "onepager",       title: "ONE PAGER",                                                      subtitle: "Resumo dos principais indicadores de manutenção", href: URLS.onepager, Icon: IconOnePager },
  { id: "treinamentos",   title: "TREINAMENTOS",                                                   subtitle: "Sou novo na função de T2/téc. de Manutenção/T3 e agora?", href: URLS.treinamentos, Icon: IconTreinamentos },
  { id: "reconhecimentos",title: "RECONHECIMENTOS",                                                subtitle: "Áreas reconhecidas por atingimento de meta", href: URLS.reconhecimentos, Icon: IconReconhecimentos },
];

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ESC fecha o menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // trava scroll do body quando o drawer está aberto
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = drawerOpen ? "hidden" : original || "";
    return () => { document.body.style.overflow = original || ""; };
  }, [drawerOpen]);

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace(/^#/, "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
    setDrawerOpen(false);
  };

  return (
    <div className="app">
      {/* FAB (botão flutuante) */}
      <button className="fab-left" aria-label="Abrir menu de categorias" onClick={toggleDrawer(true)}>
        <span className="bar" /><span className="bar" /><span className="bar" />
      </button>

      {/* Overlay + Drawer */}
      <div className={`drawer-overlay ${drawerOpen ? "show" : ""}`} onClick={toggleDrawer(false)} />
      <aside className={`drawer ${drawerOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Categorias">
        <div className="drawer-header">
          <strong>Categorias</strong>
          <button className="drawer-close" aria-label="Fechar menu" onClick={toggleDrawer(false)} title="Fechar">×</button>
        </div>
        <nav className="drawer-nav">
          {MENU.map(({ id, title, href, Icon }) => (
            <a key={id} href={href} className="drawer-link" onClick={(e) => handleNavClick(e, href)}>
              <span className="drawer-ico"><Icon /></span>
              <span>{title}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Topbar */}
      <header className="topbar">
        <div className="topbar-inner">
          <img className="logo-comite" src="/logo-comite.png" alt="Logo do Comitê" />
          <div className="title-chip" aria-label="Comitê de Manutenção JDI">COMITÊ DE MANUTENÇÃO • JDI</div>
          <img className="logo-femsa" src="/logo-femsa.png" alt="Coca-Cola FEMSA" />
        </div>
      </header>

      {/* Conteúdo */}
      <main className="container">
        <section className="grid">
          {CARDS.map(({ id, href, title, subtitle, Icon }) => (
            <React.Fragment key={id}>
              <div id={id} className="anchor-fix" />
              <a className="card" href={href} target="_blank" rel="noopener noreferrer">
                <div className="card-icon"><Icon /></div>
                <div className="card-body">
                  <h2>{title}</h2>
                  <p>{subtitle}</p>
                </div>
                <div className="card-cta">Abrir</div>
              </a>
            </React.Fragment>
          ))}
        </section>
      </main>

      <footer className="footer">
        <small>© 2025 COMITÊ DE MANUTENÇÃO JDI — FEMSA</small>
      </footer>
    </div>
  );
}

