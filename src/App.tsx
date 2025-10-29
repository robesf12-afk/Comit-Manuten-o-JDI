// src/App.tsx
import React, { useEffect, useState, useRef } from "react";

/* =====================  TIPAGENS  ===================== */
type Slide = { src: string };

/* =====================  CARROSSEL ===================== */
const Carousel: React.FC<{ slides: Slide[]; height?: number | string; autoMs?: number }> = ({
  slides,
  height = 300,
  autoMs = 5000,
}) => {
  const [idx, setIdx] = useState(0);
  const len = slides.length || 1;
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (len <= 1) return;
    timer.current = window.setInterval(() => setIdx((i) => (i + 1) % len), autoMs);
    return () => timer.current && clearInterval(timer.current);
  }, [len, autoMs]);

  if (len === 0) {
    return (
      <div style={{ height, display: "grid", placeItems: "center", background: "#fafafa", borderRadius: 16 }}>
        <p>Nenhum banner encontrado na pasta <b>/public/banners_media</b>.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height,
        borderRadius: 16,
        background: "#fff",
        overflow: "hidden",
        boxShadow: "0 6px 20px rgba(0,0,0,.15)",
      }}
    >
      <img
        src={slides[idx].src}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        onError={(e) => ((e.target as HTMLImageElement).style.opacity = "0.3")}
      />

      {len > 1 && (
        <>
          <button onClick={() => setIdx((idx - 1 + len) % len)} style={navBtn("left")}>‹</button>
          <button onClick={() => setIdx((idx + 1) % len)} style={navBtn("right")}>›</button>
          <div style={dotsWrap}>
            {slides.map((_, i) => (
              <span
                key={i}
                onClick={() => setIdx(i)}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: i === idx ? "#cc0000" : "rgba(0,0,0,.3)",
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

const navBtn = (side: "left" | "right"): React.CSSProperties => ({
  position: "absolute",
  top: "50%",
  [side]: 10,
  transform: "translateY(-50%)",
  background: "rgba(0,0,0,.5)",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: 36,
  height: 36,
  cursor: "pointer",
  fontSize: 22,
});

const dotsWrap: React.CSSProperties = {
  position: "absolute",
  bottom: 10,
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  gap: 6,
};

/* =====================  APP ===================== */
export default function App() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setErr(null);

        // busca lista de imagens automaticamente
        const context = (import.meta as any).glob("/public/banners_media/*.{png,jpg,jpeg,webp,gif}", {
          eager: true,
        });

        const imgs = Object.keys(context).map((path) => ({
          src: path.replace("/public", ""), // remove /public do caminho
        }));

        if (imgs.length === 0) {
          setErr("Nenhum arquivo encontrado em /public/banners_media.");
        } else {
          setSlides(imgs);
        }
      } catch (e: any) {
        console.error(e);
        setErr("Erro ao carregar imagens da pasta local.");
      }
    })();
  }, []);

  return (
    <div className="app">
      <style>{css}</style>
      <header className="topbar">
        <div className="topbar-inner">
          <img className="logo-comite" src="/logo-comite.png" alt="Comitê" />
          <div className="title-chip">COMITÊ DE MANUTENÇÃO • JDI</div>
          <img className="logo-femsa" src="/logo-femsa.png" alt="FEMSA" />
        </div>
      </header>

      <main className="content">
        <h2 className="section-title">One Pager</h2>
        {err ? (
          <div className="error">{err}</div>
        ) : (
          <Carousel slides={slides} height={useIsMobile() ? 240 : 340} />
        )}
      </main>
    </div>
  );
}

/* =====================  CSS ===================== */
const css = `
.topbar {
  position: sticky; top: 0; z-index: 100;
  background: #cc0000; padding: 0;
  box-shadow: 0 6px 18px rgba(0,0,0,.15);
}
.topbar-inner {
  max-width: 1200px; margin: 0 auto;
  padding: 6px 8px;
  display: grid; align-items: center; gap: 6px;
  grid-template-columns: 1fr auto 1fr;
  justify-items: center;
}
.logo-comite, .logo-femsa {
  height: 44px; object-fit: contain;
}
.title-chip {
  color: #fff; font-weight: 900;
  padding: 8px 12px; border-radius: 999px;
  background: rgba(255,255,255,.15);
  letter-spacing: .35px;
}
.content { max-width: 1200px; margin: 0 auto; padding: 18px 12px 40px; }
.section-title { font-size: 22px; margin-bottom: 12px; font-weight: 800; color: #222; }
.error { background: #fff4f4; color: #8a0f0f; border: 1px solid #f2c1c1; padding: 10px; border-radius: 8px; }
`;

/* =====================  HOOK ===================== */
function useIsMobile() {
  const [is, setIs] = useState(window.innerWidth <= 430);
  useEffect(() => {
    const onResize = () => setIs(window.innerWidth <= 430);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return is;
}
