// src/App.tsx
import React from "react";
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

/** 
 * BANNERS: coloque aqui as imagens que você subir em /public/banners
 * Troque "src" pelo nome do arquivo e "href" pelo link que deve abrir.
 * Se quiser esconder um banner, comente a linha ou deixe o array vazio.
 */
const BANNERS: Array<{ src: string; href?: string; alt?: string }> = [
  {
    src: "/banners/banner-programacao.png",
    href:
      "https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PROGRAMA%C3%87%C3%83O%20PRE%20PCM?csf=1&web=1&e=LYYchz",
    alt: "PROGRAMAÇÃO DE PCM",
  },
  {
    src: "/banners/banner-okr.png",
    href:
      "https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PAINEL%20DISTRIBUI%C3%87%C3%83O%20DE%20HORAS?csf=1&web=1&e=Ye4Wad",
    alt: "PAINEL DE DISTRIBUIÇÃO DE HORAS",
  },
  // Adicione mais banners se quiser...
];

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

      {/* ===== CAPA COM BANNERS ===== */}
      {BANNERS.length > 0 && (
        <section className="banner-wrap" aria-label="banners em destaque">
          <div className="banner-track">
            {BANNERS.map((b, i) => {
              const img = (
                <img
                  className="banner-img"
                  src={b.src}
                  alt={b.alt || `Banner ${i + 1}`}
                  /* se a imagem não existir, some só o banner (não quebra o layout) */
                  onError={(e) => {
                    const el = e.currentTarget.closest(".banner-slide") as HTMLElement | null;
                    if (el) el.style.display = "none";
                  }}
                />
              );
              return (
                <div className="banner-slide" key={i}>
                  {b.href ? (
                    <a href={b.href} target="_blank" rel="noopener noreferrer">
                      {img}
                    </a>
                  ) : (
                    img
                  )}
                </div>
              );
            })}
          </div>

          {/* Pontinhos / navegação simples (opcional visual) */}
          <div className="banner-dots" aria-hidden>
            {BANNERS.map((_, i) => (
              <button key={i} className="dot" />
            ))}
          </div>
        </section>
      )}

      {/* ===== Aqui ficaria o resto da sua home se quiser manter algo.
         Por enquanto deixamos só banners na capa.
         O MENU LATERAL já pode listar as categorias (com ícones), mas
         como pedimos pouco tempo agora, mantive só a capa.  ===== */}

      <footer className="footer">
        <small>© 2025 COMITÊ DE MANUTENÇÃO JDI — FEMSA</small>
      </footer>
    </div>
  );
}
