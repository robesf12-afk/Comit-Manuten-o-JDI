import React, { useEffect, useRef, useState } from "react";
import { banners } from "../data/banners";

export default function BannerCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  // auto–slide opcional
  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  // scroll suave quando index muda
  useEffect(() => {
    const el = trackRef.current;
    const child = el?.children[index] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  if (banners.length === 0) return null;

  return (
    <section className="banner-wrap">
      <div className="banner-track" ref={trackRef}>
        {banners.map((b, i) => {
          const img = <img src={b.src} alt={b.alt} className="banner-img" />;
          return (
            <div className="banner-slide" key={i} onClick={() => b.href && window.open(b.href, "_blank")}>
              {b.href ? <a href={b.href} target="_blank" rel="noopener noreferrer">{img}</a> : img}
            </div>
          );
        })}
      </div>

      {/* bolinhas de navegação */}
      <div className="banner-dots">
        {banners.map((_, i) => (
          <button
            key={i}
            className={"dot" + (i === index ? " active" : "")}
            aria-label={`Ir para banner ${i + 1}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}

