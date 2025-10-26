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

/* ------------------------------------------------------------------ */
/* Itens de menu (drawer) – com ícones e âncoras para rolar até a seção */
const MENU = [
  {
    id: "registro",
    title: "Registro de Reuniões / Prestação de Contas",
    href: "#registro",
    Icon: IconRegistroPCM,
  },
  {
    id: "checklist",
    title: "Checklist Pós-Partida",
    href: "#checklist",
    Icon: IconChecklist,
  },
  { id: "ddms", title: "DDM’s", href: "#ddms", Icon: IconDDM },
  {
    id: "programacao",
    title: "Programação de PCM",
    href: "#programacao",
    Icon: IconChecklist,
  },
  {
    id: "distribuicao",
    title: "Painel de Distribuição de Horas",
    href: "#distribuicao",
    Icon: IconOKR,
  },
  { id: "okr", title: "OKR de Manutenção", href: "#okr", Icon: IconOKR },
  { id: "informativos", title: "Informativos", href: "#informativos", Icon: IconInfo },
  {
    id: "papeis",
    title: "Papéis & Responsabilidades",
    href: "#papeis",
    Icon: IconPapeis,
  },
  { id: "onepager", title: "One Pager", href: "#onepager", Icon: IconOnePager },
  {
    id: "treinamentos",
    title: "Treinamentos",
    href: "#treinamentos",
    Icon: IconTreinamentos,
  },
  {
    id: "reconhecimentos",
    title: "Reconhecimentos",
    href: "#reconhecimentos",
    Icon: IconReconhecimentos,
  },
];

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  return (
    <div className="app">
      {/* ===== BOTÃO SANDUÍCHE (flutuante no canto) ===== */}
      <button
        className="fab-menu"
        aria-label="Abrir menu de categorias"
        onClick={toggleDrawer(true)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* ===== DRAWER (menu lateral) ===== */}
      <div
        className={`drawer-scrim ${drawerOpen ? "open" : ""}`}
        onClick={toggleDrawer(false)}
      />
      <aside className={`drawer ${drawerOpen ? "open" : ""}`} role="dialog" aria-label="Categorias">
        <div className="drawer-header">
          <strong>Categorias</strong>
          <button
            className="drawer-close"
            aria-label="Fechar menu"
            onClick={toggleDrawer(false)}
            title="Fechar"
          >
            ×
          </button>
        </div>

        <nav className="drawer-nav">
          {MENU.map(({ id, title, href, Icon }) => (
            <a
              key={id}
              className="drawer-link"
              href={href}
              onClick={toggleDrawer(false)}
            >
              <span className="drawer-ico">
                <Icon />
              </span>
              <span className="drawer-text">{title}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* ===== CABEÇALHO – COMITÊ (esq) • Título (centro) • FEMSA (dir) ===== */}
      <header className="topbar">
        <div className="topbar-inner">
          <img className="logo-comite" src="/logo-comite.png" alt="Logo do Comitê" />

          <div className="title-chip" aria-label="Comitê de Manutenção JDI">
            <span>COMITÊ DE MANUTENÇÃO • JDI</span>
          </div>

          <img className="logo-femsa" src="/logo-femsa.png" alt="Coca-Cola FEMSA" />
        </div>
      </header>

      {/* ===== CONTEÚDO ===== */}
      <main className="container">
        <section className="grid">

          {/* 1) REGISTRO */}
          <div id="registro" />
          <a
            className="card"
            id="linkRegistroPrestacao"
            href="https://forms.office.com/r/mt0JTBJiK6?origin=lprLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconRegistroPCM /></div>
            <div className="card-body">
              <h2>REGISTRO DE REUNIÕES DE ABERTURA DE PCM E PRESTAÇÃO DE CONTAS</h2>
              <p>Aberturas de PCM e Prestação de Contas</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 2) CHECKLIST */}
          <div id="checklist" />
          <a
            className="card"
            id="linkChecklistPartida"
            href="https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconChecklist /></div>
            <div className="card-body">
              <h2>CHECKLIST PÓS-PARTIDA</h2>
              <p>CIP/SETUP/PCM/Grandes Manutenções</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 3) DDM’s */}
          <div id="ddms" />
          <a
            className="card"
            id="linkDDM"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/DDM%C2%B4S?csf=1&web=1&e=kXfLLD"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconDDM /></div>
            <div className="card-body">
              <h2>DDM’S</h2>
              <p>Diálogos de Manutenção</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 4) PROGRAMAÇÃO DE PCM */}
          <div id="programacao" />
          <a
            className="card"
            id="linkProgramacaoPCM"
            href="https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PAINEL%20DISTRIBUI%C3%87%C3%83O%20DE%20HORAS?csf=1&web=1&e=Ye4Wad"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconChecklist /></div>
            <div className="card-body">
              <h2>PROGRAMAÇÃO DE PCM</h2>
              <p>Planejamento semanal das manutenções preventivas</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 5) PAINEL DE DISTRIBUIÇÃO DE HORAS */}
          <div id="distribuicao" />
          <a
            className="card"
            id="linkPainelHoras"
            href="https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PROGRAMA%C3%87%C3%83O%20PRE%20PCM?csf=1&web=1&e=LYYchz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconOKR /></div>
            <div className="card-body">
              <h2>PAINEL DE DISTRIBUIÇÃO DE HORAS</h2>
              <p>Acompanhamento da alocação de horas PCM</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 6) OKR DE MANUTENÇÃO */}
          <div id="okr" />
          <a
            className="card"
            id="linkOKR"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS?csf=1&web=1&e=e0QIRb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconOKR /></div>
            <div className="card-body">
              <h2>OKR DE MANUTENÇÃO</h2>
              <p>Fechamentos</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* INFORMATIVOS */}
          <div id="informativos" />
          <a
            className="card"
            id="linkInformativos"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/INFORMATIVOS?csf=1&web=1&e=dy3e4Y"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconInfo /></div>
            <div className="card-body">
              <h2>INFORMATIVOS</h2>
              <p>Informativos sobre as rotinas de manutenção</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* PAPÉIS & RESPONSABILIDADES */}
          <div id="papeis" />
          <a
            className="card"
            id="linkPapeis"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/PAP%C3%89IS%20E%20RESPONSABILIDADES?csf=1&web=1&e=C529Nu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconPapeis /></div>
            <div className="card-body">
              <h2>PAPÉIS &amp; RESPONSABILIDADES</h2>
              <p>Papéis e responsabilidades conforme MOM</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* ONE PAGER */}
          <div id="onepager" />
          <a
            className="card"
            id="linkOnePager"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/ONE%20PAGER?csf=1&web=1&e=mTBbo1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconOnePager /></div>
            <div className="card-body">
              <h2>ONE PAGER</h2>
              <p>Resumo dos principais indicadores de manutenção</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* TREINAMENTOS */}
          <div id="treinamentos" />
          <a
            className="card"
            id="linkTreinamentos"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/TREINAMENTOS?csf=1&web=1&e=RYgJ70"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconTreinamentos /></div>
            <div className="card-body">
              <h2>TREINAMENTOS</h2>
              <p>Sou novo na função de T2/téc. de Manutenção/T3 e agora?</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* RECONHECIMENTOS */}
          <div id="reconhecimentos" />
          <a
            className="card"
            id="linkReconhecimentos"
            href="https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconReconhecimentos /></div>
            <div className="card-body">
              <h2>RECONHECIMENTOS</h2>
              <p>Áreas reconhecidas por atingimento de meta</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

        </section>
      </main>

      <footer className="footer">
        <small>© 2025 COMITÊ DE MANUTENÇÃO JDI — FEMSA</small>
      </footer>
    </div>
  );
}
