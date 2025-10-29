// src/App.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";

/* =====================  FONTES DOS BANNERS  ===================== */
/** 1) Caminho que o Vercel/Dev serve a partir de /public */
const ONEPAGERS_LOCAL_JSON = "/banners_media/onepagers.json";
const ONEPAGERS_LOCAL_IMG_BASE = "/banners_media/";

/** 2) Fallback direto do GitHub RAW (sua branch restore-layout-bom) */
const GH_USER = "robesf12-afk";
const GH_REPO = "Comit-Manuten-o-JDI";
const GH_BRANCH = "restore-layout-bom";
const ONEPAGERS_RAW_JSON =
  `https://raw.githubusercontent.com/${GH_USER}/${GH_REPO}/${GH_BRANCH}/public/banners_media/onepagers.json`;
const ONEPAGERS_RAW_IMG_BASE =
  `https://raw.githubusercontent.com/${GH_USER}/${GH_REPO}/${GH_BRANCH}/public/banners_media/`;

/** Regex para detectar URL de imagem direta */
const IMG_RE = /\.(png|jpe?g|gif|webp|svg)(\?|$)/i;

/* =====================  TIPOS  ===================== */
type Slide = { img: string; link?: string };

/* =====================  ÍCONES  ===================== */
const IconFolder: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

function isImageUrl(u: string) { return IMG_RE.test(u); }

/* =====================  CARROSSEL  ===================== */
const Carousel: React.FC<{ slides: Slide[]; height?: number | string; autoMs?: number }> = ({
  slides, height = 280, autoMs = 6000,
}) => {
  const [idx, setIdx] = useState(0);
  const len = slides.length || 1;
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (len <= 1) return;
    timer.current = window.setInterval(() => setIdx(i => (i + 1) % len), autoMs);
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [len, autoMs]);

  const go = (to: number) => setIdx((to + len) % len);
  const current = slides[idx];

  const content = useMemo(() => {
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
      <div style={{ width:"100%", height:"100%", display:"grid", placeItems:"center", padding:16, textAlign:"center", color:"#333" }}>
        <div style={{ opacity:0.85, maxWidth:520 }}>
          <IconFolder size={32} />
          <p style={{ margin:"10px 0 14px" }}>
            Este item não é uma imagem direta.
          </p>
        </div>
      </div>
    );
  }, [current]);

  return (
    <div
      className="carousel"
      style={{
        position:"relative", width:"100%", height, borderRadius:16, background:"#fff",
        boxShadow:"0 8px 24px rgba(0,0,0,.10)", overflow:"hidden",
      }}
    >
      {content}
      {len > 1 && (
        <>
          <button aria-label="Anterior" onClick={() => go(idx - 1)} style={navBtn("left")}>‹</button>
          <button aria-label="Próximo"  onClick={() => go(idx + 1)} style={navBtn("right")}>›</button>
          <div style={dotsWrap}>
            {slides.map((_, i) => (
              <span key={i}
                onClick={() => setIdx(i)}
                style={{
                  width:8, height:8, borderRadius:999,
                  background: i===idx ? "#cc0000" : "rgba(0,0,0,.25)", cursor:"pointer",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const navBtn = (side: "left" | "right"): React.CSSProperties => ({
  position:"absolute", top:"50%", [side]:10 as any, transform:"translateY(-50%)",
  width:36, height:36, borderRadius:"999px", border:"none",
  background:"rgba(0,0,0,.55)", color:"#fff", fontSize:20, cursor:"pointer",
});

const dotsWrap: React.CSSProperties = {
  position:"absolute", bottom:10, left:0, right:0, margin:"0 auto",
  display:"flex", gap:8, justifyContent:"center", alignItems:"center",
};

/* =====================  APP (só One Pagers)  ===================== */
export default function App() {
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [onePagers, setOnePagers] = useState<string[]>([]);
  const [imgBase, setImgBase] = useState<string>(ONEPAGERS_LOCAL_IMG_BASE);
  const [loading, setLoading] = useState(true);

  // Bloqueia scroll quando menu abre
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Busca primeiro local (Vercel/dev). Se falhar, cai pro RAW do GitHub.
  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        // 1) tenta local
        let ok = false;
        try {
          const r = await fetch(ONEPAGERS_LOCAL_JSON, { cache: "no-store" });
          if (r.ok) {
            const list = (await r.json()) as string[];
            if (Array.isArray(list)) {
              setOnePagers(list);
              setImgBase(ONEPAGERS_LOCAL_IMG_BASE);
              ok = true;
            }
          }
        } catch (_) {/* ignora e tenta RAW */}

        // 2) fallback RAW
        if (!ok) {
          const r2 = await fetch(ONEPAGERS_RAW_JSON, { cache: "no-store" });
          if (!r2.ok) throw new Error(`RAW ${r2.status}`);
          const list2 = (await r2.json()) as string[];
          if (!Array.isArray(list2)) throw new Error("RAW inválido");
          setOnePagers(list2);
          setImgBase(ONEPAGERS_RAW_IMG_BASE);
        }
      } catch (e) {
        console.error("Erro onepagers:", e);
        setErr("Não consegui carregar os One Pagers. Confira se o arquivo onepagers.json existe.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const slides: Slide[] = useMemo(
    () => (onePagers || []).map(name => ({ img: imgBase + encodeURIComponent(name) })),
    [onePagers, imgBase]
  );

  return (
    <div className="app">
      <style>{css}</style>

      {/* Topbar simples */}
      <header className="topbar">
        <div className="topbar-inner">
          <button className="menu-btn" aria-label="Abrir menu" onClick={() => setOpen(true)}>
            <span className="bar" /><span className="bar" /><span className="bar" />
          </button>
          <img className="logo-comite" src="/logo-comite.png" alt="Comitê de Manutenção JDI" />
          <div className="title-chip">COMITÊ DE MANUTENÇÃO • JDI</div>
          <img className="logo-femsa" src="/logo-femsa.png" alt="Coca-Cola FEMSA" />
        </div>
      </header>

      {/* Drawer (placeholder) */}
      <div className="drawer-overlay" style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }} onClick={() => setOpen(false)} />
      <aside className="drawer" aria-label="Categorias" style={{ transform: open ? "translateX(0)" : "translateX(-102%)" }}>
        <div className="drawer-header">
          <strong style={{ fontSize: 18 }}>Categorias</strong>
          <button onClick={() => setOpen(false)} style={{ background:"transparent", border:"none", fontSize:22, cursor:"pointer" }} aria-label="Fechar">×</button>
        </div>
        <nav style={{ padding: "8px 6px 16px 6px", overflow:"auto" }}>
          <a className="drawer-link" href="#" onClick={(e) => e.preventDefault()}>
            <span style={{ color:"#cc0000", display:"grid", placeItems:"center" }}><IconFolder /></span>
            <span>One Pagers</span>
          </a>
        </nav>
      </aside>

      {/* Conteúdo */}
      <main className="content">
        {loading && <div className="loading">Carregando banners…</div>}

        {!loading && err && (
          <div className="error">{err}</div>
        )}

        {!loading && !err && slides.length > 0 && (
          <section className="section">
            <h2 className="section-title">One Pager</h2>
            <Carousel slides={slides} height={useIsMobile() ? 240 : 340} />
          </section>
        )}

        {!loading && !err && slides.length === 0 && (
          <div className="loading" style={{ background:"#fffdf2" }}>
            Nada para exibir ainda. Verifique se os arquivos estão no preview desta branch.
          </div>
        )}
      </main>
    </div>
  );
}

/* =====================  CSS  ===================== */
const css = `
.topbar{
  position: sticky; top: 0; z-index: 100;
  background:#cc0000; padding:0; box-shadow:0 6px 18px rgba(0,0,0,.15);
}
.topbar-inner{
  max-width:1200px; margin:0 auto; padding:6px 6px;
  display:grid; align-items:center; gap:6px;
  grid-template-columns:auto 58px 1fr 92px;
}
.menu-btn{
  width:44px; height:44px; border:none; border-radius:999px;
  background:#b80000; color:#fff; box-shadow:0 4px 12px rgba(0,0,0,.25);
  display:grid; place-items:center; cursor:pointer;
}
.menu-btn .bar{ width:22px; height:2px; background:#fff; margin:2.5px 0; border-radius:2px; display:block; }
.logo-comite{ height:46px; object-fit:contain; }
.logo-femsa{ height:44px; object-fit:contain; justify-self:end; }
.title-chip{
  color:#fff; font-weight:900; text-align:center;
  padding:8px 12px; border-radius:999px; background:rgba(255,255,255,.12);
  letter-spacing:.35px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  font-size:clamp(16px, 2.7vw, 28px);
}
@media (max-width:430px){
  .topbar-inner{
    grid-template-areas:
      "menu logo femsa"
      "title title title";
    grid-template-columns:auto 1fr auto; row-gap:4px;
  }
  .menu-btn{ width:40px; height:40px; }
  .menu-btn .bar{ width:20px; }
  .logo-comite{ height:38px; }
  .logo-femsa{ height:34px; }
  .title-chip{ font-size:clamp(14px, 4.2vw, 18px); padding:6px 10px; white-space:normal; }
}
.content{ max-width:1200px; margin:0 auto; padding:18px 12px 40px; }
.section{ margin:16px 0 28px; }
.section-title{ font-size:clamp(18px, 2.2vw, 24px); margin:0 0 10px; font-weight:800; color:#222; }

.drawer-overlay{ position:fixed; inset:0; background:rgba(0,0,0,.35); transition:opacity .2s ease; z-index:100; }
.drawer{ position:fixed; top:0; left:0; height:100dvh; width:320px; max-width:86vw; background:#fff;
         box-shadow:4px 0 24px rgba(0,0,0,.18); z-index:102; display:flex; flex-direction:column;
         transition:transform .22s ease-out; }
.drawer-header{ display:flex; align-items:center; justify-content:space-between;
                padding:14px 14px 10px 16px; border-bottom:1px solid #eee; }
.drawer-link{ display:grid; grid-template-columns:26px 1fr; align-items:center;
              gap:12px; padding:12px 10px; border-radius:10px; color:#222; text-decoration:none; }

.loading, .error{ margin:22px 0; padding:12px 14px; border-radius:10px; }
.loading{ background:#f6f6f6; color:#555; }
.error{ background:#fff4f4; color:#8a0f0f; border:1px solid #f2c1c1; }
`;

/* =====================  HOOK  ===================== */
function useIsMobile() {
  const [is, setIs] = useState<boolean>(window.innerWidth <= 430);
  useEffect(() => {
    const on = () => setIs(window.innerWidth <= 430);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return is;
}

