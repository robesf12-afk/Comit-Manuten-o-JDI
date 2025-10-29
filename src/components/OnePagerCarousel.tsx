import React, { useEffect, useMemo, useRef, useState } from "react";

type OnePager = string;
const INTERVAL_MS = 6000; // 6s

export default function OnePagerCarousel() {
  const [imgs, setImgs] = useState<OnePager[]>([]);
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    fetch("/banners_media/onepagers.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((arr: string[]) => setImgs(arr))
      .catch((e) => console.error("Erro carregando onepagers.json", e));
  }, []);

  useEffect(() => {
    if (!imgs.length) return;
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgs, idx]);

  const start = () => {
    stop();
    timerRef.current = window.setTimeout(() => {
      setIdx((p) => (p + 1) % imgs.length);
    }, INTERVAL_MS);
  };
  const stop = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const goTo = (n: number) => setIdx((n + imgs.length) % imgs.length);
  const next = () => goTo(idx + 1);
  const prev = () => goTo(idx - 1);

  const urlAt = (name: string) => `/banners_media/${encodeURIComponent(name)}`;

  const label = useMemo(
    () =>
      imgs[idx] ? `Slide ${idx + 1} de ${imgs.length}: ${imgs[idx]}` : "",
    [idx, imgs]
  );

  if (!imgs.length) {
    return (
      <div style={{
        width: "100%", maxWidth: 1000, margin: "0 auto",
        padding: 16, borderRadius: 12, background: "#fafafa",
        border: "1px solid #eee", textAlign: "center"
      }}>
        Carregando banners…
      </div>
    );
  }

  return (
    <div
      onMouseEnter={stop}
      onMouseLeave={start}
      style={{
        width: "100%", maxWidth: 1000, margin: "16px auto",
        position: "relative", userSelect: "none"
      }}
      aria-label="Carrossel de One Pager"
    >
      <div style={{
        width: "100%", aspectRatio: "16 / 9", background: "#111",
        borderRadius: 16, overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,.15)",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <img
          key={imgs[idx]}
          src={urlAt(imgs[idx])}
          alt={label}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          draggable={false}
        />
      </div>

      <button onClick={prev} aria-label="Anterior" style={navBtn("left")}>‹</button>
      <button onClick={next} aria-label="Próximo"  style={navBtn("right")}>›</button>

      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 8,
        display: "flex", justifyContent: "center", gap: 8
      }}>
        {imgs.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir para o slide ${i + 1}`}
            style={{
              width: 10, height: 10, borderRadius: 999, border: 0,
              background: i === idx ? "#fff" : "rgba(255,255,255,.55)",
              outline: "2px solid rgba(0,0,0,.25)", cursor: "pointer"
            }}
          />
        ))}
      </div>
    </div>
  );
}

function navBtn(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [side]: 10,
    width: 40, height: 40, borderRadius: 999, border: 0,
    background: "rgba(255,255,255,.9)",
    boxShadow: "0 2px 8px rgba(0,0,0,.25)",
    fontSize: 26, lineHeight: "40px", textAlign: "center", cursor: "pointer"
  } as React.CSSProperties;
}
