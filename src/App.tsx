// src/App.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";

/* =====================  CONFIG  ===================== */
/** Link público do seu config.json no OneDrive/SharePoint */
const CONFIG_URL =
  "https://cocacolafemsa-my.sharepoint.com/personal/roberta_dossantos_kof_com_mx/_layouts/15/download.aspx?UniqueId=efa02a02bc7442f8abd89e5c9785bc5e&e=RpZvWo";

/** Regex para detectar URL de imagem direta */
const IMG_RE = /\.(png|jpe?g|gif|webp|svg)(\?|$)/i;

/* =====================  TIPAGENS  ===================== */
type Slide = {
  img: string;   // pode ser imagem OU uma pasta/link de SharePoint
  link?: string; // opcional: link clicável (ex.: custo com drill-down)
};

type Section = {
  type: "carousel" | "single";
  title: string;
  slides: Slide[];
};

type RemoteConfig = {
  updated_at?: string;
  sections: Section[];
};

/* =====================  ÍCONES  ===================== */
const IconFolder: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const IconLink: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L10 5M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 1 0 7.07 7.07L14 19"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* =====================  UTILS  ===================== */
function isImageUrl(url: string) {
  return IMG_RE.test(url);
}

function clsx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

/* =====================  COMPONENTES  ===================== */
const Carousel: React.FC<{ slides: Slide[]; height?: number | string; autoMs?: number }> = ({
  slides,
  height = 280,
  autoMs = 6000,
}) => {
  const [idx, setIdx] = useState(0);
  const len = slides.length || 1;
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (len <= 1) return;
    timer.current = window.setInterval(() => setIdx((i) => (i + 1) % len), autoMs);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [len, autoMs]);

  const go = (to: number) => setIdx((to + len) % len);

  const current = slides[idx];

  const content = useMemo(() => {
    // Se for imagem direta, renderiza <img>, senão um cartão com botão para abrir pasta/link
    if (isImageUrl(current.img)) {
      return (
        <img
          src={current.img}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        />
      );
    }
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          placeItems: "center",
          padding: 16,
          textAlign: "center",
          color: "#333",
        }}
      >
        <div style={{ opacity: 0.85, maxWidth: 520 }}>
          <IconFolder size={32} />
          <p style={{ margin: "10px 0 14px" }}>
            Este item é uma <strong>pasta/arquivo do SharePoint</strong>.
            <br />
            Toque abaixo para abrir e visualizar as imagens.
          </p>
          <a
            href={current.link || current.img}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 14px",
              borderRadius: 10,
              background: "#cc0000",
              color: "#fff",
              textDecoration: "none",
              boxShadow: "0 8px 20px rgba(0,0,0,.18)",
            }}
          >
            <IconLink />
            Abrir no SharePoint
          </a>
        </div>
      </div>
    );
  }, [current]);

  return (
    <div
      className="carousel"
      style={{
        position: "relative",
        width: "100%",
        height,
        borderRadius: 16,
        background: "#fff",
        boxShadow: "0 8px 24px rgba(0,0,0,.10)",
        overflow: "hidden",
      }}
    >
      {content}

      {len > 1 && (
        <>
          <button
            aria-label="Anterior"
            onClick={() => go(idx - 1)}
            style={navBtnStyle("left")}
          >
            ‹
          </button>
          <button
            aria-label="Próximo"
            onClick={() => go(idx + 1)}
            style={navBtnStyle("right")}
          >
            ›
          </button>
          <div style={dotsWrapStyle}>
            {slides.map((_, i) => (
              <span
                key={i}
                onClick={() => setIdx(i)}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: i === idx ? "#cc0000" : "rgba(0,0,0,.25)",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const navBtnStyle = (side: "left" | "right"): React.CSSProperties => ({
  position: "absolute",
  top: "50%",
  [side]: 10,
  transform: "translateY(-50%)",
  width: 36,
  height: 36,
  borderRadius: "999px",
  border: "none",
  background: "rgba(0,0,0,.55)",
  color: "#fff",
  fontSize: 20,
  cursor: "pointer",
});

const dotsWrapStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 10,
  left: 0,
  right: 0,
  margin: "0 auto",
  display: "flex",
  gap: 8,
  justifyContent: "center",
  alignItems: "center",
};

/* =====================  APP  ===================== */
export default function App() {
  const [open, setOpen] = useState(false);
  const [cfg, setCfg] = useState<RemoteConfig | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // >>> NOVO: estado dos OnePagers (local /public/banners_media)
  const [onePagers, setOnePagers] = useState<string[]>([]);
  const [onePagersErr, setOnePagersErr] = useState<string | null>(null);

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

  // Fetch do config.json (OneDrive/SharePoint)
  useEffect(() => {
    (async () => {
      try {
        setErr(null);
        const res = await fetch(CONFIG_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as RemoteConfig;
        // sanity check
        if (!data || !Array.isArray(data.sections)) {
          throw new Error("Formato inválido do config.json");
        }
        setCfg(data);
      } catch (e: any) {
        setErr(
          "Não consegui ler o config.json do OneDrive. Verifique se o link é público e tente novamente."
        );
        console.error("Erro ao ler config.json:", e);
      }
    })();
  }, []);

  // >>> NOVO: Fetch do onepagers.json local
  useEffect(() => {
    (async () => {
      try {
        setOnePagersErr(null);
        const res = await fetch("/banners_media/onepagers.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const list = (await res.json()) as string[];
        if (!Array.isArray(list)) throw new Error("Formato inválido do onepagers.json");
        setOnePagers(list);
      } catch (e) {
        console.error("Erro ao carregar onepagers.json:", e);
        setOnePagersErr("Não consegui carregar o onepagers.json.");
      }
    })();
  }, []);

  // Mapeia arquivos do onepagers.json → Slides do carrossel
  const onePagerSlides: Slide[] = useMemo(
    () =>
      (onePagers || []).map((name) => ({
        img: `/banners_media/${encodeURIComponent(name)}`,
      })),
    [onePagers]
  );

  return (
    <div className="app">
      <style>{css}</style>

      {/* Topbar */}
      <header className="topbar">
        <div className="topbar-inner">
          <button className="menu-btn ga-menu" aria-label="Abrir menu" onClick={() => setOpen(true)}>
            <span className="bar" /><span className="bar" /><span className="bar" />
          </button>

          <img className="logo-comite ga-logo" src="/logo-comite.png" alt="Comitê de Manutenção JDI" />
          <div className="title-chip ga-title" aria-label="Comitê de Manutenção JDI">
            COMITÊ DE MANUTENÇÃO • JDI
          </div>
          <img className="logo-femsa ga-femsa" src="/logo-femsa.png" alt="Coca-Cola FEMSA" />
        </div>
      </header>

      {/* Drawer */}
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
          {/* Coloque aqui seus links fixos (os da barra lateral) se quiser manter */}
          <a className="drawer-link" href="#" onClick={(e) => e.preventDefault()}>
            <span className="drawer-ico"><IconFolder /></span>
            <span>Conteúdos dinâmicos (banners)</span>
          </a>
        </nav>
      </aside>

      {/* Conteúdo */}
      <main className="content">
        {/* Erros */}
        {err && (
          <div className="error">
            {err}
            <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>
              Dica: abra o link do <code>config.json</code> em aba anônima e confirme se baixa um JSON.
            </div>
          </div>
        )}
        {onePagersErr && (
          <div className="error">
            {onePagersErr}
          </div>
        )}

        {/* Seção ONE PAGER (sempre tenta mostrar, independente do config.json) */}
        {onePagerSlides.length > 0 && (
          <section className="section">
            <h2 className="section-title">One Pager</h2>
            <Carousel slides={onePagerSlides} height={useIsMobile() ? 240 : 340} />
          </section>
        )}

        {/* Loading geral (quando nada veio ainda) */}
        {!cfg && !err && onePagerSlides.length === 0 && (
          <div className="loading">Carregando banners…</div>
        )}

        {/* Seções do config.json (SharePoint) */}
        {cfg && cfg.sections.map((sec, i) => (
          <section key={i} className="section">
            <h2 className="section-title">{sec.title}</h2>

            {sec.type === "carousel" ? (
              <Carousel slides={sec.slides} height={useIsMobile() ? 240 : 340} />
            ) : (
              // single: usa primeiro slide
              <Carousel slides={[sec.slides[0]]} height={useIsMobile() ? 220 : 300} autoMs={999999} />
            )}
          </section>
        ))}

        {/* Fallback visual (caso o JSON remoto ainda não tenha carregado) */}
        {!cfg && !err && onePagerSlides.length > 0 && (
          <section className="section">
            <h2 className="section-title">Reconhecimentos</h2>
            <div className="card">
              <img
                src="/banner-reconhecimentos.png"
                alt="Reconhecimentos"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

/* =====================  CSS (inline)  ===================== */
const css = `
.topbar{
  position: sticky; top: 0; z-index: 100;
  background:#cc0000;
  padding:0;
  box-shadow:0 6px 18px rgba(0,0,0,.15);
}
.topbar-inner{
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

/* Mobile 2 linhas p/ nunca cortar */
@media (max-width:430px){
  .topbar-inner{
    grid-template-areas:
      "menu logo femsa"
      "title title title";
    grid-template-columns:auto 1fr auto;
    row-gap:4px;
  }
  .ga-menu{ grid-area:menu; }
  .ga-logo{ grid-area:logo; }
  .ga-title{ grid-area:title; }
  .ga-femsa{ grid-area:femsa; }

  .menu-btn{ width:40px; height:40px; }
  .menu-btn .bar{ width:20px; }
  .logo-comite{ height:38px; }
  .logo-femsa{ height:34px; }
  .title-chip{ font-size:clamp(14px, 4.2vw, 18px); padding:6px 10px; white-space:normal; }
}

.content{
  max-width:1200px; margin: 0 auto; padding: 18px 12px 40px;
}
.section{ margin: 16px 0 28px; }
.section-title{
  font-size: clamp(18px, 2.2vw, 24px);
  margin: 0 0 10px; font-weight: 800; color: #222;
}

.card{
  width:100%; height:300px; border-radius:16px; background:#fff;
  box-shadow:0 8px 24px rgba(0,0,0,.10); overflow:hidden;
}
@media (max-width:430px){ .card{ height:220px; } }

.drawer-overlay{ position:fixed; inset:0; background:rgba(0,0,0,.35); transition:opacity .2s ease; z-index:100; }
.drawer{ position:fixed; top:0; left:0; height:100dvh; width:320px; max-width:86vw; background:#fff;
         box-shadow:4px 0 24px rgba(0,0,0,.18); z-index:102; display:flex; flex-direction:column;
         transition:transform .22s ease-out; }
.drawer-header{ display:flex; align-items:center; justify-content:space-between; padding:14px 14px 10px 16px; border-bottom:1px solid #eee; }
.drawer-link{ display:grid; grid-template-columns:26px 1fr; align-items:center; gap:12px; padding:12px 10px; border-radius:10px; color:#222; text-decoration:none; }
.drawer-ico{ color:#cc0000; display:grid; place-items:center; }

.loading, .error{
  margin: 22px 0; padding: 12px 14px; border-radius: 10px;
}
.loading{ background: #f6f6f6; color:#555; }
.error{ background: #fff4f4; color:#8a0f0f; border: 1px solid #f2c1c1; }
`;

/* =====================  HOOKS  ===================== */
function useIsMobile() {
  const [is, setIs] = useState<boolean>(window.innerWidth <= 430);
  useEffect(() => {
    const on = () => setIs(window.innerWidth <= 430);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return is;
}
