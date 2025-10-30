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
    <path
      d="M9.7 9.5a2.8 2.8 0 0 1 5.1 1.6c0 2-2.6 2.3-2.6 3.9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
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
  {
    id: "registro",
    title: "Registro de reuniões Abertura de PCM e Prestação de Contas",
    url: LINKS.registro,
    Icon: IconRegistroPCM,
  },
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

export default function App() {
  const [open, setOpen] = useState(false);

  // estado pros banners
  const [banners, setBanners] = useState<string[]>([]);
  const [bannerErro, setBannerErro] = useState<string | null>(null);
  const [bannerIndex, setBannerIndex] = useState(0);

  // refs pra swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // bloqueia scroll quando o drawer está aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // ESC fecha o drawer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // carrega os banners da pasta pública
  useEffect(() => {
    fetch("/banners_media/onepagers.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Não achei /banners_media/onepagers.json");
        }
        return res.json();
      })
      .then((data: string[]) => {
        if (!Array.isArray(data) || data.length === 0) {
          setBannerErro("Nenhum banner encontrado.");
          return;
        }

        // 1) força a ordem dos ONE PAGERS primeiro
        const ordemForcada = [
          "one pager fabrica.PNG",
          "one pager G1.PNG",
          "one pager G2.PNG",
          "one pager G3.PNG",
        ];

        const dinamicosOrdenados: string[] = [];

        // coloca os que existem na ordem desejada
        ordemForcada.forEach((nome) => {
          if (data.includes(nome)) {
            dinamicosOrdenados.push(nome);
          }
        });

        // se vierem outros no json, coloca depois
        const extras = data.filter((nome) => !ordemForcada.includes(nome));
        dinamicosOrdenados.push(...extras);

        // 2) agora sim adiciona os estáticos NO FINAL
        const estaticos = [
          "/banner-reconhecimentos.png",
          // "/banner-manutencao.png",
          // "/banner-treinamentos.png",
        ];

        const todos = [...dinamicosOrdenados, ...estaticos];

        setBanners(todos);
        setBannerIndex(0);
      })
      .catch((err) => {
        console.error("Erro carregando banners:", err);
        // se o json falhar, mostra só os estáticos
        const estaticos = ["/banner-reconhecimentos.png"];
        setBanners(estaticos);
        setBannerErro("Não foi possível carregar os banners dinâmicos.");
      });
  }, []);

  // carrossel automático (pode deixar, você ainda pode arrastar)
  useEffect(() => {
    if (banners.length <= 1) return;
    const t = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000); // 5s
    return () => clearInterval(t);
  }, [banners]);

  // funções de swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipe = 40;

    if (diff > minSwipe) {
      // esquerda -> próximo
      setBannerIndex((prev) => (prev + 1) % banners.length);
    } else if (diff < -minSwipe) {
      // direita -> anterior
      setBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // banner atual
  const currentBanner =
    banners.length > 0
      ? banners[bannerIndex].startsWith("/")
        ? banners[bannerIndex] // estático
        : `/banners_media/${banners[bannerIndex]}` // vindo do json
      : null;

  return (
    <div className="app">
      <style>{`
        /* ===== Topbar (desktop/tablet) ===== */
        .topbar{
          position: sticky; top: 0; z-index: 100;
          background:#cc0000;
          padding:0;
          box-shadow:0 6px 18px rgba(0,0,0,.15);
        }
        .topbar-inner{
          position:relative;
          max-width:1200px; margin:0 auto;
          padding:6px 6px;
          display:grid; align-items:center; gap:6px;
          grid-template-columns:auto 58px 1fr 92px;
        }
        .menu-btn{
          width:44px; height:44px; border:none; border-radius:999px;
          background:#b80000; color:#fff;
          box-shadow:0 4px 12px rgba(0,0,0,.25);
          display:grid; place-items:center; cursor:pointer;
          justify-self:start; margin-left:0;
        }
        .menu-btn .bar{ width:22px; height:2px; background:#fff; margin:2.5px 0; border-radius:2px; display:block; }
        .logo-comite{ height:46px; object-fit:contain; }
        .logo-femsa{ height:44px; object-fit:contain; justify-self:end; }
        .title-chip{
          color:#fff; font-weight:900; text-align:center;
          padding:8px 12px; border-radius:999px;
          background:rgba(255,255,255,.12);
          letter-spacing:.35px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
          font-size:clamp(16px, 2.7vw, 28px);
        }

        /* ===== Somente celular (≤ 430px) ===== */
        @media (max-width:430px){
          .topbar-inner{
            grid-template-columns:40px 1fr auto;
            grid-template-areas:"logo title femsa";
            padding:6px 8px 18px;
            gap:8px;
          }
          .ga-logo  { grid-area: logo; }
          .ga-title { grid-area: title; align-self:start; }
          .ga-femsa { grid-area: femsa; }

          .menu-btn{
            position:absolute;
            left:8px;
            bottom:-30px;
            width:40px; height:40px;
            border-radius:12px;
            background:#cc0000;
            box-shadow:0 6px 14px rgba(0,0,0,.22), 0 0 0 2px rgba(255,255,255,.85);
            z-index: 101;
          }
          .menu-btn .bar{ width:18px; height:2px; }

          .logo-comite{ height:32px; }
          .logo-femsa{ height:28px; }
          .title-chip{
            font-size:clamp(13px, 3.8vw, 16px);
            padding:4px 8px;
            border-radius:10px;
            line-height:1.05;
            letter-spacing:.2px;
            background:rgba(255,255,255,.16);
          }

          .banners-container{ padding:42px 10px 24px; }
          .banner{
            max-width:92vw;
            border-radius:12px;
            box-shadow:0 3px 10px rgba(0,0,0,.12);
          }
        }

        /* ===== Conteúdo (padrão) ===== */
        .banners-container{
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:22px;
          padding:14px 12px 28px;
        }
        .banner{
          width:100%;
          height:auto;
          max-width:980px;
          border-radius:16px;
          box-shadow:0 4px 12px rgba(0,0,0,.12);
          display:block;
          touch-action:pan-y;
        }
        @media (max-width:1024px){ .banner{ max-width:900px; } }
        @media (max-width:768px){ .banner{ max-width:100%; border-radius:14px; } }

        /* ===== bolinhas do carrossel ===== */
        .banner-dots{
          display:flex;
          gap:6px;
          justify-content:center;
        }
        .banner-dot{
          width:9px; height:9px;
          border-radius:999px;
          background:#ddd;
          cursor:pointer;
          border:none;
        }
        .banner-dot.active{
          background:#cc0000;
          width:28px;
          transition:all .15s ease-out;
        }

        /* ===== Drawer ===== */
        .drawer-overlay{
          position:fixed; inset:0;
          background:rgba(0,0,0,.35);
          transition:opacity .2s ease; z-index:100;
        }
        .drawer{
          position:fixed; top:0; left:0; height:100dvh; width:320px; max-width:86vw;
          background:#fff;
          box-shadow:4px 0 24px rgba(0,0,0,.18);
          z-index:102;
          display:flex; flex-direction:column;
          transition:transform .22s ease-out;
        }
        .drawer-header{
          display:flex; align-items:center; justify-content:space-between;
          padding:14px 14px 10px 16px; border-bottom:1px solid #eee;
        }
        .drawer-link{
          display:grid; grid-template-columns:26px 1fr; align-items:center; gap:12px;
          padding:12px 10px; border-radius:10px; color:#222; text-decoration:none;
        }
        .drawer-ico{ color:#cc0000; display:grid; place-items:center; }
      `}</style>

      {/* ===== Topbar ===== */}
      <header className="topbar">
        <div className="topbar-inner">
          <button className="menu-btn" aria-label="Abrir menu" onClick={() => setOpen(true)}>
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>

          <img className="logo-comite ga-logo" src="/logo-comite.png" alt="Comitê de Manutenção JDI" />
          <div className="title-chip ga-title" aria-label="Comitê de Manutenção JDI">
            COMITÊ DE MANUTENÇÃO • JDI
          </div>
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
              <span className="drawer-ico">
                <Icon />
              </span>
              <span>{title}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* ===== Conteúdo ===== */}
      <main className="banners-container">
        {bannerErro ? (
          <div
            style={{
              width: "100%",
              maxWidth: "960px",
              background: "#fee",
              color: "#900",
              padding: "10px 14px",
              borderRadius: "12px",
            }}
          >
            {bannerErro}
          </div>
        ) : !currentBanner ? (
          <div
            style={{
              width: "100%",
              maxWidth: "960px",
              background: "#eee",
              color: "#777",
              padding: "14px 14px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            Carregando banners...
          </div>
        ) : (
          <>
            {/* banner atual (com swipe) */}
            <a
              href={LINKS.okr}
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "100%" }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                className="banner"
                src={currentBanner}
                alt={banners[bannerIndex]}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </a>

            {/* bolinhas do carrossel */}
            {banners.length > 1 && (
              <div className="banner-dots">
                {banners.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`banner-dot ${i === bannerIndex ? "active" : ""}`}
                    onClick={() => setBannerIndex(i)}
                    aria-label={`Ver banner ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
