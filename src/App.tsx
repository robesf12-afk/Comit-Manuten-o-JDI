// src/App.tsx
import React, { useEffect, useState, useRef } from "react";
import {
  IconOKR,
  IconDDM,
  IconOnePager,
  IconTreinamentos,
  IconPapeis,
  IconChecklist,
  IconRegistroPCM,
  IconReconhecimentos,
} from "./icons";

/* ===== Ícones locais ===== */
const IconHelp: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M9.7 9.5a2.8 2.8 0 0 1 5.1 1.6c0 2-2.6 2.3-2.6 3.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="18" r="1.25" fill="currentColor" />
  </svg>
);
const IconDoc: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="2" />
    <path d="M14 3v5h5" stroke="currentColor" strokeWidth="2" />
    <path d="M9.5 12h5M9.5 15.5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IconCost: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="8" cy="14" r="4.5" stroke="currentColor" strokeWidth="2" />
    <line x1="6.2" y1="13.2" x2="9.8" y2="13.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="6.2" y1="15.6" x2="9.8" y2="15.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="17" cy="7" r="2" stroke="currentColor" strokeWidth="2" />
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="17" y1="2.6" x2="17" y2="1.6" />
      <line x1="17" y1="12.4" x2="17" y2="13.4" />
      <line x1="12.6" y1="7" x2="11.6" y2="7" />
      <line x1="21.4" y1="7" x2="22.4" y2="7" />
      <line x1="13.9" y1="3.9" x2="13.2" y2="3.2" />
      <line x1="20.8" y1="10.8" x2="21.5" y2="11.5" />
      <line x1="20.8" y1="3.2" x2="21.5" y2="2.5" />
      <line x1="13.9" y1="10.1" x2="13.2" y2="10.8" />
    </g>
  </svg>
);

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
  programacao:
    "https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PROGRAMA%C3%87%C3%83O%20PRE%20PCM?csf=1&web=1&e=abSPHT",
  painel:
    "https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PAINEL%20DISTRIBUI%C3%87%C3%83O%20DE%20HORAS?csf=1&web=1&e=VWusRL",
  duvidas:
    "https://forms.office.com/Pages/ResponsePage.aspx?id=QtWUcBU4gkyx1WkX0EQ89IvsP_YVPjJJhA-rzC2o4A5UQ0RMMlM0MVZKWFdVN01IMzlUSjBMWVZBSS4u",
  custo:
    "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/CUSTO%20DE%20MANUTEN%C3%87%C3%83O?csf=1&web=1&e=S0gfpV",
} as const;

/* ===== Menu ===== */
const MENU = [
  { id: "registro", title: "Registro de reuniões Abertura de PCM e Prestação de Contas", url: LINKS.registro, Icon: IconRegistroPCM },
  { id: "checklist", title: "Registro Check List Pós Partida de PCM", url: LINKS.checklist, Icon: IconChecklist },
  { id: "programacao", title: "Programação de PCM", url: LINKS.programacao, Icon: IconChecklist },
  { id: "painel", title: "Painel de Distribuição de Horas", url: LINKS.painel, Icon: IconOKR },

  { id: "ddms", title: "DDM's", url: LINKS.ddm, Icon: IconDDM },
  { id: "okr", title: "OKR de Manutenção (Fechamentos)", url: LINKS.okr, Icon: IconOKR },
  { id: "custo", title: "Custo de Manutenção", url: LINKS.custo, Icon: IconCost },

  { id: "onepager", title: "One Pager", url: LINKS.onepager, Icon: IconOnePager },
  { id: "treinamentos", title: "Treinamentos", url: LINKS.treinamentos, Icon: IconTreinamentos },
  { id: "papeis", title: "Papéis e Responsabilidades", url: LINKS.papeis, Icon: IconPapeis },
  { id: "reconhecimentos", title: "Reconhecimentos", url: LINKS.reconhecimentos, Icon: IconReconhecimentos },

  { id: "informativos", title: "Informativos", url: LINKS.informativos, Icon: IconDoc },
  { id: "duvidas", title: "Dúvidas e Sugestões sobre os processos de Manutenção", url: LINKS.duvidas, Icon: IconHelp },
];

// banners estáticos
const STATIC_FROM_FOLDER = [
  { img: "/banners_media/ASSERTIVIDADE.png" },
  { img: "/banners_media/quebra diaria.PNG" },
  { img: "/banners_media/quebra por linha.PNG" },
  { img: "/banners_media/ÁREAS.jpeg" },
];

export default function App() {
  const [open, setOpen] = useState(false);
  const [onePagers, setOnePagers] = useState<string[]>([]);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [bannerErro, setBannerErro] = useState<string | null>(null);

  const [isNarrow, setIsNarrow] = useState(true); // assume mobile na hidratação

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // detectar largura real do dispositivo
  useEffect(() => {
    if (typeof window !== "undefined") {
      const check = () => setIsNarrow(window.innerWidth <= 650);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    fetch("/banners_media/onepagers.json")
      .then((res) => {
        if (!res.ok) throw new Error("não achei onepagers.json");
        return res.json();
      })
      .then((data: string[]) => {
        const ordem = ["one pager fabrica.PNG", "one pager G1.PNG", "one pager G2.PNG", "one pager G3.PNG"];
        const ordenados = ordem.filter((n) => data.includes(n));
        const extras = data.filter((n) => !ordem.includes(n));
        setOnePagers([...ordenados, ...extras]);
        setBannerIndex(0);
      })
      .catch(() => setBannerErro("Não foi possível carregar o carrossel."));
  }, []);

  useEffect(() => {
    if (onePagers.length <= 1) return;
    const t = setInterval(() => setBannerIndex((p) => (p + 1) % onePagers.length), 5000);
    return () => clearInterval(t);
  }, [onePagers]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const min = 40;
    if (diff > min) setBannerIndex((p) => (p + 1) % onePagers.length);
    else if (diff < -min) setBannerIndex((p) => (p - 1 + onePagers.length) % onePagers.length);
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentOnePager = onePagers.length ? `/banners_media/${onePagers[bannerIndex]}` : null;

  const mobilePaddingTop = isNarrow ? 180 : 28; // ← AQUI manda mesmo

  return (
    <div className="app">
      <style>{`
        .topbar{
          position: sticky;
          top: 0;
          z-index: 100;
          background:#cc0000;
          box-shadow:0 6px 18px rgba(0,0,0,.15);
        }
        .topbar-inner{
          max-width:1200px;
          margin:0 auto;
          padding:6px 6px;
          display:grid;
          gap:6px;
          align-items:center;
          grid-template-columns:auto 58px 1fr 92px;
          position:relative;
        }
        .menu-btn{
          width:44px;height:44px;border:none;border-radius:999px;
          background:#b80000;color:#fff;
          display:grid;place-items:center;
          box-shadow:0 4px 12px rgba(0,0,0,.25);
          cursor:pointer;
        }
        .menu-btn .bar{width:22px;height:2px;background:#fff;margin:2.5px 0;border-radius:2px;}
        .logo-comite{height:46px;}
        .logo-femsa{height:44px;justify-self:end;}
        .title-chip{
          color:#fff;font-weight:900;text-align:center;
          background:rgba(255,255,255,.12);
          padding:8px 12px;border-radius:999px;
          white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
          font-size:clamp(16px, 2.7vw, 28px);
        }

        /* botão posicionado no mobile */
        @media (max-width:600px){
          .topbar-inner{
            grid-template-columns:40px 1fr auto;
            grid-template-areas:"logo title femsa";
            padding:6px 8px 18px;
          }
          .ga-logo{ grid-area:logo; height:32px; }
          .ga-title{ grid-area:title; }
          .ga-femsa{ grid-area:femsa; height:28px; }
          .menu-btn{
            position:absolute;
            left:8px;
            bottom:-26px;
            width:40px;height:40px;
            border-radius:12px;
            background:#cc0000;
            box-shadow:0 6px 14px rgba(0,0,0,.22), 0 0 0 2px rgba(255,255,255,.85);
            z-index:101;
          }
        }

        .banners-container{
          display:flex;
          flex-direction:column;
          gap:18px;
          padding:14px 12px 28px;
          align-items:center;
        }
        .banner-dinamico{
          width:100%;
          max-width:980px;
          border-radius:16px;
          box-shadow:0 4px 12px rgba(0,0,0,.12);
          background:#000;
          overflow:hidden;
        }
        .banner-dinamico img{
          width:100%;
          height:auto;
          display:block;
          touch-action:auto;
        }
        .banner-dots{
          display:flex;
          gap:6px;
          justify-content:center;
        }
        .banner-dot{
          width:9px;height:9px;border-radius:999px;background:#ddd;border:none;
        }
        .banner-dot.active{
          background:#cc0000;width:28px;
        }
        .static-banner{
          width:100%;
          max-width:980px;
          border-radius:14px;
          box-shadow:0 4px 10px rgba(0,0,0,.08);
          display:block;
        }

        .drawer-overlay{
          position:fixed;inset:0;background:rgba(0,0,0,.35);
          transition:opacity .2s ease;z-index:100;
        }
        .drawer{
          position:fixed;top:0;left:0;height:100dvh;width:320px;max-width:86vw;
          background:#fff;box-shadow:4px 0 24px rgba(0,0,0,.18);
          z-index:102;display:flex;flex-direction:column;
          transition:transform .22s ease-out;
        }
        .drawer-header{
          display:flex;align-items:center;justify-content:space-between;
          padding:14px 14px 10px 16px;border-bottom:1px solid #eee;
        }
        .drawer-link{
          display:grid;grid-template-columns:26px 1fr;gap:12px;
          align-items:center;padding:12px 10px;border-radius:10px;
          color:#222;text-decoration:none;
        }
        .drawer-ico{color:#cc0000;display:grid;place-items:center;}
      `}</style>

      {/* ===== Topbar ===== */}
      <header className="topbar">
        <div className="topbar-inner">
          <button className="menu-btn" aria-label="Abrir menu" onClick={() => setOpen(true)}>
            <span className="bar" /><span className="bar" /><span className="bar" />
          </button>

          <img className="logo-comite ga-logo" src="/logo-comite.png" alt="Comitê de Manutenção JDI" />
          <div className="title-chip ga-title">COMITÊ DE MANUTENÇÃO • JDI</div>
          <img className="logo-femsa ga-femsa" src="/logo-femsa.png" alt="Coca-Cola FEMSA" />
        </div>
      </header>

      {/* ===== Drawer ===== */}
      <div
        className="drawer-overlay"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        onClick={() => setOpen(false)}
      />
      <aside
        className="drawer"
        style={{ transform: open ? "translateX(0)" : "translateX(-102%)" }}
        role="dialog"
        aria-modal="true"
      >
        <div className="drawer-header">
          <strong style={{ fontSize: 18 }}>Categorias</strong>
          <button
            onClick={() => setOpen(false)}
            style={{ background: "transparent", border: "none", fontSize: 22, cursor: "pointer" }}
            aria-label="Fechar menu"
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

      {/* ===== Conteúdo ===== */}
      <main className="banners-container" style={{ paddingTop: mobilePaddingTop }}>
        {/* Carrossel dinâmico */}
        {bannerErro ? (
          <div style={{ width: "100%", maxWidth: 980, background: "#fee", color: "#900", padding: 12, borderRadius: 12 }}>
            {bannerErro}
          </div>
        ) : !currentOnePager ? (
          <div style={{ width: "100%", maxWidth: 980, background: "#eee", color: "#777", padding: 12, borderRadius: 12 }}>
            Carregando One Pagers...
          </div>
        ) : (
          <>
            <div
              className="banner-dinamico"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img src={currentOnePager} alt={onePagers[bannerIndex]} />
            </div>
            {onePagers.length > 1 && (
              <div className="banner-dots">
                {onePagers.map((_, i) => (
                  <button
                    key={i}
                    className={`banner-dot ${i === bannerIndex ? "active" : ""}`}
                    onClick={() => setBannerIndex(i)}
                    aria-label={`Ver banner ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Banners estáticos */}
        {STATIC_FROM_FOLDER.map((b, i) => (
          <img key={i} src={b.img} alt={`banner-${i}`} className="static-banner" />
        ))}
      </main>
    </div>
  );
}
