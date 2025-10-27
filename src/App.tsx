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

/* ===== Links ===== */
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

/* ===== Menu (ordem/nome que você pediu) ===== */
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

/* ===== Banner ===== */
const BANNERS = [{ id: "okr", img: "/banner-reconhecimentos.png", url: LINKS.okr }];

export default function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="app">
      {/* CSS fino pro header e pro banner no mobile */}
      <style>{`
        .topbar { position: sticky; top: 0; z-index: 100; background: #cc0000; padding: 8px 10px; box-shadow: 0 6px 18px rgba(0,0,0,.15); }
        .topbar-inner {
          max-width: 1200px; margin: 0 auto; display: grid; align-items: center; gap: 8px;
          grid-template-columns: auto 64px 1fr 92px; /* [botão] [logo comitê] [título] [femsa] */
        }
        .menu-btn {
          width: 44px; height: 44px; border: none; border-radius: 999px; background: #b80000; color: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,.25); display: grid; place-items: center; cursor: pointer;
        }
        .menu-btn .bar { width: 22px; height: 2px; background: #fff; margin: 2.5px 0; border-radius: 2px; display: block; }
        .logo-comite { height: 48px; object-fit: contain; }
        .logo-femsa { height: 44px; object-fit: contain; justify-self: end; }
        .title-chip {
          color: #fff; font-weight: 900; text-align: center; padding: 8px 12px; border-radius: 999px;
          background: rgba(255,255,255,.12); letter-spacing: .4px; white-space: nowrap;
          font-size: clamp(16px, 2.9vw, 28px); /* sempre numa linha, encolhe se preciso */
        }

        /* Mobile */
        @media (max-width: 480px) {
          .topbar-inner { grid-template-columns: auto 44px 1fr 64px; gap: 6px; }
          .logo-comite { height: 40px; }
          .logo-femsa { height: 36px; }
          .title-chip { font-size: clamp(14px, 4.2vw, 19px); padding: 6px 10px; }
        }

        /* Conteúdo/Banner */
        .banners-container { display: flex; flex-direction: column; align-items: center; gap: 22px; padding: 18px 12px 32px; }
        .banner { width: 100%; height: auto; max-width: 980px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,.12); display:block; }
        @media (max-width: 1024px) { .banner { max-width: 900px; } }
        @media (max-width: 768px)  { .banner { max-width: 100%; border-radius: 14px; } }
        @media (max-width: 420px)  { .banner { border-radius: 12px; } }

        /* Drawer */
        .drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.35); transition: opacity .2s ease; z-index: 100; }
        .drawer { position: fixed; top:0; left:0; height:100dvh; width:320px; max-width:86vw; background:#fff;
                  box-shadow:4px 0 24px rgba(0,0,0,.18); z-index:102; display:flex; flex-direction:column;
                  transition: transform .22s ease-out; }
        .drawer-header { display:flex; align-items:center; justify-content:space-between; padding:14px 14px 10px 16px; border-bottom:1px solid #eee; }
        .drawer-link { display:grid; grid-template-columns:26px 1fr; align-items:center; gap:12px; padding:12px 10px; border-radius:10px; color:#222; text-decoration:none; }
        .drawer-ico { color:#cc0000; display:grid; place-items:center; }
      `}</style>

      {/* ===== Topbar com botão integrado ===== */}
      <header className="topbar">
        <div className="topbar-inner">
          <button className="menu-btn" aria-label="Abrir menu" onClick={() => setOpen(true)}>
            <span className="bar" /><span className="bar" /><span className="bar" />
          </button>

          <img className="logo-comite" src="/logo-comite.png" alt="Comitê de Manutenção JDI" />

          <div className="title-chip" aria-label="Comitê de Manutenção JDI">
            COMITÊ DE MANUTENÇÃO • JDI
          </div>

          <img className="logo-femsa" src="/logo-femsa.png" alt="Coca-Cola FEMSA" />
        </div>
      </header>

      {/* ===== Overlay + Drawer ===== */}
      <div
        className="drawer-overlay"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        onClick={() => setOpen(false)}
      />
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Categorias"
        style={{ transform: open ? "translateX(0)" : "translateX(-102%)" }}
      >
        <div className="drawer-header">
          <strong style={{ fontSize: 18 }}>Categorias</strong>
          <button
            onClick={() => setOpen(false)}
            style={{ background: "transparent", border: "none", fontSize: 22, cursor: "pointer" }}
            aria-label="Fechar menu"
            title="Fechar"
          >
            ×
          </button>
        </div>

        <nav style={{ padding: "8px 6px 16px 6px", overflow: "auto" }}>
          {MENU.map(({ id, title, url, Icon }) => (
            <a
              key={id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="drawer-link"
              onClick={() => setOpen(false)}
            >
              <span className="drawer-ico"><Icon /></span>
              <span>{title}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* ===== Conteúdo: apenas o banner ===== */}
      <main className="banners-container">
        {BANNERS.map(({ id, img, url }) => (
          <a key={id} href={url} target="_blank" rel="noopener noreferrer" style={{ width: "100%" }}>
            <img className="banner" src={img} alt={id} />
          </a>
        ))}
      </main>
    </div>
  );
}
