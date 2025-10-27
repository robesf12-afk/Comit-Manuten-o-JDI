// src/App.tsx
import React, { useEffect, useState } from "react";
import {
  IconOKR,
  IconDDM,
  IconOnePager,
  IconTreinamentos,
  IconPapeis,
  IconInfo,
  IconChecklist,
  IconRegistroPCM,
  IconReconhecimentos,
} from "./icons";

/* ===== Links das pastas/destinos ===== */
const LINKS = {
  okr: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS?csf=1&web=1&e=e0QIRb",
  ddm: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/DDM%C2%B4S?csf=1&web=1&e=kXfLLD",
  onepager:
    "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/ONE%20PAGER?csf=1&web=1&e=mTBbo1",
  treinamentos:
    "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/TREINAMENTOS?csf=1&web=1&e=RYgJ70",
  papeis:
    "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/PAP%C3%89IS%20E%20RESPONSABILIDADES?csf=1&web=1&e=C529Nu",
  informativos:
    "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/INFORMATIVOS?csf=1&web=1&e=dy3e4Y",
  checklist: "https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink",
  registro: "https://forms.office.com/r/mt0JTBJiK6?origin=lprLink",
  reconhecimentos: "https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink",
} as const;

/* ===== Itens do menu lateral (com ícones) =====
   Ordem e nomes conforme solicitado */
const MENU = [
  {
    id: "registro",
    title: "Registro de reuniões Abertura de PCM e Prestação de Contas",
    url: LINKS.registro,
    Icon: IconRegistroPCM,
  },
  {
    id: "checklist",
    title: "Registro Check List Pós Partida de PCM",
    url: LINKS.checklist,
    Icon: IconChecklist,
  },
  { id: "ddms", title: "DDM's", url: LINKS.ddm, Icon: IconDDM },
  {
    id: "okr",
    title: "OKR de Manutenção (Fechamentos)",
    url: LINKS.okr,
    Icon: IconOKR,
  },
  { id: "onepager", title: "One Pager", url: LINKS.onepager, Icon: IconOnePager },
  { id: "treinamentos", title: "Treinamentos", url: LINKS.treinamentos, Icon: IconTreinamentos },
  { id: "papeis", title: "Papéis e Responsabilidades", url: LINKS.papeis, Icon: IconPapeis },
  { id: "reconhecimentos", title: "Reconhecimentos", url: LINKS.reconhecimentos, Icon: IconReconhecimentos },
  { id: "informativos", title: "Informativos", url: LINKS.informativos, Icon: IconInfo },
];

/* ===== Banners (por enquanto só 1) ===== */
const BANNERS = [{ id: "okr", img: "/banner-reconhecimentos.png", url: LINKS.okr }];

export default function App() {
  const [open, setOpen] = useState(false);

  // trava scroll com menu aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // ESC fecha
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="app">
      {/* ===== Topbar vermelha com logos ===== */}
      <header
        className="topbar"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#cc0000",
          padding: "10px 16px",
          boxShadow: "0 6px 18px rgba(0,0,0,.15)",
        }}
      >
        <div
          className="topbar-inner"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "120px 1fr 120px",
            alignItems: "center",
            gap: 12,
          }}
        >
          <img
            src="/logo-comite.png"
            alt="Comitê de Manutenção JDI"
            style={{ height: 56, objectFit: "contain" }}
            className="logo-comite"
          />
          <div
            className="title-chip"
            aria-label="Comitê de Manutenção JDI"
            style={{
              color: "#fff",
              fontWeight: 800,
              textAlign: "center",
              padding: "10px 14px",
              borderRadius: 999,
              background: "rgba(255,255,255,.12)",
              letterSpacing: 0.5,
            }}
          >
            COMITÊ DE MANUTENÇÃO • JDI
          </div>
          <img
            src="/logo-femsa.png"
            alt="Coca-Cola FEMSA"
            style={{ height: 56, objectFit: "contain", justifySelf: "end" }}
            className="logo-femsa"
          />
        </div>
      </header>

      {/* ===== Botão sanduíche (topo, vermelho – lado esquerdo) ===== */}
      <button
        className="fab-top"
        aria-label="Abrir menu"
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          top: 14,
          left: 14, // <- lado esquerdo
          zIndex: 101,
          width: 52,
          height: 52,
          border: "none",
          borderRadius: 9999,
          background: "#cc0000",
          color: "#fff",
          boxShadow: "0 6px 18px rgba(0,0,0,.25)",
          display: "grid",
          placeItems: "center",
          cursor: "pointer",
        }}
      >
        <span style={{ width: 22, height: 2, background: "#fff", margin: 2, borderRadius: 2, display: "block" }} />
        <span style={{ width: 22, height: 2, background: "#fff", margin: 2, borderRadius: 2, display: "block" }} />
        <span style={{ width: 22, height: 2, background: "#fff", margin: 2, borderRadius: 2, display: "block" }} />
      </button>

      {/* ===== Overlay + Drawer ===== */}
      <div
        className={`drawer-overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,.35)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .2s ease",
          zIndex: 100,
        }}
      />
      <aside
        className={`drawer ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Categorias"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100dvh",
          width: 320,
          maxWidth: "86vw",
          background: "#fff",
          boxShadow: "4px 0 24px rgba(0,0,0,.18)",
          transform: open ? "translateX(0)" : "translateX(-102%)",
          transition: "transform .22s ease-out",
          zIndex: 102,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="drawer-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 14px 10px 16px",
            borderBottom: "1px solid #eee",
          }}
        >
          <strong style={{ fontSize: 18 }}>Categorias</strong>
          <button
            className="drawer-close"
            onClick={() => setOpen(false)}
            style={{ background: "transparent", border: "none", fontSize: 22, cursor: "pointer" }}
            aria-label="Fechar menu"
            title="Fechar"
          >
            ×
          </button>
        </div>

        <nav className="drawer-nav" style={{ padding: "8px 6px 16px 6px", overflow: "auto" }}>
          {MENU.map(({ id, title, url, Icon }) => (
            <a
              key={id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="drawer-link"
              onClick={() => setOpen(false)}
              style={{
                display: "grid",
                gridTemplateColumns: "26px 1fr",
                alignItems: "center",
                gap: 12,
                padding: "12px 10px",
                borderRadius: 10,
                color: "#222",
                textDecoration: "none",
              }}
            >
              <span className="drawer-ico" style={{ color: "#cc0000", display: "grid", placeItems: "center" }}>
                <Icon />
              </span>
              <span>{title}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* ===== Conteúdo: Banner central ===== */}
      <main
        className="banners-container"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22, padding: "24px 16px 40px" }}
      >
        {BANNERS.map(({ id, img, url }) => (
          <a key={id} href={url} target="_blank" rel="noopener noreferrer" style={{ width: "100%" }}>
            <img
              className="banner"
              src={img}
              alt={id}
              style={{
                width: "100%",
                maxWidth: 1200,
                borderRadius: 16,
                boxShadow: "0 4px 12px rgba(0,0,0,.12)",
                display: "block",
                margin: "0 auto",
              }}
            />
          </a>
        ))}
      </main>
    </div>
  );
}
