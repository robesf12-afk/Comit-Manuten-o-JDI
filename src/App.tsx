// src/App.tsx
import React, { useEffect, useState } from "react";

const LINKS = {
  okr: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS?csf=1&web=1&e=e0QIRb",
  ddm: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/DDM%C2%B4S?csf=1&web=1&e=kXfLLD",
  onepager: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/ONE%20PAGER?csf=1&web=1&e=mTBbo1",
  treinamentos: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/TREINAMENTOS?csf=1&web=1&e=RYgJ70",
  papeis: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/PAP%C3%89IS%20E%20RESPONSABILIDADES?csf=1&web=1&e=C529Nu",
  informativos: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/INFORMATIVOS?csf=1&web=1&e=dy3e4Y",
  checklist: "https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink",
  registro: "https://forms.office.com/r/mt0JTBJiK6?origin=lprLink",
  reconhecimentos: "https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink",
};

const MENU: Array<{ title: string; url: string }> = [
  { title: "OKR de Manutenção", url: LINKS.okr },
  { title: "DDM’s", url: LINKS.ddm },
  { title: "One Pager", url: LINKS.onepager },
  { title: "Treinamentos", url: LINKS.treinamentos },
  { title: "Papéis & Responsabilidades", url: LINKS.papeis },
  { title: "Informativos", url: LINKS.informativos },
  { title: "Checklist Pós-Partida", url: LINKS.checklist },
  { title: "Registro de Reuniões / PCM", url: LINKS.registro },
  { title: "Reconhecimentos", url: LINKS.reconhecimentos },
];

export default function App() {
  const [open, setOpen] = useState(false);

  // trava o scroll quando o menu está aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // tecla ESC fecha o menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="app">
      {/* Botão do menu (flutuante) */}
      <button
        className="fab-left"
        aria-label="Abrir menu"
        onClick={() => setOpen(true)}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      {/* Overlay + Drawer */}
      <div
        className={`drawer-overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`drawer ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Categorias"
      >
        <div className="drawer-header">
          <strong>Categorias</strong>
          <button className="drawer-close" onClick={() => setOpen(false)}>
            ×
          </button>
        </div>

        <nav className="drawer-nav">
          {MENU.map((item) => (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="drawer-link"
              onClick={() => setOpen(false)}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </aside>

      {/* CONTEÚDO: somente o banner enviado — clicando abre OKR */}
      <main className="banners-container">
        <a href={LINKS.okr} target="_blank" rel="noopener noreferrer">
          <img
            className="banner"
            src="/banner-reconhecimentos.png"
            alt="Reconhecimentos / OKR"
          />
        </a>
      </main>
    </div>
  );
}

