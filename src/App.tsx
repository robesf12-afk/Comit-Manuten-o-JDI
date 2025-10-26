// src/App.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  IconDDM,
  IconOKR,
  IconInfo,
  IconOnePager,
  IconPapeis,
  IconTreinamentos,
  IconChecklist,
  IconRegistroPCM,
  IconReconhecimentos,
} from "./icons";

/* =======================
   Carrossel de Banners
   ======================= */

type Banner = {
  src: string;
  alt: string;
  href?: string; // opcional: link ao clicar
};

const banners: Banner[] = [
  { src: "/banners/banner-01.png", alt: "Destaque 1", href: "https://example.com/1" },
  { src: "/banners/banner-02.png", alt: "Destaque 2", href: "https://example.com/2" },
  { src: "/banners/banner-03.png", alt: "Destaque 3" }, // sem link (apenas visual)
];

function BannerCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // atualiza dot ativo conforme rolagem
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      const w = el.clientWidth;
      const i = Math.round(el.scrollLeft / (w + 12)); // 12px = gap do CSS
      setActive(Math.max(0, Math.min(i, banners.length - 1)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelectorAll<HTMLElement>(".banner-slide")[i];
    if (slide) slide.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section className="banner-wrap" aria-label="Banners em destaque">
      <div className="banner-track" ref={trackRef}>
        {banners.map((b, i) => {
          const img = <img className="banner-img" src={b.src} alt={b.alt} loading="lazy" />;
        return b.href ? (
            <a key={i} className="banner-slide" href={b.href} target="_blank" rel="noopener noreferrer" aria-label={b.alt}>
              {img}
            </a>
          ) : (
            <div key={i} className="banner-slide" aria-label={b.alt}>
              {img}
            </div>
          );
        })}
      </div>

      <div className="banner-dots" role="tablist" aria-label="Navegação dos banners">
        {banners.map((_, i) => (
          <button
            key={i}
            className={`dot ${active === i ? "active" : ""}`}
            aria-label={`Ir para o banner ${i + 1}`}
            aria-selected={active === i}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}

/* =======================
   App principal
   ======================= */

export default function App() {
  return (
    <div className="app">
      {/* CABEÇALHO – COMITÊ (esq) • Título (centro) • FEMSA (dir) */}
      <header className="topbar">
        <div className="topbar-inner">
          {/* ESQUERDA: LOGO COMITÊ (grande) */}
          <img className="logo-comite" src="/logo-comite.png" alt="Logo do Comitê" />

          {/* CENTRO: TÍTULO */}
          <div className="title-chip" aria-label="Comitê de Manutenção JDI">
            <span>COMITÊ DE MANUTENÇÃO • JDI</span>
          </div>

          {/* DIREITA: FEMSA */}
          <img className="logo-femsa" src="/logo-femsa.png" alt="Coca-Cola FEMSA" />
        </div>
      </header>

      {/* BANNERS EM DESTAQUE */}
      <BannerCarousel />

      {/* CONTEÚDO */}
      <main className="container">
        <section className="grid">
          {/* 1) REGISTRO DE REUNIÕES / PRESTAÇÃO DE CONTAS */}
          <a
            className="card"
            id="linkRegistroPrestacao"
            href="https://forms.office.com/r/mt0JTBJiK6?origin=lprLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconRegistroPCM /></div>
            <div className="card-body">
              <h2>REGISTRO DE REUNIÕES DE ABERTURA DE PCM E PRESTAÇÃO DE CONTAS</h2>
              <p>Aberturas de PCM e Prestação de Contas</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 2) CHECKLIST PÓS-PARTIDA */}
          <a
            className="card"
            id="linkChecklistPartida"
            href="https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconChecklist /></div>
            <div className="card-body">
              <h2>CHECKLIST PÓS-PARTIDA</h2>
              <p>CIP/SETUP/PCM/Grandes Manutenções</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 3) DDM’S */}
          <a
            className="card"
            id="linkDDM"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/DDM%C2%B4S?csf=1&web=1&e=kXfLLD"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconDDM /></div>
            <div className="card-body">
              <h2>DDM’S</h2>
              <p>Diálogos de Manutenção</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 4) PROGRAMAÇÃO DE PCM */}
          <a
            className="card"
            id="linkProgramacaoPCM"
            href="https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PAINEL%20DISTRIBUI%C3%87%C3%83O%20DE%20HORAS?csf=1&web=1&e=Ye4Wad"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconChecklist /></div>
            <div className="card-body">
              <h2>PROGRAMAÇÃO DE PCM</h2>
              <p>Planejamento semanal das manutenções preventivas</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 5) PAINEL DE DISTRIBUIÇÃO DE HORAS */}
          <a
            className="card"
            id="linkPainelHoras"
            href="https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PROGRAMA%C3%87%C3%83O%20PRE%20PCM?csf=1&web=1&e=LYYchz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconOKR /></div>
            <div className="card-body">
              <h2>PAINEL DE DISTRIBUIÇÃO DE HORAS</h2>
              <p>Acompanhamento da alocação de horas PCM</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* 6) OKR DE MANUTENÇÃO */}
          <a
            className="card"
            id="linkOKR"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS?csf=1&web=1&e=e0QIRb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconOKR /></div>
            <div className="card-body">
              <h2>OKR DE MANUTENÇÃO</h2>
              <p>Fechamentos</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* INFORMATIVOS */}
          <a
            className="card"
            id="linkInformativos"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/INFORMATIVOS?csf=1&web=1&e=dy3e4Y"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconInfo /></div>
            <div className="card-body">
              <h2>INFORMATIVOS</h2>
              <p>Informativos sobre as rotinas de manutenção</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* PAPÉIS & RESPONSABILIDADES */}
          <a
            className="card"
            id="linkPapeis"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/PAP%C3%89IS%20E%20RESPONSABILIDADES?csf=1&web=1&e=C529Nu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconPapeis /></div>
            <div className="card-body">
              <h2>PAPÉIS &amp; RESPONSABILIDADES</h2>
              <p>Papéis e responsabilidades conforme MOM</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* ONE PAGER */}
          <a
            className="card"
            id="linkOnePager"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/ONE%20PAGER?csf=1&web=1&e=mTBbo1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconOnePager /></div>
            <div className="card-body">
              <h2>ONE PAGER</h2>
              <p>Resumo dos principais indicadores de manutenção</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* TREINAMENTOS */}
          <a
            className="card"
            id="linkTreinamentos"
            href="https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/TREINAMENTOS?csf=1&web=1&e=RYgJ70"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconTreinamentos /></div>
            <div className="card-body">
              <h2>TREINAMENTOS</h2>
              <p>Sou novo na função de T2/téc. de Manutenção/T3 e agora?</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>

          {/* RECONHECIMENTOS */}
          <a
            className="card"
            id="linkReconhecimentos"
            href="https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-icon"><IconReconhecimentos /></div>
            <div className="card-body">
              <h2>RECONHECIMENTOS</h2>
              <p>Áreas reconhecidas por atingimento de meta</p>
            </div>
            <div className="card-cta">Abrir</div>
          </a>
        </section>
      </main>

      <footer className="footer">
        <small>© 2025 COMITÊ DE MANUTENÇÃO JDI — FEMSA</small>
      </footer>
    </div>
  );
}
