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

  // Fecha com ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setDrawerOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Trava o scroll do body quando o drawer está aberto
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = drawerOpen ? "hidden" : original || "";
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [drawerOpen]);

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  // Scroll suave mantendo hash na URL
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

  // Estilos mínimos inline (funciona mesmo sem CSS externo)
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
    fabBars: {
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
        transition: "transform .22s ease-out",
        zIndex: 1002,
        display: "flex",
        flexDirection: "column",
      } as React.CSSProperties),
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 14px 10px 16px",
      borderBottom: "1px solid #eee",
      gap: 10,
    } as React.CSSProperties,
    drawerCloseBtn: {
      background: "transparent",
      border: "none",
      color: "#333",
      cursor: "pointer",
      padding: 6,
      borderRadius: 8,
      fontSize: 20,
      lineHeight: 1,
    } as React.CSSProperties,
    drawerNav: {
      padding: "8px 6px 16px 6px",
      overflow: "auto",
    } as React.CSSProperties,
    drawerLink: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "12px 10px",
      borderRadius: 10,
      color: "#222",
      textDecoration: "none",
      outline: "none",
    } as React.CSSProperties,
    drawerIco: {
      width: 20,
      height: 20,
      display: "grid",
      placeItems: "center",
      color: "#cc0000",
      flexShrink: 0,
    } as React.CSSProperties,
    topbar: {
      position: "sticky",
      top: 0,
      zIndex: 2,
      background: "#fff",
      borderBottom: "1px solid #eee",
    } as React.CSSProperties,
    topbarInner: {
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      alignItems: "center",
      gap: 12,
      padding: "10px 12px",
    } as React.CSSProperties,
    titleChip: {
      textAlign: "center",
      fontWeight: 700,
      letterSpacing: 0.5,
    } as React.CSSProperties,
    container: {
      paddingBottom: 96,
    } as React.CSSProperties,
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: 12,
      padding: 12,
    } as React.CSSProperties,
    card: {
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      alignItems: "center",
      gap: 12,
      padding: 14,
      borderRadius: 12,
      background: "#fff",
      boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
      border: "1px solid #eee",
      textDecoration: "none",
      color: "inherit",
    } as React.CSSProperties,
    cardIcon: { width: 28, height: 28, display: "grid", placeItems: "center" } as React.CSSProperties,
    cardCta: {
      fontWeight: 700,
      color: "#cc0000",
      whiteSpace: "nowrap",
    } as React.CSSProperties,
    footer: {
      textAlign: "center",
      padding: "18px 8px 28px",
      color: "#666",
      fontSize: 12,
    } as React.CSSProperties,
    anchorFix: { position: "relative", top: -12 } as React.CSSProperties, // âncora antes do card
  };

  return (
    <div className="app">
      {/* ===== BOTÃO SANDUÍCHE (flutuante no canto esquerdo) ===== */}
      <button
        className="fab-menu"
        aria-label="Abrir menu de categorias"
        onClick={toggleDrawer(true)}
        style={styles.fab}
      >
        <span style={styles.fabBars} />
        <span style={styles.fabBars} />
        <span style={styles.fabBars} />
      </button>

      {/* ===== DRAWER (menu lateral) ===== */}
      <div
        className={`drawer-scrim ${drawerOpen ? "open" : ""}`}
        onClick={toggleDrawer(false)}
        style={styles.scrim(drawerOpen)}
      />
      <aside
        className={`drawer ${drawerOpen ? "open" : ""}`}
        role="dialog"
        aria-label="Categorias"
        aria-modal="true"
        style={styles.drawer(drawerOpen)}
      >
        <div className="drawer-header" style={styles.drawerHeader}>
          <strong>Categorias</strong>
          <button
            className="drawer-close"
            aria-label="Fechar menu"
            onClick={toggleDrawer(false)}
            title="Fechar"
            style={styles.drawerCloseBtn}
          >
            ×
          </button>
        </div>

        <nav className="drawer-nav" style={styles.drawerNav}>
          {MENU.map(({ id, title, href, Icon }) => (
            <a
              key={id}
              className="drawer-link"
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              style={styles.drawerLink}
            >
              <span className="drawer-ico" style={styles.drawerIco}>
                <Icon />
              </span>
              <span className="drawer-text">{title}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* ===== CABEÇALHO – COMITÊ (esq) • Título (centro) • FEMSA (dir) ===== */}
      <header className="topbar" style={styles.topbar}>
        <div className="topbar-inner" style={styles.topbarInner}>
          <img className="logo-comite" src="/logo-comite.png" alt="Logo do Comitê" />
          <div className="title-chip" aria-label="Comitê de Manutenção JDI" style={styles.titleChip}>
            <span>COMITÊ DE MANUTENÇÃO • JDI</span>
          </div>
          <img className="logo-femsa" src="/logo-femsa.png" alt="Coca-Cola FEMSA" />
        </div>
      </header>

      {/* ===== CONTEÚDO ===== */}
      <main className="container" style={styles.container}>
        <section className="grid" style={styles.grid}>
          {/* 1) REGISTRO */}
          <div id="registro" style={styles.anchorFix} />
          <a
            className="card"
            id="linkRegistroPrestacao"
            href="https://forms.office.com/r/mt0JTBJiK6?origin=lprLink"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.card}
          >
            <div className="card-icon" style={styles.cardIcon}><IconRegistroPCM /></div>
            <div className="card-body">
              <h2>REGISTRO DE REUNIÕES DE ABERTURA DE PCM E PRESTAÇÃO DE CONTAS</h2>
              <p>Aberturas de PCM e Prestação de Contas</p>
            </div>
            <div className="card-cta" style={styles.cardCta}>Abrir</div>
          </a>

          {/* 2) CHECKLIST */}
          <div id="checklist" style={styles.anchorFix} />
          <a
            className="card"
            id="linkChecklistPartida"
            href="https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.card}
          >
            <div className="card-icon" style={styles.cardIcon}><IconChecklist /></div>
            <div className="card-body">
              <h2>CHECKLIST PÓS-PARTIDA</h2>
              <p>CIP/SETUP/PCM/Grandes Manutenções</p>
            </div>
            <div className="card-cta" style={styles.cardCta}>Abrir</div>
          </a>

          {/* 3) DDM’s */}
          <div id="ddms" style={styles.anchorFix} />
          <a
            className="card"
            id="linkDDM"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/DDM%C2%B4S?csf=1&web=1&e=kXfLLD"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.card}
          >
            <div className="card-icon" style={styles.cardIcon}><IconDDM /></div>
            <div className="

