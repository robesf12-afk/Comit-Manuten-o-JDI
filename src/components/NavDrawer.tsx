// src/components/NavDrawer.tsx
import React, { useEffect, useState } from "react";

type MenuItem = {
  id: string;          // âncora da página (href="#id")
  label: string;       // texto do item
  icon?: React.ReactNode; // SVG inline (sem libs externas)
};

interface NavDrawerProps {
  items: MenuItem[];
}

/**
 * Drawer lateral + FAB à esquerda.
 * - FAB abre/fecha o menu
 * - Overlay fecha ao clicar
 * - Tecla ESC fecha
 * - Links com href="#id" para rolar suave até as âncoras
 */
export default function NavDrawer({ items }: NavDrawerProps) {
  const [open, setOpen] = useState(false);

  // fecha no ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // trava scroll do body quando o drawer estiver aberto
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : original || "";
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [open]);

  return (
    <>
      {/* FAB (botão flutuante) no canto esquerdo */}
      <button
        aria-label="Abrir menu"
        className="fab-left"
        onClick={() => setOpen(true)}
      >
        {/* Ícone de “hambúrguer” simples */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 6h18M3 12h14M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Overlay */}
      <div
        className={`drawer-overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Gaveta lateral */}
      <aside className={`drawer ${open ? "open" : ""}`} role="dialog" aria-modal="true">
        <div className="drawer-header">
          <strong>Comitê de Manutenção JDI</strong>
          <button
            className="drawer-close"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
            title="Fechar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <nav className="drawer-nav">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className="drawer-link"
              onClick={() => setOpen(false)}
            >
              <span className="drawer-icon">
                {it.icon ?? (
                  // Ícone padrão (marcador)
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 3C8.13 3 5 6.13 5 10c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 7a2.5 2.5 0 0 1 0 5.5z" fill="currentColor"/>
                  </svg>
                )}
              </span>
              <span>{it.label}</span>
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
