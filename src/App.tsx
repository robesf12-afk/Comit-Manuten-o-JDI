// src/App.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";

/* =====================  FONTES DOS BANNERS  ===================== */
/** 1) Caminho servido pelo app a partir de /public */
const ONEPAGERS_LOCAL_JSON = "/banners_media/onepagers.json";
const ONEPAGERS_LOCAL_IMG_BASE = "/banners_media/";

/** 2) Fallback RAW GitHub (branch restore-layout-bom) */
const GH_USER = "robesf12-afk";
const GH_REPO = "Comit-Manuten-o-JDI";
const GH_BRANCH = "restore-layout-bom";
const ONEPAGERS_RAW_JSON =
  `https://raw.githubusercontent.com/${GH_USER}/${GH_REPO}/${GH_BRANCH}/public/banners_media/onepagers.json`;
const ONEPAGERS_RAW_IMG_BASE =
  `https://raw.githubusercontent.com/${GH_USER}/${GH_REPO}/${GH_BRANCH}/public/banners_media/`;

/** Regex simples de imagem */
const IMG_RE = /\.(png|jpe?g|gif|webp|svg)(\?|$)/i;

/* =====================  TIPOS  ===================== */
type Slide = { img: string; link?: string };

/* =====================  UTILS  ===================== */
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
        <p>Arquivo não é uma imagem direta: <code>{current.img}</code></p>
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

/* =====================  APP (apenas One Pagers)  ===================== */
export default function App() {
  const [open, setOpen] = useState(false);

  const [onePagers, setOnePagers] = useState<string[]>([]);
  const [imgBase, setImgBase] = useState<string>(ONEPAGERS_LOCAL_IMG_BASE);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [fonte, setFonte] = useState<string>("—");

  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr(null);
      setFonte("—");
      try {
        // 1) tenta LOCAL
        console.log("[onepagers] tentando LOCAL:", ONEPAGERS_LOCAL_JSON);
        try {
          const r = await fetch(ONEPAGERS_LOCAL_JSON, { cache: "no-store" });
          if (r.ok) {
            const list = (await safeJson(r)) as string[] | null;
            if (Array.isArray(list)) {
              console.log("[onepagers] OK local:", list);
              setOnePagers(list);
              setImgBase(ONEPAGERS_LOCAL_IMG_BASE);
              setFonte("local");
              setLoading(false);
              return;
            }
          } else {
            console.warn("[onepagers] local respondeu", r.status);
          }
        } catch (e) {
          console.warn("[onepagers] erro local:", e);
        }

        // 2) tenta RAW
        console.log("[onepagers] tentando RAW:", ONEPAGERS_RAW_JSON);
        try {
          const r2 = await fetch(ONEPAGERS_RAW_JSON, { cache: "no-store" });
          if (r2.ok) {
            const list2 = (await safeJson(r2)) as string[] | null;
            if (Array.isArray(list2)) {
              console.log("[onepagers] OK raw:", list2);
              setOnePagers(list2);
              setImgBase(ONEPAGERS_RAW_IMG_BASE);
              setFonte("raw");
              setLoading(false);
              return;
            }
          } else {
            console.warn("[onepagers] raw respondeu", r2.status);
          }
        } catch (e) {
          console.warn("[onepagers] erro raw:", e);
        }

        // 3) FALLBACK hardcoded (garante render)
        const fallback = [
          "one pager G1.PNG",
          "one pager G2.PNG",
          "one pager G3.PNG",
          "one pager fabrica.PNG",
        ];
        console.warn("[onepagers] usando FALLBACK hardcoded:", fallback);
        setOnePagers(fallback);
        setImgBase(ONEPAGERS_LOCAL_IMG_BASE); // imagens estão em /public/banners_media/
        setFonte("fallback");
      } catch (e: any) {
        console.error("[onepagers] erro geral:", e);
        setErr(String(e?.message || e));
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

      {/* Topbar */}
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

      {/* Drawer */}
      <div className="drawer-overlay" style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }} onClick={() => setOpen(false)} />
      <aside className="drawer" aria-label="Categorias" style={{ transform: open ? "translateX(0)" : "translateX(-102%)" }}>
        <div className="drawer-header">
          <strong style={{ fontSize: 18 }}>Categorias</strong>
          <button onClick={() => setOpen(false)} style={{ background:"transparent", border:"none", fontSize:22, cursor:"pointer" }} aria-label="Fechar">×</button>
        </div>
        <nav style={{ padding: "8px 6px 16px 6px", overflow:"auto" }}>
          <a className="drawer-link" href="#" onClick={(e) => e.preventDefault()}>
            <span style={{ color:"#cc0000", display:"grid", placeItems:"center" }}><span style={{width:22,height:22,display:"inline-block",background:"#cc0000",borderRadius:4}}/></span>
            <span>One Pagers</span>
          </a>
        </nav>
      </aside>

      {/* Conteúdo */}
      <main className="content">
        {loading && <div className="loading">Carregando banners…</div>}

        {!loading && (
          <div style={{ fontSize: 12, opacity: .7, margin: "6px 0 12px" }}>
            Fonte dos dados: <strong>{fonte}</strong>{imgBase ? ` • imgBase: ${imgBase}` : ""}
          </div>
        )}

        {!loading && err && (
          <div className="error">
            {err}
          </div>
        )}

        {!loading && !err && slides.length > 0 && (
          <section className="section">
            <h2 className="section-title">One Pager</h2>
            <Carousel slides={slides} height={useIsMobile() ? 240 : 340} />
          </section>
        )}

        {!loading && !err && slides.length === 0 && (
          <div className="error" style={{ background:"#fffdf2", borderColor:"#e6da9a", color:"#8a6d00" }}>
            Nada para exibir. Confirme que os arquivos estão em <code>/public/banners_media/</code> e que o
            <code> onepagers.json</code> contém os nomes corretos (respeita maiúsculas/minúsculas).
          </div>
        )}
      </main>
    </div>
  );
}

/* Parse JSON com captura de erro para evitar tela branca */
async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch (e) {
    console.warn("[safeJson] JSON inválido:", e);
    return null;
  }
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


