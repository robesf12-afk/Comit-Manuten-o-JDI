// src/App.tsx
import React, { useState } from "react";
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

/* ========= BANNERS – edite aqui quando quiser ========= */
const BANNERS: Array<{ src: string; href?: string; alt: string }> = [
  {
    src: "/banners/banner-programacao.png",
    href:
      "https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PAINEL%20DISTRIBUI%C3%87%C3%83O%20DE%20HORAS?csf=1&web=1&e=Ye4Wad",
    alt: "Programação de PCM da semana",
  },
  {
    src: "/banners/banner-okr.png",
    href:
      "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS?csf=1&web=1&e=e0QIRb",
    alt: "OKR de Manutenção - Fechamentos",
  },
  // { src: "/banners/banner-sem-link.png", alt: "Aviso interno" },
];

/* ========= MENU com ícones =========
   Cada item recebe: label, href, e o componente de ícone.
*/
type NavItem = {
  label: string;
  href: string;
  Icon: React.ComponentType<any>;
};

const NAV: NavItem[] = [
  {
    label: "REGISTRO DE REUNIÕES DE ABERTURA DE PCM E PRESTAÇÃO DE CONTAS",
    href: "https://forms.office.com/r/mt0JTBJiK6?origin=lprLink",
    Icon: IconRegistroPCM,
  },
  {
    label: "CHECKLIST PÓS-PARTIDA",
    href: "https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink",
    Icon: IconChecklist,
  },
  {
    label: "DDM’S",
    href:
      "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/DDM%C2%B4S?csf=1&web=1&e=kXfLLD",
    Icon: IconDDM,
  },
  {
    label: "PROGRAMAÇÃO DE PCM",
    href:
      "https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PAINEL%20DISTRIBUI%C3%87%C3%83O%20DE%20HORAS?csf=1&web=1&e=Ye4Wad",
    Icon: IconChecklist,
  },
  {
    label: "PAINEL DE DISTRIBUIÇÃO DE HORAS",
    href:
      "https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PROGRAMA%C3%87%C3%83O%20PRE%20PCM?csf=1&web=1&e=LYYchz",
    Icon: IconOKR,
  },
  {
    label: "OKR DE MANUTENÇÃO",
    href:
      "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS?csf=1&web=1&e=e0QIRb",
    Icon: IconOKR,
  },
  {
    label: "INFORMATIVOS",
    href:
      "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/INFORMATIVOS?csf=1&web=1&e=dy3e4Y",
    Icon: IconInfo,
  },
  {
    label: "PAPÉIS & RESPONSABILIDADES",
    href:
      "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/PAP%C3%89IS%20E%20RESPONSABILIDADES?csf=1&web=1&e=C529Nu",
    Icon: IconPapeis,
  },
  {
    label: "ONE PAGER",
    href:
      "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/ONE%20PAGER?csf=1&web=1&e=mTBbo1",
    Icon: IconOnePager,
  },
  {
    label: "TREINAMENTOS",
    href:
      "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/TREINAMENTOS?csf=1&web=1&e=RYgJ70",
    Icon: IconTreinamentos,
  },
  {
    label: "RECONHECIMENTOS",
    href: "https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink",
    Icon: IconReconhecimentos,
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      {/* FAB: abre o menu (três risquinhos) */}
      <button
        className="fab-menu"
        aria-label="Abrir menu"
        onClick={() => setMenuOpen(true)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Cabeçalho (mesma estética) */}
      <header className="topbar">
        <div className="topbar-inner">
          <img className="logo-comite" src="/logo-comite.png" alt="Logo do Comitê" />
          <div className="title-chip" aria-label="Comitê de Manutenção JDI">
            <span>COMITÊ DE MANUTENÇÃO • JDI</span>
          </div>
          <img className="logo-femsa" src="/logo-femsa.png" alt="Coca-Cola FEMSA" />
        </div>
      </header>

      {/* CAPA: só banners (sem grid de cards) */}
      <section className="banner-wrap" aria-label="Banners de destaque">
        <div className="banner-track">
          {BANNERS.map((b, i) =>
            b.href ? (
              <a
                key={i}
                className="banner-item"
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={b.src} alt={b.alt} />
              </a>
            ) : (
              <div key={i} className="banner-item">
                <img src={b.src} alt={b.alt} />
              </div>
            )
          )}
        </div>
      </section>

      {/* Drawer (menu lateral) com ícones + nomes */}
      <div
        className={`drawer-scrim ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />
      <aside className={`drawer ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="drawer-header">
          <strong>Menu</strong>
          <button
            className="drawer-close"
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
        </div>

        <nav className="drawer-nav">
          {NAV.map(({ label, href, Icon }) => (
            <a
              key={label}
              className="drawer-link"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <span className="drawer-ico"><Icon /></span>
              <span className="drawer-text">{label}</span>
            </a>
          ))}
        </nav>
      </aside>

      <footer className="footer">
        <small>© 2025 COMITÊ DE MANUTENÇÃO JDI — FEMSA</small>
      </footer>
    </div>
  );
}


       
           
      
