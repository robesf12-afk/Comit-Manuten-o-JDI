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

  // Scroll suave manual (independe de CSS global). Mantém o # na URL.
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace(/^#/, "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Ajuste fino opcional (se houver topbar fixa com altura):
      // window.scrollBy({ top: -8, behavior: "instant" as ScrollBehavior }); // pode deixar comentado
      history.replaceState(null, "", `#${id}`);
    }
    setDrawerOpen(false);
  };

  /* Estilos inline mínimos para garantir funcionamento mesmo sem CSS externo.
     Se você já tem CSS (fab-menu, drawer, etc.), estes estilos apenas ajudam. */
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
    scrim: (open: boolean) => ({
      position: "fixed" as const,
      inset: 0,
      background: "rgba(0,0,0,0.35)",
      opacity: open ? 1 : 0,
      pointerEvents: open ? "auto" : "none",
      transition: "opacity .2s ease",
      zIndex: 1000,
    }),
    drawer: (open: boolean) => ({
      position: "fixed" as const,
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
      flexDirection: "column" as const,
    }),
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 14px 10px 16px",
      borderBottom: "1px solid #eee",
      gap: 10,
    },
    drawerCloseBtn: {
      background: "transparent",
      border: "none",
      color: "#333",
      c
